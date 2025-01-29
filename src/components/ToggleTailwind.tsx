import type React from "react"

interface ToggleTailwindButtonProps {
	tailwindMode: boolean
	toggleTailwindMode: () => void
}

export type Package = {
	name: string;
	version: string;
}

export const ToggleTailwindButton: React.FC<ToggleTailwindButtonProps> = ({ tailwindMode, toggleTailwindMode }) => {
	return (
		<button
			onClick={toggleTailwindMode}
			className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
		>
			{tailwindMode ? "disable tailwind" : "enable tailwind"}
		</button>
	)
}
