import { useState } from 'react'
import './App.css'
import { CodeEditor } from './components/CodeEditor'
import { LivePreview } from './components/LivePreview'

function App() {
  const [code, setCode] = useState("")
  return (
    <div className="flex">
      <CodeEditor code={code} setCode={setCode} />
      <LivePreview code={code} />
    </div>
  )
}

export default App
