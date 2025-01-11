import React from 'react'
import { HelperModalProps } from '../../types/types'

const HelperModal: React.FC<HelperModalProps> = ({ helperText }) => {
	return (
		<div className='absolute -bottom-60 bg-slate-100 rounded-xl p-1'>
			<h4>{helperText.title}</h4>
			<p>{helperText.text}</p>
		</div>
	)
}

export default HelperModal
