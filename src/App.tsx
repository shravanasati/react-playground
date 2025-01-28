import { useState } from 'react'
import './App.css'
import { CodeEditor } from './components/CodeEditor'
import { LivePreview } from './components/LivePreview'
import { Topbar } from './components/Topbar'

function App() {
  const [code, setCode] = useState("")
  const [packages, setPackages] = useState<string[]>([])

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
