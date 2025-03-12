"use client";

import { GameStats } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GridSize } from "./ImageUploader";

type WinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onPlayAgain?: () => void;
  stats: GameStats;
  gridSize: GridSize;
};

const WinModal = ({
  isOpen,
  onClose,
  onNewGame,
  onPlayAgain,
  stats,
  gridSize,
}: WinModalProps) => {
  // Calculate total time
  const totalTime = stats.endTime
    ? Math.floor((stats.endTime - stats.startTime) / 1000)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎉 Puzzle Solved! 🎉
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Congratulations! You've successfully completed the puzzle.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 py-4">
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Time</div>
            <div className="text-xl md:text-2xl font-bold">
              {formatTime(totalTime)}
            </div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Moves</div>
            <div className="text-xl md:text-2xl font-bold">{stats.moves}</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Grid</div>
            <div className="text-xl md:text-2xl font-bold">
              {gridSize}×{gridSize}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:flex-1">
            Close
          </Button>
          {onPlayAgain && (
            <Button
              variant="secondary"
              onClick={onPlayAgain}
              className="sm:flex-1"
            >
              Play Again
            </Button>
          )}
          <Button onClick={onNewGame} className="sm:flex-1">
            New Puzzle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;
