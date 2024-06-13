import Game from "./app.js";

jest.mock("../img/goblin.png", () => "mocked-goblin.png");

describe("Goblin Game", () => {
  let game;

  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <div class="game-field"></div>
      <div class="click-counter"></div>
    `;
    game = new Game();
    game.createGameField(); // Явно вызываем создание игрового поля
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("should place a goblin in a random cell", () => {
    game.placeGoblin();
    const goblins = document.querySelectorAll(".goblin");
    expect(goblins.length).toBe(1);
    expect(goblins[0].src).toContain("mocked-goblin.png");
  });

  test("should remove goblin after 1 second", () => {
    game.placeGoblin();
    jest.advanceTimersByTime(1000);
    const goblins = document.querySelectorAll(".goblin");
    expect(goblins.length).toBe(0);
  });

  test("should increase click counter when goblin is clicked", () => {
    game.placeGoblin();
    const goblin = document.querySelector(".goblin");
    const clickCounter = document.querySelector(".click-counter");

    goblin.click();
    expect(clickCounter.textContent).toBe("1");
  });

  test("start should call placeGoblin every second", () => {
    jest.spyOn(game, "placeGoblin");
    game.start();
    expect(game.placeGoblin).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(game.placeGoblin).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(game.placeGoblin).toHaveBeenCalledTimes(2);
  });

  test("stop should stop placing goblins", () => {
    jest.spyOn(game, "placeGoblin");
    game.start();
    jest.advanceTimersByTime(2000);
    game.stop();
    const callCount = game.placeGoblin.mock.calls.length;

    jest.advanceTimersByTime(2000);
    expect(game.placeGoblin).toHaveBeenCalledTimes(callCount);
  });
});
