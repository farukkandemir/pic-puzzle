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
import { Trophy, Clock, Move, Grid } from "lucide-react";

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
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Puzzle Solved!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Congratulations! You&apos;ve successfully completed the puzzle.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 py-4">
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Time</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {formatTime(totalTime)}
            </div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Move className="h-3 w-3" />
              <span>Moves</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{stats.moves}</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Grid className="h-3 w-3" />
              <span>Grid</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {gridSize}×{gridSize}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="sm:flex-1 h-9 text-sm"
            size="sm"
          >
            Close
          </Button>
          {onPlayAgain && (
            <Button
              variant="secondary"
              onClick={onPlayAgain}
              className="sm:flex-1 h-9 text-sm"
              size="sm"
            >
              Play Again
            </Button>
          )}
          <Button
            onClick={onNewGame}
            className="sm:flex-1 h-9 text-sm"
            size="sm"
          >
            New Puzzle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;
