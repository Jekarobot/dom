import goblin from "../img/goblin.png";

class Game {
  constructor() {
    this.clickCounter = 0;
    this.lastPlacedCell = null;
    this.intervalId = null;
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

const game = new Game();

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".start");
  const stopButton = document.querySelector(".stop");
  const game = new Game();

  startButton.addEventListener("click", () => game.start());
  stopButton.addEventListener("click", () => game.stop());
});

export default game;
