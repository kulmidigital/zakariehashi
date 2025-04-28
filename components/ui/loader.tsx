"use client";
import React from "react";

export default function Loader({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    default: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div className='flex justify-center items-center'>
      <div
        className={`${sizeClass} rounded-full border-t-[#F56E0F] border-r-[#F56E0F]/30 border-b-[#F56E0F]/10 border-l-[#F56E0F]/60 animate-spin`}
      />
    </div>
  );
}
