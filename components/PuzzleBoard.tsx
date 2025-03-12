"use client";

import { useState, useEffect, useRef } from "react";
import { PuzzleGrid, Position, GameStats } from "@/lib/types";
import { canMoveTile, moveTile, isPuzzleSolved, formatTime } from "@/lib/utils";
import PuzzleTile from "./PuzzleTile";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Eye, Clock, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [showHint, setShowHint] = useState(false);

  // Calculate tile size based on the grid dimensions and board size
  const gridSize = grid.length;
  const gapSize = 2; // Gap between tiles
  const tileSize = Math.floor(
    (boardSize - gapSize * (gridSize + 1)) / gridSize
  );

  // Handle tile clicks
  const handleTileClick = (position: Position) => {
    // Check if the tile can be moved
    if (!canMoveTile(grid, position)) {
      return;
    }

    // Move the tile
    const newGrid = moveTile(grid, position);
    onGridChange(newGrid);

    // Check if the puzzle is solved
    if (isPuzzleSolved(newGrid)) {
      onPuzzleSolved({
        ...gameStats,
        endTime: Date.now(),
      });
    }
  };

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
        const size = Math.min(parentWidth - 32, 500); // Max size of 500px, with some padding
        setBoardSize(size);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle hint (show original image)
  const handleToggleHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      toast.info("Hint activated", {
        description: "Showing the complete image as a reference",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <Move className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">Moves:</span>
            <span className="font-bold">{gameStats.moves}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">Time:</span>
            <span className="font-bold">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        <Button
          variant={showHint ? "default" : "outline"}
          size="sm"
          onClick={handleToggleHint}
          className="h-8 px-2.5 text-xs gap-1"
        >
          <Eye className="h-3.5 w-3.5" />
          {showHint ? "Hide Hint" : "Hint"}
        </Button>
      </div>

      <div
        ref={boardRef}
        className="relative bg-muted rounded-lg overflow-hidden shadow-md"
        style={{
          width: boardSize,
          height: boardSize,
          padding: `${gapSize}px`,
        }}
      >
        {/* Hint overlay */}
        {showHint && (
          <div className="absolute inset-0 z-10 bg-background/5 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-md overflow-hidden shadow-lg border border-border">
              <img
                src={imageUrl}
                alt="Puzzle hint"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div
          className="grid w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gap: `${gapSize}px`,
          }}
        >
          {grid.flat().map((tile) => {
            const isMovable = canMoveTile(grid, tile.position);
            return (
              <PuzzleTile
                key={tile.id}
                tile={tile}
                imageUrl={imageUrl}
                tileSize={tileSize}
                gridSize={gridSize}
                isMovable={isMovable}
                onTileClick={handleTileClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PuzzleBoard;
