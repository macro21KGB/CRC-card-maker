import { useState } from 'react'
import evolog from 'evolog'
import './App.css'
import CRCCard from './CRC-card'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    evolog(count + 1, {
      bandColor: 'orange'
    })
  }


  return (
    <div className="App">
      <button id="btn" onClick={handleClick}>
        {count}
      </button>
      <CRCCard resp="respo" collab="collab" />
    </div>
  )
}

export default App
