export interface ToDo {
	id: number
	number?: number
	text: string
	completed: boolean
	createdAt: string
	updatedAt: string
	priority?: string
}

export interface TodoProps extends ToDo {
	handleSaveEditedTodo?: (editedTodo: string) => void
	todoId?: number
	editingId?: number | null
	todo: ToDo
}

export interface BtnAddProps {
	addToDo: () => void
	text: string
	className: string
}

export interface InputProps {
	value: string
	className: string
	setInputValue: (value: string) => void
	handleEnterPress: (e: React.KeyboardEvent) => void
}

export interface BtnDelProps {
	deleteToDo: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
	todoId: number
}

export interface BtnDoneProps {
	todoDone: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
	todoId: number
}

export type Priority = 'highest' | 'lowest' | 'middle'

export interface MenuTodoProps {
	prioritizeTodo: (todoId: number, value: Priority) => void
	todoId: number
	editTodo: (todoId: number) => void
	handleSaveEditedTodo: (e: React.MouseEvent<HTMLButtonElement>) => void
}
