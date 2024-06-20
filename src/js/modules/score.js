export function updateScore(score) {
  const clickCounterElement = document.querySelector(".click-counter");
  clickCounterElement.textContent = score;
}
