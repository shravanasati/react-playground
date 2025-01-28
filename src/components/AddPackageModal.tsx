import type React from "react"
import { useState } from "react"

interface AddPackageModalProps {
  isOpen: boolean
  onClose: () => void
	onAdd: (name: string, version: string) => void
}

export const AddPackageModal: React.FC<AddPackageModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [packageName, setPackageName] = useState("")
  const [packageVersion, setPackageVersion] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
		onAdd(packageName, packageVersion || "latest")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Add Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="packageName" className="block text-sm font-medium text-gray-300 mb-1">
              Package Name:
            </label>
            <input
              type="text"
              id="packageName"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="packageVersion" className="block text-sm font-medium text-gray-300 mb-1">
              Version (optional):
            </label>
            <input
              type="text"
              id="packageVersion"
              value={packageVersion}
              onChange={(e) => setPackageVersion(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
