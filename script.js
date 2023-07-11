const ticTacToe = (() => {
  const scoreboard = document.querySelector(".scoreboard");
  const grid = document.querySelector(".grid");
  const controls = document.querySelector(".controls");
  
  const updateScore = (p1scr, p2scr) => {
    let p1 = document.querySelector('.p1total');
    let p2 = document.querySelector('.p2total');
    p1.textContent = p1scr;
    p2.textContent = p2scr;
  }

  const boardWipe = () => {
    while (grid.hasChildNodes) {
      if (grid.lastChild === null) {
        break;
      }
      grid.lastChild.remove();
    }
  };

  const setBoard = () => {
    let playerOneTurn = true;
    let playerTwoTurn = false;

    const boardMap = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];

    const height = boardMap.length;

    for (let i = 0; i < height; i++) {
      let rowLength = boardMap[i].length;
      for (let j = 0; j < rowLength; j++) {
        let newCell = document.createElement("div");
        newCell.classList.add(`${[i]}-${[j]}`);
        newCell.addEventListener("click", (e) => {
          if (newCell.hasChildNodes() === false) {
            let img = document.createElement("img");
            if (playerOneTurn) {
              img.src = playerOne.mark;
              img.alt = "credit: icon by Icons8";
              newCell.appendChild(img);
              newCell.setAttribute("id", "x");
              playerOneTurn = false;
              playerTwoTurn = true;
            } else if (playerTwoTurn) {
              img.src = playerTwo.mark;
              img.alt = "credit: icon by Icons8";
              newCell.appendChild(img);
              newCell.setAttribute("id", "o");
              playerOneTurn = true;
              playerTwoTurn = false;
            }
            checkBoardState();
          }
        });
        grid.appendChild(newCell);
      }
    }
  };
  
  const init = () => {
    boardWipe();
    setBoard();
  };
  const setControls = (() => {
    const resetButton = document.createElement("button");
    resetButton.textContent = 'Reset';
    resetButton.setAttribute('class', 'reset')
    resetButton.addEventListener("click", (e) => {
      while (grid.hasChildNodes) {
        if (grid.lastChild === null) {
          break;
        }
        grid.lastChild.remove();
      }
      setBoard();
    });
    controls.appendChild(resetButton);
  })();

  const playerCreator = (playerNumber, mark, score, isHuman) => {
    const xMark = "./icons8-x-64.png";
    const oMark = "./icons8-o-50.png";
    if (mark === "x") {
      mark = xMark;
    }
    if (mark === "o") {
      mark = oMark;
    }


    return { playerNumber, mark, score, isHuman };
  };

  const checkBoardState = () => {
    let xCells = Array.from(document.querySelectorAll("#x"));
    let oCells = Array.from(document.querySelectorAll("#o"));

    const colCheck = (playerCells) => {
      let colOneCount = [];
      let colTwoCount = [];
      let colThreeCount = [];
      for (let i = 0; i < playerCells.length; i++) {
        let col = playerCells[i].getAttribute("class").slice(2, 3);
        if (col === "0") {
          colOneCount.push("");
        }
        if (col === "1") {
          colTwoCount.push("");
        }
        if (col === "2") {
          colThreeCount.push("");
        }
      }
      if (
        colOneCount.length > 2 ||
        colTwoCount.length > 2 ||
        colThreeCount.length > 2
      ) {
        return true;
      } else {
        return false;
      }
    };

    const rowCheck = (playerCells) => {
      let rowOneCount = [];
      let rowTwoCount = [];
      let rowThreeCount = [];
      for (let i = 0; i < playerCells.length; i++) {
        let row = playerCells[i].getAttribute("class").slice(0, 1);
        if (row === "0") {
          rowOneCount.push("");
        }
        if (row === "1") {
          rowTwoCount.push("");
        }
        if (row === "2") {
          rowThreeCount.push("");
        }
      }
      if (
        rowOneCount.length > 2 ||
        rowTwoCount.length > 2 ||
        rowThreeCount.length > 2
      ) {
        return true;
      } else {
        return false;
      }
    };

    const diagCheck = (playerCells) => {
      let diagCount1 = [];
      let diagCount2 = [];
      for (let i = 0; i < playerCells.length; i++) {
        let cls = playerCells[i].getAttribute("class");
        if (cls === "0-0" || cls === "1-1" || cls === "2-2") {
          diagCount1.push("");
        }
        if (cls === "0-2" || cls === "1-1" || cls === "2-0") {
          diagCount2.push("");
        }
      }
      if (diagCount1.length > 2 || diagCount2.length > 2) {
        return true;
      } else {
        return false;
      }
    };

    const winCheck = (cells, player) => {
      if (colCheck(cells) || rowCheck(cells) || diagCheck(cells)) {
        console.log(`${player} wins!`);
        return true;
      }
    };
    if (winCheck(xCells, "x")) {
      playerOne.score++
      updateScore(playerOne.score, playerTwo.score)
      init()
    }
    if (winCheck(oCells, "o")) {
      playerTwo.score++
      updateScore(playerOne.score, playerTwo.score)
      init()
    }
  };

  init();
  const playerOne = playerCreator(1, "x", 0, true);
  const playerTwo = playerCreator(2, "o", 0, true);
})();
