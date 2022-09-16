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
  const boardSize = size;

  const createBoard = () => {
    const arr = [];
    for (let i = 0; i < boardSize; i++) {
      const newRow = [];
      for (let j = 0; j < boardSize; j++) {
        newRow.push({ isVisited: false }); // A way of tracking which tiles have been visited
      }
      arr.push(newRow);
    }
    return arr;
  };

  const board = createBoard();

  const legalMoves = (position, step) => {
    // Returns array of legal moves from position
    const legalMovements = [];
    for (let i = 0; i < step.length; i++) {
      if (position[0] + step[i][0] < 0 || position[0] + step[i][0] > size - 1
        || position[1] + step[i][1] < 0 || position[1] + step[i][1] > size - 1) continue;
      const legalPosition = [position[0] + step[i][0], position[1] + step[i][1]];
      legalMovements.push(legalPosition);
    }
    return legalMovements;
  };

  const setVisited = (movesArray) => {
    // Sets a board position ([0, 0]) to visited
    movesArray.forEach(
      (move) => (board[move[0]][move[1]].isVisited = true),
    );
  };

  // if move has already been made, returns false
  const filterVisited = (move) => board[move[0]][move[1]].isVisited !== true;

  return { filterVisited, legalMoves, setVisited };
}

const Knight = () => {
  const step = [
    // Array offsets for movement of knight
    [-2, -1], [-1, -2], // Upper left
    [-2, 1], [-1, 2], // Upper right
    [2, -1], [1, -2], // Bottom left
    [2, 1], [1, 2], // Bottom right
  ];

  const createGraph = (start) => {
    const board = BoardCreate(8); // Create an instance of a board
    const parentVertex = null; // Root has no parent, therefore null on initialization
    // Generate the root of graph
    const rootVertex = Vertex(start, board.legalMoves(start, step), parentVertex);
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
        const newVertex = Vertex(edge, board.legalMoves(edge, step), currentVertex);
        // Updates the simple coordinate with a vertex made out of it
        currentVertex.edges[index] = newVertex;
        // Then enqueue it. All vertexes will be processed in breadth-first order.
        queue.push(newVertex);
      });
      queue.shift();
    }
    return rootVertex; // At last return the root of the graph
  };

  const printPath = (solutionArray) => {
    const firstLine = `Congratulations! You made it in ${solutionArray.length} moves! Here is your path:\n`;
    let pathString = '';
    for (let i = 0; i < solutionArray.length; i++) {
      pathString += `[${solutionArray[i]}]\n`;
    }
    console.log(firstLine + pathString);
  };

  const backtrack = (vertex, moves = []) => {
    if (vertex.parent === null) {
      moves.push(vertex.position);
      return moves;
    }
    moves.push(vertex.position);
    return backtrack(vertex.parent, moves);
  };

  const knightMove = (start, end) => {
    // If start and end are same, return either
    if (start[0] === end[0] && start[1] === end[1]) return printPath(start);
    const queue = [createGraph(start)]; // Initiate queue with root of graph
    while (queue.length !== 0) { // Iteratively go down the graph in breadth-first fashion
      // Trace the origin of solution and reverse the array to get correct path
      if (queue[0].position[0] === end[0] && queue[0].position[1] === end[1]) {
        return printPath((backtrack(queue[0])).reverse()); }
      queue[0].edges.forEach((edge) => queue.push(edge));
      queue.shift();
    }
  };

  return { knightMove };
};
