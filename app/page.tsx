import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 bg-primary rounded-lg overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
              <div className="bg-primary-foreground/80"></div>
              <div className="bg-primary-foreground/60"></div>
              <div className="bg-primary-foreground/40"></div>
              <div className="bg-primary-foreground/90"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary">PicPuzzle</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#puzzle-types"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Puzzle Types
          </a>
          <a
            href="#how-to-play"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How to Play
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Turn Images into <span className="text-primary">Fun Puzzles</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10">
          Upload your favorite photos, transform them into interactive puzzles,
          and challenge yourself or friends to solve them.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/game">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Playing
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6"
            asChild
          >
            <a href="#puzzle-types">Explore Puzzle Types</a>
          </Button>
        </div>

        {/* Preview Image */}
        <div className="mt-16 max-w-3xl mx-auto relative">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden p-4">
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gray-200 dark:bg-gray-700 rounded-md ${
                      i === 8 ? "opacity-0" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
        </div>
      </main>

      {/* Puzzle Types Section */}
      <section
        id="puzzle-types"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Puzzle Type
          </h2>

          <Tabs defaultValue="sliding" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="sliding">Sliding Puzzle</TabsTrigger>
              <TabsTrigger value="jigsaw">Jigsaw Puzzle</TabsTrigger>
            </TabsList>

            <TabsContent value="sliding" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 aspect-square max-w-xs mx-auto">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-lg font-bold ${
                          i === 8 ? "opacity-0" : ""
                        }`}
                      >
                        {i !== 8 ? i + 1 : ""}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Sliding Puzzle</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The classic sliding puzzle challenges you to rearrange
                    scrambled tiles by sliding them into the empty space.
                    Restore the original image by making strategic moves.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Available now</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        3x3 grid (more sizes coming soon)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 p-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        Track moves and completion time
                      </span>
                    </li>
                  </ul>
                  <Link href="/game">
                    <Button>Play Now</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jigsaw" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 aspect-square max-w-xs mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => {
                      const row = Math.floor(i / 3);
                      const col = i % 3;
                      const randomOffset = Math.random() * 10 - 5;
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
                              d={`M${col === 0 ? 0 : 50},${
                                row === 0 ? 0 : 50
                              } L${col === 2 ? 100 : 50},${
                                row === 0 ? 0 : 50
                              } L${col === 2 ? 100 : 50},${
                                row === 2 ? 100 : 50
                              } L${col === 0 ? 0 : 50},${
                                row === 2 ? 100 : 50
                              } Z`}
                              fill="#9CA3AF"
                              className="dark:fill-gray-600"
                            />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Jigsaw Puzzle</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The traditional jigsaw puzzle experience lets you piece
                    together irregularly shaped pieces to recreate the original
                    image. Drag and drop pieces into place.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-500 p-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Coming soon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-500 p-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        Multiple difficulty levels
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-500 p-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        Drag, drop, and rotate pieces
                      </span>
                    </li>
                  </ul>
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Game Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Images</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Use your own photos to create custom puzzles that are
                  meaningful to you.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Multiple Puzzle Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Choose between sliding puzzles and jigsaw puzzles (coming
                  soon) for different challenges.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Track Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Monitor your moves and completion time to improve your
                  puzzle-solving skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section
        id="how-to-play"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Play</h2>

          <Tabs
            defaultValue="sliding-how-to"
            className="w-full max-w-4xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="sliding-how-to">Sliding Puzzle</TabsTrigger>
              <TabsTrigger value="jigsaw-how-to">Jigsaw Puzzle</TabsTrigger>
            </TabsList>

            <TabsContent value="sliding-how-to" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Upload an Image
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Choose a photo from your device to create your custom
                        puzzle.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Start the Game
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Your image will be divided into a 3x3 grid and shuffled
                        automatically.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Move the Tiles
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Click on tiles adjacent to the empty space to move them.
                        Only tiles next to the empty space can be moved.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Complete the Puzzle
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Rearrange all tiles to their original positions to solve
                        the puzzle.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center text-lg font-bold ${
                            i === 8 ? "opacity-0" : ""
                          }`}
                        >
                          {i !== 8 ? i + 1 : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mt-8">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pro Tips
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Plan your moves ahead - think about the sequence of moves
                    needed to position each tile
                  </li>
                  <li>
                    Focus on solving one row or column at a time, starting from
                    the top or left
                  </li>
                  <li>
                    Once you've positioned the first two rows correctly, the
                    bottom row can be solved as a single unit
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="jigsaw-how-to" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Upload an Image
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Choose a photo from your device to create your custom
                        jigsaw puzzle.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Select Difficulty
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Choose the number of pieces for your puzzle based on
                        your skill level.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Arrange the Pieces
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Drag and drop pieces to position them. Pieces will snap
                        together when correctly aligned.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Complete the Image
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Connect all pieces to recreate the original image and
                        complete the puzzle.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl shadow-lg text-center">
                  <div className="aspect-square relative flex items-center justify-center">
                    <div className="text-amber-600 dark:text-amber-400 mb-4">
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
                    <div className="text-lg font-medium">Coming Soon!</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      We're working hard to bring you the jigsaw puzzle
                      experience.
                    </p>
                    <div className="mt-6">
                      <Button variant="outline" disabled>
                        Stay Tuned
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mt-8">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Jigsaw Strategy
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Start by finding and connecting all the edge pieces to
                    create the frame
                  </li>
                  <li>
                    Group pieces by color or pattern to make it easier to find
                    matches
                  </li>
                  <li>
                    Work on small sections and then connect them to complete the
                    puzzle
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} PicPuzzle. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
