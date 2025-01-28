import type React from "react"
import { useState } from "react"
import {AddPackageModal} from "./AddPackageModal"

type TopbarProps = {
	setPackages: React.Dispatch<React.SetStateAction<string[]>>
}

export const Topbar: React.FC<TopbarProps> = ({setPackages}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
	const addPackage = (name: string, version: string) => {
		setPackages((prev) => [...prev, `${name}@${version}`])
	}

  return (
    <div className="flex justify-between items-center px-5 py-3 bg-gray-900 border-b border-gray-700">
      <h1 className="text-xl font-semibold text-gray-100">React Playground</h1>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Add Package
      </button>
      <AddPackageModal isOpen={isModalOpen} onClose={closeModal} onAdd={addPackage} />
    </div>
  )
}
