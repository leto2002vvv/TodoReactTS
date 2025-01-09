import React from 'react'
import { ToDo } from '../../types/types'

const DoneTodos: React.FC<ToDo> = ({ text, number }) => {
	return (
		<ul>
			<ol>
				{number} {text}
			</ol>
		</ul>
	)
}

export default DoneTodos
