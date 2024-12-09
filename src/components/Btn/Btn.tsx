import React from 'react'
import { BtnAddProps } from '../../types/types'

const Btn: React.FC<BtnAddProps> = ({ addToDo, text, className }) => {
	return (
		<div>
			<button onClick={addToDo} className={className}>
				{text}
			</button>
		</div>
	)
}

export default Btn
