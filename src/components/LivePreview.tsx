import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import { counterComponent } from './CodeEditor';

async function transpileCode(code: string) {
	try {
		await esbuild.initialize({ wasmURL: './node_modules/esbuild-wasm/esbuild.wasm' });
	} catch (e ) {
		if (!(e as Error).message.includes("more than once")) {
			
			console.error(e)
		}
	}
	code += `ReactDOM.render(<App />, document.getElementById('root'));`

	const result = await esbuild.transform(code, {
		loader: 'jsx',
		target: 'es2015',
	});

	return result.code;
}

const boilerplate = `
  <html>
    <body>
      <div id="root"></div>
      <script type="module">
				import React from 'https://cdn.skypack.dev/react';
        import ReactDOM from 'https://cdn.skypack.dev/react-dom';
        ${'%{code}%'}
      </script>
    </body>
  </html>
`

type LivePreviewProps = {
	code: string
	packages: string[]
}

export function LivePreview({code, packages} : LivePreviewProps) {
	// todo use this error state to either display the error or the iframe
	const [error, setError] = useState<string|null>(null)
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [iframeSrcDoc, setIframeSrcDoc] = useState(boilerplate);

	console.log("packages:", packages)

	useEffect(() => {
		const updatePreview = async () => {
			try {
				const updated = await transpileCode(code);
				setError(null)
				if (iframeRef.current) {
					setIframeSrcDoc(boilerplate.replace('%{code}%', updated))
				}
			} catch (e) {
				console.error(e)
				setError(String(e))
			}
		};
		updatePreview()
	}, [code])

	return (
		<div className="p-2 w-full">
			<h1	>live preview</h1>
			{
				error && <p>{error}</p>
			}
			{
				!error && <iframe
					srcDoc={iframeSrcDoc}
					ref={iframeRef}
					title="live-preview"
					sandbox='allow-scripts'
					className="w-full h-full my-1"
				/>
			}
		</div>
	)
}