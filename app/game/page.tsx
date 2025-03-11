"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import PuzzleBoard from "@/components/PuzzleBoard";
import GameControls from "@/components/GameControls";
import WinModal from "@/components/WinModal";
import { GameState, PuzzleGrid, GameStats } from "@/lib/types";
import { createPuzzleGrid, shufflePuzzle } from "@/lib/utils";

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGrid>([]);
  const [originalGrid, setOriginalGrid] = useState<PuzzleGrid>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    startTime: Date.now(),
  });
  const [showWinModal, setShowWinModal] = useState(false);

  // Create a new puzzle when an image is selected
  const handleImageSelected = (imageUrl: string) => {
    setSelectedImage(imageUrl);

    // Create a 3x3 grid
    const grid = createPuzzleGrid(3, 3);
    setOriginalGrid(JSON.parse(JSON.stringify(grid)));

    // Shuffle the grid
    const shuffledGrid = shufflePuzzle(grid);
    setPuzzleGrid(shuffledGrid);

    // Start the game
    setGameStats({
      moves: 0,
      startTime: Date.now(),
    });
    setGameState("playing");
  };

  // Handle grid changes (tile moves)
  const handleGridChange = (newGrid: PuzzleGrid) => {
    setPuzzleGrid(newGrid);
    setGameStats((prev) => ({
      ...prev,
      moves: prev.moves + 1,
    }));
  };

  // Handle puzzle solved
  const handlePuzzleSolved = (stats: GameStats) => {
    setGameStats(stats);
    setShowWinModal(true);
    setGameState("completed");
  };

  // Shuffle the puzzle
  const handleShuffle = () => {
    const shuffledGrid = shufflePuzzle(puzzleGrid);
    setPuzzleGrid(shuffledGrid);
    setGameStats({
      moves: 0,
      startTime: Date.now(),
    });
  };

  // Reset the puzzle to its original state
  const handleReset = () => {
    setPuzzleGrid(JSON.parse(JSON.stringify(originalGrid)));
    setGameStats({
      moves: 0,
      startTime: Date.now(),
    });
  };

  // Start a new game
  const handleNewGame = () => {
    setGameState("setup");
    setSelectedImage(null);
    setShowWinModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-primary rounded-lg overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
              <div className="bg-primary-foreground/80"></div>
              <div className="bg-primary-foreground/60"></div>
              <div className="bg-primary-foreground/40"></div>
              <div className="bg-primary-foreground/90"></div>
            </div>
          </div>
          <h1 className="text-xl font-bold text-primary">PicPuzzle</h1>
        </Link>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <Card className="p-6 shadow-lg">
          {gameState === "setup" ? (
            <ImageUploader onImageSelected={handleImageSelected} />
          ) : (
            <div className="space-y-8">
              {selectedImage && (
                <PuzzleBoard
                  grid={puzzleGrid}
                  imageUrl={selectedImage}
                  onGridChange={handleGridChange}
                  onPuzzleSolved={handlePuzzleSolved}
                  gameStats={gameStats}
                />
              )}

              <GameControls
                onShuffle={handleShuffle}
                onReset={handleReset}
                onNewGame={handleNewGame}
                isPlaying={gameState === "playing"}
              />
            </div>
          )}
        </Card>
      </main>

      {/* Win Modal */}
      <WinModal
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        onNewGame={handleNewGame}
        stats={gameStats}
      />
    </div>
  );
}
