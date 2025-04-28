"use client";
import React, { useState, useEffect } from "react";
import SlideReveal from "@/components/ui/slidereveal";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSortedPostsData } from "@/lib/blogService";
import { slugify } from "@/lib/utils";
import Loader from "@/components/ui/loader";
import BlogCategories from "./blog-categories";
import { FiChevronRight, FiChevronDown, FiCalendar } from "react-icons/fi";

const ITEMS_PER_PAGE = 6;

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visiblePosts, setVisiblePosts] = useState(ITEMS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: allPostsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getSortedPostsData,
  });

  const filteredPosts = selectedCategory
    ? allPostsData.filter((post) => post.categoryId === selectedCategory)
    : allPostsData;

  const currentPosts = filteredPosts.slice(0, visiblePosts);
  const hasMore = visiblePosts < filteredPosts.length;

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisiblePosts(ITEMS_PER_PAGE);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center text-gray-500'>
        <p>Error loading blog posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className='bg-gradient-to-b from-amber-50 to-white py-8 md:py-16'>
      {/* Header with subtle accent line */}
      <div className='relative px-4 pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 md:px-12 lg:px-20'>
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7e7dff] to-transparent'></div>

        <SlideReveal direction='up' duration={0.7}>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 sm:mb-4 text-gray-800'>
            Zakarie's <span className='text-[#7e7dff]'>Blog</span>
          </h1>
          <p className='text-sm sm:text-base text-gray-600 max-w-2xl mb-4 sm:mb-8 font-montserrat'>
            Thoughts, insights, and perspectives on finance, leadership, and
            global money transfer services.
          </p>
        </SlideReveal>

        {/* Category filters */}
        <BlogCategories
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Main blog grid with redesigned cards */}
      <div className='px-4 md:px-12 lg:px-20 pb-12 sm:pb-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
          {currentPosts.map(
            ({ id, date, title, image, categoryName }, index) => (
              <SlideReveal key={id} direction='up' duration={0.7}>
                <Link href={`/blog/${slugify(title)}`} className='block h-full'>
                  <div
                    className={`group h-full flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white transition-all duration-300 
                    ${
                      image
                        ? "shadow-md hover:shadow-xl transform hover:-translate-y-1"
                        : "border border-[#7e7dff]/20 hover:border-[#7e7dff]/40 shadow-sm hover:shadow-md"
                    }`}>
                    {/* Card header with image or gradient */}
                    {image ? (
                      <div className='relative w-full h-44 sm:h-48 md:h-52 overflow-hidden'>
                        <Image
                          src={image}
                          alt={title}
                          fill
                          priority={index === 0}
                          style={{ objectFit: "cover" }}
                          className='transition-transform duration-500 group-hover:scale-105'
                          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent'></div>

                        {/* Category tag - positioned over image */}
                        {categoryName && (
                          <span className='absolute top-3 right-3 sm:top-4 sm:right-4 text-xs bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[#4341a5] border border-[#7e7dff]/20 shadow-sm'>
                            {categoryName}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className='relative w-full pt-5 sm:pt-6 px-5 sm:px-6'>
                        {/* Abstract decorative elements for cards without images */}
                        <div className='absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 rounded-bl-full bg-gradient-to-br from-[#7e7dff]/5 to-[#7e7dff]/20 opacity-70'></div>
                        <div className='absolute -top-6 -left-6 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-[#7e7dff]/10 blur-xl'></div>

                        {/* Category tag */}
                        {categoryName && (
                          <span className='inline-block text-xs bg-[#7e7dff]/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[#4341a5] mb-2 sm:mb-3'>
                            {categoryName}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card content */}
                    <div
                      className={`flex-grow flex flex-col ${
                        image ? "p-4 sm:p-6" : "px-5 pb-5 sm:px-6 sm:pb-6"
                      }`}>
                      <h2
                        className={`${
                          image
                            ? "text-lg sm:text-xl"
                            : "text-lg sm:text-xl mt-1 sm:mt-2"
                        } font-semibold text-gray-800 font-cinzel leading-tight mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#7e7dff]`}>
                        {title}
                      </h2>

                      {/* Date indicator */}
                      <div className='flex items-center text-gray-500 text-xs font-raleway mb-3 sm:mb-4'>
                        <FiCalendar className='mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#7e7dff]/70' />
                        <span>{formatDate(date)}</span>
                      </div>

                      {/* Read more link with animated indicator */}
                      <div className='mt-auto pt-2 sm:pt-3 flex items-center font-medium text-xs sm:text-sm text-[#7e7dff]'>
                        <span className='transition-colors duration-300 group-hover:text-[#4341a5]'>
                          Read More
                        </span>
                        <div className='ml-1.5 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#7e7dff]/10 flex items-center justify-center group-hover:bg-[#7e7dff]/20 transition-all duration-300'>
                          <FiChevronRight className='h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#7e7dff] transition-transform duration-300 group-hover:translate-x-0.5' />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SlideReveal>
            )
          )}
        </div>

        {/* Load more button with refined styling */}
        {hasMore && (
          <div className='mt-8 sm:mt-12 flex justify-center'>
            <button
              onClick={handleLoadMore}
              className='inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-[#7e7dff]/30 text-[#4341a5] rounded-lg hover:bg-[#7e7dff]/5 transition duration-300 shadow-sm group'>
              <span className='font-medium text-sm sm:text-base'>
                Load More Posts
              </span>
              <div className='ml-1.5 sm:ml-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#7e7dff]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7e7dff]/20'>
                <FiChevronDown className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7e7dff] group-hover:text-[#4341a5] transition-all duration-300' />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
