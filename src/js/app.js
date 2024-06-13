import goblin from "../img/goblin.png";

class Game {
  constructor() {
    this.clickCounter = 0;
    this.lastPlacedCell = null;
    this.intervalId = null;
  }

  createGameField() {
    const container = document.querySelector(".game-field");
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
        const clickCounterElement = document.querySelector(".click-counter");
        clickCounterElement.textContent = this.clickCounter;
      });

      setTimeout(() => {
        png.remove();
      }, 1000);
    }
  }

  start() {
    this.intervalId = setInterval(() => this.placeGoblin(), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.createGameField(); // Явно вызываем создание игрового поля
  const startButton = document.querySelector(".start");
  const stopButton = document.querySelector(".stop");

  startButton.addEventListener("click", () => game.start());
  stopButton.addEventListener("click", () => game.stop());
});

export default Game;
