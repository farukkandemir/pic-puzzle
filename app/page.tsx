"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroInteractivePuzzle from "@/components/HeroInteractivePuzzle";

// Header Component
const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center backdrop-blur-sm bg-background/80 sticky top-0 z-10 border-b border-border">
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

// Hero Section Component
const HeroSection = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center relative overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2 flex-shrink-0 order-2 lg:order-1 text-left lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Turn Images into <span className="text-primary">Fun Puzzles</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 mb-8">
            Upload your favorite photos, transform them into interactive
            puzzles, and challenge yourself or friends to solve them.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/game">
              <Button
                size="lg"
                className="text-base px-8 py-6 shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Playing
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 border-border hover:bg-muted/50"
              asChild
            >
              <a href="#puzzle-types">Explore Puzzle Types</a>
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex-shrink-0 order-1 lg:order-2">
          <HeroInteractivePuzzle />
        </div>
      </div>
    </main>
  );
};

// Sliding Puzzle Preview Component
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

// Jigsaw Puzzle Preview Component
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

// Feature List Item Component
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-3 w-3 ${
          available ? "text-primary-foreground" : "text-white"
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {available ? (
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </div>
    <span className="text-sm text-foreground/80">{text}</span>
  </li>
);

// Feature Card Component
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${iconColorClass}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="text-lg font-medium text-foreground">Coming Soon!</div>
      <p className="text-sm text-foreground/80 mt-2">
        We're working hard to bring you the jigsaw puzzle experience.
      </p>
      <div className="mt-6">
        <Button
          variant="outline"
          disabled
          className="border-chart-2/20 text-muted-foreground"
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
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                  className="border-border text-muted-foreground"
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
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            title="Upload Your Images"
            description="Use your own photos to create custom puzzles that are meaningful to you."
            bgColorClass="bg-primary/10 dark:bg-primary/20"
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary-foreground dark:text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
            }
            title="Multiple Puzzle Types"
            description="Choose between sliding puzzles and jigsaw puzzles (coming soon) for different challenges."
            bgColorClass="bg-secondary/20 dark:bg-secondary/20"
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-accent-foreground dark:text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
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
