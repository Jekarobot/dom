let missCounter = 0;
const maxMisses = 5;
let gameInstance = null;

export function setGameInstance(game) {
  gameInstance = game;
}

export function setMissCounter(value) {
  missCounter = value;
}

export function registerMiss() {
  if (missCounter >= maxMisses) {
    return;
  }

  missCounter++;
  if (missCounter >= maxMisses) {
    gameInstance.stop();
    showDefeatScreen(gameInstance.clickCounter);
  }
}

export function showDefeatScreen(score) {
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

export { missCounter, gameInstance };
