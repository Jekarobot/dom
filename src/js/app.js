import goblin from "../img/goblin.png";

let clickCounter = 0;
function placeGoblin() {
  const cells = document.querySelectorAll(".cell");
  const randomIndex = Math.floor(Math.random() * cells.length);
  const gifCell = cells[randomIndex];

  if (gifCell) {
    const gif = document.createElement("img");
    gif.src = goblin;
    gif.alt = "Goblin";
    gifCell.appendChild(gif);

    gif.addEventListener("click", () => {
      gif.remove();

      clickCounter++;
      const clickCounterElement = document.querySelector(".click-counter");
      clickCounterElement.textContent = clickCounter;
    });

    setTimeout(() => {
      gif.remove();
    }, 1000);
  }
}

let intervalId = null;

function start() {
  intervalId = setInterval(placeGoblin, 1000);
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
}

window.start = start;
window.stop = stop;
