import React, { useState } from 'react'

const containerStyle = () => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})
const textStyle = () => ({
	margin: '0em 1em 0em 0em',
	alignSelf: 'center',
})

const buttonStyle = (hover) => ({
	padding: '0.25em 1em',
	margin: '1em',
	fontSize: '1em',
	borderRadius: '1em',
	border: 'none',
	boxShadow: hover ? '0px 0px 15px 0px rgba(0,0,0,0.25)' : '0px 0px 15px 0px rgba(0,0,0,0.1)',
	cursor: 'pointer',
})

const Menu = (props) => {
	const [solveButtonHover, setSolveButtonHover] = useState(true)
	const [clearButtonHover, setClearButtonHover] = useState(false)
	return (
		<div style={containerStyle()}>
			<h1 style={textStyle()}>Max Water</h1>
			<h2 style={textStyle()}>{props.maxWater}</h2>

			<h1 style={textStyle()}>Current Water</h1>
			<h2 style={textStyle()}>{props.currentWater}</h2>

			<div>
				<button
					style={buttonStyle(solveButtonHover)}
					onMouseEnter={() => setSolveButtonHover(true)}
					onMouseLeave={() => setSolveButtonHover(false)}
					onClick={() => props.onSolve()}
				>
					Solve
				</button>
				<button
					style={buttonStyle(clearButtonHover)}
					onMouseEnter={() => setClearButtonHover(true)}
					onMouseLeave={() => setClearButtonHover(false)}
					onClick={() => props.onClear()}
				>
					Clear
				</button>
			</div>
		</div>
	)
}

export default Menu
