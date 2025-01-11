import React from 'react'
import { ColorPaletteProps } from '../../types/types'

const ColorPalette: React.FC<ColorPaletteProps> = ({
	setSelectedColor,
	color,
}) => {
	return (
		<button
			style={{ backgroundColor: color }}
			className='w-4 h-4 rounded-full border'
			key={color}
			onClick={() => setSelectedColor(color)}
		></button>
	)
}

export default ColorPalette
