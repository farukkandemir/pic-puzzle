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
import { toast } from "sonner";

// Function to crop an image to a square
const cropImageToSquare = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Create canvas for cropping
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Calculate the square dimensions (use the smaller dimension)
      const size = Math.min(img.width, img.height);

      // Set canvas size to the square dimensions
      canvas.width = size;
      canvas.height = size;

      // Calculate centering offset
      const offsetX = (img.width - size) / 2;
      const offsetY = (img.height - size) / 2;

      // Draw the centered square portion of the image on the canvas
      ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

      // Convert to data URL and resolve
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(dataUrl);
    };

    img.onerror = () => {
      reject(new Error("Error loading image"));
    };

    img.src = imageUrl;
  });
};

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
  const [isLoading, setIsLoading] = useState(false);

  // Create a new puzzle when an image is selected
  const handleImageSelected = async (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsLoading(true);
    setGameState("loading");

    try {
      // Crop the image to a square
      const croppedImageUrl = await cropImageToSquare(imageUrl);

      // Create a 3x3 grid
      const grid = createPuzzleGrid(3, 3);
      setOriginalGrid(JSON.parse(JSON.stringify(grid)));

      // Shuffle the grid
      const shuffledGrid = shufflePuzzle(grid, 50);
      setPuzzleGrid(shuffledGrid);

      // Set the selected image to the cropped version
      setSelectedImage(croppedImageUrl);

      // Start the game
      setGameStats({
        moves: 0,
        startTime: Date.now(),
      });
      setIsLoading(false);
      setGameState("playing");
    } catch (error) {
      setSelectedImage(null);
      setIsLoading(false);
      setGameState("setup");
      toast.error("Failed to process image. Please try another image.");
    }
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

    // Show success toast
    toast.success("Puzzle Solved!", {
      description: `You completed the puzzle in ${Math.floor(
        (stats.endTime! - stats.startTime) / 1000
      )} seconds with ${stats.moves} moves.`,
    });
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden rounded">
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
              <div className="bg-primary/70"></div>
              <div className="bg-primary"></div>
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
      <main className="max-w-7xl mx-auto w-full p-4 flex-1 flex items-center justify-center">
        <Card className="p-6 shadow-lg w-full max-w-3xl">
          {gameState === "setup" ? (
            <ImageUploader onImageSelected={handleImageSelected} />
          ) : gameState === "loading" ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-center text-muted-foreground">
                Loading your puzzle...
              </p>
            </div>
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
