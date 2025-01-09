import React from 'react'
import { BtnProps } from '../../types/types'

const Btn: React.FC<BtnProps> = ({ addFunc, text, classNameBtn }) => {
	return (
		<div>
			<button onClick={addFunc} className={classNameBtn}>
				{text}
			</button>
		</div>
	)
}

export default Btn
