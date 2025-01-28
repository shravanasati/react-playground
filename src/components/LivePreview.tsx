type LivePreviewProps = {
	code: string
}

export function LivePreview({code} : LivePreviewProps) {
	return (
		<div className="p-2">
			<p>live preview</p>
			<p>{code}</p>
		</div>
	)
}