import React from 'react'
import { BtnDoneProps } from '../../types/types'

const BtnDone: React.FC<BtnDoneProps> = ({ todoDone, todoId }) => {
	return (
		<div>
			<button
				className='border-2 border-gray-50 border-b-0 border-t-0 rounded-full w-16 transition-all duration-500 hover:border-green-300'
				onClick={e => todoDone(e, todoId)}
			>
				done
			</button>
		</div>
	)
}

export default BtnDone
