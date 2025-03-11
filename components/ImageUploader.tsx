"use client";

import { useState, useRef, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  onImageSelected: (imageUrl: string) => void;
};

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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

          // Create canvas and resize image
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Determine quality based on original file size
          let quality = 0.9;
          if (file.size > 3 * 1024 * 1024) quality = 0.7;
          else if (file.size > 1 * 1024 * 1024) quality = 0.8;

          resolve(canvas.toDataURL("image/jpeg", quality));
        };

        img.onerror = () => reject(new Error("Failed to load image"));

        if (event.target?.result) {
          img.src = event.target.result as string;
        } else {
          reject(new Error("Failed to read file"));
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      // Process the dropped file directly
      handleFile(file);
    }
  }, []);

  // Centralized file handling function
  const handleFile = async (file: File) => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file (JPEG, PNG, etc.)",
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 10MB",
      });
      return;
    }

    setIsUploading(true);
    setImageLoaded(false);

    try {
      // Optimize the image before displaying
      const optimizedImageUrl = await optimizeImage(file);
      setSelectedImage(optimizedImageUrl);
      toast.success("Image uploaded", {
        description: "Your image has been uploaded and optimized successfully",
      });
    } catch (error) {
      toast.error("Failed to process image", {
        description: "Please try another image or a different format",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleGalleryImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageLoaded(true);
    toast.success("Image selected", {
      description: "Gallery image selected successfully",
    });
  };

  const handleSelectButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCreatePuzzle = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Create Your Puzzle</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image or choose from our gallery to start playing
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="gallery">Choose from Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="py-6">
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={handleSelectButtonClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              aria-label="Upload image"
            />

            {selectedImage ? (
              <div className="space-y-4">
                <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-md">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" />
                    </div>
                  )}
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={handleImageLoad}
                  />
                </div>
                <p className="text-sm text-gray-500">Click to change image</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <Button>Select Image</Button>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="gallery" className="py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`aspect-square rounded-md cursor-pointer hover:opacity-90 transition-opacity overflow-hidden relative ${
                  selectedImage === image
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                onClick={() => handleGalleryImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`Sample image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 3} // Prioritize loading the first 3 images
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!selectedImage || isUploading}
          className="px-8"
          onClick={handleCreatePuzzle}
        >
          {isUploading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Processing...
            </>
          ) : (
            "Create Puzzle"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
