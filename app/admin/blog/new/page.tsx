"use client";
import React, { useState, useEffect } from "react";
import { createPost, getCategories, addCategory } from "@/lib/blogService";
import type { Category } from "@/lib/blogService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app, db } from "@/lib/firebase";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
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
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { toast } from "sonner";
import BlogManagementSheet from "@/components/blog/blog-management-sheet";
import { FiChevronDown, FiTrash2, FiLogOut, FiPlus } from "react-icons/fi";
import LoginForm from "@/components/blog/login-form";
import BlogPostForm from "@/components/blog/blog-post-form";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const CustomSelect = ({
  categories,
  selectedCategory,
  onSelect,
  onDelete,
}: {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#F56E0F] focus:border-transparent transition duration-200 text-left flex justify-between items-center dark:text-gray-200'>
        <span>
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name ||
              "Select category"
            : "Select category"}
        </span>
        <FiChevronDown className='h-4 w-4' />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg'>
          <div className='py-2'>
            {categories.map((category) => (
              <div
                key={category.id}
                className='flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer dark:text-gray-200'>
                <div
                  onClick={() => {
                    onSelect(category.id);
                    setIsOpen(false);
                  }}
                  className='flex-grow'>
                  {category.name}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className='p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors'>
                      <FiTrash2 className='h-4 w-4' />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='dark:bg-gray-800'>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='dark:text-gray-100'>
                        Delete Category
                      </AlertDialogTitle>
                      <AlertDialogDescription className='dark:text-gray-400'>
                        Are you sure you want to delete this category? All posts
                        in this category will be moved to "Unknown".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className='dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(category.id)}
                        className='bg-red-500 hover:bg-red-600 text-white'>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function NewBlogPost() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      router.push("/blog");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#7e7dff]'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 px-4 py-6 md:px-6 md:py-8 pt-8 md:pt-16'>
      <div className='max-w-5xl mx-auto'>
        {!isAuthenticated ? (
          <div className='mt-10'>
            <LoginForm onSuccess={() => setIsAuthenticated(true)} />
          </div>
        ) : (
          <BlogPostForm onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
