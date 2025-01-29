import type React from "react"
import { useState } from "react"
import { AddPackageModal, Package } from "./AddPackageModal"
import { ToggleTailwindButton } from "./ToggleTailwind"

type TopbarProps = {
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>
  tailwindMode: boolean
  toggleTailwindMode: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ tailwindMode, toggleTailwindMode, setPackages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const addPackage = (name: string, version: string) => {
    setPackages((prev) => [...prev, { name: name, version: version }])
  }

  return (
    <div className="flex justify-between items-center px-5 py-3 bg-gray-900 border-b border-gray-700">
      <h1 className="text-xl font-semibold text-gray-100">react playground</h1>
      <div className="flex items-center justify-around">
        <button
          onClick={openModal}
          className="px-4 py-2 m-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          add package
        </button>
        <AddPackageModal isOpen={isModalOpen} onClose={closeModal} onAdd={addPackage} />
        <ToggleTailwindButton tailwindMode={tailwindMode} toggleTailwindMode={toggleTailwindMode} />
      </div>
    </div>
  )
}
