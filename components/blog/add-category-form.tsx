import React, { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";

interface AddCategoryFormProps {
  onAdd: (categoryName: string) => Promise<void>;
  onCancel: () => void;
  isAdding: boolean;
}

export default function AddCategoryForm({
  onAdd,
  onCancel,
  isAdding,
}: AddCategoryFormProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = async () => {
    if (!newCategory.trim()) return;
    await onAdd(newCategory);
    setNewCategory("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isAdding && newCategory.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
        New Category
      </label>

      <div className='flex items-center gap-2'>
        <div className='relative flex-1'>
          <input
            type='text'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Enter category name'
            className='w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7e7dff] focus:border-transparent dark:text-gray-100 transition-all duration-200 pr-8'
            autoFocus
          />
        </div>

        <button
          type='button'
          onClick={handleSubmit}
          disabled={isAdding || !newCategory.trim()}
          className='p-3 bg-[#7e7dff] text-white rounded-lg hover:bg-[#6c6bcf] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          aria-label='Add category'>
          {isAdding ? (
            <>
              <div className='h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin'></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <FiSave className='h-4 w-4' />
              <span>Save</span>
            </>
          )}
        </button>

        <button
          type='button'
          onClick={onCancel}
          className='p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center'
          aria-label='Cancel'>
          <FiX className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
}
