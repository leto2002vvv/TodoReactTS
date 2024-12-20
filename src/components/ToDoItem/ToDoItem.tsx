import React from 'react'
import { TodoProps } from '../../types/types'
import EditTodo from '../EditTodo/EditTodo'

const ToDoItem: React.FC<TodoProps> = ({
	todo,
	handleSaveEditedTodo,
	editingId,
}) => {
	return (
		<ul className='relative'>
			{editingId ? (
				<EditTodo handleSaveEditedTodo={handleSaveEditedTodo} />
			) : (
				<ol>{todo.text}</ol>
			)}
		</ul>
	)
}

export default ToDoItem
