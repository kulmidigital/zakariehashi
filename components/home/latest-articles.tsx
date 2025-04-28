"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSortedPostsData } from "@/lib/blogService";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import Loader from "@/components/ui/loader";
import SlideReveal from "@/components/ui/slidereveal";

const LatestArticles = () => {
  const MAX_ARTICLES = 3; // Number of latest articles to display

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: getSortedPostsData,
  });

  const latestArticles = articles.slice(0, MAX_ARTICLES);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className='py-10 flex justify-center'>
        <Loader />
      </div>
    );
  }

  if (error || latestArticles.length === 0) {
    return null; // Don't show the section if there's an error or no articles
  }

  return (
    <section className='py-16 md:py-24 bg-white dark:bg-[#0a0a20]'>
      <div className='container mx-auto px-4 md:px-8'>
        {/* Section header */}
        <SlideReveal direction='up' duration={0.7}>
          <div className='text-center mb-12'>
            <div className='flex items-center justify-center mb-4'>
              <div className='h-px w-6 bg-gradient-to-r from-transparent via-[#7e7dff] to-transparent'></div>
              <h3 className='mx-3 text-[#7e7dff] font-montserrat text-sm font-medium'>
                LATEST INSIGHTS
              </h3>
              <div className='h-px w-6 bg-gradient-to-r from-transparent via-[#7e7dff] to-transparent'></div>
            </div>
            <h2 className='text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white font-cinzel'>
              Recent <span className='text-[#7e7dff]'>Articles</span>
            </h2>
          </div>
        </SlideReveal>

        {/* Articles grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {latestArticles.map((article, index) => (
            <SlideReveal
              key={article.id}
              direction='up'
              duration={0.7}
              delay={index * 0.1}>
              <Link
                href={`/blog/${slugify(article.title)}`}
                className='block h-full group'>
                <div className='h-full flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700'>
                  {/* Article image */}
                  {article.image && (
                    <div className='relative w-full h-48 overflow-hidden'>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, 33vw'
                      />
                      {/* Gradient overlay */}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/30'></div>

                      {/* Category tag */}
                      {article.categoryName && (
                        <span className='absolute top-3 right-3 text-xs bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#4341a5] border border-[#7e7dff]/20 shadow-sm'>
                          {article.categoryName}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Article content */}
                  <div className='flex-1 p-5'>
                    <div className='flex items-center text-gray-500 dark:text-gray-400 text-xs font-raleway mb-2'>
                      <FiCalendar className='mr-1.5 h-3.5 w-3.5 text-[#7e7dff]/70' />
                      <span>{formatDate(article.date)}</span>
                    </div>

                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white font-cinzel leading-tight mb-3 group-hover:text-[#7e7dff] transition-colors duration-300'>
                      {article.title}
                    </h3>

                    {/* Read more link */}
                    <div className='mt-auto pt-3 flex items-center font-medium text-sm text-[#7e7dff]'>
                      <span className='transition-colors duration-300 group-hover:text-[#4341a5]'>
                        Read Article
                      </span>
                      <div className='ml-2 w-5 h-5 rounded-full bg-[#7e7dff]/10 flex items-center justify-center group-hover:bg-[#7e7dff]/20 transition-all duration-300'>
                        <FiArrowRight className='h-3 w-3 text-[#7e7dff] transition-transform duration-300 group-hover:translate-x-0.5' />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SlideReveal>
          ))}
        </div>

        {/* View all articles button */}
        <div className='mt-12 text-center'>
          <Link
            href='/blog'
            className='inline-flex items-center justify-center group relative overflow-hidden rounded-lg'>
            <span className='absolute inset-0 bg-gradient-to-r from-[#3d3d7d] to-[#5b5bbd] transition-all duration-300 group-hover:scale-105'></span>
            <span className='relative flex items-center justify-center bg-[#2a2a55] border border-[#4341a5] rounded-lg px-6 py-3 font-montserrat text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#2a2a55]/0'>
              View All Articles
              <FiArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
