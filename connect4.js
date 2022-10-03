// Variable to set width/height of board - set loop  condition to these values
const width = 7;
const height = 6;
//Variable for setting current player
let currPlayer = 1;
//Creates varaible set to empty [] for containing HTML board (array of arrays)
let board = [];

//Creates board using length/width variables and puses to board []
function makeBoard() {
  for (let y = 0; y < height; y++) {
    board.push(Array.from({ length: width }));
  }
}

//Create <tr> and <td> (lines 18-44)elements that comprise HTML component of board / appends to board
//First creates top row / adds click event listener for adding pieces with click handlerd CB funtction
function makeHtmlBoard() {
  const board = document.getElementById("board");
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.innerText = "Click";
    headCell.classList.add("top-text");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //htmlBoard does not exist.  Newly created HTML elements must be appended to the board variable
    // htmlBoard.append(row);
    board.append(row);
  }
}

//Determine location for chip in colum based on x and returns null if column filled with chips
function findSpotForCol(x) {
  for (let y = height - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

//Create <div> for piece / add classes for functinaliity and styling
function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

//  endGame: announce game end
function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // Place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // If there is a winner, announce there is a win and who the winner is
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // If there is a tie, announce there is a tie
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Tie!");
  }

  //Sets the current player (if current player is player 1, set currPlayer to 2.  Otherwise, currPlayer is 1)
  currPlayer = currPlayer === 1 ? 2 : 1;
}

//Function to check for win based on criteria and logic below
function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  //Set up win scenarios to be checked when player plays their turn (adds a chip to the HTML board)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      //Logic to check win scenarios.  If any of them is met, end game and announce which player won
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//Invoke functions to make the board and the HTML board.
makeBoard();
makeHtmlBoard();
