import { World } from "./components/World";

window.addEventListener("DOMContentLoaded", () => {
  const worldElement = document.getElementById("root");

  // Determine the world size, this value will be squared
  const worldSize = 30;
  // Nativity chance for the initial generation
  const nativityChance = 0.2;
  // Timeout for each generation to pass
  const intervalTimeout = 0_500;

  const instanceOfWorld = new World(worldElement, worldSize, nativityChance);

  instanceOfWorld.initializeWorld();

  window.setInterval(() => {
    instanceOfWorld.evoluteWorld();
  }, intervalTimeout);
});
