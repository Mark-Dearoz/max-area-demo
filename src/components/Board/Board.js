import React, { useEffect, useState } from 'react'
import Grid from '../Board components/Grid/Grid'
import Menu from '../Board components/Menu/Menu'
import solveMaxArea from '../../algoritms/maxArea'
const containerStyle = () => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '3em 3em 0em 3em',
	width: '100%',
	height: '100%',
	borderRadius: '1em',
})

const Board = (props) => {
	const [maxWater, setMaxWater] = useState(0)
	const [currentWater, setCurrentWater] = useState(0)
	const [disabled, setDisabled] = useState(false)
	const [grid, setGrid] = useState([])

	useEffect(() => {
		const matrix = []
		for (let i = 0; i < props.row; i++) {
			const row = []
			for (let j = 0; j < props.col; j++)
				row.push({ color: 'white', hover: false, water: false, arrow: false })
			matrix.push(row)
		}

		setGrid(matrix)
	}, [props.row, props.col])

	const mouseEventHandler = (type, row, col) => {
		if (disabled) return
		const matrix = JSON.parse(JSON.stringify(grid))
		switch (type) {
			case 'enter':
				return setGrid(mouseEnter(matrix, row, col))
			case 'leave':
				return setGrid(mouseLeave(matrix))
			case 'click':
				mouseClick(matrix, row, col)
				clearWaterAndArrow(matrix)
				setGrid(matrix)
				break
			case 'doubleClick':
				mouseDoubleClick(matrix, col)
				clearWaterAndArrow(matrix)
				setGrid(matrix)
				break
			case 'clear':
				clear(matrix)
				setMaxWater(0)
				setCurrentWater(0)
				setGrid(matrix)
				break
			default:
				setGrid(matrix)
		}
	}

	const animate = () => {
		if (disabled) return
		const instructions = solveMaxArea(grid)
		if (instructions.length === 0) return

		let index = 0
		setDisabled(true)
		const animation = setInterval(() => {
			const instruction = instructions[index]
			const matrixCopy = JSON.parse(JSON.stringify(grid))

			matrixCopy[0][instruction.leftBound].arrow = true
			matrixCopy[0][instruction.rightBound].arrow = true

			fillWater(matrixCopy, instruction.leftBound, instruction.rightBound, instruction.height)

			setGrid(matrixCopy)
			setMaxWater(instruction.maxArea)
			setCurrentWater(instruction.currentWater)
			index++
			if (index === instructions.length) clearInterval(animation)
		}, 750)

		setTimeout(() => {
			setDisabled(false)
		}, 750 * (instructions.length + 1))
	}

	return (
		<div style={containerStyle()}>
			<Grid
				grid={grid}
				onMouseEnter={(row, col) => mouseEventHandler('enter', row, col)}
				onMouseLeave={() => mouseEventHandler('leave')}
				onClick={(row, col) => mouseEventHandler('click', row, col)}
				onDoubleClick={(col) => mouseEventHandler('doubleClick', 0, col)}
			></Grid>
			<Menu
				disabled={props.disabled}
				onClear={() => mouseEventHandler('clear')}
				onSolve={() => animate()}
				maxWater={maxWater}
				currentWater={currentWater}
			></Menu>
		</div>
	)
}

export default Board

function mouseEnter(matrix, row, col) {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (j !== col || (j === col && i < row)) matrix[i][j].hover = false
			else matrix[i][j].hover = true
		}
	}

	return matrix
}

function mouseLeave(matrix) {
	return matrix.map((rowArray) => rowArray.map((node) => ({ ...node, hover: false })))
}

function mouseClick(matrix, row, col) {
	for (let i = 0; i < row; i++) matrix[i][col].color = 'white'
	for (row; row < matrix.length; row++) matrix[row][col].color = 'black'
	return matrix
}

function mouseDoubleClick(matrix, col) {
	for (let row of matrix) row[col].color = 'white'
	return matrix
}

function clear(matrix) {
	for (let row of matrix) {
		for (let node of row) {
			node.color = 'white'
			node.hover = false
			node.water = false
			node.arrow = false
		}
	}
	return matrix
}

function fillWater(matrix, start, end, height) {
	for (start; start <= end; start++) {
		for (let row = matrix.length - height; row < matrix.length; row++) {
			matrix[row][start].water = true
		}
	}
}

function clearWaterAndArrow(matrix) {
	for (let row of matrix) {
		for (let node of row) {
			node.water = false
			node.arrow = false
		}
	}
}
