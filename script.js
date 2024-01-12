// TODO: Create AI for player2
// GAME LOGIC
const gameboard = (function () {
  let grid = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
  return {
    grid,
  };
})();

const player = (function (gameboard) {
  function createPlayer(name, markerSelector) {
    return {
      name,
      marker: markerSelector === "X" ? "X" : "O",
      score: 0,
      markTile: function (row, column) {
        gameboard.grid[row][column] === undefined
          ? ((gameboard.grid[row][column] = this.marker),
            gameUI.updateGameboardUI(),
            gameLogic.checkWin(this))
          : null;
      },
    };
  }

  function setPlayer1(name, marker) {
    player1 = createPlayer(name, marker);
  }

  function setPlayer2(name, marker) {
    player2 = createPlayer(name, marker);
  }

  function getPlayer1() {
    return player1;
  }

  function getPlayer2() {
    return player2;
  }

  return {
    createPlayer,
    setPlayer1,
    setPlayer2,
    getPlayer1,
    getPlayer2,
  };
})(gameboard);

const gameLogic = (function () {
  let player1turn = true;
  let currentPlayer;
  return {
    round: 1,
    player1turn,
    currentPlayer,
    resetScoreboard: function () {
      this.round = 1;
      gameUI.updateGameboardUI();
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
        this.resetGameboard(arr);
        this.round++;
      } else {
        player1turn = !player1turn;
      }
    },
  };
})();

const gameUI = (function (gameboard, player, gameLogic) {
  function createDOMElement(type, attributes, text) {
    const element = document.createElement(type);

    for (const property in attributes) {
      element.setAttribute(property, attributes[property]);
    }

    element.textContent = text;

    return element;
  }
// TODO: resolve why no listener is being added, check all player.players to change them to the global player and check whether its marktile func works
  function cellClicked(row, col) {
    if (!player1 || !player2) {
      return;
    }
    gameLogic.player1turn
      ? player1.markTile(row, col)
      : player2.markTile(row, col);
  }

  function startGame() {
    const body = document.querySelector("body");
    const mainDiv = gameUI.createDOMElement("div", { class: "main" });
    const gameTitle = gameUI.createDOMElement(
      "h1",
      { id: "title" },
      "TIC TAC TOE"
    );
    const roundCounter = gameUI.createDOMElement("div", {
      id: "round_counter",
    });
    const scoreboard = gameUI.createDOMElement("div", { id: "scoreboard" });
    const player1score = gameUI.createDOMElement("div", {
      id: "player1score",
      class: "score_display",
    });
    const player2score = gameUI.createDOMElement("div", {
      id: "player2score",
      class: "score_display",
    });
    const gameboardDisplay = gameUI.createDOMElement("div", {
      id: "gameboardDisplay",
    });
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = gameUI.createDOMElement("div", {
          id: `row${row}col${col}`,
          class: "grid-cell",
        });
        cell.dataset.row = row;
        cell.dataset.col = col;
        gameboardDisplay.append(cell);
      }
    }
    const turnDisplay = gameUI.createDOMElement("div", {
      id: "turn_display",
    });
    const playerDialog = gameUI.createDOMElement("dialog", {
      id: "player_dialog",
    });
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
    chooseName1.setAttribute("required", "");
    chooseName2.setAttribute("required", "");
    const nameInput = gameUI.createDOMElement("input", {
      type: "text",
      id: "name_input",
    });
    const markerDiv = gameUI.createDOMElement("div", {
      id: "marker_selection",
    });
    const markerP = gameUI.createDOMElement("p", {}, "Choose your marker: ");
    function handleClick(e) {
      e.preventDefault();
      e.target.classList.add("selected_marker");
      e.target === xOption
        ? oOption.classList.remove("selected_marker")
        : xOption.classList.remove("selected_marker");
    }
    function disableMarker(e) {
      e.preventDefault();
      alert("Your marker is already chosen");
    }
    const xOption = gameUI.createDOMElement(
      "button",
      { id: "X", class: "marker_button" },
      "X"
    );
    xOption.addEventListener("click", handleClick);
    const oOption = gameUI.createDOMElement(
      "button",
      { id: "O", class: "marker_button" },
      "O"
    );
    oOption.addEventListener("click", handleClick);
    const playButton = gameUI.createDOMElement("button", {
      id: "play_button",
      title: "Play!",
    });
    playButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>';
    markerDiv.append(xOption, oOption);
    dialogForm.append(
      chooseName1,
      chooseName2,
      nameInput,
      markerP,
      markerDiv,
      playButton
    );
    playerDialog.append(dialogForm);
    scoreboard.append(player1score, player2score);

    mainDiv.append(
      gameTitle,
      roundCounter,
      scoreboard,
      gameboardDisplay,
      turnDisplay
    );

    body.append(playerDialog, mainDiv);

    // PLAYER CREATION BEGINS
    playerDialog.showModal();
    function switchPlayer() {
      return gameLogic.player1turn
        ? ((chooseName2.style.display = "none"),
          (chooseName1.style.display = "block"),
          (currentPlayer = true))
        : ((chooseName2.style.display = "block"),
          (chooseName1.style.display = "none"),
          (currentPlayer = false));
    }
    switchPlayer();

    playButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (nameInput.value === "") {
        alert("Please choose a name");
      } else if (
        !xOption.classList.contains("selected_marker") &&
        !oOption.classList.contains("selected_marker")
      ) {
        alert("Please choose a marker");
      }
      const selectedMarker = playerDialog.querySelector(".selected_marker");
      if (gameLogic.player1turn) {
        player.setPlayer1(nameInput.value, selectedMarker.id);
        player1 = player.getPlayer1();
        xOption.removeEventListener("click", handleClick);
        oOption.removeEventListener("click", handleClick);
        xOption.classList.contains("selected_marker")
          ? (oOption.classList.add("selected_marker"),
            xOption.classList.remove("selected_marker"))
          : (xOption.classList.add("selected_marker"),
            oOption.classList.remove("selected_marker"));
        xOption.addEventListener("click", disableMarker);
        oOption.addEventListener("click", disableMarker);
        gameLogic.player1turn = false;
        nameInput.value = "";
        switchPlayer();
      } else {
        player.setPlayer2(nameInput.value, selectedMarker.id);
        player2 = player.getPlayer2();
        gameLogic.player1turn = true;
        xOption.addEventListener("click", handleClick);
        oOption.addEventListener("click", handleClick);
        xOption.removeEventListener("click", disableMarker);
        oOption.removeEventListener("click", disableMarker);
        playerDialog.close();
        alert("START!");
      }
    });
  }

  function updateGameboardUI() {
    if (!player.player1 || !player.player2) {
      return;
    }
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const gridCell = gameboard.grid[row][col];
        const UIcell = document.querySelector(
          `.grid_cell[data-row='${row}'][data-col='${col}']`
        );
        UIcell.textContent = gridCell || "";
      }
    }

    roundCounter.textContent = gameLogic.round;
    player1score = player.player1.score;
    player2score = player.player2.score;

    gameLogic.player1turn
      ? (turnDisplay = `${player.player1.name}, it's your turn`)
      : (turnDisplay = `${player.player2.name}, it's your turn`);
  }

  return {
    createDOMElement,
    startGame,
    updateGameboardUI,
    cellClicked,
  };
})(gameboard, player, gameLogic);

let player1;
let player2;
gameUI.startGame();
const gridCells = document.querySelectorAll(".grid-cell")
gridCells.forEach(cell => {
  cell.addEventListener("click", gameUI.cellClicked(`${cell.dataset.row}`, `${cell.dataset.col}`));
});
