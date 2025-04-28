import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FiUpload, FiImage, FiX } from "react-icons/fi";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl: string;
  onUploadingChange?: (isUploading: boolean) => void;
}

export default function ImageUpload({
  onImageUploaded,
  currentImageUrl,
  onUploadingChange,
}: ImageUploadProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent component when uploadingImage state changes
  useEffect(() => {
    onUploadingChange?.(uploadingImage);
  }, [uploadingImage, onUploadingChange]);

  const handleImageUpload = async (file: File) => {
    try {
      setUploadError(null);
      setUploadingImage(true);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          `Cloudinary configuration is missing: ${
            !cloudName ? "CLOUD_NAME " : ""
          }${!uploadPreset ? "UPLOAD_PRESET" : ""}`
        );
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.secure_url) {
        onImageUploaded(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("No URL received from Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError((error as Error).message);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageUploaded("");
    toast.success("Image removed");
  };

  return (
    <div className='space-y-3'>
      <div className='hidden'>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file);
            }
          }}
        />
      </div>

      {!currentImageUrl ? (
        <div
          onClick={handleButtonClick}
          className='border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#7e7dff] dark:hover:border-[#7e7dff] transition-colors duration-200 bg-gray-50 dark:bg-gray-900'>
          <FiImage className='h-8 w-8 text-gray-400 dark:text-gray-500 mb-2' />
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
            Drag and drop an image or click to browse
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-500'>
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      ) : (
        <div className='relative rounded-lg overflow-hidden'>
          <div className='relative w-full h-48 md:h-64'>
            <Image
              src={currentImageUrl}
              alt='Featured image'
              fill
              className='object-cover'
            />
          </div>
          <button
            onClick={removeImage}
            className='absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white transition-all duration-200'
            aria-label='Remove image'>
            <FiX className='h-4 w-4' />
          </button>
          <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity duration-200'>
            <button
              onClick={handleButtonClick}
              className='bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm'>
              <FiUpload className='h-4 w-4' />
              Replace image
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <p className='text-red-500 text-xs p-2 bg-red-50 dark:bg-red-900/20 rounded-md'>
          {uploadError}
        </p>
      )}

      {uploadingImage && (
        <div className='flex items-center gap-2 p-2 rounded-md bg-purple-50 dark:bg-purple-900/20'>
          <div className='animate-spin h-4 w-4 border-2 border-[#7e7dff] border-t-transparent rounded-full'></div>
          <p className='text-purple-600 dark:text-purple-400 text-xs'>
            Uploading image...
          </p>
        </div>
      )}
    </div>
  );
}
