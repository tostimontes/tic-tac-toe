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
  let player1 = {};
  let player2 = {};
  let round = 1;
  let player1turn = true;
  let currentPlayer = player1;
  let newRound = false;
  function getGameState() {
    return {
      round,
      player1turn,
      currentPlayer,
      player1,
      player2,
    };
  }

  function turnDisplay() {
    return player1turn
      ? `${gameLogic.player1.name}, it's your turn`
      : `${gameLogic.player2.name}, it's your turn`;
  }
  function switchPlayer() {
    if (newRound) {
      newRound = false;
      player1turn
        ? (currentPlayer = gameLogic.player1)
        : (currentPlayer = gameLogic.player2);
      return;
    } else {
      player1turn = !player1turn;
      player1turn
        ? (currentPlayer = gameLogic.player1)
        : (currentPlayer = gameLogic.player2);
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
      gameUI.updateUI();
      setTimeout(() => {
        alert(`${player.name} is the winner!`);
        gameboard.resetGrid(arr);
        gameUI.updateUI();
      }, 0);
      round++;
      newRound = true;
      player.score++;
      round % 2 === 0 ? (player1turn = false) : (player1turn = true);
    } else if (arr.every((row) => row.every((tile) => tile !== undefined))) {
      gameUI.updateUI();
      setTimeout(() => {
        alert(`It's a tie!`);
        gameboard.resetGrid(arr);
        gameUI.updateUI();
      }, 0);
      round++;
      newRound = true;
      round % 2 === 0 ? (player1turn = false) : (player1turn = true);
    }
  }

  function playTurn(row, col) {
    if (gameboard.grid[row][col] !== undefined) {
      alert("Choose another cell");
      return;
    } else {
      player1turn
        ? (currentPlayer = gameLogic.player1)
        : (currentPlayer = gameLogic.player2);
      gameboard.setMark(currentPlayer.marker, row, col);

      checkWin(currentPlayer);
      switchPlayer();
      gameUI.updateUI();
    }
  }
  return {
    player1,
    player2,
    playTurn,
    switchPlayer,
    getGameState,
    turnDisplay,
  };
})(gameboard);

