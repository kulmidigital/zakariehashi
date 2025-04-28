import React from "react";
import Blog from "@/components/blog/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Zakarie Hashi",
  description:
    "Thoughts, insights, and perspectives on finance, leadership, and global money transfer services.",
};

export default function BlogPage() {
  return (
    <div className=''>
      <Blog />
    </div>
  );
}
