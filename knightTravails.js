// Board factory
function BoardCreate(size) {
  const board = Object.create(boardMethods);
  board.size = size;
  board.board = board.createBoard();
  return board;
}

// Board methods for inheritance
const boardMethods = {
  createBoard () {
    const arr = [];
    for (let i = 0; i < this.size; i++) {
      const newRow = [];
      for (let j = 0; j < this.size; j++) {
        newRow.push({ isVisited: false }); // A way of tracking which tiles have been visited
      }
      arr.push(newRow);
    }
    return arr;
  },
  legalMoves(position, step) {
    // Returns array of legal moves from position
    const legalMovements = [];
    for (let i = 0; i < step.length; i++) {
      if (position[0] + step[i][0] < 0 || position[0] + step[i][0] > this.size - 1
        || position[1] + step[i][1] < 0 || position[1] + step[i][1] > this.size - 1) continue;
      const legalPosition = [position[0] + step[i][0], position[1] + step[i][1]];
      legalMovements.push(legalPosition);
    }
    return legalMovements;
  },
  setVisited(movesArray) {
    // Sets a board position ([0, 0]) to visited
    movesArray.forEach(
      (move) => (this.board[move[0]][move[1]].isVisited = true),
    );
  },
  filterVisited(move) {
    // if move has already been made, returns false
    return this.board[move[0]][move[1]].isVisited !== true;
  },
};

const Knight = {
  step: [
    // Array offsets for movement of knight
    [-2, -1], [-1, -2], // Upper left
    [-2, 1], [-1, 2], // Upper right
    [2, -1], [1, -2], // Bottom left
    [2, 1], [1, 2], // Bottom right
  ],
}