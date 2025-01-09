import React from 'react'
import { DropableColProps } from '../../types/types'
import { useDroppable } from '@dnd-kit/core'
import DraggableTodo from '../DraggableTodo/DraggableTodo'

const DropableCol: React.FC<DropableColProps> = ({ section }) => {
	const { setNodeRef: setDroppableRef } = useDroppable({
		id: section.sectionId,
	})

	return (
		<section ref={setDroppableRef} className='bg-slate-50 rounded-2xl'>
			<h2 className='bg-slate-100 '> {section.sectionName} </h2>
			<ul className='flex flex-col items-center pb-2'>
				{section.todos.map(todo => (
					<DraggableTodo key={todo.id} todo={todo} />
				))}
			</ul>
		</section>
	)
}

export default DropableCol
