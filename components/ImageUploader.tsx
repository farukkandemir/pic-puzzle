"use client";

import { useState, useRef, ChangeEvent, useCallback, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GridSizeSelector from "./GridSizeSelector";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

// Type definition for grid size
export type GridSize = 3 | 4 | 5 | 6;

// Sample gallery images
const GALLERY_IMAGES = [
  "/images/sample-1.jpg",
  "/images/sample-2.jpg",
  "/images/sample-3.jpg",
  "/images/sample-4.jpg",
  "/images/sample-5.jpg",
  "/images/sample-6.jpg",
];

type ImageUploaderProps = {
  onImageSelected: (imageUrl: string, gridSize: GridSize) => void;
};

// Setup steps
type SetupStep = "image-selection" | "grid-selection";

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [currentStep, setCurrentStep] = useState<SetupStep>("image-selection");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-optimize image before displaying
  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          // Resize images that are too large (keeping aspect ratio)
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = width * ratio;
            height = height * ratio;
          }

          // Create canvas for resizing
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          // Draw and export as JPEG with quality setting
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(dataUrl);
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };

        if (event.target?.result) {
          img.src = event.target.result as string;
        } else {
          reject(new Error("Failed to read file"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  };

  // Handle file upload
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please select an image smaller than 5MB.",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select a valid image file.",
      });
      return;
    }

    try {
      setIsUploading(true);
      const optimizedImageUrl = await optimizeImage(file);
      setSelectedImage(optimizedImageUrl);
      setImageLoaded(true);
      setIsUploading(false);

      // Automatically move to the next step after image is loaded
      setCurrentStep("grid-selection");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Upload failed", {
        description: "Failed to process the image. Please try again.",
      });
      setIsUploading(false);
    }
  };

  // Handle gallery image selection
  const handleGallerySelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageLoaded(true);

    // Automatically move to the next step after image is selected
    setCurrentStep("grid-selection");
  };

  // Handle grid size selection
  const handleGridSizeChange = (size: GridSize) => {
    setGridSize(size);
  };

  // Handle start game
  const handleStartGame = () => {
    if (selectedImage) {
      onImageSelected(selectedImage, gridSize);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep === "grid-selection") {
      setCurrentStep("image-selection");
    }
  };

  // Handle next button
  const handleNext = () => {
    if (currentStep === "image-selection" && selectedImage) {
      setCurrentStep("grid-selection");
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case "image-selection":
        return (
          <motion.div
            key="image-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose an Image</h2>
              <p className="text-muted-foreground">
                Select an image from our gallery or upload your own
              </p>
            </div>

            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gallery" className="gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gallery" className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {GALLERY_IMAGES.map((image, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImage === image
                          ? "border-primary shadow-md"
                          : "border-transparent hover:border-primary/50"
                      }`}
                      onClick={() => handleGallerySelect(image)}
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {selectedImage === image && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Processing image...
                      </p>
                    </div>
                  ) : selectedImage && currentStep === "image-selection" ? (
                    <div className="space-y-4 w-full">
                      <div className="relative w-40 h-40 mx-auto rounded-md overflow-hidden">
                        <Image
                          src={selectedImage}
                          alt="Selected image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null);
                          setImageLoaded(false);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <button
                      className="flex flex-col items-center justify-center p-4 w-full h-full hover:opacity-80 transition-opacity"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="font-medium">Click to upload</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG or WEBP (max. 5MB)
                      </p>
                    </button>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {selectedImage && (
              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  className="gap-1.5 h-9 text-sm"
                  size="sm"
                >
                  Choose Grid Size
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </motion.div>
        );

      case "grid-selection":
        return (
          <motion.div
            key="grid-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose Grid Size</h2>
              <p className="text-muted-foreground">
                Select the difficulty level for your puzzle
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <GridSizeSelector
                  selectedSize={gridSize}
                  onSizeChange={handleGridSizeChange}
                />
              </div>

              <div className="w-full md:w-1/2 flex justify-center">
                {selectedImage && (
                  <div className="relative">
                    <div className="relative w-48 h-48 rounded-md overflow-hidden mb-2">
                      <Image
                        src={selectedImage}
                        alt="Selected image"
                        fill
                        className="object-cover"
                      />

                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 grid gap-[1px] bg-black/20"
                        style={{
                          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                        }}
                      >
                        {Array.from({ length: gridSize * gridSize }).map(
                          (_, i) => (
                            <div key={i} className="border border-white/20" />
                          )
                        )}
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      {gridSize}×{gridSize} grid ({gridSize * gridSize - 1}{" "}
                      pieces)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex gap-2 flex-1">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="gap-1.5 flex-1 h-9 text-sm"
                  size="sm"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setCurrentStep("image-selection");
                  }}
                  className="flex-1 h-9 text-sm"
                  size="sm"
                >
                  Change Image
                </Button>
              </div>

              <Button
                onClick={handleStartGame}
                className="gap-1.5 flex-1 h-9"
                size="default"
              >
                Start Game
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
};

export default ImageUploader;
