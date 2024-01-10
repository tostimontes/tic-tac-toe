// 3 objects that fit all logic: 1. Players, 2. Gameboard, 3. Game

// FACTORIES -> players
// Wrap factories in IIFEs, for single instance objects -> gameboard, displayController

// Separate STATE logic from UI controls

// Create AI for player2

// Create console game AND THEN create an object that handles UI display

// LOGIC: each player has the ability to change the empty variables of the gameboard, which get assigned either X or O. After each round is played, the game checks if there's a winner, or whether the game is doomed to be a tie. After each W/L/T, the game should update the scoreboard, which should be part of the game logic and reset the gameboard variables. Score could also be first a players private variable which reflects in the game. First for the console game just console.log everything

function gameLogic() {
  return {
    rounds: 0,
    resetScoreboard: function () {},
    resetGameboard: function (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          arr[i][j] = "";
        }
      }
    },
  };
}

function setGameboard() {
  return [
    [, ,],
    [, ,],
    [, ,],
  ];
}

function createPlayer(name, markerSelector) {
  return {
    name: name,
    marker: markerSelector ? "X" : "O",
    score: 0,
    markTile: function (row, column) {
      gameboard[row][column] === undefined
        ? (gameboard[row][column] = this.marker)
        : null;
    },
    winRound: function () {
      console.log(`${this.name} won the round!`);
      ++this.score;
    },
  };
}
// PLAYGROUND
const gameboard = setGameboard();
const aitor = createPlayer("Aitor", true);
const matxin = createPlayer("Matxin", false);