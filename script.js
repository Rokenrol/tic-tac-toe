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