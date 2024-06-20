import Game from "./modules/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.createGameField();
  const startButton = document.querySelector(".start");
  const stopButton = document.querySelector(".stop");

  startButton.addEventListener("click", () => game.start());
  stopButton.addEventListener("click", () => game.stop());
});
