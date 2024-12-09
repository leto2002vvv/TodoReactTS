import React from 'react'
import { InputProps } from '../../types/types'

const InputToDo: React.FC<InputProps> = ({ value, setInputValue, className, handleEnterPress }) => {
	return (
		<div>
			<input
				className={className}
				type='text'
				value={value}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleEnterPress}
			/>
		</div>
	)
}

export default InputToDo
