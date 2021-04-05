import { Generation } from "../models";
import { cell } from "./Cell";

class World {
  element: HTMLElement;
  size: number;
  randomPopulationChance: number;
  generation: Generation;

  constructor(element: HTMLElement, size: number) {
    this.element = element;
    this.size = size;
    this.randomPopulationChance = 0.2;
    this.generation = new Array();

    const gridTemplate = `repeat(${this.size}, auto)`;
    this.element.style.gridTemplateColumns = gridTemplate;
    this.element.style.gridTemplateRows = gridTemplate;
  }

  private initializeGeneration(): void {
    for (let iteration = 0; iteration < this.size; iteration++) {
      this.generation.push(new Array(this.size));
    }
  }

  private populateGeneration(): void {
    for (let verticalAxis = 0; verticalAxis < this.size; verticalAxis++) {
      for (
        let horizontalAxis = 0;
        horizontalAxis < this.size;
        horizontalAxis++
      ) {
        const cellState = Math.random() < this.randomPopulationChance ? 1 : 0;
        this.generation[verticalAxis][horizontalAxis] = cellState;
      }
    }
  }

  private renderGeneration(): void {
    const cellElements: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      "div.cell"
    );
    for (let verticalAxis = 0; verticalAxis < this.size; verticalAxis++) {
      for (
        let horizontalAxis = 0;
        horizontalAxis < this.size;
        horizontalAxis++
      ) {
        const cellElementIndex = horizontalAxis * this.size + verticalAxis;
        const cellState = this.generation[verticalAxis][horizontalAxis];
        const cellTypeState = cellState === 1 ? "alive" : "dead";

        cellElements[cellElementIndex].dataset.state = cellTypeState;
      }
    }
  }

  private getNextGeneration(): Generation {
    const nextGeneration = [...this.generation];

    for (let verticalAxis = 0; verticalAxis < this.size; verticalAxis++) {
      for (
        let horizontalAxis = 0;
        horizontalAxis < this.size;
        horizontalAxis++
      ) {
        const cellState = cell.getNextEvolutionState(this.generation, {
          y: verticalAxis,
          x: horizontalAxis,
        });
        nextGeneration[verticalAxis][horizontalAxis] = cellState;
      }
    }

    return nextGeneration;
  }

  public initializeWorld(): void {
    this.initializeGeneration();
    this.populateGeneration();

    const flatGeneration = this.generation.flat(2);
    const renderedCells = flatGeneration.map(() => cell.render());
    console.log({ renderedCells });

    this.element.append(...renderedCells);
    this.renderGeneration();
  }

  public async evoluteWorld(): Promise<void> {
    const nextGeneration = await this.getNextGeneration();
    this.generation = nextGeneration;
    this.renderGeneration();
  }
}

export { World };
