export type GameState = "setup" | "playing" | "completed" | "loading";

export type Position = {
  row: number;
  col: number;
};

export type Tile = {
  id: number;
  position: Position;
  correctPosition: Position;
  imageUrl?: string;
};

export type PuzzleGrid = Tile[][];

export type PuzzleConfig = {
  rows: number;
  cols: number;
  image: string;
};

export type MoveDirection = "up" | "down" | "left" | "right";

export type GameStats = {
  moves: number;
  startTime: number;
  endTime?: number;
};
