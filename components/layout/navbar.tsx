"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Grenze_Gotisch } from "next/font/google";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const grenze = Grenze_Gotisch({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home", external: false },
    { href: "/blog", label: "Blog", external: false },
    { href: "/contact", label: "Contact", external: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a20]/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}>
      <div className='container mx-auto px-4 py-3 lg:py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo and Name */}
          <Link href='/' className='flex items-center gap-3 group'>
            {/* Logo */}
            <div className='h-9 w-9 lg:h-10 lg:w-10 rounded-md bg-[#1a1a36] border border-[#2e2d56] flex items-center justify-center relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#2a2a55]/50 to-[#4341a5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <span
                className={`${grenze.className} text-[#7e7dff] text-lg lg:text-xl font-bold relative z-10`}>
                ZH
              </span>
            </div>

            {/* Name */}
            <h1
              className={`${grenze.className} text-xl lg:text-2xl font-bold text-white hidden sm:block`}>
              zakarie<span className='text-[#7e7dff]'>.</span>hashi
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`relative font-montserrat text-sm font-medium transition-colors duration-300 group
                  ${
                    pathname === link.href && !link.external
                      ? "text-[#7e7dff]"
                      : "text-[#a0a0cc] hover:text-white"
                  }`}>
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px bg-[#7e7dff] transition-all duration-300 group-hover:w-full ${
                    pathname === link.href && !link.external ? "w-full" : "w-0"
                  }`}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-white p-2 focus:outline-none'
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? (
              <FiX className='h-6 w-6 text-[#7e7dff]' />
            ) : (
              <FiMenu className='h-6 w-6 text-[#7e7dff]' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#0a0a20]/95 backdrop-blur-lg transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className='absolute top-4 right-4 p-2 text-white rounded-full hover:bg-[#1a1a36] transition-colors duration-300'
          aria-label='Close menu'>
          <FiX className='h-6 w-6 text-[#7e7dff]' />
        </button>

        <div className='flex flex-col items-center justify-center min-h-screen gap-8 px-4'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`font-montserrat text-xl font-medium transition-colors duration-300
                ${
                  pathname === link.href && !link.external
                    ? "text-[#7e7dff]"
                    : "text-white"
                }`}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
