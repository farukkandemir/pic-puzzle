"use client";

import { useState, useRef, ChangeEvent } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file (JPEG, PNG, etc.)",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    setIsUploading(true);

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsUploading(false);

    toast.success("Image uploaded", {
      description: "Your image has been uploaded successfully",
    });
  };

  const handleGalleryImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
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
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    fill
                    className="object-cover"
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
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!selectedImage}
          className="px-8"
          onClick={handleCreatePuzzle}
        >
          Create Puzzle
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
