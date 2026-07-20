import { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)

  return (
    <div className="contador">
      <h1>Contador: {count}</h1>
      <div className="contador-botones">
        <button type="button" onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          +
        </button>
      </div>
    </div>
  )
}

export default Contador
