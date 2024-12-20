import { useEffect, useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

import './App.css'
import { ToDo, Priority } from './types/types'

import ToDoItem from './components/ToDoItem/ToDoItem'
import InputToDo from './components/InputToDo/InputToDo'
import Btn from './components/Btn/Btn'
import BtnDel from './components/BtnDel/BtnDel'
import BtnDone from './components/BtnDone/BtnDone'
import DoneTodos from './components/DoneTodos/DoneTodos'
import MenuTodo from './components/MenuTodo/MenuTodo'
import useDebounce from './hooks/UseDebounce'

function App() {
	// ========================================= STATES

	const [inputValue, setInputValue] = useState<string>('')
	const [todos, setTodos] = useState<ToDo[]>(() => {
		const savedTodos = localStorage.getItem('todos')
		return savedTodos ? JSON.parse(savedTodos) : []
	})
	const [doneTodos, setDoneTodos] = useState<ToDo[]>(() => {
		const savedDoneTodos = localStorage.getItem('doneTodos')
		return savedDoneTodos ? JSON.parse(savedDoneTodos) : []
	})

	const [openedMenuId, setOpenedMenuId] = useState<number | null>(null)
	const [editingId, setEditingId] = useState<number | null>(null) // по идее эти два стейта можно обьеденить в один

	// const debouncedSaveEditedTodo = useDebounce(, 500)

	// ========================================= FUNCTIONS

	const handleAddToDo = () => {
		if (inputValue.trim() !== '') {
			const nextId =
				todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1
			const newToDo: ToDo = {
				id: nextId,
				// number: nextId,
				text: inputValue,
				completed: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				priority: 'middle',
			}
			setTodos(prev => {
				const highPrioritized = prev.filter(todo => todo.priority === 'highest')
				const lowPrioritized = prev.filter(todo => todo.priority === 'lowest')
				const midPrioritized = prev.filter(todo => todo.priority === 'middle')
				return [
					...highPrioritized,
					...midPrioritized,
					newToDo,
					...lowPrioritized,
				]
			})
			setInputValue('')
		}
	}

	const handleEnterPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddToDo()
		}
	}

	const deleteToDo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault()
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const todoDone = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault()
		const doneTodo = todos.find(todo => todo.id === id)

		if (doneTodo && !doneTodos.some(todo => todo.id === id)) {
			setDoneTodos(prev => [...prev, doneTodo])
			setTodos(todos.filter(todo => todo.id !== id))
		}
	}

	const toggleMenu = (id: number) => {
		setOpenedMenuId(prevId => (prevId !== id ? id : null))
	}

	const prioritizeTodo = (todoId: number, value: Priority) => {
		setTodos(prev => {
			const targetTodo = prev.find(todo => todo.id === todoId)
			if (!targetTodo) return prev

			const prioritizedTodo = { ...targetTodo, priority: value }

			const filteredTodos = prev.filter(todo => todo.id !== todoId)
			if (value === 'highest') {
				return [prioritizedTodo, ...filteredTodos]
			} else if (value === 'lowest') {
				return [...filteredTodos, prioritizedTodo]
			} else {
				return prev
			}
		})
		return value
	}

	const editTodo = (id: number) => {
		setEditingId(id) // here is the id of clicked to edit todo from MenuTodo
	}

	const handleSaveEditedTodo = () => {
		if (editingId) {
		}
	}

	// ============================================= EFFECTS

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
		localStorage.setItem('doneTodos', JSON.stringify(doneTodos))
		setOpenedMenuId(null)
		setEditingId(null)
	}, [todos, doneTodos])

	// ============================================ LOGS

	console.log(todos)
	console.log(editingId)
	console.log(openedMenuId);
	

	return (
		<div className='m-10 flex flex-col justify-center items-center'>
			<div className='flex justify-between flex-wrap w-1/2 gap-4 mb-5'>
				<InputToDo
					className='bg-slate-100 hover:bg-slate-200 transition-all duration-200 rounded-md p-1 outline-none border border-gray-300'
					value={inputValue}
					setInputValue={setInputValue}
					handleEnterPress={handleEnterPress}
				/>
				<Btn
					className='border bg-slate-100 hover:bg-slate-200 transition-all duration-200 border-gray-300 rounded-md p-1'
					text={'add new todo'}
					addToDo={handleAddToDo}
				/>
			</div>
			<div className='w-1/2'>
				{todos.length > 0 ? (
					todos.map(toDo => {
						return (
							<div
								key={toDo.id}
								className={`flex gap-3 w-full justify-between border border-r-0 border-gray-300 bg-slate-100 hover:bg-slate-200 transition-all duration-300 rounded-full my-3 pl-1 items-center 
								${toDo.priority === 'highest' ? 'bg-yellow-50 hover:bg-yellow-100' : 'bg-slate-100'}
								${toDo.priority === 'lowest' ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-100'}`}
							>
								<ToDoItem
									{...toDo}
									todo={toDo}
									editingId={editingId}
									todoId={toDo.id}
									handleSaveEditedTodo={handleSaveEditedTodo}
								/>
								<div className='flex gap-2 items-center justify-center mr-1'>
									<BtnDone todoDone={todoDone} todoId={toDo.id} />
									<BtnDel deleteToDo={deleteToDo} todoId={toDo.id} />
									<div className='relative'>
										<MdMoreHoriz
											className='cursor-pointer'
											onClick={() => toggleMenu(toDo.id)}
										/>
										{openedMenuId === toDo.id && (
											<MenuTodo
												prioritizeTodo={prioritizeTodo}
												todoId={toDo.id}
												editTodo={editTodo}
												handleSaveEditedTodo={handleSaveEditedTodo}
											/>
										)}
									</div>
								</div>
							</div>
						)
					})
				) : (
					<p>nothing to do</p>
				)}
			</div>
			<div></div>
			<div className='w-1/2'>
				{doneTodos.length > 0 ? (
					doneTodos.map(todo => {
						return (
							<div
								key={todo.id}
								className='flex gap-3 w-full justify-between border border-r-0 border-gray-300 bg-slate-100 hover:bg-slate-200 transition-all duration-300 rounded-full my-3 pl-1 items-center'
							>
								<DoneTodos {...todo} />
								<div className='flex gap-2 items-center pr-4'>
									<img src='/iconDone.svg' alt='done todo' className='w-6' />
								</div>
							</div>
						)
					})
				) : (
					<p>no done todos</p>
				)}
			</div>
		</div>
	)
}

export default App
