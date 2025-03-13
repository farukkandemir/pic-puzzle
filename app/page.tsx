"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroInteractivePuzzle from "@/components/HeroInteractivePuzzle";
import {
  Image as ImageIcon,
  Puzzle,
  BarChart3,
  Check,
  Clock,
  Info,
  Grid3X3,
  Timer,
  Instagram,
} from "lucide-react";
import LogoAndName from "@/components/LogoAndName";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center backdrop-blur-sm bg-background/80 sticky top-0 z-10 border-b border-border">
      <LogoAndName />
      <nav className="hidden md:flex gap-8">
        <a
          href="#features"
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Features
        </a>
        <a
          href="#puzzle-types"
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Puzzle Types
        </a>
        <a
          href="#how-to-play"
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          How to Play
        </a>
      </nav>
    </header>
  );
};

const HeroSection = () => {
  return (
    <main className="flex-1 relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden md:block absolute top-20 right-10 opacity-10">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H8V4H14V8H18V14H14V18H8V14H4V8Z"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="hidden md:block absolute bottom-20 left-10 opacity-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H8V4H14V8H18V14H14V18H8V14H4V8Z"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero content container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column: Text content */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Turn your photos into puzzles
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                Challenge Your{" "}
                <span className="text-primary relative">
                  Mind
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-primary/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q25,0 50,5 T100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                </span>{" "}
                with Picture Puzzles
              </h1>

              <p className="text-lg sm:text-xl text-foreground/80 max-w-xl">
                Upload your favorite photos, transform them into interactive
                puzzles, and challenge yourself or friends to solve them.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button
                size="lg"
                className="text-base px-8 py-6 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                asChild
              >
                <Link href="/game">
                  <span className="relative z-10">Start Playing</span>
                  <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 border-border hover:bg-muted/50 hover:text-primary cursor-pointer relative overflow-hidden group"
                asChild
              >
                <a href="#puzzle-types">
                  <span className="relative z-10">Explore Puzzle Types</span>
                  <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </a>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-border/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Grid3X3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Multiple Layouts
                  </h3>
                  <p className="text-sm text-foreground/70">
                    3x3, 4x4, and more coming soon
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Timer className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Track Progress
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Monitor moves and time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Interactive puzzle */}
          <div className="relative group">
            {/* Main puzzle container with improved styling - removed backdrop blur */}
            <div className="relative bg-card/70 rounded-xl border border-border/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
              {/* Decorative puzzle pattern background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="puzzle-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M10,0 H30 V10 H40 V30 H30 V40 H10 V30 H0 V10 H10 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#puzzle-pattern)"
                  />
                </svg>
              </div>

              {/* Puzzle title banner */}
              <div className="relative px-6 py-3 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-border/50">
                <h3 className="text-sm font-medium text-foreground/90 flex items-center">
                  <Puzzle className="w-4 h-4 mr-2 text-primary" />
                  Interactive Puzzle
                  <span className="ml-auto text-xs text-foreground/60">
                    Try it out!
                  </span>
                </h3>
              </div>

              {/* Puzzle content with inner frame */}
              <div className="p-6">
                <div className="aspect-square w-full max-w-md mx-auto relative">
                  {/* Corner accents for inner frame */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-md"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-md"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-md"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br-md"></div>

                  {/* The interactive puzzle component */}
                  <div className="w-full h-full flex items-center justify-center">
                    <HeroInteractivePuzzle />
                  </div>
                </div>
              </div>

              {/* Footer with stats and info */}
              <div className="px-6 py-3 bg-muted/30 border-t border-border/50 flex justify-between items-center text-xs text-foreground/70">
                <div className="flex items-center gap-3">
                  <span className="flex items-center">
                    <Instagram className="h-3.5 w-3.5 mr-1" />
                    Upload Your Image
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Track Time</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Floating puzzle pieces */}
            <div className="absolute top-5 -right-10 w-8 h-8 opacity-40 transform rotate-12">
              <Puzzle className="h-8 w-8 text-primary/40" />
            </div>
            <div className="absolute -bottom-5 -left-10 w-7 h-7 opacity-30 transform -rotate-12">
              <Puzzle className="h-7 w-7 text-secondary/40" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const SlidingPuzzlePreview = () => (
  <div className="bg-card dark:bg-card rounded-xl p-6 aspect-square max-w-xs mx-auto shadow-md border border-border relative overflow-hidden group">
    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1.5 relative z-10">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`bg-muted dark:bg-muted rounded-md flex items-center justify-center text-lg font-bold ${
            i === 8 ? "opacity-0" : ""
          }`}
        >
          {i !== 8 ? i + 1 : ""}
        </div>
      ))}
    </div>
  </div>
);

const JigsawPuzzlePreview = () => (
  <div className="bg-card dark:bg-card rounded-xl p-6 aspect-square max-w-xs mx-auto relative overflow-hidden shadow-md border border-border">
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const randomOffset = Math.random() * 8 - 4;
        return (
          <div
            key={i}
            className="relative"
            style={{
              transform: `translate(${randomOffset}px, ${randomOffset}px) rotate(${randomOffset}deg)`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d={`M0,0 L100,0 L100,100 L0,100 Z`}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <path
                d={`M${col === 0 ? 0 : 50},${row === 0 ? 0 : 50} L${
                  col === 2 ? 100 : 50
                },${row === 0 ? 0 : 50} L${col === 2 ? 100 : 50},${
                  row === 2 ? 100 : 50
                } L${col === 0 ? 0 : 50},${row === 2 ? 100 : 50} Z`}
                fill="#f1f5f9"
                className="dark:fill-muted"
              />
            </svg>
          </div>
        );
      })}
    </div>
  </div>
);

const FeatureListItem = ({
  available,
  text,
}: {
  available: boolean;
  text: string;
}) => (
  <li className="flex items-start gap-3">
    <div
      className={`rounded-full ${
        available ? "bg-primary" : "bg-chart-2"
      } p-1 mt-1`}
    >
      {available ? (
        <Check className="h-3 w-3 text-primary-foreground" />
      ) : (
        <Clock className="h-3 w-3 text-white" />
      )}
    </div>
    <span className="text-sm text-foreground/80">{text}</span>
  </li>
);

const FeatureCard = ({
  icon,
  title,
  description,
  bgColorClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColorClass: string;
}) => (
  <Card className="bg-card dark:bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 group">
    <CardHeader className="pb-4">
      <div
        className={`w-12 h-12 rounded-lg ${bgColorClass} flex items-center justify-center mb-3 group-hover:${bgColorClass
          .replace("/10", "/20")
          .replace("/20", "/30")} transition-colors`}
      >
        {icon}
      </div>
      <CardTitle className="text-xl text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-foreground/80">{description}</p>
    </CardContent>
  </Card>
);

// Step Component
const Step = ({
  number,
  title,
  description,
  colorClass,
}: {
  number: number;
  title: string;
  description: string;
  colorClass: string;
}) => (
  <div className="flex gap-4">
    <div
      className={`flex-shrink-0 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-primary-foreground font-bold shadow-sm`}
    >
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </div>
  </div>
);

// Tips Box Component
const TipsBox = ({
  title,
  tips,
  colorClass,
  iconColorClass,
}: {
  title: string;
  tips: string[];
  colorClass: string;
  iconColorClass: string;
}) => (
  <div
    className={`${colorClass} p-5 rounded-lg mt-8 border ${colorClass
      .replace("/5", "/10")
      .replace("/10", "/20")}`}
  >
    <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
      <Info className={`h-5 w-5 ${iconColorClass}`} />
      {title}
    </h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
      {tips.map((tip, index) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
  </div>
);

// Sliding Puzzle Demo Component
const SlidingPuzzleDemo = () => (
  <div className="bg-card dark:bg-card p-6 rounded-xl shadow-md border border-border">
    <div className="aspect-square relative">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`bg-muted dark:bg-muted rounded-md flex items-center justify-center text-lg font-bold ${
              i === 8 ? "opacity-0" : ""
            }`}
          >
            {i !== 8 ? i + 1 : ""}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Jigsaw Puzzle Coming Soon Component
const JigsawComingSoon = () => (
  <div className="bg-chart-2/5 dark:bg-chart-2/10 p-6 rounded-xl shadow-md border border-chart-2/20 dark:border-chart-2/20 text-center">
    <div className="aspect-square relative flex items-center justify-center">
      <div className="text-chart-2 dark:text-chart-2 mb-4">
        <Clock className="h-16 w-16 mx-auto" />
      </div>
      <div className="text-lg font-medium text-foreground">Coming Soon!</div>
      <p className="text-sm text-foreground/80 mt-2">
        We&apos;re working hard to bring you the jigsaw puzzle experience.
      </p>
      <div className="mt-6">
        <Button
          variant="outline"
          disabled
          className="border-chart-2/20 text-muted-foreground cursor-pointer"
        >
          Stay Tuned
        </Button>
      </div>
    </div>
  </div>
);

// Puzzle Types Section Component
const PuzzleTypesSection = () => {
  return (
    <section
      id="puzzle-types"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Choose Your Puzzle Type
        </h2>

        <Tabs defaultValue="sliding" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-10 bg-background/20 backdrop-blur-sm rounded-lg">
            <TabsTrigger
              value="sliding"
              className="px-4 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Sliding Puzzle
            </TabsTrigger>
            <TabsTrigger
              value="jigsaw"
              className="px-4 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Jigsaw Puzzle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sliding" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <SlidingPuzzlePreview />

              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-foreground">
                  Sliding Puzzle
                </h3>
                <p className="text-foreground/80">
                  The classic sliding puzzle challenges you to rearrange
                  scrambled tiles by sliding them into the empty space. Restore
                  the original image by making strategic moves.
                </p>
                <ul className="space-y-3">
                  <FeatureListItem available={true} text="Available now" />
                  <FeatureListItem
                    available={true}
                    text="3x3 grid (more sizes coming soon)"
                  />
                  <FeatureListItem
                    available={true}
                    text="Track moves and completion time"
                  />
                </ul>
                <Link href="/game">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    Play Now
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jigsaw" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <JigsawPuzzlePreview />

              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-foreground">
                  Jigsaw Puzzle
                </h3>
                <p className="text-foreground/80">
                  The traditional jigsaw puzzle experience lets you piece
                  together irregularly shaped pieces to recreate the original
                  image. Drag and drop pieces into place.
                </p>
                <ul className="space-y-3">
                  <FeatureListItem available={false} text="Coming soon" />
                  <FeatureListItem
                    available={false}
                    text="Multiple difficulty levels"
                  />
                  <FeatureListItem
                    available={false}
                    text="Drag, drop, and rotate pieces"
                  />
                </ul>
                <Button
                  variant="outline"
                  disabled
                  className="border-border text-muted-foreground cursor-pointer"
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Game Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ImageIcon className="h-6 w-6 text-primary" />}
            title="Upload Your Images"
            description="Use your own photos to create custom puzzles that are meaningful to you."
            bgColorClass="bg-primary/10 dark:bg-primary/20"
          />
          <FeatureCard
            icon={
              <Puzzle className="h-6 w-6 text-secondary-foreground dark:text-secondary" />
            }
            title="Multiple Puzzle Types"
            description="Choose between sliding puzzles and jigsaw puzzles (coming soon) for different challenges."
            bgColorClass="bg-secondary/20 dark:bg-secondary/20"
          />
          <FeatureCard
            icon={
              <BarChart3 className="h-6 w-6 text-accent-foreground dark:text-accent" />
            }
            title="Track Your Progress"
            description="Monitor your moves and completion time to improve your puzzle-solving skills."
            bgColorClass="bg-accent/20 dark:bg-accent/20"
          />
        </div>
      </div>
    </section>
  );
};

// How to Play Section Component
const HowToPlaySection = () => {
  return (
    <section
      id="how-to-play"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          How to Play
        </h2>

        <Tabs
          defaultValue="sliding-how-to"
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-10 bg-background/20 backdrop-blur-sm rounded-lg">
            <TabsTrigger
              value="sliding-how-to"
              className="px-4 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Sliding Puzzle
            </TabsTrigger>
            <TabsTrigger
              value="jigsaw-how-to"
              className="px-4 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Jigsaw Puzzle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sliding-how-to" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Step
                  number={1}
                  title="Upload an Image"
                  description="Choose a photo from your device to create your custom puzzle."
                  colorClass="bg-primary"
                />
                <Step
                  number={2}
                  title="Start the Game"
                  description="Your image will be divided into a 3x3 grid and shuffled automatically."
                  colorClass="bg-primary"
                />
                <Step
                  number={3}
                  title="Move the Tiles"
                  description="Click on tiles adjacent to the empty space to move them. Only tiles next to the empty space can be moved."
                  colorClass="bg-primary"
                />
                <Step
                  number={4}
                  title="Complete the Puzzle"
                  description="Rearrange all tiles to their original positions to solve the puzzle."
                  colorClass="bg-primary"
                />
              </div>
              <SlidingPuzzleDemo />
            </div>

            <TipsBox
              title="Pro Tips"
              tips={[
                "Plan your moves ahead - think about the sequence of moves needed to position each tile",
                "Focus on solving one row or column at a time, starting from the top or left",
                "Once you've positioned the first two rows correctly, the bottom row can be solved as a single unit",
              ]}
              colorClass="bg-primary/5 dark:bg-primary/10"
              iconColorClass="text-primary"
            />
          </TabsContent>

          <TabsContent value="jigsaw-how-to" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Step
                  number={1}
                  title="Upload an Image"
                  description="Choose a photo from your device to create your custom jigsaw puzzle."
                  colorClass="bg-chart-2"
                />
                <Step
                  number={2}
                  title="Select Difficulty"
                  description="Choose the number of pieces for your puzzle based on your skill level."
                  colorClass="bg-chart-2"
                />
                <Step
                  number={3}
                  title="Arrange the Pieces"
                  description="Drag and drop pieces to position them. Pieces will snap together when correctly aligned."
                  colorClass="bg-chart-2"
                />
                <Step
                  number={4}
                  title="Complete the Image"
                  description="Connect all pieces to recreate the original image and complete the puzzle."
                  colorClass="bg-chart-2"
                />
              </div>
              <JigsawComingSoon />
            </div>

            <TipsBox
              title="Jigsaw Strategy"
              tips={[
                "Start by finding and connecting all the edge pieces to create the frame",
                "Group pieces by color or pattern to make it easier to find matches",
                "Work on small sections and then connect them to complete the puzzle",
              ]}
              colorClass="bg-chart-2/5 dark:bg-chart-2/10"
              iconColorClass="text-chart-2"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-background border-t border-border text-center">
      <p className="text-sm text-foreground/60">
        © {new Date().getFullYear()} PicPuzzle. All rights reserved.
      </p>
    </footer>
  );
};

// Main Home Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background/95 via-primary/5 to-background/95">
      <Header />
      <HeroSection />
      <PuzzleTypesSection />
      <FeaturesSection />
      <HowToPlaySection />
      <Footer />
    </div>
  );
}
