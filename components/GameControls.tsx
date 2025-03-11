"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <Button
        variant="outline"
        onClick={handleShuffle}
        className="flex-1 min-w-[120px] max-w-[200px]"
      >
        Shuffle
      </Button>
      <Button
        variant="outline"
        onClick={handleReset}
        className="flex-1 min-w-[120px] max-w-[200px]"
      >
        Reset
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 min-w-[120px] max-w-[200px]"
          >
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleNewGame}>New Game</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GameControls;
