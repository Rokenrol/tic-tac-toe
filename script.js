function Gameboard() {
    const board = [];
    const rows = 3;
    const columns = 3;
  
  
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
    
  function getBoard() {
    return board;
  }
    
  function placeMarker(row, column, player) {
  if (board[row][column].getMarker() === "O" || board[row][column].getMarker() === "X") {return} else {
  
    board[row][column].addPlayerMarker(player);
    }
  }
  
    function printBoard() {
      const populatedBoard = board.map((rowArray) => rowArray.map((eachCell) => eachCell.getMarker()));
      console.log(populatedBoard);
    }
    
    function resetBoard() {
      board.length = 0;
        for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
    }
    
    return {
      getBoard,
      printBoard,
      resetBoard,
      placeMarker
    }
    
  } // ---> end of Gameboard function


function Cell() {
    let value = "";
    
    function addPlayerMarker(player) {
      value = player;
    }
    
    function getMarker() {
      return value;
    }
    
    return {
      addPlayerMarker,
      getMarker
    } 
  }


function GameController( playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    
    let isGameWon = false;
    let isGameOver = false;
    let winCombo = "";
    
    function getWinCombo() {
      return winCombo;
    }
    
    function markersBoard() {
    let boardWithMarkers = board.getBoard().map((rowArray) => rowArray.map((eachCell) => eachCell.getMarker()));
    return boardWithMarkers;
    }
  
    const players = [
      {
        name: playerOneName,
        marker: "X"
      },
      {
        name: playerTwoName,
        marker: "O"
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
          if (isGameWon === true || isGameOver === true) {
        return;
          } else {
            activePlayer = activePlayer === players[0] ? players[1] : players[0]
          };
  
    }; // --> end of switchPlayerTurn function
    
    function getActivePlayer() {
      return activePlayer;
    }
    
    function setPlayerName(name, number) {
      players[number].name = name;
    }
    
    function printNewRound() {
      board.printBoard();
      let message;
      if (isGameWon === true) {
        message = `${getActivePlayer().name} is the winner!`;
      } else if (isGameOver === true) {
        message = "It's a tie!!!";
      } else {
      message = `${getActivePlayer().name}'s turn.`;
      }
      return message;
    }
  
    function resetGame() {
      board.resetBoard();
      activePlayer = players[0];
      isGameWon = false;
      isGameOver = false;
      winCombo = "";
      board.printBoard();
    }
    
    function checkWin(board) {
  
    const winningConditions = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]]  
  ]; // --> end of winningConditions array
  
  for (const condition of winningConditions) {
    const [a,b,c] = condition;
    if (board[a[0]][a[1]] !== "" && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
       isGameWon = true;
       winCombo = condition;
       }
    } // --> end of for of loop
    
 } // --> end of checkWin function
    
    
   function checkFreeCells(boardToCheck) {
     let doesItContainFreeCells;
     doesItContainFreeCells = boardToCheck.some((line) => {
       return line.includes("");
       });
      if (doesItContainFreeCells === false) {
        isGameOver = true;
      }
    } // --> end of checkFreeCells function
    
    
    function playRound(row, column) {
       if (board.getBoard()[row][column].getMarker() !== "" || isGameWon === true || isGameOver === true) {
        return;
          } else {
      // Drop a marker for the current player
      console.log(`Placing ${getActivePlayer().name}'s marker into row ${row} and column ${column}...`);
      board.placeMarker((row), (column), getActivePlayer().marker);
      markersBoard();
          }
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
     checkFreeCells(markersBoard());
     checkWin(markersBoard());
      // Switch player turn
      switchPlayerTurn();
  
      printNewRound(); 
  } // --> end of playRound function 
    
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      printNewRound,
      playRound,
      resetGame,
      setPlayerName,
      getWinCombo,
      getActivePlayer,
      getBoard: board.getBoard
    };
  } // --> end of gameController function


function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const resetButton = document.querySelector('.restart');
    const playerOneInput = document.querySelector('#player1');
    const playerTwoInput = document.querySelector('#player2');
    
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      const winningCombo = game.getWinCombo();
      // Display player's turn
      playerTurnDiv.textContent = game.printNewRound();
  
      // Render board squares
      board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the row and the column
          // This makes it easier to pass into our `playRound` function 
          cellButton.dataset.row = rowIndex;
          cellButton.dataset.column = columnIndex;
          cellButton.textContent = cell.getMarker();
          
      if (winningCombo) {
        for (const combo of winningCombo) {
          if (+cellButton.dataset.row === combo[0] && +cellButton.dataset.column === combo[1]) {
             cellButton.classList.add("highlight");
          }
        }
      }
          boardDiv.appendChild(cellButton);
        })
      })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.row;
      // Make sure I've clicked a column and not the gaps in between
      if (!selectedColumn) return;
      
      game.playRound(selectedRow,selectedColumn);
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // reset button event listener
    
    resetButton.addEventListener("click", () => {
     game.resetGame();
     updateScreen();
    });
    
    // change player names
    
    playerOneInput.addEventListener('keyup', () => {
      game.setPlayerName(playerOneInput.value, 0);
    });
  
    playerTwoInput.addEventListener('keyup', () => {
      game.setPlayerName(playerTwoInput.value, 1);
    });
    
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
ScreenController();