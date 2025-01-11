import React, { useState } from 'react'
import { DropableColProps } from '../../types/types'
import { useDroppable } from '@dnd-kit/core'

import DraggableTodo from '../DraggableTodo/DraggableTodo'

import { FaQuestionCircle } from 'react-icons/fa'
import styles from './AnimatedSection.module.css'
// import HelperModal from '../HelperModal/HelperModal'
import ColorPalette from '../ColorPalette/ColorPalette'

const DropableCol: React.FC<DropableColProps> = ({
	handleSectionSettingsOpen,
	sectionSettingsId,
	section,
}) => {
	const [cursorPosition, setCursorPosition] = useState<{
		x: number
		y: number
	} | null>(null)
	// const [helperText] = useState<HelperText>({
	// 	title: 'what is it for?',
	// 	text: 'here you can create a section, for example "Work" or "Other", so that later you can drag your todos into the created sections',
	// })
	const [colors] = useState<string[]>([
		'#FF5733', // red
		'#33FF57', // green
		'#3357FF', // blue
		'#F1C40F', // yellow
		'#8E44AD', // purple
		'#1ABC9C', // Бирюзовый
	])
	const [selectedColor, setSelectedColor] = useState<string>('')
	const { setNodeRef: setDroppableRef } = useDroppable({
		id: section.sectionId,
	})

	const handleOnMouseMove = (e: React.MouseEvent) => {
		setCursorPosition({ x: e.clientX, y: e.clientY })
	}

	return (
		<section ref={setDroppableRef} className='bg-slate-50 rounded-2xl relative'>
			<h2
				style={{ backgroundColor: selectedColor }}
				className='bg-slate-100 cursor-pointer hover:text-slate-400 transition-all duration-200 ease-in-out'
				onMouseMove={handleOnMouseMove}
				onMouseLeave={() => setCursorPosition(null)}
				onClick={() => handleSectionSettingsOpen(section.sectionId)}
			>
				{section.sectionName}
			</h2>
			{cursorPosition && (
				<div
					style={{
						position: 'fixed',
						top: cursorPosition.y + 10,
						left: cursorPosition.x + 15,
					}}
				>
					<FaQuestionCircle />
				</div>
			)}
			<div>
				<ul className='flex flex-col items-center pb-2'>
					{section.todos.map(todo => (
						<DraggableTodo key={todo.id} todo={todo} />
					))}
				</ul>
				{sectionSettingsId === section.sectionId && (
					<>
						<p
							className={`flex flex-col items-center pb-2 ${styles.slideDown}`}
						>
							to paint in:
						</p>
						<div className='flex justify-evenly mb-3'>
							{colors.map(color => (
								<ColorPalette
									color={color}
									setSelectedColor={setSelectedColor}
								/>
							))}
						</div>
					</>
				)}
			</div>
			{/* {cursorPosition && <HelperModal helperText={helperText} />} */}
		</section>
	)
}

export default DropableCol
