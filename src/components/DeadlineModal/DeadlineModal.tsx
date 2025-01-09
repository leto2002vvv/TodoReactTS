import React from 'react'
import { DeadlineModalProps } from '../../types/types'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { FaCheck } from 'react-icons/fa'

const DeadlineModal: React.FC<DeadlineModalProps> = ({
	setIsDeadlineModalOpen,
	setDeadline,
	handleSetTodoDeadline,
	deadline,
}) => {
	return (
		<div className='fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white w-1/3 h-1/4 rounded-xl flex flex-col items-center justify-between p-2'>
				<DatePicker
					className='border rounded-2xl'
					selected={deadline}
					onChange={date => setDeadline(date)}
				/>
				<div className='flex w-full justify-between items-center'>
					<button
						onClick={() => setIsDeadlineModalOpen(false)}
						className='text-6xl'
					>
						&times;
					</button>
					<FaCheck onClick={handleSetTodoDeadline} className='cursor-pointer' />
				</div>
			</div>
		</div>
	)
}

export default DeadlineModal
