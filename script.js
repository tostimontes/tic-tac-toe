// TODO: Create AI for player2

const game = (function () {
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
    },
    checkWin: function(player) {
      const arr = gameboard.grid;
      const diagonal1 = [arr[0][0], arr[1][1], arr[2][2]];
      const diagonal2 = [arr[2][0], arr[1][1], arr[0][2]];
      const column0 = [arr[0][0], arr[1][0], arr[2][0]];
      const column1 = [arr[0][1], arr[1][1], arr[2][1]];
      const column2 = [arr[0][2], arr[1][2], arr[2][2]];
      if (
        arr[0][0] !== undefined &&
          arr[0].every((tile) => tile === arr[0][0]) ||
        arr[1][0] !== undefined &&
          arr[1].every((tile) => tile === arr[1][0]) ||
        arr[2][0] !== undefined &&
          arr[2].every((tile) => tile === arr[2][0]) ||
        column0[0] !== undefined && column0.every((tile) => tile === column0[0]) ||
        column1[0] !== undefined && column1.every((tile) => tile === column1[0]) ||
        column2[0] !== undefined && column2.every((tile) => tile === column2[0]) ||
        diagonal1[0] !== undefined && diagonal1.every((tile) => tile === diagonal1[0]) ||
        diagonal2[0] !== undefined && diagonal2.every((tile) => tile === diagonal2[0])
      ) {
        console.log(`${player.name} is the winner!`);
        this.resetGameboard(arr);
        this.round++;
        player.score++;
      } else if (arr.every(row => row.every(tile => tile !== undefined))) {
        console.log("It's a tie!");
      }
    }
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
        game.checkWin(this);
    },
  };
}

function askForPlayerInfo() {
  const name = prompt("Enter your name");
  const marker = prompt("Enter your marker: X or O");
  const markerSelector = marker === "X" ? "X": "O";
  return createPlayer(name, markerSelector);
}

// PLAYGROUND
// let player1 = askForPlayerInfo();
// let player2 = askForPlayerInfo();
let player1 = createPlayer("Aitor", "X");
let player2 = createPlayer("Matxin", "O");
console.log(player1);
console.log(player2);
player1.markTile(0,0);
player2.markTile(0, 1);
player1.markTile(0, 2);
player2.markTile(1, 0);
player1.markTile(2, 0);
player2.markTile(2, 2);
player1.markTile(1, 2);
player2.markTile(1, 1);
player1.markTile(2,1)
console.log(gameboard.grid);