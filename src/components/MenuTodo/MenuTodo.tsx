import React from 'react'
import { prioritizeTodoProps, Priority } from '../../types/types'

const MenuTodo: React.FC<prioritizeTodoProps> = ({
	prioritizeTodo,
	todoId,
}) => {
	return (
		<ul className='absolute -top-6 -right-52 w-48 bg-slate-100 p-1 rounded-xl flex flex-col items-start gap-1 pl-3'>
			<li>
				<button
					value='highest'
					className='border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
					onClick={e => {
						const value = (e.target as HTMLButtonElement).value as Priority
						prioritizeTodo(todoId, value)
					}}
				>
					set highest priority
				</button>
			</li>
			<li>
				<button
					value='lowest'
					className='border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
					onClick={e => {
						const value = (e.target as HTMLButtonElement).value as Priority
						prioritizeTodo(todoId, value)
					}}
				>
					set lowest priority
				</button>
			</li>
		</ul>
	)
}

export default MenuTodo
