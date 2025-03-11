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

type WinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
  stats: GameStats;
};

const WinModal = ({ isOpen, onClose, onNewGame, stats }: WinModalProps) => {
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

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Time</div>
            <div className="text-2xl font-bold">{formatTime(totalTime)}</div>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Moves</div>
            <div className="text-2xl font-bold">{stats.moves}</div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-full">
            Close
          </Button>
          <Button onClick={onNewGame} className="sm:w-full">
            New Puzzle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;
