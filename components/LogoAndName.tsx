import React from "react";

const LogoAndName = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 bg-background/90 rounded-lg overflow-hidden shadow-md border border-border">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          <div className="bg-primary/90 hover:bg-primary transition-colors duration-300"></div>
          <div className="bg-accent/90 hover:bg-accent transition-colors duration-300"></div>
          <div className="bg-secondary/90 hover:bg-secondary transition-colors duration-300"></div>
          <div className="bg-chart-2/90 hover:bg-chart-2 transition-colors duration-300"></div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        <span className="text-primary">Pic</span>Puzzle
      </h1>
    </div>
  );
};

export default LogoAndName;
