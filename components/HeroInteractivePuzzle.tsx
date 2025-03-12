"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PuzzleGrid, Position } from "@/lib/types";
import {
  createPuzzleGrid,
  shufflePuzzle,
  isPuzzleSolved,
  moveTile,
  canMoveTile,
} from "@/lib/utils";
import PuzzleTile from "./PuzzleTile";
import { Button } from "@/components/ui/button";

// Define constants
const IMAGE_URL = "/images/sample-3.jpg";

const HeroInteractivePuzzle = () => {
  const [grid, setGrid] = useState<PuzzleGrid>([]);
  const [boardSize, setBoardSize] = useState(320);
  const [isSolved, setIsSolved] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);

  // Calculate tile size based on the grid dimensions and board size
  const gridSize = grid.length || 3;
  const gapSize = 2; // Gap between tiles
  const tileSize = Math.floor(
    (boardSize - gapSize * (gridSize + 1)) / gridSize
  );

  // Initialize the puzzle
  useEffect(() => {
    // Create and shuffle the grid
    const newGrid = createPuzzleGrid(3, 3);

    // Shuffle with fewer moves for the hero section (easier to solve)
    const shuffledGrid = shufflePuzzle(newGrid, 20);
    setGrid(shuffledGrid);
  }, []);

  // Adjust board size based on window size
  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const parentWidth = boardRef.current.parentElement?.clientWidth || 300;
        const size = Math.min(parentWidth, 320); // Max size of 320px
        setBoardSize(size);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle tile clicks
  const handleTileClick = (rowIndex: number, colIndex: number) => {
    if (isSolved) return;

    const position = { row: rowIndex, col: colIndex };

    // Check if the tile can be moved
    if (!canMoveTile(grid, position)) {
      return;
    }

    // Move the tile
    const newGrid = moveTile(grid, position);
    setGrid(newGrid);

    // Check if solved
    if (isPuzzleSolved(newGrid)) {
      handlePuzzleSolved();
    }
  };

  // Handle puzzle solved
  const handlePuzzleSolved = () => {
    setIsSolved(true);
    setShowPlayButton(true);
  };

  return (
    <div className="relative mx-auto mb-4">
      <div
        ref={boardRef}
        className="relative mx-auto rounded-xl shadow-xl overflow-hidden border border-border bg-gradient-to-br from-background/50 to-muted/30"
        style={{
          width: boardSize,
          height: boardSize,
        }}
      >
        {/* Background pattern or texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        {/* Solved image overlay that appears when puzzle is solved */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${
            isSolved ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={IMAGE_URL}
            alt="Completed puzzle"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Interactive puzzle board */}
        <div
          className={`relative bg-card/90 backdrop-blur-sm rounded-xl overflow-hidden z-0 transition-opacity ${
            isSolved ? "opacity-0" : "opacity-100"
          }`}
          style={{
            width: boardSize,
            height: boardSize,
            padding: `${gapSize}px`,
          }}
        >
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              gap: `${gapSize}px`,
            }}
          >
            {grid.length > 0 &&
              grid.flat().map((tile) => {
                const isMovable = canMoveTile(grid, tile.position);
                return (
                  <PuzzleTile
                    key={tile.id}
                    tile={tile}
                    imageUrl={IMAGE_URL}
                    tileSize={tileSize}
                    gridSize={gridSize}
                    isMovable={isMovable}
                    onTileClick={() =>
                      handleTileClick(tile.position.row, tile.position.col)
                    }
                  />
                );
              })}
          </div>
        </div>

        {/* Call-to-action overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity rounded-xl z-20 ${
            showPlayButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center">
            <Button
              className="bg-white text-black hover:bg-white/90 shadow-lg"
              size="lg"
              asChild
            >
              <Link href="/game">Play Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 text-center">
        <p className="text-sm text-muted-foreground">
          Click tiles next to the empty space to move them
        </p>
      </div>
    </div>
  );
};

export default HeroInteractivePuzzle;
