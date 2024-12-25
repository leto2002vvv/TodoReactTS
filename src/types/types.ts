export interface ToDo {
	id: number
	number?: number
	text: string
	completed: boolean
	createdAt: string
	updatedAt: string
	priority?: string
	deadline: Date | null
}

export interface TodoProps extends ToDo {
	handleSaveEditedTodo: (editedTodo: string) => void
	handleSetText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	editedTodoValue: string
	todoId: number
	editingId: number | null
	todo: ToDo
}

export interface BtnAddProps {
	addToDo: () => void
	text: string
	className: string
}

export interface InputProps {
	setInputValue: (value: string) => void
	handleEnterPress: (e: React.KeyboardEvent) => void
	value: string
	className: string
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
	editTodo: (todoId: number) => void
	handleSaveEditedTodo: (e: React.MouseEvent<HTMLButtonElement>) => void
	openDeadlineModal: (id: number) => void
	todoId: number
	editingId: number | null
}

export interface DeadlineModalProps {
	setIsDeadlineModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	setDeadline: React.Dispatch<React.SetStateAction<Date | null>>
	deadline: Date | null
	editingId: number | null
	handleSetTodoDeadline: () => void
}
