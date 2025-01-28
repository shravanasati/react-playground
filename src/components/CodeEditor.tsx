import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { ViewUpdate, lineNumbers } from '@codemirror/view';
import { javascript }  from '@codemirror/lang-javascript';

type CodeEditorProps = {
	code: string,
	setCode: React.Dispatch<React.SetStateAction<string>>
}

export const CodeEditor: React.FC<CodeEditorProps> = ({code, setCode}) => {
	const extensions = [lineNumbers(), javascript({jsx: true})]

	const onChange = React.useCallback((value: string, _: ViewUpdate) => {
		setCode(value);
	}, []);


	return (
		<CodeMirror
			value={code}
			height="95vh"
			width='50vw'
			theme={dracula}
			extensions={extensions}
			onChange={onChange}
		/>
	);
};
