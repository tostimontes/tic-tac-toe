function createPlayer(name, marker) {
  return {
    name,
    marker,
    score: 0,
  };
}

const gameboard = (function () {
  let grid = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
  function setMark(marker, row, col) {
    if (grid[row][col] !== undefined) {
      return;
    } else {
      grid[row][col] = marker;
    }
  }
  function resetGrid() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        grid[row][col] = undefined;
      }
    }
  }
  return {
    grid,
    setMark,
    resetGrid,
  };
})();

const gameLogic = (function (gameboard) {
  const player1 = createPlayer("Aitor", "X");
  console.log(player1);
  const player2 = createPlayer("Matxin", "O");
  console.log(player2);
  let round = 1;
  let player1turn = true;
  let currentPlayer;
  let newRound = false;
  function getGameState() {
    return {
      round,
      player1turn,
      currentPlayer,
    };
  }
  function turnDisplay() {
    player1turn
      ? console.log(`${player1.name}, it's your turn`)
      : console.log(`${player2.name}, it's your turn`);
  }
  function switchPlayer() {
    if (newRound) {
      newRound = false;
      player1turn ? (currentPlayer = player1) : (currentPlayer = player2);
      return;
    } else {
      player1turn = !player1turn;
      player1turn ? (currentPlayer = player1) : (currentPlayer = player2);
    }
  }
  function checkWin(player) {
    const arr = gameboard.grid;
    const diagonal1 = [arr[0][0], arr[1][1], arr[2][2]];
    const diagonal2 = [arr[2][0], arr[1][1], arr[0][2]];
    const column0 = [arr[0][0], arr[1][0], arr[2][0]];
    const column1 = [arr[0][1], arr[1][1], arr[2][1]];
    const column2 = [arr[0][2], arr[1][2], arr[2][2]];
    if (
      (arr[0][0] !== undefined && arr[0].every((tile) => tile === arr[0][0])) ||
      (arr[1][0] !== undefined && arr[1].every((tile) => tile === arr[1][0])) ||
      (arr[2][0] !== undefined && arr[2].every((tile) => tile === arr[2][0])) ||
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
      gameboard.resetGrid(arr);
      round++;
      newRound = true;
      player.score++;
      round % 2 === 0 ? (player1turn = false) : (player1turn = true);
    } else if (arr.every((row) => row.every((tile) => tile !== undefined))) {
      console.log("It's a tie!");
      gameboard.resetGrid(arr);
      round++;
      newRound = true;
      round % 2 === 0 ? (player1turn = false) : (player1turn = true);
    }
  }
  function initGame() {
    console.log("START!");
    turnDisplay();
    currentPlayer = player1;
  }
  function playTurn(row, col) {
    if (gameboard.grid[row][col] !== undefined) {
      console.log("Choose another cell");
      return;
    } else {
      gameboard.setMark(currentPlayer.marker, row, col);
      checkWin(currentPlayer);
      switchPlayer();
      turnDisplay();
    //   updateUI()
    }
    console.log(gameboard.grid);
  }

  return {
    player1,
    player2,
    round,
    player1turn,
    currentPlayer,
    initGame,
    playTurn,
    switchPlayer,
    getGameState,
  };
})(gameboard);