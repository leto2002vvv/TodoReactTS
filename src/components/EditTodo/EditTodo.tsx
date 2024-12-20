import React, { useState } from 'react'
import { TodoProps } from '../../types/types'

const EditTodo: React.FC<TodoProps> = ({ todo, handleSaveEditedTodo }) => {
	const [text, setText] = useState<string>('')

	const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
	}
	console.log(text)

	return (
		<>
			<textarea
				value={text}
				onChange={handleSetText}
				className='h-7 absolute rounded-full bottom-[2px] outline-none bg-transparent'
			>
				{todo.text}
			</textarea>
		</>
	)
}

export default EditTodo
