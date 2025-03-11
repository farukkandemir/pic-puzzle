import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Position, Tile, PuzzleGrid } from "./types";

// Combine Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a puzzle grid from an image
export const createPuzzleGrid = (rows: number, cols: number): PuzzleGrid => {
  const grid: PuzzleGrid = [];
  let id = 1;

  for (let row = 0; row < rows; row++) {
    const rowArray: Tile[] = [];
    for (let col = 0; col < cols; col++) {
      // The last tile is the empty space
      if (row === rows - 1 && col === cols - 1) {
        rowArray.push({
          id: 0, // Empty tile has id 0
          position: { row, col },
          correctPosition: { row, col },
        });
      } else {
        rowArray.push({
          id,
          position: { row, col },
          correctPosition: { row, col },
        });
        id++;
      }
    }
    grid.push(rowArray);
  }

  return grid;
};

// Find the empty tile in the grid
export const findEmptyTile = (grid: PuzzleGrid): Position => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].id === 0) {
        return { row, col };
      }
    }
  }
  // This should never happen in a valid puzzle
  throw new Error("No empty tile found in the grid");
};

// Check if a tile can be moved (adjacent to empty space)
export const canMoveTile = (grid: PuzzleGrid, position: Position): boolean => {
  const emptyPos = findEmptyTile(grid);

  // Check if the tile is adjacent to the empty space
  const isAdjacent =
    (Math.abs(position.row - emptyPos.row) === 1 &&
      position.col === emptyPos.col) ||
    (Math.abs(position.col - emptyPos.col) === 1 &&
      position.row === emptyPos.row);

  return isAdjacent;
};

// Move a tile to the empty space
export const moveTile = (grid: PuzzleGrid, position: Position): PuzzleGrid => {
  if (!canMoveTile(grid, position)) {
    return grid;
  }

  const newGrid = JSON.parse(JSON.stringify(grid)) as PuzzleGrid;
  const emptyPos = findEmptyTile(newGrid);

  // Swap the tile with the empty space
  const temp = newGrid[position.row][position.col];
  newGrid[position.row][position.col] = newGrid[emptyPos.row][emptyPos.col];
  newGrid[emptyPos.row][emptyPos.col] = temp;

  return newGrid;
};

// Check if the puzzle is solved
export const isPuzzleSolved = (grid: PuzzleGrid): boolean => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const tile = grid[row][col];
      if (
        tile.id !== 0 && // Skip the empty tile
        (tile.correctPosition.row !== row || tile.correctPosition.col !== col)
      ) {
        return false;
      }
    }
  }
  return true;
};

// Shuffle the puzzle grid
export const shufflePuzzle = (
  grid: PuzzleGrid,
  moves: number = 100
): PuzzleGrid => {
  let shuffledGrid = JSON.parse(JSON.stringify(grid)) as PuzzleGrid;

  for (let i = 0; i < moves; i++) {
    const emptyPos = findEmptyTile(shuffledGrid);
    const possibleMoves: Position[] = [];

    // Check all four directions
    if (emptyPos.row > 0) {
      possibleMoves.push({ row: emptyPos.row - 1, col: emptyPos.col });
    }
    if (emptyPos.row < grid.length - 1) {
      possibleMoves.push({ row: emptyPos.row + 1, col: emptyPos.col });
    }
    if (emptyPos.col > 0) {
      possibleMoves.push({ row: emptyPos.row, col: emptyPos.col - 1 });
    }
    if (emptyPos.col < grid[0].length - 1) {
      possibleMoves.push({ row: emptyPos.row, col: emptyPos.col + 1 });
    }

    // Randomly select a move
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    shuffledGrid = moveTile(shuffledGrid, randomMove);
  }

  // Ensure the puzzle is not already solved after shuffling
  if (isPuzzleSolved(shuffledGrid)) {
    return shufflePuzzle(grid, moves);
  }

  return shuffledGrid;
};

// Format time in seconds to MM:SS format
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
