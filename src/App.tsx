import { useEffect, useState } from 'react'
import { ToDo, Priority, Section } from './types/types'

import ToDoItem from './components/ToDoItem/ToDoItem'
import Input from './components/Input/Input'
import Btn from './components/Btn/Btn'
import BtnDel from './components/BtnDel/BtnDel'
import BtnDone from './components/BtnDone/BtnDone'
import DoneTodos from './components/DoneTodos/DoneTodos'
import MenuTodo from './components/MenuTodo/MenuTodo'
import DeadlineModal from './components/DeadlineModal/DeadlineModal'
import DropdownMenu from './components/DropdownMenu/DropdownMenu'

import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import DropableCol from './components/DropableCol/DropableCol'
import AddSectionModal from './components/AddSectionModal/AddSectionModal'

import { MdMoreHoriz } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import './App.css'
import ChooseSectionModal from './components/ChooseSectionModal/ChooseSectionModal'

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
	const [editingId, setEditingId] = useState<number | null>(null) // по идее эти два стейта можно обьеденить в один, сюда на первое время привязать к какому именно todo задавать deadline
	const [deadlineId, setDeadlineId] = useState<number>()

	const [editedTodoValue, setEditedTodoValue] = useState<string>('')
	const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState<boolean>(false)
	const [deadline, setDeadline] = useState<Date | null>(null)

	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

	const [sections, setSections] = useState<Section[]>(() => {
		const savedSections = localStorage.getItem('sections')
		return savedSections ? JSON.parse(savedSections) : []
	})
	const [isAddSectionMenuOpen, setIsAddSectionMenuOpen] =
		useState<boolean>(false)
	const [сhooseSectionOpen, setChooseSectionOpen] = useState<boolean>(false)
	const [sectionSettingsId, setSectionSettingsId] = useState<number | null>(
		null
	)

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
				deadline: null,
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

	// ======================================== editing logic
	const editTodo = (id: number) => {
		setEditingId(id) // here is the id of clicked to edit todo from MenuTodo
	}

	const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedTodoValue(e.target.value)
	}

	const handleSaveEditedTodo = () => {
		if (editedTodoValue.trim())
			setTodos(prev =>
				prev.map(todo =>
					todo.id === editingId ? { ...todo, text: editedTodoValue } : todo
				)
			)
		setEditingId(null)
		setEditedTodoValue('')
	}

	// ============================================= deadline logic

	const openDeadlineModal = (id: number) => {
		setIsDeadlineModalOpen(true)
		setDeadlineId(id)
	}

	const handleSetTodoDeadline = () => {
		setTodos(prev =>
			prev.map(todo => {
				if (todo.id === deadlineId) {
					return {
						...todo,
						deadline: deadline,
					}
				}
				return todo
			})
		)
		setDeadline(null)
		setIsDeadlineModalOpen(false)
	}

	const handleNotification = (todo: ToDo) => {
		if ('Notification' in window) {
			Notification.requestPermission().then(permission => {
				if (permission === 'granted') {
					new Notification(`havent u forgot about this aim '${todo.text}' ?`)
				}
			})
		}
	}

	const checkDeadlines = () => {
		const now = new Date()
		todos.forEach(todo => {
			if (todo.deadline && todo.deadline <= now) {
				handleNotification(todo)
			}
		})
	}

	// ============================================= SECTION LOGIC

	const createNewSection = () => {
		if (inputValue.trim() === '') return
		const nextSectionId =
			sections.length > 0
				? Math.max(...sections.map(sec => sec.sectionId)) + 1
				: 1
		setSections(prev => [
			...prev,
			{ sectionName: inputValue, sectionId: nextSectionId, todos: [] },
		])
		setInputValue('')
	}

	const putTodoIntoSection = (sectionId: number) => {
		const addedTodo = todos.filter(todo => todo.id === openedMenuId)[0]
		setSections(prevSections => {
			return prevSections.map(section => {
				if (section.sectionId === sectionId) {
					const updatedSection = section.todos.some(
						todo => todo.id === addedTodo.id
					)
						? section.todos
						: [...section.todos, addedTodo]
					return {
						...section,
						todos: updatedSection,
					}
				}
				return section
			})
		})
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (!over || active.id === over.id) return

		const activeSection = sections.find(section =>
			section.todos.some(todo => todo.id === active.id)
		) // to find the draggable section
		const overSection = sections.find(section =>
			section.todos.some(todo => todo.id === over.id)
		) // to find the section over which we are dragging the active section
		console.log(activeSection, overSection)
		console.log(active.id, over.id)

		if (activeSection && overSection) {
			const activeTodoIndex = activeSection.todos.findIndex(
				todo => todo.id === active.id
			)
			const overTodoIndex = overSection.todos.findIndex(
				todo => todo.id === over.id
			)
			console.log(activeTodoIndex, overTodoIndex)

			if (
				activeSection &&
				overSection &&
				activeSection.sectionId === overSection.sectionId
			) {
				const updatedTodos = [...activeSection.todos]
				const [movedTodo] = updatedTodos.splice(activeTodoIndex, 1)
				updatedTodos.splice(overTodoIndex, 0, movedTodo)
			}
		}
	}

	const handleSectionSettingsOpen = (sectionId: number) => {
		setSectionSettingsId(sectionId)
	}

	// ============================================= EFFECTS

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
		localStorage.setItem('doneTodos', JSON.stringify(doneTodos))
		localStorage.setItem('sections', JSON.stringify(sections))
		setOpenedMenuId(null)
		setEditingId(null)

		const interval = setInterval(checkDeadlines, 1000)
		return () => clearInterval(interval)
	}, [todos, doneTodos, sections])

	// ============================================ LOGS

	// const getSomeData = (str: string, num: number) => {
	// 	const slicedStr = str.split(',').reduce((acc, val, idx) => {
	// 		if (idx % 2 !== 0) {
	// 			acc.push(val.slice(1))
	// 		}
	// 		return acc
	// 	}, [])
	// 	console.log(slicedStr)
	// }

	// getSomeData('apple, green, vegetable, soap', 13)

	return (
		<div className='m-10 flex flex-col justify-center items-center relative'>
			{isDeadlineModalOpen && (
				<DeadlineModal
					setIsDeadlineModalOpen={setIsDeadlineModalOpen}
					setDeadline={setDeadline}
					handleSetTodoDeadline={handleSetTodoDeadline}
					deadline={deadline}
					editingId={editingId}
				/>
			)}
			{isAddSectionMenuOpen && (
				<AddSectionModal
					// input props
					classNameInput='bg-slate-100 hover:bg-slate-200 transition-all duration-200 rounded-md px-1 outline-none border border-gray-300'
					setter={setInputValue}
					onEnter={handleEnterPress}
					value={inputValue}
					// btn props
					addFunc={createNewSection}
					text='create new section'
					classNameBtn='border bg-slate-100 hover:bg-slate-200 transition-all duration-200 border-gray-300 rounded-md px-1'
					// modalProps
					setIsAddSectionMenuOpen={setIsAddSectionMenuOpen}
				/>
			)}
			{сhooseSectionOpen && (
				<ChooseSectionModal
					sections={sections}
					setChooseSectionOpen={setChooseSectionOpen}
					putTodoIntoSection={putTodoIntoSection}
				/>
			)}
			<div className='flex justify-between items-center flex-wrap w-1/2 gap-4 mb-5'>
				<Input
					classNameInput='bg-slate-100 hover:bg-slate-200 transition-all duration-200 rounded-md p-1 outline-none border border-gray-300'
					value={inputValue}
					setter={setInputValue}
					onEnter={handleEnterPress}
				/>
				<div className='flex items-center gap-4'>
					<Btn
						classNameBtn='border bg-slate-100 hover:bg-slate-200 transition-all duration-200 border-gray-300 rounded-md p-1'
						text={'add new todo'}
						addFunc={handleAddToDo}
					/>
					<div
						className='relative'
						onMouseEnter={() => setIsDropdownOpen(true)}
						onMouseLeave={() => setIsDropdownOpen(false)}
					>
						<FaPlus className='hover:rotate-45 transition-all ease-out duration-500 cursor-pointer' />
						{isDropdownOpen && (
							<DropdownMenu setIsAddSectionMenuOpen={setIsAddSectionMenuOpen} />
						)}
					</div>
				</div>
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
									editedTodoValue={editedTodoValue}
									handleSetText={handleSetText}
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
												editingId={editingId}
												openDeadlineModal={openDeadlineModal}
												sections={sections}
												setChooseSectionOpen={setChooseSectionOpen}
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
			{sections.length > 0 && (
				<DndContext
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
				>
					<div className='grid grid-flow-col grid-cols-3 gap-2 w-1/2 text-center'>
						{sections.map(section => {
							return (
								<DropableCol
									key={section.sectionId}
									section={section}
									handleSectionSettingsOpen={handleSectionSettingsOpen}
									sectionSettingsId={sectionSettingsId}
								/>
							)
						})}
					</div>
				</DndContext>
			)}
		</div>
	)
}

export default App
