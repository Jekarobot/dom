import {
  setGameInstance,
  registerMiss,
  setMissCounter,
  gameInstance,
  missCounter,
  showDefeatScreen,
} from "../modules/missTracker.js";

let mockGame;
let mockStop;
let mockStart;

beforeEach(() => {
  setGameInstance(null);
  setMissCounter(0);
  mockStop = jest.fn();
  mockStart = jest.fn();
  mockGame = { stop: mockStop, start: mockStart, clickCounter: 10 };
  setGameInstance(mockGame);
  document.body.innerHTML = "";
});

// Тесты для setGameInstance
test("setGameInstance должен устанавливать gameInstance", () => {
  expect(gameInstance).toBe(mockGame);
});

// Тесты для registerMiss
test("registerMiss должен увеличивать missCounter", () => {
  registerMiss();
  expect(missCounter).toBe(1);
});

test("registerMiss должен вызывать stop игры после пяти промахов", () => {
  for (let i = 0; i < 5; i++) {
    registerMiss();
  }
  expect(mockStop).toHaveBeenCalled();
  expect(document.querySelector(".defeat-screen")).not.toBeNull();
});

test("registerMiss не должен увеличивать missCounter после достижения maxMisses", () => {
  for (let i = 0; i < 5; i++) {
    registerMiss();
  }
  const currentMissCounter = missCounter;
  registerMiss();
  expect(missCounter).toBe(currentMissCounter);
});

// Тест для showDefeatScreen
test("showDefeatScreen должен показывать экран поражения с правильным счетом", () => {
  showDefeatScreen(10);
  const defeatScreen = document.querySelector(".defeat-screen");
  expect(defeatScreen).not.toBeNull();
  expect(defeatScreen.querySelector(".defeat-message").textContent).toContain(
    "Score: 10",
  );
});

// Тест для кнопки Retry
test("Нажатие на кнопку Retry должно удалять defeat-screen и перезапускать игру", () => {
  showDefeatScreen(10);
  const retryButton = document.querySelector(".retry-button");
  retryButton.click();
  expect(document.querySelector(".defeat-screen")).toBeNull();
  expect(mockStart).toHaveBeenCalled();
  expect(missCounter).toBe(0);
});

// Тест для предотвращения повторного появления defeat-screen
test("showDefeatScreen не должен создавать новый экран, если он уже существует", () => {
  showDefeatScreen(10);
  const initialScreen = document.querySelector(".defeat-screen");
  showDefeatScreen(20);
  const newScreen = document.querySelector(".defeat-screen");
  expect(newScreen).toBe(initialScreen);
  expect(newScreen.querySelector(".defeat-message").textContent).toContain(
    "Score: 10",
  );
});
