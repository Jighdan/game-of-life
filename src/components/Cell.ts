import { Generation } from "../model/generation";

const cell = {
  isCellIndexWithinBounds(worldSize: number, cellIndex: number): boolean {
    return cellIndex >= 0 && cellIndex < worldSize;
  },

  getAmountOfNeighbors(generation: Generation, cellIndex: number): number {
    const neighborhoodOffsets = [-8, 8, -1, 1, -7, 7, -9, 9];
    let aliveNeighbors = 0;

    neighborhoodOffsets.forEach((offset) => {
      const neighborCell = generation[cellIndex + offset];
      if (neighborCell === 1) {
        aliveNeighbors += 1;
      }
    });

    return aliveNeighbors;
  },

  getNextEvolutionState(generation: Generation, cellIndex: number): 1 | 0 {
    const numberOfNeighbors = this.getAmountOfNeighbors(generation, cellIndex);

    const isCellAlive = generation[cellIndex] === 1;
    const isNumberOfNeighborsTwoOrThree =
      numberOfNeighbors === 2 || numberOfNeighbors === 3;
    const isNumberOfNeighborsThree = numberOfNeighbors === 3;

    if (isCellAlive && isNumberOfNeighborsTwoOrThree) {
      return 1;
    }

    if (!isCellAlive && isNumberOfNeighborsThree) {
      return 1;
    }

    return 0;
  },

  render(): HTMLElement {
    const element = document.createElement("div");
    element.classList.add("cell");

    return element;
  },
};

export { cell };
