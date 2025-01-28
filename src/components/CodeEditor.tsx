import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { ViewUpdate, lineNumbers } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';

type CodeEditorProps = {
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
};

export const counterComponent = `// Write your code here
// All react hooks are under the \`React\` namespace
// Here's an example of a simple counter component

function Counter() {
	const [count, setCount] = React.useState(0);

	return (
		<div style={{ textAlign: "center", marginTop: "20px" }}>
			<p style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>
				Count: {count}
			</p>
			<div>
				<button
					onClick={() => setCount(count + 1)}
					style={{
						padding: "10px 20px",
						margin: "5px",
						backgroundColor: "#4CAF50",
						color: "white",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					Increment
				</button>
				<button
					onClick={() => setCount(count - 1)}
					style={{
						padding: "10px 20px",
						margin: "5px",
						backgroundColor: "#F44336",
						color: "white",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					Decrement
				</button>
			</div>
		</div>
	);
}


function App() {
	return <Counter />;
}
`;

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
	const editorValue = code || counterComponent;
	const extensions = [lineNumbers(), javascript({ jsx: true })];

	const onChange = React.useCallback(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		(value: string, _: ViewUpdate) => {
			setCode(value);
		},
		[setCode]
	);

	return (
		<CodeMirror
			value={editorValue}
			height="95vh"
			width="50vw"
			theme={dracula}
			extensions={extensions}
			onChange={onChange}
		/>
	);
};
