export type BlockName = 'Programación' | 'Poker' | 'Tareas varias'

export interface Task {
  id: number
  text: string
  block: BlockName
  importance: number
  completed: boolean
}

export const BLOCKS: { name: BlockName; className: string }[] = [
  { name: 'Programación', className: 'block-programacion' },
  { name: 'Poker', className: 'block-poker' },
  { name: 'Tareas varias', className: 'block-tareas-varias' },
]
