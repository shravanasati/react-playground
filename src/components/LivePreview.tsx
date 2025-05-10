import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import { Package } from './AddPackageModal';

function generateImports(packages: Package[]) {
	return packages.map(pkg => `import ${pkg.name} from 'https://cdn.skypack.dev/${pkg.name}@${pkg.version}';`).join('\n')
}

const skypackPathPlugin = () => ({
	name: 'skypack-path-plugin',
	setup(build: esbuild.PluginBuild) {
		// Handle root package (e.g., "react")
		build.onResolve({ filter: /^[^./].*/ }, async (args: esbuild.OnResolveArgs) => {
			return { path: args.path, namespace: 'cdn' };
		});

		// Handle relative paths in packages (e.g., "./index.js")
		build.onResolve({ filter: /^\.+\// }, async (args: esbuild.OnResolveArgs) => {
			return {
				path: new URL(args.path, args.importer).href,
				namespace: 'cdn',
			};
		});

		// Resolve internal CDN paths like "/-/" or "/pin/"
		build.onResolve({ filter: /^\/(pin|-)\/.*/ }, async (args: esbuild.OnResolveArgs) => {
			return {
				path: `https://cdn.skypack.dev${args.path}`, // Rewrite to absolute URLs
				namespace: 'cdn',
			};
		});

		// Fetch the contents of the package
		build.onLoad({ filter: /.*/, namespace: 'cdn' }, async (args: esbuild.OnLoadArgs) => {
			const response = await fetch(args.path);
			if (!response.ok) throw new Error(`Failed to fetch ${args.path}`);
			return { contents: await response.text(), loader: 'jsx' };
		});
	},
});

async function initializeESBuild() {
	try {
		await esbuild.initialize({ wasmURL: 'https://unpkg.com/esbuild-wasm@0.25.4/esbuild.wasm' });
	} catch (e) {
		if (!(e as Error).message.includes("more than once")) {
			console.error(e)
		}
	}
}

async function transpileCode(code: string) {
	await initializeESBuild()
	code += `ReactDOM.render(<App />, document.getElementById('root'));`

	const result = await esbuild.build({
		stdin: {
			contents: code,
			loader: 'jsx',
		},
		bundle: true,
		write: false,
		plugins: [skypackPathPlugin()],
		target: "es2015",
	})

	return result.outputFiles?.[0].text;
}

const boilerplate = `
  <html>
    <body>
      <div id="root">edit the code once to initialize live preview</div>
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
	packages: Package[]
}

export function LivePreview({ code, packages }: LivePreviewProps) {
	// todo use this error state to either display the error or the iframe
	const [error, setError] = useState<string | null>(null)
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [iframeSrcDoc, setIframeSrcDoc] = useState(boilerplate);
	// console.log(packages)

	const updatePreview = async (code: string, packages: Package[]) => {
		try {
			const updated = await transpileCode(`${generateImports(packages)}\n${code}`);
			setError(null)
			if (iframeRef.current) {
				setIframeSrcDoc(boilerplate.replace('%{code}%', updated))
			}
		} catch (e) {
			console.error(e)
			setError(String(e))
		}
	};

	useEffect(() => {
		updatePreview(code, packages)
	}, [code, packages])

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