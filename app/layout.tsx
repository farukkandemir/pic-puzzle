import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PicPuzzle - Turn Images into Fun Sliding Puzzles",
  description:
    "Upload and transform your favorite photos into fun sliding puzzles. Challenge yourself or friends to solve them and track your best times.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
