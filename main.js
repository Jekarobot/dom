/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/js/app.js

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
      png.src = goblin_namespaceObject;
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
/* harmony default export */ const app = ((/* unused pure expression or super */ null && (Game)));
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;