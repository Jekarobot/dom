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

;// CONCATENATED MODULE: ./src/img/hammer.png
const hammer_namespaceObject = __webpack_require__.p + "img/hammer5f416476bd2eb0d40d11.png";
;// CONCATENATED MODULE: ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "img/goblin2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/js/modules/score.js
function updateScore(score) {
  const clickCounterElement = document.querySelector(".click-counter");
  clickCounterElement.textContent = score;
}
;// CONCATENATED MODULE: ./src/js/modules/missTracker.js
let missCounter = 0;
const maxMisses = 5;
let gameInstance = null;
function setGameInstance(game) {
  gameInstance = game;
}
function setMissCounter(value) {
  missCounter = value;
}
function registerMiss() {
  if (missCounter >= maxMisses) {
    return;
  }
  missCounter++;
  if (missCounter >= maxMisses) {
    gameInstance.stop();
    showDefeatScreen(gameInstance.clickCounter);
  }
}
function showDefeatScreen(score) {
  if (document.querySelector(".defeat-screen")) {
    return;
  }
  const defeatScreen = document.createElement("div");
  defeatScreen.className = "defeat-screen";
  defeatScreen.innerHTML = `
    <div class="defeat-message">
      <p>Game Over!</p>
      <p>Score: ${score}</p>
      <button class="retry-button">Retry</button>
    </div>
  `;
  document.body.appendChild(defeatScreen);
  const retryButton = document.querySelector(".retry-button");
  retryButton.addEventListener("click", () => {
    missCounter = 0;
    defeatScreen.remove();
    gameInstance.start();
  });
}

;// CONCATENATED MODULE: ./src/js/modules/game.js



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
      png.src = goblin_namespaceObject;
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
/* harmony default export */ const modules_game = (Game);
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const game = new modules_game();
  game.createGameField();
  const startButton = document.querySelector(".start");
  const stopButton = document.querySelector(".stop");
  startButton.addEventListener("click", () => game.start());
  stopButton.addEventListener("click", () => game.stop());
});
;// CONCATENATED MODULE: ./src/index.js


document.querySelector(".game-field").style.cursor = `url(${hammer_namespaceObject}) 16 16, auto`;


// TODO: write your code in app.js
/******/ })()
;