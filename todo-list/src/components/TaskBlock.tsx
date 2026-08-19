import type { BlockName, Task } from '../types'
import TaskItem from './TaskItem'

interface TaskEditChanges {
  text: string
  block: BlockName
  importance: number
}

interface TaskBlockProps {
  name: BlockName
  className: string
  tasks: Task[]
  onToggleComplete: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, changes: TaskEditChanges) => void
}

function TaskBlock({
  name,
  className,
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskBlockProps) {
  const sortedTasks = [...tasks].sort((a, b) => a.importance - b.importance)

  return (
    <section className={`task-block ${className}`}>
      <h2>{name}</h2>
      {sortedTasks.length === 0 ? (
        <p className="empty">Sin tareas</p>
      ) : (
        <ul>
          {sortedTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              isTopPriority={index === 0}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskBlock
