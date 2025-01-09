import React from 'react'
import { DraggableTodoProps } from '../../types/types'
import { useDraggable } from '@dnd-kit/core'

const DraggableTodo: React.FC<DraggableTodoProps> = ({ todo }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: todo.id,
	})

	const style = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
	}

	return (
		<li
			key={todo.id}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className='border-b w-1/2 flex items-center justify-center hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200 cursor-pointer'
		>
			{todo.text}
		</li>
	)
}

export default DraggableTodo
