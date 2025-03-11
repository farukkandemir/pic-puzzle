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

  // Calculate tile position based on its ID
  // This ensures each tile shows the correct part of the image
  const correctRow = Math.floor((tile.id - 1) / gridSize);
  const correctCol = (tile.id - 1) % gridSize;

  // For a perfectly square cropped image:
  // - Each tile should display exactly 1/gridSize of the image width and height
  // - We use 100% * gridSize as the background size (300% for a 3x3 grid)
  // - We position the background image to show the correct portion for this tile
  const bgSize = gridSize * 100; // e.g., 300% for a 3x3 grid
  const bgPosX = -(correctCol * 100);
  const bgPosY = -(correctRow * 100);

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
      {/* For debugging - uncomment to show tile IDs */}
      {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-bold">
        {tile.id}
      </div> */}
    </div>
  );
};

export default PuzzleTile;
