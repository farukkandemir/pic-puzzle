"use client";

import { useState, useEffect, useRef } from "react";
import { PuzzleGrid, Position, GameStats } from "@/lib/types";
import { canMoveTile, moveTile, isPuzzleSolved, formatTime } from "@/lib/utils";
import PuzzleTile from "./PuzzleTile";
import { toast } from "sonner";

type PuzzleBoardProps = {
  grid: PuzzleGrid;
  imageUrl: string;
  onGridChange: (newGrid: PuzzleGrid) => void;
  onPuzzleSolved: (stats: GameStats) => void;
  gameStats: GameStats;
};

const PuzzleBoard = ({
  grid,
  imageUrl,
  onGridChange,
  onPuzzleSolved,
  gameStats,
}: PuzzleBoardProps) => {
  const [boardSize, setBoardSize] = useState(300);
  const boardRef = useRef<HTMLDivElement>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Calculate tile size based on the grid dimensions and board size
  const gridSize = grid.length;
  const tileSize = boardSize / gridSize;

  // Set up a timer to track elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      const newElapsedTime = Math.floor(
        (Date.now() - gameStats.startTime) / 1000
      );
      setElapsedTime(newElapsedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStats.startTime]);

  // Adjust board size based on window size
  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const parentWidth = boardRef.current.parentElement?.clientWidth || 300;
        const newSize = Math.min(parentWidth - 32, 500); // Max size of 500px, with some padding
        setBoardSize(newSize);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTileClick = (position: Position) => {
    if (canMoveTile(grid, position)) {
      const newGrid = moveTile(grid, position);
      onGridChange(newGrid);

      // Check if the puzzle is solved
      if (isPuzzleSolved(newGrid)) {
        const endTime = Date.now();
        const stats = {
          ...gameStats,
          endTime,
        };
        onPuzzleSolved(stats);

        toast.success("Puzzle Solved!", {
          description: `You completed the puzzle in ${formatTime(
            Math.floor((endTime - gameStats.startTime) / 1000)
          )} with ${gameStats.moves} moves.`,
        });
      }
    } else {
      // Optional: provide feedback that the tile can't be moved
      toast.error("Can't move this tile", {
        description: "This tile is not adjacent to the empty space.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full px-4">
        <div className="text-sm font-medium">
          Moves: <span className="font-bold">{gameStats.moves}</span>
        </div>
        <div className="text-sm font-medium">
          Time: <span className="font-bold">{formatTime(elapsedTime)}</span>
        </div>
      </div>

      <div
        ref={boardRef}
        className="relative bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-inner"
        style={{ width: boardSize, height: boardSize }}
      >
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {grid.flat().map((tile) => (
            <PuzzleTile
              key={tile.id}
              tile={tile}
              imageUrl={imageUrl}
              tileSize={tileSize - 4} // Subtract gap size
              gridSize={gridSize}
              isMovable={canMoveTile(grid, tile.position)}
              onTileClick={handleTileClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PuzzleBoard;
