import { World } from "./components/World";

window.addEventListener("DOMContentLoaded", () => {
  const intervalTimeout = 1_500;
  const worldElement = document.getElementById("root");
  const worldSize = 25 * 25;
  const instanceOfWorld = new World(worldElement, worldSize);

  instanceOfWorld.initializeWorld();

  window.setInterval(() => {
    instanceOfWorld.evoluteWorld();
  }, intervalTimeout);
});
