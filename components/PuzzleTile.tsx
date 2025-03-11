"use client";

import { useState, useEffect } from "react";
import { Tile, Position } from "@/lib/types";
import { cn } from "@/lib/utils";

type PuzzleTileProps = {
  tile: Tile;
  imageUrl: string;
  tileSize: number;
  gridSize: number;
  isMovable: boolean;
  onTileClick: (position: Position) => void;
};

const PuzzleTile = ({
  tile,
  imageUrl,
  tileSize,
  gridSize,
  isMovable,
  onTileClick,
}: PuzzleTileProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Empty tile (id === 0) should be transparent
  if (tile.id === 0) {
    return (
      <div
        className="relative rounded-md"
        style={{ width: tileSize, height: tileSize }}
      />
    );
  }

  // Calculate the background position to show the correct part of the image
  const row = Math.floor((tile.id - 1) / gridSize);
  const col = (tile.id - 1) % gridSize;

  // The correct formula for background position
  // We need to calculate what percentage of the image each tile should show
  const bgSize = gridSize * 100; // e.g., 300% for a 3x3 grid
  const bgPosX = -(col * 100);
  const bgPosY = -(row * 100);

  const handleClick = () => {
    if (isMovable) {
      onTileClick(tile.position);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && isMovable) {
      onTileClick(tile.position);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden transition-all duration-200 transform cursor-pointer",
        {
          "hover:brightness-110": isMovable,
          "scale-95": isPressed,
          "opacity-80": isHovered && isMovable,
          "cursor-not-allowed": !isMovable,
        }
      )}
      style={{
        width: tileSize,
        height: tileSize,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${bgSize}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => isMovable && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      tabIndex={0}
      aria-label={`Puzzle tile ${tile.id}`}
      role="button"
    >
      {/* Uncomment this to debug tile IDs */}
      {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-xs">
        {tile.id}
      </div> */}
    </div>
  );
};

export default PuzzleTile;
