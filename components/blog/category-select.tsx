import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiTrash2, FiTag } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Category } from "@/lib/blogService";

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CategorySelect({
  categories,
  selectedCategory,
  onSelect,
  onDelete,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name ||
      "Select category"
    : "Select category";

  return (
    <div className='relative flex-1' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7e7dff] focus:border-transparent transition-all duration-200 text-left flex justify-between items-center dark:text-gray-200'>
        <div className='flex items-center gap-2 truncate'>
          <FiTag
            className={`h-4 w-4 ${
              selectedCategory ? "text-[#7e7dff]" : "text-gray-400"
            }`}
          />
          <span className='truncate'>{selectedCategoryName}</span>
        </div>
        <FiChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden'>
          <div className='max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'>
            {categories.length === 0 ? (
              <div className='px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center'>
                No categories available
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className='flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer dark:text-gray-200 group'>
                  <div
                    onClick={() => {
                      onSelect(category.id);
                      setIsOpen(false);
                    }}
                    className='flex-grow flex items-center gap-2'>
                    <FiTag
                      className={`h-4 w-4 ${
                        selectedCategory === category.id
                          ? "text-[#7e7dff]"
                          : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        selectedCategory === category.id
                          ? "font-medium"
                          : "font-normal"
                      }`}>
                      {category.name}
                    </span>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className='p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'>
                        <FiTrash2 className='h-3.5 w-3.5' />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='dark:bg-gray-800 rounded-lg'>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='dark:text-gray-100 text-lg font-cinzel'>
                          Delete Category
                        </AlertDialogTitle>
                        <AlertDialogDescription className='dark:text-gray-400 text-sm'>
                          Are you sure you want to delete &quot;{category.name}
                          &quot;? All posts in this category will be moved to
                          &quot;Unknown&quot;.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className='mt-3'>
                        <AlertDialogCancel className='dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-xs rounded-md'>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(category.id)}
                          className='bg-red-500 hover:bg-red-600 text-white text-xs rounded-md'>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
