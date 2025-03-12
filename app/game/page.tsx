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
import { GridSize } from "@/components/ImageUploader";
import LogoAndName from "@/components/LogoAndName";

// Generate a low quality placeholder image
const generatePlaceholder = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Create canvas for tiny placeholder
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Create a very small version (10px)
      const size = 10;
      canvas.width = size;
      canvas.height = size;

      // Draw the image at tiny size
      ctx.drawImage(img, 0, 0, size, size);

      // Convert to data URL with low quality
      const placeholderUrl = canvas.toDataURL("image/jpeg", 0.1);
      resolve(placeholderUrl);
    };

    img.onerror = () => {
      reject(new Error("Error generating placeholder"));
    };

    img.src = imageUrl;
  });
};

// Function to crop an image to a square with progressive loading
const cropImageToSquare = (
  imageUrl: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    // Report start of loading
    if (onProgress) onProgress(10);

    img.onload = () => {
      // Report image loaded
      if (onProgress) onProgress(50);

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

      // Report processing
      if (onProgress) onProgress(70);

      // Draw the centered square portion of the image on the canvas
      ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

      // Report almost complete
      if (onProgress) onProgress(90);

      // Optimize image size based on dimensions
      const quality = size > 1000 ? 0.7 : 0.9; // Lower quality for very large images

      // Convert to data URL
      const dataUrl = canvas.toDataURL("image/jpeg", quality);

      // Report complete
      if (onProgress) onProgress(100);

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
  const [placeholderImage, setPlaceholderImage] = useState<string | null>(null);
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGrid>([]);
  const [originalGrid, setOriginalGrid] = useState<PuzzleGrid>([]);
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    startTime: Date.now(),
  });
  const [showWinModal, setShowWinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Create a new puzzle when an image is selected
  const handleImageSelected = async (imageUrl: string, size: GridSize) => {
    setIsLoading(true);
    setLoadingProgress(0);
    setGameState("loading");
    setGridSize(size);

    try {
      // Generate a low quality placeholder immediately
      const placeholder = await generatePlaceholder(imageUrl);
      setPlaceholderImage(placeholder);
      setSelectedImage(placeholder); // Show placeholder while processing
      setLoadingProgress(20);

      // Process the image with progress updates
      const croppedImageUrl = await cropImageToSquare(imageUrl, (progress) => {
        // Update loading progress
        setLoadingProgress(20 + Math.floor(progress * 0.6)); // 20% to 80%
      });

      // Create a grid with the specified size
      const grid = createPuzzleGrid(size, size);
      setOriginalGrid(JSON.parse(JSON.stringify(grid)));
      setLoadingProgress(85);

      // Shuffle the grid - more shuffles for larger grids
      const shuffleCount = size * 20; // Scale shuffle count with grid size
      const shuffledGrid = shufflePuzzle(grid, shuffleCount);
      setPuzzleGrid(shuffledGrid);
      setLoadingProgress(95);

      // Set the selected image to the processed version
      setSelectedImage(croppedImageUrl);
      setLoadingProgress(100);

      // Start the game
      setGameStats({
        moves: 0,
        startTime: Date.now(),
      });

      // Short delay before changing state to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
        setGameState("playing");
      }, 500);
    } catch (error) {
      setSelectedImage(null);
      setPlaceholderImage(null);
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

  // Render loading progress indicator
  const renderLoadingIndicator = () => {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="w-full max-w-xs mb-4">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {loadingProgress < 100 ? "Processing image..." : "Starting game..."}
          </p>
        </div>

        {placeholderImage && (
          <div className="relative mt-4 w-40 h-40 rounded overflow-hidden">
            <img
              src={placeholderImage}
              alt="Processing"
              className="w-full h-full object-cover filter blur-sm"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center backdrop-blur-sm bg-background/80 sticky top-0 z-10 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <LogoAndName />
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
            renderLoadingIndicator()
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
      {showWinModal && selectedImage && (
        <WinModal
          isOpen={showWinModal}
          onClose={() => setShowWinModal(false)}
          stats={gameStats}
          onNewGame={handleNewGame}
          onPlayAgain={handleReset}
          gridSize={gridSize}
        />
      )}
    </div>
  );
}
