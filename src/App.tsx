import { useState } from 'react'
import './App.css'
import { CodeEditor, counterComponent } from './components/CodeEditor'
import { LivePreview } from './components/LivePreview'
import { Topbar } from './components/Topbar'
import { type Package } from './components/AddPackageModal'

function App() {
  const [code, setCode] = useState(counterComponent)
  const [packages, setPackages] = useState<Package[]>([])

  return (
    <main>
    <Topbar setPackages={setPackages  } />
    <div className="flex">
      <CodeEditor code={code} setCode={setCode} />
      <LivePreview code={code} packages={packages} />
    </div>
    </main>
  )
}

export default App
