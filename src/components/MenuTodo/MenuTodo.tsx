import React from 'react'
import { MenuTodoProps, Priority } from '../../types/types'
import { FaEdit } from 'react-icons/fa'
import { MdPriorityHigh, MdLowPriority, MdTimer } from 'react-icons/md'

const MenuTodo: React.FC<MenuTodoProps> = ({
	prioritizeTodo,
	openDeadlineModal,
	editTodo,
	handleSaveEditedTodo,
	todoId,
	editingId,
}) => {
	return (
		<div className='absolute -top-6 -right-52 w-48 bg-slate-100 p-1 rounded-xl flex flex-col items-start gap-1 pl-3'>
			<button
				value='highest'
				className='flex gap-1 items-center border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
				onClick={e => {
					const value = (e.target as HTMLButtonElement).value as Priority
					prioritizeTodo(todoId, value)
				}}
			>
				<MdPriorityHigh className='w-3' />
				set highest priority
			</button>
			<button
				value='lowest'
				className='flex gap-1 items-center border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
				onClick={e => {
					const value = (e.target as HTMLButtonElement).value as Priority
					prioritizeTodo(todoId, value)
				}}
			>
				<MdLowPriority className='w-4' />
				set lowest priority
			</button>
			<div className='flex w-4/5 justify-between'>
				<button
					className='flex gap-1 items-center border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
					onClick={() => editTodo(todoId)}
				>
					<FaEdit className='w-3' />
					<p>edit todo</p>
				</button>
				{editingId && (
					<button
						className='flex gap-1 items-center border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
						onClick={handleSaveEditedTodo}
					>
						save
					</button>
				)}
			</div>
			<button
				className='flex gap-1 items-center border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
				onClick={() => openDeadlineModal(todoId)}
			>
				<MdTimer className='w-3' />
				add deadline
			</button>
		</div>
	)
}

export default MenuTodo
