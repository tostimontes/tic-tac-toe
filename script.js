// TODO: Create AI for player2

const gameLogic = (function () {
  let player1turn = true;
  const gameStart = document.addEventListener("DOMContentLoaded", function () {
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
    const a1cell = gameUI.createDOMElement("div", {
      id: "a1",
      class: "grid_cell",
    });
    const b1cell = gameUI.createDOMElement("div", {
      id: "b1",
      class: "grid_cell",
    });
    const c1cell = gameUI.createDOMElement("div", {
      id: "c1",
      class: "grid_cell",
    });
    const a2cell = gameUI.createDOMElement("div", {
      id: "a2",
      class: "grid_cell",
    });
    const b2cell = gameUI.createDOMElement("div", {
      id: "b2",
      class: "grid_cell",
    });
    const c2cell = gameUI.createDOMElement("div", {
      id: "c2",
      class: "grid_cell",
    });
    const a3cell = gameUI.createDOMElement("div", {
      id: "a3",
      class: "grid_cell",
    });
    const b3cell = gameUI.createDOMElement("div", {
      id: "b3",
      class: "grid_cell",
    });
    const c3cell = gameUI.createDOMElement("div", {
      id: "c3",
      class: "grid_cell",
    });
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
    const nameInput = gameUI.createDOMElement("input", { type: "text", id: "name_input" });
    const markerDiv = gameUI.createDOMElement("div", {
      id: "marker_selection",
    });
    const markerP = gameUI.createDOMElement("p", {}, "Choose your marker: ");
    function handleClick(e) {
      e.preventDefault();
      oOption.classList.add("selected_marker");
      xOption.classList.remove("selected_marker");
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
    roundCounter.textContent = `Round: ${gameLogic.round}`;

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
    function form1Or2Display() {
      return player1turn
        ? ((chooseName2.style.display = "none"),
          (chooseName1.style.display = "block"))
        : ((chooseName2.style.display = "block"),
          (chooseName1.style.display = "none"));
    }
    form1Or2Display();
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
      if (player1turn) {
        const player1 = createPlayer(nameInput.value, selectedMarker.id);
        xOption.removeEventListener("click", handleClick);
        oOption.removeEventListener("click", handleClick);
        xOption.classList.contains("selected_marker")
          ? (oOption.classList.add("selected_marker"),
            xOption.classList.remove("selected_marker"))
          : (xOption.classList.add("selected_marker"),
            oOption.classList.remove("selected_marker"));
        xOption.addEventListener("click", disableMarker);
        oOption.addEventListener("click", disableMarker);
        player1score.textContent = player1.score;
        player1turn = false;
        nameInput.value = "";
        console.log(player1);
        form1Or2Display();
      } else {
        const player2 = createPlayer(nameInput.value, selectedMarker.id);
        player2score.textContent = player2.score;
        player1turn = true;
        xOption.addEventListener("click", handleClick);
        oOption.addEventListener("click", handleClick);
        xOption.removeEventListener("click", disableMarker);
        oOption.removeEventListener("click", disableMarker);
        playerDialog.close();
        console.log(player2);
        alert("START!");
      }
    });
  });

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
// let player1 = createPlayer("Aitor", "X");
// let player2 = createPlayer("Matxin", "O");

// Create dialog which prompts for name and marker (radio button)

// GAME STARTER DISPLAY

// GAME START
