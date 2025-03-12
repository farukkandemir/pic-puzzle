"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type GridSize = 3 | 4 | 5 | 6;

interface GridSizeSelectorProps {
  selectedSize: GridSize;
  onSizeChange: (size: GridSize) => void;
  className?: string;
}

const GridSizeSelector = ({
  selectedSize,
  onSizeChange,
  className,
}: GridSizeSelectorProps) => {
  const sizes: GridSize[] = [3, 4, 5, 6];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center mb-2">
        <h3 className="text-base font-medium">Grid Size</h3>
        <p className="text-sm text-muted-foreground">
          Select puzzle difficulty
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
              "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
              selectedSize === size
                ? "border-primary bg-primary/10"
                : "border-border"
            )}
            aria-label={`${size}x${size} grid`}
          >
            {/* Visual representation of the grid */}
            <div className="flex flex-col items-center">
              <div
                className="grid gap-0.5 mb-2"
                style={{
                  gridTemplateColumns: `repeat(${size}, 1fr)`,
                  width: size === 3 ? "30px" : size === 4 ? "36px" : "40px",
                }}
              >
                {Array.from({ length: size * size }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-foreground/80"
                    style={{
                      width: size === 3 ? "8px" : size === 4 ? "7px" : "6px",
                      height: size === 3 ? "8px" : size === 4 ? "7px" : "6px",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {size}×{size}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Difficulty labels */}
      <div className="flex justify-between px-1 text-xs text-muted-foreground">
        <span>Easier</span>
        <span>Harder</span>
      </div>
    </div>
  );
};

export default GridSizeSelector;
