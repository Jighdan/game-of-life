import { Generation, Coordinate } from "../models";

const cell = {
  isIndexWithinBounds(worldSize: number, index: number): boolean {
    return index >= 0 && index < worldSize;
  },

  getAmountOfNeighbors(generation: Generation, cellIndex: Coordinate): number {
    const neighbors: Record<string, Coordinate> = {
      north: { y: cellIndex.y - 1, x: cellIndex.x },
      south: { y: cellIndex.y + 1, x: cellIndex.x },
      west: { y: cellIndex.y, x: cellIndex.x - 1 },
      east: { y: cellIndex.y, x: cellIndex.x + 1 },
      southEast: { y: cellIndex.y + 1, x: cellIndex.x + 1 },
      northWest: { y: cellIndex.y - 1, x: cellIndex.x - 1 },
      southWest: { y: cellIndex.y + 1, x: cellIndex.x - 1 },
      northEast: { y: cellIndex.y - 1, x: cellIndex.x + 1 },
    };

    let amountOfLivingNeighbors = 0;

    Object.keys(neighbors).forEach((neighborCoordinateKey) => {
      const neighbor = neighbors[neighborCoordinateKey];
      const isNeighborWithinBounds =
        this.isIndexWithinBounds(generation.length, neighbor.y) &&
        this.isIndexWithinBounds(generation.length, neighbor.x);

      if (isNeighborWithinBounds) {
        const neighborState = generation[neighbor.y][neighbor.x];
        if (neighborState === 1) {
          amountOfLivingNeighbors++;
        }
      }
    });

    return amountOfLivingNeighbors;
  },

  getNextEvolutionState(
    generation: Generation,
    cellCoordinate: Coordinate
  ): 1 | 0 {
    const numberOfNeighbors = this.getAmountOfNeighbors(
      generation,
      cellCoordinate
    );

    const isCellAlive = generation[cellCoordinate.y][cellCoordinate.x] === 1;
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
