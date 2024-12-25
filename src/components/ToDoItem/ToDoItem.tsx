import React from 'react'
import { TodoProps } from '../../types/types'
import EditTodo from '../EditTodo/EditTodo'

const ToDoItem: React.FC<TodoProps> = ({
	todo,
	editingId,
	editedTodoValue,
	handleSetText,
}) => {
	return (
		<ul className='relative flex gap-12 items-center'>
			{todo.id === editingId ? (
				<EditTodo
					handleSetText={handleSetText}
					editedTodoValue={editedTodoValue}
				/>
			) : (
				<>
					<ol>{todo.text}</ol>
					<ol className='text-sm'>
						{`deadline: ${todo.deadline ? todo.deadline.toLocaleString() : null}`}
					</ol>
				</>
			)}
		</ul>
	)
}

export default ToDoItem
