import { Generation } from "../models";
import { Canvas } from "./Canvas";
import { cell } from "./Cell";

class World {
  element: Canvas;
  size: Record<string, number>;
  nativityChance: number;
  generation: Generation;

  constructor(
    element: HTMLCanvasElement,
    size: Record<string, number>,
    nativityChance: number
  ) {
    this.element = new Canvas(element, size);
    this.size = size;
    this.nativityChance = nativityChance;
    this.generation = new Array();
  }

  private initializeGeneration(): void {
    for (let iteration = 0; iteration < this.size.height; iteration++) {
      this.generation.push(new Array(this.size.width));
    }
  }

  private populateGeneration(): void {
    for (let columnIndex = 0; columnIndex < this.size.height; columnIndex++) {
      for (let rowIndex = 0; rowIndex < this.size.width; rowIndex++) {
        const cellState = Math.random() < this.nativityChance ? 1 : 0;
        this.generation[columnIndex][rowIndex] = cellState;
      }
    }
  }

  private getNextGeneration(): Generation {
    const nextGeneration = [...this.generation];

    for (let columnIndex = 0; columnIndex < this.size.height; columnIndex++) {
      for (let rowIndex = 0; rowIndex < this.size.width; rowIndex++) {
        const cellCoordinate = { y: columnIndex, x: rowIndex };
        const cellState = cell.getNextEvolutionState(
          this.generation,
          cellCoordinate
        );
        nextGeneration[columnIndex][rowIndex] = cellState;
      }
    }

    return nextGeneration;
  }

  public initialize(): void {
    this.initializeGeneration();
    this.populateGeneration();
    this.element.drawWorld(this.generation);
  }

  public async evoluteWorld(): Promise<void> {
    const nextGeneration = await this.getNextGeneration();
    this.generation = nextGeneration;
    this.element.drawWorld(this.generation);
  }
}

export { World };
