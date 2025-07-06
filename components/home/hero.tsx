import { Grenze_Gotisch } from "next/font/google";
import React from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

const grenze = Grenze_Gotisch({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <section className='min-h-svh flex flex-col items-center justify-center relative px-4 py-10 sm:py-16 overflow-hidden'>
      {/* Enhanced grid background with dot overlay */}
      <div className='absolute inset-0 bg-[#0a0a20] bg-grid-pattern'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,125,255,0.08),transparent_70%)]'></div>
      <div className='absolute inset-0 bg-gradient-to-b from-[#0a0a20] via-transparent to-[#0a0a20]/90'></div>

      {/* Subtle animated accent lines */}
      <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7e7dff]/30 to-transparent'></div>
      <div className='absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7e7dff]/30 to-transparent'></div>

      {/* Content container with refined layout */}
      <div className='z-10 w-full max-w-6xl px-2 sm:px-4 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16'>
        <div className='w-full lg:w-3/5 mb-10 lg:mb-0 order-1'>
          {/* Elegant horizontal accent */}
          <div className='mb-6 sm:mb-8 lg:mb-12 flex items-center justify-center lg:justify-start'>
            <div className='h-px w-12 bg-gradient-to-r from-transparent via-[#7e7dff] to-transparent'></div>
          </div>

          {/* Main heading with enhanced typography */}
          <div className='mb-6 sm:mb-8 lg:mb-12 text-center lg:text-left'>
            <div className='relative inline-block'>
              <h1
                className={`${grenze.className} text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight`}>
                zakarie<span className='text-[#7e7dff]'>.</span>hashi
              </h1>
              <div className='absolute -bottom-3 left-0 right-0 lg:right-auto w-24 h-1 mx-auto lg:mx-0 bg-gradient-to-r from-[#7e7dff] to-transparent'></div>
            </div>
            <p className='text-[#a0a0cc] font-raleway mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed'>
              CEO of Tawakal Express & Visionary Financial Leader
            </p>
          </div>

          {/* CTA Buttons - Hidden on small screens, visible on lg and above */}
          <div className='hidden lg:flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 lg:mb-12 justify-center lg:justify-start'>
            {/* Read Articles Button */}
            <a
              href='/blog'
              className='inline-flex items-center justify-center group relative overflow-hidden rounded-lg w-full sm:w-auto'>
              <span className='absolute inset-0 bg-gradient-to-r from-[#3d3d7d] to-[#5b5bbd] transition-all duration-300 group-hover:scale-105'></span>
              <span className='relative flex items-center justify-center bg-[#2a2a55] border border-[#4341a5] rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-montserrat text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#2a2a55]/0 w-full'>
                Read My Articles
                <FiArrowRight className='ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1' />
              </span>
            </a>
            <a
              href='https://www.dawan.africa/news/tawakal-express-appoints-zakarie-hashi-as-the-youngest-ceo'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center group relative overflow-hidden rounded-lg w-full sm:w-auto'>
              <span className='absolute inset-0 bg-gradient-to-r from-[#3d3d7d] to-[#5b5bbd] transition-all duration-300 group-hover:scale-105'></span>
              <span className='relative flex items-center justify-center bg-[#2a2a55] border border-[#4341a5] rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-montserrat text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#2a2a55]/0 w-full'>
                What The Media Says
                <FiExternalLink className='ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1' />
              </span>
            </a>
          </div>
        </div>

        {/* Refined quote section */}
        <div className='w-full lg:w-2/5 lg:mt-16 order-2'>
          <div className='h-full bg-gradient-to-b from-[#1a1a36]/80 to-[#1e1e40]/80 backdrop-blur-sm border border-[#2e2d56] p-5 sm:p-8 rounded-lg hover:border-[#4341a5]/70 transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.1)]'>
            <div className='flex mb-4 sm:mb-6 items-center'>
              <div className='w-6 sm:w-8 h-0.5 bg-[#7e7dff]'></div>
              <div className='ml-3 text-[#7e7dff] font-montserrat text-xs sm:text-sm font-medium'>
                THOUGHTS
              </div>
            </div>
            <div className='relative'>
              <span className='absolute -top-4 sm:-top-6 -left-2 text-4xl sm:text-6xl text-[#7e7dff]/10 font-serif'>
                "
              </span>
              <p className='font-raleway text-[#d0d0ff] text-base sm:text-lg leading-relaxed relative z-10 italic'>
                In finance, we navigate more than numbers—we guide the future of
                families and businesses. Every financial decision creates
                ripples that affect lives. My mission is to bring clarity,
                strategy, and ethical leadership to the complex world of
                finance.
              </p>
              <span className='absolute -bottom-6 sm:-bottom-8 -right-2 text-4xl sm:text-6xl text-[#7e7dff]/10 font-serif'>
                "
              </span>
            </div>
            <div className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#2e2d56]'>
              <a
                href='/blog'
                className='font-inter text-[#7e7dff] text-xs sm:text-sm hover:text-white transition-colors flex items-center group'>
                Explore my perspectives
                <FiArrowRight className='ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1' />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile-only CTA buttons that appear below the quote */}
        <div className='lg:hidden flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 mb-8 justify-center order-3'>
          {/* Read Articles Button */}
          <a
            href='/blog'
            className='inline-flex items-center justify-center group relative overflow-hidden rounded-lg w-full sm:w-auto'>
            <span className='absolute inset-0 bg-gradient-to-r from-[#3d3d7d] to-[#5b5bbd] transition-all duration-300 group-hover:scale-105'></span>
            <span className='relative flex items-center justify-center bg-[#2a2a55] border border-[#4341a5] rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-montserrat text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#2a2a55]/0 w-full'>
              Read My Articles
              <FiArrowRight className='ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1' />
            </span>
          </a>
          <a
            href='https://www.dawan.africa/news/tawakal-express-appoints-zakarie-hashi-as-the-youngest-ceo'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center group relative overflow-hidden rounded-lg w-full sm:w-auto'>
            <span className='absolute inset-0 bg-gradient-to-r from-[#3d3d7d] to-[#5b5bbd] transition-all duration-300 group-hover:scale-105'></span>
            <span className='relative flex items-center justify-center bg-[#2a2a55] border border-[#4341a5] rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-montserrat text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#2a2a55]/0 w-full'>
              What The Media Says
              <FiExternalLink className='ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1' />
            </span>
          </a>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className='absolute -bottom-40 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-tr from-[#2a2a55] to-[#1a1a36] opacity-30 blur-3xl'></div>
      <div className='absolute -top-40 -left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-br from-[#7e7dff] to-[#1a1a36] opacity-5 blur-3xl'></div>

      {/* Refined scroll indicator - hidden on small screens */}
      <div className='absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center hidden sm:flex'>
        <span className='block text-[#7e7dff]/70 font-inter text-xs mb-2'>
          Scroll to explore
        </span>
        <div className='w-0.5 h-8 sm:h-12 bg-gradient-to-b from-[#7e7dff]/50 to-transparent'></div>
      </div>
    </section>
  );
};

export default Hero;
