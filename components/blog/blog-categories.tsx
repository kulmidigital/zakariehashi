"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, Category } from "@/lib/blogService";
import Loader from "@/components/ui/loader";

interface BlogCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: categories = [] as Category[],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (!mounted || isLoading) {
    return (
      <div className='h-12 flex items-center justify-center'>
        <Loader size='small' />
      </div>
    );
  }

  if (error || categories.length === 0) {
    return null;
  }

  return (
    <div className='relative w-full'>
      {/* Horizontal scroll container with custom scrollbar styling */}
      <div className='overflow-x-auto scrollbar-hide pb-2'>
        <div className='flex flex-nowrap space-x-1.5 sm:space-x-2 md:space-x-3 min-w-min'>
          <button
            className={`flex-none px-3 py-1.5 text-xs sm:text-sm border rounded-full transition duration-300 focus:outline-none focus:ring-1 focus:ring-[#7e7dff] whitespace-nowrap
              ${
                selectedCategory === ""
                  ? "bg-[#7e7dff] text-white border-[#7e7dff] shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#7e7dff]/40 hover:bg-[#7e7dff]/5"
              }`}
            onClick={() => onCategoryChange("")}>
            All Posts
          </button>

          {categories.map((category: Category) => (
            <button
              key={category.id}
              className={`flex-none px-3 py-1.5 text-xs sm:text-sm border rounded-full transition duration-300 focus:outline-none focus:ring-1 focus:ring-[#7e7dff] whitespace-nowrap
                ${
                  selectedCategory === category.id
                    ? "bg-[#7e7dff] text-white border-[#7e7dff] shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#7e7dff]/40 hover:bg-[#7e7dff]/5"
                }`}
              onClick={() => onCategoryChange(category.id)}>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Optional fade edges to indicate scrolling */}
      <div className='absolute top-0 right-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none'></div>
    </div>
  );
};

// Add global style to hide scrollbar
// This works in most modern browsers
const globalStyle = `
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

// Insert the global style
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = globalStyle;
  document.head.appendChild(styleElement);
}

export default BlogCategories;
