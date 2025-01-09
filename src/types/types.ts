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

export interface TodoProps {
	handleSetText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	editedTodoValue: string
	todoId?: number
	editingId?: number | null
	todo: ToDo
}

export interface BtnProps {
	addFunc: () => void
	text: string
	classNameBtn: string
}

export interface InputProps {
	setter: (value: string) => void
	onEnter: (e: React.KeyboardEvent) => void
	value: string
	classNameInput: string
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
	setChooseSectionOpen: React.Dispatch<React.SetStateAction<boolean>>
	todoId: number
	editingId: number | null
	sections: Section[]
}

export interface DeadlineModalProps {
	setIsDeadlineModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	setDeadline: React.Dispatch<React.SetStateAction<Date | null>>
	handleSetTodoDeadline: () => void
	deadline: Date | null
	editingId: number | null
}

export interface DropdownMenuProps {
	setIsAddSectionMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Section {
	sectionName: string
	sectionId: number
	todos: ToDo[]
}

export interface SectionModalProps {
	setIsAddSectionMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface DropableColProps {
	section: Section
}

export interface ChooseSectionModalProps {
	setChooseSectionOpen: React.Dispatch<React.SetStateAction<boolean>>
	putTodoIntoSection: (sectionId: number) => void
	sections: Section[]
}

export interface DraggableTodoProps {
	todo: ToDo
}
