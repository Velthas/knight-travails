 ## <img src="https://www.svgrepo.com/show/173179/chess-knight.svg" height="75px" width="75px"> Knight Travails <img src="https://www.svgrepo.com/show/173179/chess-knight.svg" height="75px" width="75px">
 <p>Knight Travails is a project focused on testing a real life application of Breadth-First and Depth-First search algorithms.</p>
 <p>The objective of the script is to figure out the shortest possible path it takes a Knight (from Chess) to get from a starting tile to its destination, operating on the assumption that following its movement pattern, a Knight can eventually reach every single tile on the board.</p>
 
 ### Data Structures
 The ideal data structure to solve this problem was a **graph**, more specifically I opted for a  **directed graph**. A directed graph differs from an undirected one insofar the edges don't just connect the vertices in any order, but they are directed from one vertex to the other (A -> B as opposed to A--B).

Considering a Knight can eventually reach every tile of the board from any position, it just made sense to not allow backtracking at all (as in the case of an undirected graph). This way, we can ensure that all possible moves are unique: on an 8x8 board there is a maximum of 64 - 1 (the starting tile) possible moves before a solution is found.

### Design Structure
The two main components for this projects are Knights and Boards. I'll give an overview in the following paragraphs:
#### Board
<p>A board object's main component is the board itself, built using multi-dimensional arrays to generate one of the requested size.  For the purpose of this exercise, each tile contains an object with a property of *isVisited* set to false by default. </p>

<p>Access to the board itself is limited by default via closures, and modifications to it can only be made through one of the exposed methods: </p>

 1. **setVisited**: this board method accepts a position, and then sets that tile's isVisited property to true. This is to keep tabs on what tiles have been explored and which haven't.
 2. **createBoard**: this is the method used to create the board itself, consists of two simple for loops.
 3. **legalMoves**: finally, this method takes two arguments, position and step, and returns an array with thelegal moves from that position. Position is our location on the board, step are the offsets that determine where on the board we can be from our current position. 
 4. **filterVisited**: this is a helper function to be fed as a callback to a filter array method. It takes a position on the board as argument, and returns false if it is already visited (thus excluding it from the filtered array) or true if not.
 
#### Knight
An object to replicate a Knight from the game of chess. Its signature identifier is of course the **step**, which is what I called the offsets to define its movement pattern. From a central position, the knight has in fact 8 possible moves, four to the top and four to the bottom, each incapsulated inside an array.

In this case, the only method that needs exposing is the **knightMove** method, but before we dive into it let's have a look at all of them:

 1. **createGraph**: takes as an argument a start position and returns the root of the derived graph. The strategy here is building the graph iteratively using a queue. The steps of our algorithm are as follows: take the first element from the queue, filter out the moves that have already been made and take them out of the edges array, set all the remaining moves as done so they can't be repeated, then turn all of these new positions to vertices, give them a reference to their parent vertex and enqueue them to ensure they will be processed in breadth first order. Finally, use the shift array method to remove the first element of the queue and proceed untill it is empty.
 2. **printPath**: takes as an argument the array with the solutions, and simply returns a congratulations message along with the path needed to reach the end tile.
 3. **backtrack**: this method recursively goes up the graph until it reaches the top, then returns an array with the reversed path taken from end to start. It's useful when a solution is found and we need to trace back the moves we made to get there.
 4. **knightMove**: finally, this method essentially makes use of all other functions of our Knight. Takes as an argument start and end position, creates a graph and explores it in breadth-first order using a queue: once a path is found simply calls backtrack and printPath to console.log the result. 
### Conclusions 
Overall, I would say this was an extremely interesting project that allowed me to put into perspective the importance of data structures, something that I hope to delve into later as I become increasingly more in control of the tools at my disposal.
