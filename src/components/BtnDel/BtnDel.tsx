import React from 'react'
import { BtnDelProps } from '../../types/types'

const BtnDel: React.FC<BtnDelProps> = ({ deleteToDo, todoId }) => {
	return (
		<div>
			<button
				className='border-2 border-gray-50 rounded-full w-7 transition-all duration-500 border-t-0 border-b-0 hover:border-red-300'
				onClick={e => deleteToDo(e, todoId)}
			>
				-
			</button>
		</div>
	)
}

export default BtnDel
