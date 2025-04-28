import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Category } from "@/lib/blogService";
import { createPost, addCategory, getCategories } from "@/lib/blogService";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { FiPlus, FiLogOut, FiEdit } from "react-icons/fi";
import dynamic from "next/dynamic";
import CategorySelect from "./category-select";
import AddCategoryForm from "./add-category-form";
import ImageUpload from "./image-upload";
import BlogManagementSheet from "./blog-management-sheet";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { slugify } from "@/lib/utils";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface BlogPostFormProps {
  onLogout: () => Promise<void>;
}

export default function BlogPostForm({ onLogout }: BlogPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const processContent = async (content: string) => {
    const processedContent = await remark()
      .use(html)
      .use(remarkGfm)
      .process(content);
    return processedContent.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contentHtml = await processContent(content);

      const postData = {
        title,
        content,
        contentHtml,
        date: new Date().toISOString(),
        categoryId: selectedCategory,
        ...(imageUrl && { image: imageUrl }),
      };

      const id = await createPost(postData);

      toast.success("Blog post published successfully!", {
        className: "font-cinzel bg-green-500 text-white",
        action: {
          label: "View post",
          onClick: () => router.push(`/blog/${slugify(title)}`),
        },
      });

      // Reset form
      setTitle("");
      setContent("");
      setImageUrl("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to publish post. Please try again.", {
        className: "font-cinzel bg-red-500 text-white",
        action: {
          label: "Try again",
          onClick: () => {},
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (categoryName: string) => {
    setIsAddingCategory(true);
    try {
      const newCategoryId = await addCategory(categoryName);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setShowAddCategory(false);
      setSelectedCategory(newCategoryId);

      toast.success("Category created successfully!", {
        className: "font-cinzel bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to create category. Please try again.", {
        className: "font-cinzel bg-red-500 text-white",
      });
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      // Update posts with this category to 'Unknown'
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("categoryId", "==", categoryId));
      const querySnapshot = await getDocs(q);

      // Batch update for better performance
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => {
        batch.update(doc.ref, {
          categoryId: "unknown",
          categoryName: "Unknown",
        });
      });

      // Delete the category
      batch.delete(doc(db, "categories", categoryId));
      await batch.commit();

      // Refresh categories list
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);

      // Reset selected category if it was deleted
      if (selectedCategory === categoryId) {
        setSelectedCategory("");
      }

      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 font-cinzel'>
          New Blog Post
        </h1>
        <div className='flex items-center gap-3'>
          <BlogManagementSheet />
          <button
            onClick={onLogout}
            className='p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
            aria-label='Logout'>
            <FiLogOut className='h-5 w-5' />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#7e7dff] focus:border-transparent dark:text-gray-100 transition-all duration-200'
            placeholder='Enter blog post title'
            required
          />
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Category
          </label>
          <div className='flex items-center gap-3'>
            <CategorySelect
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
              onDelete={handleDeleteCategory}
            />
            <button
              type='button'
              onClick={() => setShowAddCategory(true)}
              className='p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200'>
              <FiPlus className='h-5 w-5 text-[#7e7dff]' />
            </button>
          </div>
        </div>

        {showAddCategory && (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4'>
            <AddCategoryForm
              onAdd={handleAddCategory}
              onCancel={() => setShowAddCategory(false)}
              isAdding={isAddingCategory}
            />
          </div>
        )}

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Content
          </label>
          <div data-color-mode='dark' className='rounded-lg overflow-hidden'>
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || "")}
              className='dark:bg-gray-900'
              height={400}
            />
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Featured Image
          </label>
          <ImageUpload
            onImageUploaded={setImageUrl}
            currentImageUrl={imageUrl}
            onUploadingChange={setIsUploadingImage}
          />
        </div>

        <div className='flex justify-end pt-2'>
          <button
            type='submit'
            disabled={loading || isUploadingImage}
            className='bg-[#7e7dff] text-white px-6 py-3 rounded-lg hover:bg-[#6c6bcf] transition-all duration-200 disabled:opacity-50 font-medium flex items-center gap-2 shadow-sm'>
            {loading ? (
              <>
                <div className='h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin'></div>
                <span>Publishing...</span>
              </>
            ) : isUploadingImage ? (
              <>
                <div className='h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin'></div>
                <span>Waiting for image...</span>
              </>
            ) : (
              <>
                <FiEdit className='h-4 w-4' />
                <span>Publish Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
