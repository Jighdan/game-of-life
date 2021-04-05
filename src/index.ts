import { World } from "./components/World";

window.addEventListener("DOMContentLoaded", () => {
  const worldElement = document.getElementById("root") as HTMLCanvasElement;

  // Determine the world size, this value will be squared
  const worldSize = { width: 400, height: 400 };
  // Nativity chance for the initial generation
  const nativityChance = 0.05;
  // Timeout for each generation to pass
  const intervalTimeout = 0_500;

  const instanceOfWorld = new World(worldElement, worldSize, nativityChance);

  instanceOfWorld.initialize();

  window.setInterval(() => {
    instanceOfWorld.evoluteWorld();
  }, intervalTimeout);
});
