// TODO: Create AI for player2

const gameLogic = (function () {
  let player1turn = true;
  return {
    round: 1,
    resetScoreboard: function () {
      this.round = 1;
    },
    resetGameboard: function (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          arr[i][j] = undefined;
        }
      }
      player1turn = true;
    },
    checkWin: function (player) {
      const arr = gameboard.grid;
      const diagonal1 = [arr[0][0], arr[1][1], arr[2][2]];
      const diagonal2 = [arr[2][0], arr[1][1], arr[0][2]];
      const column0 = [arr[0][0], arr[1][0], arr[2][0]];
      const column1 = [arr[0][1], arr[1][1], arr[2][1]];
      const column2 = [arr[0][2], arr[1][2], arr[2][2]];
      if (
        (arr[0][0] !== undefined &&
          arr[0].every((tile) => tile === arr[0][0])) ||
        (arr[1][0] !== undefined &&
          arr[1].every((tile) => tile === arr[1][0])) ||
        (arr[2][0] !== undefined &&
          arr[2].every((tile) => tile === arr[2][0])) ||
        (column0[0] !== undefined &&
          column0.every((tile) => tile === column0[0])) ||
        (column1[0] !== undefined &&
          column1.every((tile) => tile === column1[0])) ||
        (column2[0] !== undefined &&
          column2.every((tile) => tile === column2[0])) ||
        (diagonal1[0] !== undefined &&
          diagonal1.every((tile) => tile === diagonal1[0])) ||
        (diagonal2[0] !== undefined &&
          diagonal2.every((tile) => tile === diagonal2[0]))
      ) {
        console.log(`${player.name} is the winner!`);
        this.resetGameboard(arr);
        this.round++;
        player.score++;
      } else if (arr.every((row) => row.every((tile) => tile !== undefined))) {
        console.log("It's a tie!");
      } else {
        player1turn = !player1turn;
      }
    },
  };
})();

const gameboard = (function () {
  return {
    grid: [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ],
  };
})();

function createPlayer(name, markerSelector) {
  return {
    name: name,
    marker: markerSelector === "X" ? "X" : "O",
    score: 0,
    markTile: function (row, column) {
      gameboard.grid[row][column] === undefined
        ? (gameboard.grid[row][column] = this.marker)
        : null;
      gameLogic.checkWin(this);
    },
  };
}

function askForPlayerInfo() {
  const name = prompt("Enter your name");
  const marker = prompt("Enter your marker: X or O");
  const markerSelector = marker === "X" ? "X" : "O";
  return createPlayer(name, markerSelector);
}

// Title, scoreboard and round, grid, markers

const gameUI = (function UIsetter() {
  return {
    createDOMElement: function (type, attributes, text) {
      const element = document.createElement(type);

      for (const property in attributes) {
        element.setAttribute(property, attributes[property]);
      }

      element.textContent = text;

      return element;
    },
  };
})();

// const player1 = askForPlayerInfo();
// const player2 = askForPlayerInfo();
let player1 = createPlayer("Aitor", "X");
let player2 = createPlayer("Matxin", "O");

// Create dialog which prompts for name and marker (radio button)

// GAME STARTER DISPLAY
const body = document.querySelector("body");
const mainDiv = gameUI.createDOMElement("div", { class: "main" });
const gameTitle = gameUI.createDOMElement("h1", { id: "title" }, "TIC TAC TOE");
const scoreboard = gameUI.createDOMElement("div", { id: "scoreboard" });
const player1score = gameUI.createDOMElement(
  "div",
  { id: "player1score", class: "score_display" },
  player1.score
);
const player2score = gameUI.createDOMElement(
  "div",
  { id: "player2score", class: "score_display" },
  player2.score
);
const gameboardDisplay = gameUI.createDOMElement("div", {
  id: "gameboardDisplay",
});
const a1cell = gameUI.createDOMElement("div", { id: "a1", class: "grid_cell" });
const b1cell = gameUI.createDOMElement("div", { id: "b1", class: "grid_cell" });
const c1cell = gameUI.createDOMElement("div", { id: "c1", class: "grid_cell" });
const a2cell = gameUI.createDOMElement("div", { id: "a2", class: "grid_cell" });
const b2cell = gameUI.createDOMElement("div", { id: "b2", class: "grid_cell" });
const c2cell = gameUI.createDOMElement("div", { id: "c2", class: "grid_cell" });
const a3cell = gameUI.createDOMElement("div", { id: "a3", class: "grid_cell" });
const b3cell = gameUI.createDOMElement("div", { id: "b3", class: "grid_cell" });
const c3cell = gameUI.createDOMElement("div", { id: "c3", class: "grid_cell" });
const turnDisplay = gameUI.createDOMElement("div", { id: "turn_display" });
const playerDialog = gameUI.createDOMElement("dialog", { id: "player_dialog" });
const dialogForm = gameUI.createDOMElement("form");
const chooseName1 = gameUI.createDOMElement(
  "p",
  { id: "choose_name_1" },
  "Enter your name, player 1:"
);
const chooseName2 = gameUI.createDOMElement(
  "p",
  { id: "choose_name_2" },
  "Enter your name, player 2:"
);
const nameInput = gameUI.createDOMElement("input", { type: "text" });
const markerDiv = gameUI.createDOMElement(
  "div",
  { id: "marker_selection" }
);
const markerP = gameUI.createDOMElement("p", {},"Choose your marker: ")
const xOption = gameUI.createDOMElement("button", { id: "X", class: "marker_button" }, "X");
const oOption = gameUI.createDOMElement("button", { id: "O", class: "marker_button" }, "O");
const playButton = gameUI.createDOMElement("button", { id: "play_button", title: "Play!" });
playButton.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>';
markerDiv.append(xOption, oOption);
dialogForm.append(chooseName1, chooseName2, nameInput, markerP, markerDiv, playButton)
playerDialog.append(dialogForm);
scoreboard.append(player1score, player2score);
gameboardDisplay.append(
  a1cell,
  a2cell,
  a3cell,
  b1cell,
  b2cell,
  b3cell,
  c1cell,
  c2cell,
  c3cell
);

mainDiv.append(gameTitle, scoreboard, gameboardDisplay, turnDisplay);

body.append(playerDialog, mainDiv);

// GAME START
playerDialog.showModal();


// LISTENERS
