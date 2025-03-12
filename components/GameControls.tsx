"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Shuffle, RotateCcw, Settings } from "lucide-react";

type GameControlsProps = {
  onShuffle: () => void;
  onReset: () => void;
  onNewGame: () => void;
  isPlaying: boolean;
};

const GameControls = ({
  onShuffle,
  onReset,
  onNewGame,
  isPlaying,
}: GameControlsProps) => {
  const handleShuffle = () => {
    onShuffle();
    toast.info("Puzzle shuffled", {
      description: "The puzzle has been shuffled. Good luck!",
    });
  };

  const handleReset = () => {
    onReset();
    toast.info("Puzzle reset", {
      description: "The puzzle has been reset to its original state.",
    });
  };

  const handleNewGame = () => {
    onNewGame();
  };

  if (!isPlaying) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-5">
      <Button
        variant="outline"
        onClick={handleShuffle}
        className="flex-1 min-w-[100px] max-w-[180px] h-9 text-sm gap-1.5"
        size="sm"
      >
        <Shuffle className="h-3.5 w-3.5" />
        Shuffle
      </Button>

      <Button
        variant="outline"
        onClick={handleReset}
        className="flex-1 min-w-[100px] max-w-[180px] h-9 text-sm gap-1.5"
        size="sm"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 min-w-[100px] max-w-[180px] h-9 text-sm gap-1.5"
            size="sm"
          >
            <Settings className="h-3.5 w-3.5" />
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={handleNewGame}
            className="text-sm cursor-pointer"
          >
            New Game
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleShuffle}
            className="text-sm cursor-pointer"
          >
            Reshuffle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GameControls;
