import goblin from "../../img/goblin.png";
import { updateScore } from "./score.js";
import { registerMiss, setGameInstance } from "./missTracker.js";

class Game {
  constructor() {
    this.clickCounter = 0;
    this.missCounter = 0;
    this.lastPlacedCell = null;
    this.intervalId = null;
    setGameInstance(this);
  }

  createGameField() {
    const container = document.querySelector(".game-field");
    container.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
      }
      container.appendChild(row);
    }
  }

  placeGoblin() {
    const cells = document.querySelectorAll(".cell");
    const randomIndex = Math.floor(Math.random() * cells.length);
    const pngCell = cells[randomIndex];

    if (pngCell && pngCell !== this.lastPlacedCell) {
      this.lastPlacedCell = pngCell;
      const png = document.createElement("img");
      png.src = goblin;
      png.alt = "Goblin";
      png.classList.add("goblin");
      pngCell.appendChild(png);

      png.addEventListener("click", () => {
        png.remove();

        this.clickCounter++;
        updateScore(this.clickCounter);
      });

      setTimeout(() => {
        if (png.parentElement) {
          png.remove();
          registerMiss();
        }
      }, 1000);
    }
  }

  start() {
    this.reset(); // Сброс состояния перед началом
    this.createGameField();
    this.intervalId = setInterval(() => this.placeGoblin(), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    this.clickCounter = 0;
    this.missCounter = 0;
    updateScore(this.clickCounter);
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.lastPlacedCell = null;
  }
}

export default Game;
