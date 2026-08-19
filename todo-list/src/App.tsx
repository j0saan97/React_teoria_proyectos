import { useRef, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskBlock from './components/TaskBlock'
import { BLOCKS, type BlockName, type Task } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const nextId = useRef(1)

  const handleAdd = (newTask: Omit<Task, 'id' | 'completed'>) => {
    setTasks((prev) => [
      ...prev,
      { ...newTask, id: nextId.current++, completed: false },
    ])
  }

  const handleToggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleEdit = (
    id: number,
    changes: { text: string; block: BlockName; importance: number },
  ) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)))
  }

  return (
    <main id="app">
      <h1>To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      <div className="board">
        {BLOCKS.map((b) => (
          <TaskBlock
            key={b.name}
            name={b.name}
            className={b.className}
            tasks={tasks.filter((t) => t.block === b.name)}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </main>
  )
}

export default App
