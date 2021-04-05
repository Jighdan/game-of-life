import { Generation, Coordinate } from "../models";

class Canvas {
  size: Record<string, number>;
  stateColor: Record<string, Array<number>>;
  context: CanvasRenderingContext2D;
  imageData: ImageData;

  constructor(element: HTMLCanvasElement, size: Record<string, number>) {
    element.setAttribute("height", `${size.height}`);
    element.setAttribute("width", `${size.width}`);

    this.size = size;
    this.stateColor = {
      alive: [252, 252, 253, 1],
      dead: [0, 0, 0, 0],
    };
    this.context = element.getContext("2d");
    this.imageData = this.context.createImageData(
      this.size.width,
      this.size.height
    );
  }

  private drawPixel(pixelIndex: number, state: "alive" | "dead"): void {
    this.imageData.data[pixelIndex] = this.stateColor[state][0];
    this.imageData.data[pixelIndex - 1] = this.stateColor[state][1];
    this.imageData.data[pixelIndex - 2] = this.stateColor[state][2];
    this.imageData.data[pixelIndex - 3] = this.stateColor[state][3];
  }

  public drawWorld(generation: Generation): void {
    for (let columnIndex = 0; columnIndex < this.size.height; columnIndex++) {
      for (let rowIndex = 0; rowIndex < this.size.width; rowIndex++) {
        const pixelIndex = (columnIndex * this.size.width + rowIndex) * 4;
        const cell = generation[columnIndex][rowIndex];
        const state = cell === 1 ? "alive" : "dead";
        this.drawPixel(pixelIndex, state);
      }
    }

    this.context.putImageData(this.imageData, 0, 0);
  }
}

export { Canvas };
