import React from 'react'
import Board from './components/Board/Board'
import './app.css'
const containerStyle = () => ({
	width: '100%',
	height: '100vh',
})
const App = () => {
	return (
		<div style={containerStyle()}>
			<Board row={12} col={25}></Board>
		</div>
	)
}

export default App
