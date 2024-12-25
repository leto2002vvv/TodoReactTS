import React from 'react'
import { TodoProps } from '../../types/types'

const EditTodo: React.FC<TodoProps> = ({
	todo,
	handleSetText,
	editedTodoValue,
}) => {
	return (
		<>
			<textarea
				value={editedTodoValue}
				onChange={handleSetText}
				className='h-7 absolute -bottom-3 outline-none bg-transparent'
			>
				{todo && todo.text}
			</textarea>
		</>
	)
}

export default EditTodo
