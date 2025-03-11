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
          Upload your favorite photos, transform them into interactive sliding
          puzzles, and challenge yourself or friends to solve them.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/game">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Playing
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            Learn More
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

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
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
                  Use your own photos or choose from our gallery to create
                  custom puzzles.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Solve the Puzzle</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Slide the tiles to rearrange the image and complete the
                  puzzle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Challenge Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Share your puzzles and compete for the fastest solving time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section
        id="how-to-play"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Play</h2>
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
                    Choose a photo from your device or select one from our
                    gallery.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Start the Game</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The image will be divided into a 3x3 grid and shuffled.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Solve the Puzzle
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click on tiles adjacent to the empty space to move them and
                    reconstruct the image.
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
