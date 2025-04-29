"use client";
import React from "react";
import Link from "next/link";
import { Grenze_Gotisch } from "next/font/google";
import { FaLinkedin } from "react-icons/fa";

const grenze = Grenze_Gotisch({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <footer className='bg-[#0a0a20] border-t border-[#1a1a36] py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-row items-center justify-between gap-4'>
          {/* Logo and Name */}
          <Link href='/' className='flex items-center gap-3 group'>
            {/* Logo */}
            <div className='h-8 w-8 lg:h-9 lg:w-9 rounded-md bg-[#1a1a36] border border-[#2e2d56] flex items-center justify-center relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#2a2a55]/50 to-[#4341a5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <span
                className={`${grenze.className} text-[#7e7dff] text-lg font-bold relative z-10`}>
                ZH
              </span>
            </div>

            {/* Name */}
            <h2
              className={`${grenze.className} text-lg lg:text-xl font-bold text-white`}>
              zakarie<span className='text-[#7e7dff]'>.</span>hashi
            </h2>
          </Link>

          {/* Links */}
          <div className='flex items-center gap-4'>
            <Link
              href='https://www.linkedin.com/in/zakariehashi/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-[#a0a0cc] hover:text-[#7e7dff] transition-colors duration-300'>
              <FaLinkedin className='h-5 w-5' />
              <span className='text-sm font-medium'>LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
 