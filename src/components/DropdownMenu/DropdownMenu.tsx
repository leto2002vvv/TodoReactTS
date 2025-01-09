import React, { useState } from 'react'
import { MdHelpOutline } from 'react-icons/md'
import { DropdownMenuProps } from '../../types/types'

const DropdownMenu: React.FC<DropdownMenuProps> = ({
	setIsAddSectionMenuOpen,
}) => {
	const [isHelpHovered, setIsHelperHovered] = useState<boolean>(false)

	return (
		<div className='absolute -bottom-3 -right-48 w-48 bg-slate-100 p-1 rounded-xl flex flex-col items-start gap-1 pl-3'>
			<div className='flex w-full justify-between items-center relative'>
				<button
					className='flex gap-1 items-center border-b hover:translate-x-1 hover:border-b-slate-300 transition-all duration-200'
					onClick={() => setIsAddSectionMenuOpen(true)}
				>
					add section
				</button>
				<div className='absolute'></div>
				<MdHelpOutline
					className='cursor-pointer'
					onMouseEnter={() => {
						setIsHelperHovered(true)
					}}
					onMouseLeave={() => {
						setIsHelperHovered(false)
					}}
				/>
				{isHelpHovered && (
					<p className='absolute -bottom-60 bg-slate-100 rounded-xl p-1'>
						<b>what is it for?</b> <br />
						here you can create a section, for example "Work" or "Other", so
						that later you can drag your todos into the created sections
					</p>
				)}
			</div>
		</div>
	)
}

export default DropdownMenu
