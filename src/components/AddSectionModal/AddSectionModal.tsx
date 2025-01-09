import React from 'react'
import Input from '../Input/Input'
import { InputProps, BtnProps, SectionModalProps } from '../../types/types'
import Btn from '../Btn/Btn'

type combinedProps = InputProps & BtnProps & SectionModalProps

const AddSectionModal: React.FC<combinedProps> = ({
	// input props
	onEnter,
	setter,
	classNameInput,
	value,
	// btn props
	addFunc,
	text,
	classNameBtn,
	// modal props
	setIsAddSectionMenuOpen,
}) => {
	return (
		<div className='fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white w-1/3 h-1/4 rounded-xl flex flex-col items-center justify-between p-2 '>
				<Input
					classNameInput={classNameInput}
					onEnter={onEnter}
					setter={setter}
					value={value}
				/>
				<div className='flex items-center'>
					<Btn addFunc={addFunc} text={text} classNameBtn={classNameBtn} />
					<button // to create 'CloseModalBtn' component instead of this
						onClick={() => setIsAddSectionMenuOpen(false)}
						className='text-6xl'
					>
						&times;
					</button>
				</div>
			</div>
		</div>
	)
}

export default AddSectionModal
