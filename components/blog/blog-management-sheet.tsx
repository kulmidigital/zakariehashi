"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaginatedPosts, deletePost } from "@/lib/blogService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
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
import Loader from "@/components/ui/loader";
import { slugify } from "@/lib/utils";
import { FiMenu, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

const POSTS_PER_PAGE = 10;

interface Post {
  id: string;
  title: string;
  content: string;
  contentHtml: string;
  date: any;
  image?: string;
  categoryId?: string;
  categoryName?: string;
}

export default function BlogManagementSheet() {
  const [lastPost, setLastPost] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["managePosts", lastPost],
    queryFn: () => getPaginatedPosts(lastPost, POSTS_PER_PAGE),
  });

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMore = async () => {
    if (posts.length > 0) {
      const lastVisible = posts[posts.length - 1];
      setLastPost(lastVisible);
      const nextPosts = await getPaginatedPosts(lastVisible, POSTS_PER_PAGE);
      setHasMore(nextPosts.length === POSTS_PER_PAGE);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      await queryClient.invalidateQueries({ queryKey: ["managePosts"] });
      await queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post deleted successfully", {
        className: "bg-green-500 text-white font-raleway",
      });
    } catch (error) {
      toast.error("Failed to delete post", {
        className: "bg-red-500 text-white font-raleway",
      });
    }
  };

  const handleEdit = (post: Post) => {
    const slug = slugify(post.title);
    router.push(`/admin/blog/edit/${slug}`);
  };

  return (
    <Sheet>
      <SheetTrigger className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-200'>
        <FiMenu className='h-5 w-5 text-[#7e7dff]' />
      </SheetTrigger>
      <SheetContent className='overflow-y-auto dark:bg-gray-900 py-2 px-4 sm:max-w-[40vw]'>
        <SheetHeader className='text-left'>
          <SheetTitle className='text-[#7e7dff] text-xl font-cinzel'>
            Manage Blog Posts
          </SheetTitle>
          <SheetDescription className='dark:text-gray-400 font-raleway text-xs'>
            View, edit, or delete your blog posts
          </SheetDescription>
        </SheetHeader>

        <div className=' relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <FiSearch className='h-3.5 w-3.5 text-gray-400' />
          </div>
          <Input
            type='search'
            placeholder='Search posts by title or category...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-9 py-1 h-8 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#7e7dff] focus:ring-[#7e7dff] font-raleway text-xs'
          />
        </div>

        <div className='mt-3 space-y-2'>
          {isLoading ? (
            <div className='py-4 flex justify-center items-center'>
              <div className='text-[#7e7dff]'>
                <Loader />
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className='text-center py-4 text-gray-500 dark:text-gray-400 font-raleway text-xs'>
              {searchQuery ? "No matching posts found" : "No posts found"}
            </div>
          ) : (
            <>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className='flex items-center space-x-2 p-2 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'>
                  {post.image && (
                    <div className='relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                  )}
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-sm font-medium text-gray-900 dark:text-white truncate font-montserrat'>
                      {post.title}
                    </h4>
                    <p className='text-xs text-gray-500 dark:text-gray-400 font-raleway'>
                      {typeof post.date === "string"
                        ? new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : post.date}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleEdit(post)}
                      className='p-1.5 text-[#7e7dff] hover:bg-[#7e7dff]/10 rounded-md transition-colors duration-200 mr-1'
                      aria-label='Edit post'>
                      <FiEdit className='h-3.5 w-3.5' />
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className='p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors duration-200'
                          aria-label='Delete post'>
                          <FiTrash2 className='h-3.5 w-3.5' />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='dark:bg-gray-800 rounded-lg max-w-md'>
                        <AlertDialogHeader>
                          <AlertDialogTitle className='dark:text-white font-cinzel text-lg'>
                            Delete Post
                          </AlertDialogTitle>
                          <AlertDialogDescription className='dark:text-gray-400 font-raleway text-sm'>
                            Are you sure you want to delete this post? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='mt-3'>
                          <AlertDialogCancel className='dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 font-raleway rounded-md text-xs'>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                            className='bg-red-500 hover:bg-red-600 text-white font-raleway rounded-md text-xs'>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}

              {!searchQuery && hasMore && posts.length === POSTS_PER_PAGE && (
                <button
                  onClick={loadMore}
                  className='w-full py-1.5 mt-1 text-[#7e7dff] hover:bg-[#7e7dff]/10 rounded-md transition-duration-200 text-xs font-raleway'>
                  Load more posts...
                </button>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
