"use client";
import React from "react";
import SlideReveal from "@/components/ui/slidereveal";
import Image from "next/image";
import "../styles/blog.css";
import { HiCalendar, HiTag } from "react-icons/hi";
import { FiLinkedin, FiMail, FiShare2 } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  contentHtml: string;
  date: string;
  image: string;
  categoryName: string;
  categoryId: string;
}

export default function BlogPost({ post }: { post: Post }) {
  if (!post) {
    return <div>No post data available</div>;
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Share functionality
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const shareLinks = [
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareTitle
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "#1DA1F2",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      color: "#4267B2",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      color: "#0077B5",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareTitle} ${shareUrl}`
      )}`,
      color: "#25D366",
    },
  ];

  return (
    <article className='bg-gradient-to-b from-amber-50 to-white min-h-screen'>
      {/* Header with floating title card */}
      <div className='relative'>
        {post.image && (
          <div className='relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh]'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              style={{ objectFit: "cover" }}
              className='brightness-[0.8]'
            />
            {/* Overlay gradient for better text visibility */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30'></div>
          </div>
        )}

        {/* Floating title card */}
        <div
          className={`absolute ${
            post.image ? "bottom-0 left-0 right-0" : "inset-0"
          } z-10`}>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div
              className={`relative ${
                post.image
                  ? "-mb-16 sm:-mb-24 md:-mb-32 transform translate-y-0"
                  : "mt-16 sm:mt-24"
              }`}>
              <div className='bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl p-5 sm:p-8 border-l-4 border-[#7e7dff]'>
                <div className='w-full'>
                  <SlideReveal direction='up' duration={0.7}>
                    <div className='mb-3 sm:mb-4 flex flex-wrap gap-2 sm:gap-3 items-center font-raleway'>
                      <div className='flex items-center text-gray-500'>
                        <HiCalendar className='mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7e7dff]' />
                        <span className='text-xs sm:text-sm'>
                          {formattedDate}
                        </span>
                      </div>
                      <span className='text-gray-300 hidden sm:inline'>•</span>
                      <div className='flex items-center'>
                        <HiTag className='mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#7e7dff]' />
                        <span className='bg-[#7e7dff]/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[#4341a5] text-xs sm:text-sm'>
                          {post.categoryName}
                        </span>
                      </div>
                    </div>
                    <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-800 font-cinzel leading-tight'>
                      {post.title}
                    </h1>
                  </SlideReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section with full width */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 md:pt-40 pb-12 sm:pb-20'>
        <div className='max-w-4xl mx-auto'>
          {/* Share buttons for larger screens */}
          <div className='hidden sm:flex items-center justify-end gap-2 mb-4'>
            <span className='text-gray-500 text-sm font-medium flex items-center'>
              <FiShare2 className='mr-2 h-4 w-4' /> Share:
            </span>
            {shareLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Share on ${link.name}`}
                className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
                style={{ color: link.color }}>
                <link.icon className='h-5 w-5' />
              </Link>
            ))}
          </div>

          <div className='relative bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-[#7e7dff]/20'>
            {/* Decorative elements - hidden on very small screens */}
            <div className='absolute -top-4 -left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#7e7dff]/20 blur-xl hidden sm:block'></div>
            <div className='absolute -bottom-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#7e7dff]/30 blur-xl hidden sm:block'></div>

            {/* Content with styled elements */}
            <div
              className='blog-content prose prose-sm sm:prose-base md:prose-lg max-w-none font-montserrat text-gray-700 prose-headings:font-cinzel prose-headings:text-gray-800 prose-a:text-[#7e7dff] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-blockquote:border-l-[#7e7dff] prose-blockquote:bg-[#7e7dff]/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg overflow-hidden'
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Get in touch button */}
            <div className='mt-10 pt-8 border-t border-gray-200'>
              <div className='flex flex-col items-center text-center'>
                <h3 className='text-xl sm:text-2xl font-cinzel font-bold text-gray-800 mb-3'>
                  Interested in learning more?
                </h3>
                <p className='text-gray-600 mb-5 max-w-md'>
                  I'm always open to discussing finance strategies, business
                  opportunities, or answering any questions you might have.
                </p>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center bg-[#7e7dff] hover:bg-[#6c6bcf] text-white font-medium rounded-lg px-6 py-3 transition-colors duration-300 shadow-md hover:shadow-lg'>
                  <FiMail className='mr-2 h-5 w-5' />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>

          {/* Share buttons for mobile - fixed at bottom */}
          <div className='sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 flex items-center justify-between z-40'>
            <span className='text-gray-600 text-sm font-medium flex items-center'>
              <FiShare2 className='mr-1 h-4 w-4' /> Share:
            </span>
            <div className='flex items-center gap-3'>
              {shareLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Share on ${link.name}`}
                  style={{ color: link.color }}>
                  <link.icon className='h-5 w-5' />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn floating pill - adjusted position for mobile to avoid overlap with share bar */}
      <div className='fixed bottom-16 sm:bottom-8 right-4 sm:right-8 z-50'>
        <Link
          href='https://www.linkedin.com/in/zakariehashi/'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-1 sm:space-x-2 bg-white/90 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#0077B5]/20 group'>
          <span className='font-medium text-sm sm:text-base text-gray-700 group-hover:text-[#0077B5] transition-colors duration-300'>
            Follow me on
          </span>
          <FiLinkedin className='h-4 w-4 sm:h-5 sm:w-5 text-[#0077B5]' />
        </Link>
      </div>
    </article>
  );
}
