import { Generation } from "../model/generation";
import { cell } from "./Cell";

class World {
  element: HTMLElement;
  size: number;
  generation: Generation;

  constructor(element: HTMLElement, size: number) {
    this.element = element;
    this.size = size;
    this.generation = new Array(this.size);
  }

  private populateGeneration(): void {
    for (let spaceIndex = 0; spaceIndex < this.size; spaceIndex++) {
      const cellState = Math.random() < 0.5 ? 1 : 0;
      this.generation[spaceIndex] = cellState;
    }
  }

  private renderGeneration(): void {
    const cellElements: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      "div.cell"
    );
    for (let spaceIndex = 0; spaceIndex < this.size; spaceIndex++) {
      const cellState = this.generation[spaceIndex];
      const cellTypeState = cellState === 1 ? "alive" : "dead";

      cellElements[spaceIndex].dataset.state = cellTypeState;
    }
  }

  private getNextGeneration(): Generation {
    const nextGeneration = new Array(this.size);

    for (let cellIndex = 0; cellIndex < this.size; cellIndex++) {
      const cellState = cell.getNextEvolutionState(this.generation, cellIndex);

      nextGeneration[cellIndex] = cellState;
    }

    return nextGeneration;
  }

  public initializeWorld(): void {
    this.populateGeneration();
    const cells = this.generation.map(() => cell.render());
    this.element.append(...cells);
    this.renderGeneration();
  }

  public evoluteWorld(): void {
    const nextGeneration = this.getNextGeneration();
    this.generation = nextGeneration;

    this.renderGeneration();
  }
}

export { World };
