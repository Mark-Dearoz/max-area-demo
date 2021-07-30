import React from 'react'
import Node from './Grid components/Node'

const containerStyle = {
	border: 'solid 1px rgba(0,0,0,0.5)',
	backgroundColor: 'rgba(0,0,0,0.0)',
	width: 'fit-content',
	height: 'fit-content',
}

const rowStyle = {
	display: 'flex',
}

const Grid = (props) => {
	return (
		<div style={containerStyle} onMouseLeave={() => props.onMouseLeave()}>
			{props.grid.map((rowArray, row) => (
				<div key={row} style={rowStyle}>
					{rowArray.map((node, col) => (
						<Node
							key={(row, col)}
							color={node.color}
							hover={node.hover}
							water={node.water}
							arrow={node.arrow}
							onMouseEnter={() => props.onMouseEnter(row, col)}
							onClick={() => props.onClick(row, col)}
							onDoubleClick={() => props.onDoubleClick(col)}
						></Node>
					))}
				</div>
			))}
		</div>
	)
}

export default Grid
