import React from 'react'
import { ChooseSectionModalProps } from '../../types/types'

const ChooseSectionModal: React.FC<ChooseSectionModalProps> = ({
	setChooseSectionOpen,
	putTodoIntoSection,
	sections,
}) => {
	return (
		<div className='fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white w-1/3 h-1/4 rounded-xl flex flex-col items-center justify-between p-2 '>
				<ul className='w-full'>
					{sections.length > 0 &&
						sections.map(section => (
							<li key={section.sectionId} className='mb-1'>
								<button
									type='button'
									className='w-full border rounded-2xl hover:bg-slate-200 transition-all duration-300'
									onClick={() => putTodoIntoSection(section.sectionId)}
								>
									{section.sectionName}
								</button>
							</li>
						))}
				</ul>
				<button
					onClick={() => setChooseSectionOpen(false)}
					className='text-6xl'
				>
					&times;
				</button>
			</div>
		</div>
	)
}

export default ChooseSectionModal
