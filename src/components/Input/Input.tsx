import React from 'react'
import { InputProps } from '../../types/types'

const Input: React.FC<InputProps> = ({
	onEnter,
	setter,
	classNameInput,
	value,
}) => {
	return (
		<div>
			<input
				className={classNameInput}
				type='text'
				value={value}
				onChange={e => setter(e.target.value)}
				onKeyDown={onEnter}
			/>
		</div>
	)
}

export default Input
