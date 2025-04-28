"use client";
import React, { useState, useEffect, use } from "react";
import { updatePost, getCategories } from "@/lib/blogService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "@/lib/firebase";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { collection, getDocs } from "firebase/firestore";
import { slugify } from "@/lib/utils";
import type { Category } from "@/lib/blogService";
import { FiChevronDown, FiLogOut } from "react-icons/fi";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PostData {
  id: string;
  title: string;
  content: string;
  contentHtml: string;
  date: any;
  image?: string;
  categoryId?: string;
  categoryName?: string;
}

const CustomSelect = ({
  categories,
  selectedCategory,
  onSelect,
}: {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#4341a5] focus:border-transparent transition duration-200 text-left flex justify-between items-center'>
        <span>
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name ||
              "Select category"
            : "Select category"}
        </span>
        <FiChevronDown className='h-4 w-4' />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg'>
          <div className='py-2'>
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  onSelect(category.id);
                  setIsOpen(false);
                }}
                className='px-4 py-2 hover:bg-gray-50 cursor-pointer'>
                {category.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function EditBlogPost({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // Unwrap params using React.use()
  const resolvedParams = use(params as Promise<{ slug: string }>);
  const slug = resolvedParams.slug;

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetch post data
  const { data: post, isLoading: isLoadingPost } = useQuery<PostData>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsRef);

      const matchingPost = querySnapshot.docs.find((doc) => {
        const postData = doc.data();
        const postSlug = slugify(postData.title);
        return postSlug === slug;
      });

      if (!matchingPost) {
        throw new Error("Post not found");
      }

      return {
        id: matchingPost.id,
        ...matchingPost.data(),
      } as PostData;
    },
    enabled: !!slug,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImageUrl(post.image ?? "");
      setSelectedCategory(post.categoryId ?? "");
    }
  }, [post]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (!user) {
        router.push("/admin/blog/new");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      router.push("/blog");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
      if (!post?.id) throw new Error("Post ID not found");

      const contentHtml = await processContent(content);

      const postData = {
        title,
        content,
        contentHtml,
        categoryId: selectedCategory,
        ...(imageUrl && { image: imageUrl }),
      };

      await updatePost(post.id, postData);

      toast.success("Blog post updated successfully!", {
        className: "font-cinzel bg-green-500 text-white",
      });

      router.push(`/blog/${slugify(title)}`);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.", {
        className: "font-cinzel bg-red-500 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadError(null);
      setUploadingImage(true);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

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
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError((error as Error).message);
      setImageUrl("");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 py-8 md:py-16'>
      {!isAuthenticated ? (
        <div className='flex items-center justify-center min-h-screen'>
          <p className='text-gray-500 dark:text-gray-400 font-raleway'>
            Redirecting to login...
          </p>
        </div>
      ) : isLoadingPost ? (
        <div className='flex items-center justify-center min-h-screen'>
          <Loader />
        </div>
      ) : (
        <div className='max-w-4xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 font-cinzel'>
              Edit Blog Post
            </h1>
            <button
              onClick={handleLogout}
              className='p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'>
              <FiLogOut className='h-6 w-6' />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Title
              </label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#4341a5] focus:border-transparent dark:text-gray-100'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Category
              </label>
              <CustomSelect
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Content
              </label>
              <div data-color-mode='dark'>
                <MDEditor
                  value={content}
                  onChange={(value) => setContent(value || "")}
                  className='dark:bg-gray-800'
                  height={400}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Featured Image
              </label>
              <div className='space-y-4'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  className='w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#4341a5] focus:border-transparent dark:text-gray-100'
                />
                {uploadError && (
                  <p className='text-red-500 text-sm'>{uploadError}</p>
                )}
                {imageUrl && (
                  <div className='relative w-full h-48'>
                    <Image
                      src={imageUrl}
                      alt='Featured image'
                      fill
                      className='rounded-2xl object-cover'
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={loading || uploadingImage}
                className='bg-[#4341a5] text-white px-8 py-4 rounded-2xl hover:bg-[#332f8a] transition duration-200 disabled:opacity-50 font-raleway'>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
