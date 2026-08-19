import { useState, type FormEvent } from 'react'
import { BLOCKS, type BlockName, type Task } from '../types'

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('')
  const [block, setBlock] = useState<BlockName>(BLOCKS[0].name)
  const [importance, setImportance] = useState(1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    onAdd({ text: trimmed, block, importance })
    setText('')
    setImportance(1)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        value={block}
        onChange={(e) => setBlock(e.target.value as BlockName)}
      >
        {BLOCKS.map((b) => (
          <option key={b.name} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        step={1}
        value={importance}
        onChange={(e) => setImportance(Math.max(1, Number(e.target.value) || 1))}
      />
      <button type="submit">Añadir</button>
    </form>
  )
}

export default TaskForm
