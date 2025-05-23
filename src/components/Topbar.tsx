import type React from "react"
import { useState } from "react"
import { AddPackageModal, Package } from "./AddPackageModal"

type TopbarProps = {
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>
}

export const Topbar: React.FC<TopbarProps> = ({ setPackages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const addPackage = (name: string, version: string) => {
    setPackages((prev) => [...prev, { name: name, version: version }])
  }

  return (
    <div className="flex justify-between items-center px-5 py-3 bg-gray-900 border-b border-gray-700">
      <h1 className="text-xl font-semibold text-gray-100">react playground</h1>
      <div className="flex gap-2">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          add package
        </button>
        <a href="https://github.com/shravanasati/react-playground" target="_blank" rel="noopener noreferrer">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            github
          </button>
        </a>
      </div>
      <AddPackageModal isOpen={isModalOpen} onClose={closeModal} onAdd={addPackage} />
    </div>
  )
}
