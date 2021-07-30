import React from 'react'

const nodeStyle = (color) => {
	const style = {
		position: 'relative',
		width: '2em',
		height: '2em',
		border: 'solid 1px rgba(0,0,0,0.5)',
		backgroundColor: color === 'white' ? 'rgba(230,230,230,1)' : 'rgb(50,50,50)',
	}

	return style
}

const hoverStyle = () => ({
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0,0,0,0.4)',
})

const waterStyle = () => ({
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0,0,255,0.3)',
})

const arrowStyle = () => ({
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	backgroundColor: 'rgb(246, 170, 28)',
	borderRadius: '50%',
})

const Node = (props) => {
	return (
		<div
			style={nodeStyle(props.color)}
			onMouseEnter={() => props.onMouseEnter()}
			onClick={() => props.onClick()}
			onDoubleClick={() => props.onDoubleClick()}
		>
			{props.hover ? <div style={hoverStyle()}> </div> : null}
			{props.water ? <div style={waterStyle()}> </div> : null}
			{props.arrow ? <div style={arrowStyle()}> </div> : null}
		</div>
	)
}

export default Node
