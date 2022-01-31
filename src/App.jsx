import { useState } from 'react'
import evolog from 'evolog'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    evolog(count + 1, {
      bandColor: 'yellow'
    })
  }


  return (
    <div className="App">
      <button id="btn" onClick={handleClick}>
        {count}
      </button>
    </div>
  )
}

export default App