const gameUI = (function (gameboard, gameLogic) {
  let body,
    mainDiv,
    gameTitle,
    roundCounter,
    scoreboard,
    player1info,
    player2info,
    player1score,
    player2score,
    gameboardDisplay,
    turnDisplay,
    dialogForm,
    chooseName1,
    chooseName2,
    nameInput,
    markerDiv,
    markerP,
    playerDialog,
    xOption,
    oOption,
    playButton;

  function createDOMElement(type, attributes, text) {
    const element = document.createElement(type);

    for (const property in attributes) {
      element.setAttribute(property, attributes[property]);
    }

    element.textContent = text;

    return element;
  }

  function initUI() {
    // 1) Add listeners to interact with logic ALWAYS CREATE ALL UI -> THEN APPEND -> THEN MODIFY CONTENT ACCORDING TO GAME STATE
    body = document.querySelector("body");
    body.innerHTML = "";
    mainDiv = gameUI.createDOMElement("div", { class: "main" });
    gameTitle = gameUI.createDOMElement("h1", { id: "title" }, "TIC TAC TOE");
    roundCounter = gameUI.createDOMElement("div", {
      id: "round_counter",
    });
    scoreboard = gameUI.createDOMElement("div", { id: "scoreboard" });
    player1info = gameUI.createDOMElement("div", {
      id: "player1info",
      class: "playerinfo",
    });
    player2info = gameUI.createDOMElement("div", {
      id: "player2info",
      class: "playerinfo",
    });
    player1score = gameUI.createDOMElement("div", {
      id: "player1score",
      class: "score_display",
    });
    player2score = gameUI.createDOMElement("div", {
      id: "player2score",
      class: "score_display",
    });
    gameboardDisplay = gameUI.createDOMElement("div", {
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
        cell.addEventListener("click", () => {
          gameLogic.playTurn(cell.dataset.row, cell.dataset.col);
        });
        gameboardDisplay.append(cell);
      }
    }
    turnDisplay = gameUI.createDOMElement("div", {
      id: "turn_display",
    });
    playerDialog = gameUI.createDOMElement("dialog", {
      id: "player_dialog",
    });
    dialogForm = gameUI.createDOMElement("form");
    chooseName1 = gameUI.createDOMElement(
      "p",
      { id: "choose_name_1" },
      "Enter your name, player 1:"
    );
    chooseName2 = gameUI.createDOMElement(
      "p",
      { id: "choose_name_2" },
      "Enter your name, player 2:"
    );
    chooseName1.setAttribute("required", "");
    chooseName2.setAttribute("required", "");
    nameInput = gameUI.createDOMElement("input", {
      type: "text",
      id: "name_input",
    });
    markerDiv = gameUI.createDOMElement("div", {
      id: "marker_selection",
    });
    markerP = gameUI.createDOMElement("p", {}, "Choose your marker: ");
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
    xOption = gameUI.createDOMElement(
      "button",
      { id: "X", class: "marker_button" },
      "X"
    );
    xOption.addEventListener("click", handleClick);
    oOption = gameUI.createDOMElement(
      "button",
      { id: "O", class: "marker_button" },
      "O"
    );
    oOption.addEventListener("click", handleClick);
    playButton = gameUI.createDOMElement("button", {
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
    scoreboard.append(player1info, player1score, player2score, player2info);

    mainDiv.append(
      gameTitle,
      roundCounter,
      scoreboard,
      gameboardDisplay,
      turnDisplay
    );

    body.append(playerDialog, mainDiv);

    return {
      handleClick,
      disableMarker,
      body,
      mainDiv,
      gameTitle,
      roundCounter,
      scoreboard,
      player1info,
      player2info,
      player1score,
      player2score,
      gameboardDisplay,
      turnDisplay,
      dialogForm,
      chooseName1,
      chooseName2,
      nameInput,
      markerDiv,
      markerP,
      playerDialog,
      xOption,
      oOption,
      playButton,
    };
  }
  function createPlayers() {
    playerDialog.showModal();
    chooseName2.style.display = "none";
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
      if (chooseName2.style.display === "none") {
        gameLogic.player1 = createPlayer(nameInput.value, selectedMarker.id);
        uiElements.player1score.style.backgroundColor =
          window.getComputedStyle(selectedMarker).backgroundColor;
        uiElements.player1score.textContent = `${gameLogic.player1.score}`;
        uiElements.player1info.textContent = `${gameLogic.player1.name}: ${gameLogic.player1.marker}`;
        xOption.removeEventListener("click", uiElements.handleClick);
        oOption.removeEventListener("click", uiElements.handleClick);
        xOption.classList.contains("selected_marker")
          ? (oOption.classList.add("selected_marker"),
            xOption.classList.remove("selected_marker"))
          : (xOption.classList.add("selected_marker"),
            oOption.classList.remove("selected_marker"));
        xOption.addEventListener("click", uiElements.disableMarker);
        oOption.addEventListener("click", uiElements.disableMarker);
        nameInput.value = "";
        nameInput.focus();
        chooseName2.style.display = "block";
        chooseName1.style.display = "none";
      } else {
        gameLogic.player2 = createPlayer(nameInput.value, selectedMarker.id);
        uiElements.player2score.style.backgroundColor =
          window.getComputedStyle(selectedMarker).backgroundColor;
        uiElements.player2score.textContent = `${gameLogic.player2.score}`;
        uiElements.player2info.textContent = `${gameLogic.player2.name}: ${gameLogic.player2.marker}`;
        xOption.addEventListener("click", uiElements.handleClick);
        oOption.addEventListener("click", uiElements.handleClick);
        xOption.removeEventListener("click", uiElements.disableMarker);
        oOption.removeEventListener("click", uiElements.disableMarker);
        playerDialog.close();
        alert("START!");
        gameUI.updateUI();
      }
    });
  }

  function updateUI() {
    roundCounter.textContent = `Round: ${gameLogic.getGameState().round}`;
    player1score.textContent = `${gameLogic.player1.score}`;
    player2score.textContent = `${gameLogic.player2.score}`;
    // add logic for wins and ties
    turnDisplay.textContent = gameLogic.turnDisplay();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document.querySelector(`#row${row}col${col}`).textContent =
          gameboard.grid[row][col];
        document.querySelector(`#row${row}col${col}`).textContent === "X"
          ? (document.querySelector(`#row${row}col${col}`).style.color = "red")
          : (document.querySelector(`#row${row}col${col}`).style.color =
              "black");
      }
    }
  }
  return {
    createDOMElement,
    initUI,
    createPlayers,
    updateUI,
  };
})(gameboard, gameLogic);

const uiElements = gameUI.initUI();
gameUI.createPlayers();