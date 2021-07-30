const reflectMatrix = (matrix) => {
	const heights = []
	for (let col = 0; col < matrix[0].length; col++) {
		let sum = 0
		for (let row = 0; row < matrix.length; row++) {
			if (matrix[row][col].color === 'black') sum++
		}
		heights.push(sum)
	}
	return heights
}

const findMaxArea = (heights) => {
	const instructions = []

	let max = 0
	let start = 0
	let end = heights.length - 1

	while (start !== end) {
		const minHeight = Math.min(heights[start], heights[end])
		const area = minHeight * (end - start)
		max = Math.max(max, area)
		if (area !== 0)
			instructions.push({
				leftBound: start,
				rightBound: end,
				currentWater: area,
				maxArea: max,
				height: minHeight,
			})
		heights[start] > heights[end] ? end-- : start++
	}

	return instructions
}

const solveMaxArea = (matrix) => {
	const heights = reflectMatrix(matrix)
	return findMaxArea(heights)
}

export default solveMaxArea
