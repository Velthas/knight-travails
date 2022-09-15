// Graph vertex factory
function Vertex(position, legalMoves, parentReference) {
  const vertex = {};
  vertex.position = position; // An array bearing y and x of the vertex [y, x]
  vertex.edges = legalMoves; // All edges of the vertex
  vertex.parent = parentReference; // A reference to the parent move (for backtracking)
  return vertex;
}

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
  createGraph(start) {
    const board = BoardCreate(8); // Create an instance of a board
    const parentVertex = null; // Root has no parent, therefore null on initialization
    // Generate the root of graph
    const rootVertex = Vertex(start, board.legalMoves(start, this.step), parentVertex);
    // Sets the knight first position as visited to avoid backtracking
    board.setVisited([rootVertex.position]);
    const queue = [rootVertex]; // Use a queue to go over the moves in breadth-first order

    while (queue.length !== 0) {
      const currentVertex = queue[0]; // Extract the vertex to work on
      // Returns the non-made legal moves
      currentVertex.edges = currentVertex.edges.filter((move) => board.filterVisited(move));
      board.setVisited(currentVertex.edges); // Sets all new possible positions as visited
      currentVertex.edges.forEach((edge, index) => {
        // Make a vertex out of all the positions
        const newVertex = Vertex(edge, board.legalMoves(edge, this.step), currentVertex);
        // Updates the simple coordinate with a vertex made out of it
        currentVertex.edges[index] = newVertex;
        // Then enqueue it. All vertexes will be processed in breadth-first order.
        queue.push(newVertex);
      });
      queue.shift();
    }
    return rootVertex; // At last return the root of the graph
  },
};
