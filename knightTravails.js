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
};
