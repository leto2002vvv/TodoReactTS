import React from 'react'
import { ToDo } from '../../types/types'

const ToDoItem: React.FC<ToDo> = ({ text, createdAt, updatedAt, number }) => {
	return (
		<ul>
			<ol>
				{number} {text}
			</ol>
		</ul>
	)
}

export default ToDoItem
