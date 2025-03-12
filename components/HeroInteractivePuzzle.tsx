"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PuzzleGrid, GameStats } from "@/lib/types";
import {
  createPuzzleGrid,
  shufflePuzzle,
  isPuzzleSolved,
  moveTile,
  canMoveTile,
} from "@/lib/utils";
import PuzzleTile from "./PuzzleTile";
import { Button } from "@/components/ui/button";

const HeroInteractivePuzzle = () => {
  const [grid, setGrid] = useState<PuzzleGrid>([]);
  const [solvedGrid, setSolvedGrid] = useState<PuzzleGrid>([]);
  const [imageUrl, setImageUrl] = useState<string>("/images/sample-1.jpg");
  const [boardSize, setBoardSize] = useState(320);
  const [isSolved, setIsSolved] = useState(false);
  const [isAutoSolving, setIsAutoSolving] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [interactionTimestamp, setInteractionTimestamp] = useState(Date.now());
  const [autoSolveTimeout, setAutoSolveTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    startTime: Date.now(),
  });

  const boardRef = useRef<HTMLDivElement>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSolveIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    setSolvedGrid(JSON.parse(JSON.stringify(newGrid)));

    // Shuffle with fewer moves for the hero section (easier to solve)
    const shuffledGrid = shufflePuzzle(newGrid, 20);
    setGrid(shuffledGrid);

    // Reset stats
    setGameStats({
      moves: 0,
      startTime: Date.now(),
    });

    // Set up inactivity tracker
    resetInactivityTimer();

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      if (autoSolveIntervalRef.current) {
        clearInterval(autoSolveIntervalRef.current);
      }
      if (autoSolveTimeout) {
        clearTimeout(autoSolveTimeout);
      }
    };
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
    if (isAutoSolving || isSolved) return;

    const position = { row: rowIndex, col: colIndex };

    // Check if the tile can be moved
    if (!canMoveTile(grid, position)) {
      return;
    }

    // Move the tile
    const newGrid = moveTile(grid, position);
    setGrid(newGrid);

    // Update stats
    setGameStats((prev) => ({
      ...prev,
      moves: prev.moves + 1,
    }));

    // Record user interaction
    setInteractionTimestamp(Date.now());
    resetInactivityTimer();

    // Check if solved
    if (isPuzzleSolved(newGrid)) {
      handlePuzzleSolved();
    }
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    // Auto-solve after 30 seconds of inactivity if not already solved
    inactivityTimeoutRef.current = setTimeout(() => {
      if (!isSolved && !isAutoSolving) {
        startAutoSolve();
      }
    }, 30000); // Increased to 30 seconds
  };

  // Handle puzzle solved
  const handlePuzzleSolved = () => {
    setIsSolved(true);
    setShowPlayButton(true);

    // Clean up timers
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    if (autoSolveIntervalRef.current) {
      clearInterval(autoSolveIntervalRef.current);
    }

    // Add a delay before showing the "Start Playing" button
    setAutoSolveTimeout(
      setTimeout(() => {
        setShowPlayButton(true);
      }, 1000)
    );
  };

  // Start auto-solving the puzzle
  const startAutoSolve = () => {
    if (isAutoSolving || isSolved) return;

    setIsAutoSolving(true);

    // Slower auto-solve for a more deliberate effect
    const solveInterval = 800; // 800ms between moves - much slower

    let moveCount = 0;
    autoSolveIntervalRef.current = setInterval(() => {
      // Only make a limited number of moves for a subtle hint
      // rather than solving the entire puzzle
      if (moveCount >= 5) {
        if (autoSolveIntervalRef.current) {
          clearInterval(autoSolveIntervalRef.current);
        }
        setIsAutoSolving(false);
        return;
      }

      setGrid((prevGrid) => {
        // If already solved, stop auto-solving
        if (isPuzzleSolved(prevGrid)) {
          if (autoSolveIntervalRef.current) {
            clearInterval(autoSolveIntervalRef.current);
          }
          setIsAutoSolving(false);
          handlePuzzleSolved();
          return prevGrid;
        }

        // Find a tile that can be moved
        const validMoves: { row: number; col: number }[] = [];

        for (let row = 0; row < prevGrid.length; row++) {
          for (let col = 0; col < prevGrid[row].length; col++) {
            if (canMoveTile(prevGrid, { row, col })) {
              validMoves.push({ row, col });
            }
          }
        }

        if (validMoves.length > 0) {
          // Instead of random moves, we could implement a smarter solution
          // that moves toward the solution, but for this demo we'll still
          // use a simplified approach
          const randomMove =
            validMoves[Math.floor(Math.random() * validMoves.length)];
          moveCount++;
          return moveTile(prevGrid, randomMove);
        }

        return prevGrid;
      });
    }, solveInterval);
  };

  // Reset the puzzle
  const handleReset = () => {
    const newGrid = createPuzzleGrid(3, 3);
    const shuffledGrid = shufflePuzzle(newGrid, 20);

    setGrid(shuffledGrid);
    setIsSolved(false);
    setShowPlayButton(false);
    setIsAutoSolving(false);

    // Reset stats
    setGameStats({
      moves: 0,
      startTime: Date.now(),
    });

    // Reset timers
    resetInactivityTimer();
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
            src={imageUrl}
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
                    imageUrl={imageUrl}
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
          <div className="flex flex-col items-center gap-4">
            <Button
              className="bg-white text-black hover:bg-white/90 shadow-lg"
              size="lg"
              asChild
            >
              <Link href="/game">Play Now</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              Try Again
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
