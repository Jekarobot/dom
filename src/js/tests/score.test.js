import { updateScore } from "../modules/score.js";

test("updateScore should update clickCounterElement text content", () => {
  const clickCounterElement = document.createElement("div");
  clickCounterElement.classList.add("click-counter");
  document.body.appendChild(clickCounterElement);

  updateScore(10);

  expect(document.querySelector(".click-counter").textContent).toBe("10");
});
