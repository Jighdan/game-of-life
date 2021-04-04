# Conway's Game of Life

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

## Solution
	Storing generations of cells ->
		Array<1 | 0>

	Representing cells state -> 
		1 -> Cell is alive
		0 -> Cell is dead
	
	Representing an specific cell neighbors ->
		// Since we are using an one-dimensional array we could have
		// a set with the offsets representing the computation
		// of an specific index neighbors
		{ -8, +8, -1, +1, -7, +7, -9, +9 }

		// Filter the mapped offsets that are out of bounds of the "world",
		// and lastly, getting the sum of alive cells in the current
		// generation based on the offset indexes 

	Evolution Logic ->
		@ if cell is alive and cell's number of neighbors
			is 2 or 3 -> the cell remains alive

		@ if cell is dead and cell's number of neighbors
			is 3 -> cell becomes alive
			
		@ else cell becomes dead
	
	Running a generation ->
		Iterate over the current generation of cells indexes and store
		as new generation ->
			Get the amount of cell neighbors
			Do evolution logic

		Remove current generation add new generation

## Resources

[Checkout the game rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
