import React from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/blog-post";
import { slugify } from "@/lib/utils";
import { Metadata } from "next";

interface FirestorePost {
  title: string;
  content: string;
  contentHtml: string;
  date: any;
  image: string;
  categoryName: string;
  categoryId: string;
}

// Generate metadata for the page, including OpenGraph image
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    // Await the params before using its properties
    const { slug } = await params;

    // Get all posts and find the matching one
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);

    const matchingPost = querySnapshot.docs.find((doc) => {
      const postData = doc.data() as FirestorePost;
      const postSlug = slugify(postData.title);
      return postSlug === slug;
    });

    if (!matchingPost) {
      return {
        title: "Post Not Found",
      };
    }

    const postData = matchingPost.data() as FirestorePost;

    // Return metadata including OpenGraph image
    return {
      title: postData.title,
      description: postData.content.substring(0, 160), 
      openGraph: {
        title: postData.title,
        description: postData.content.substring(0, 160),
        images: [
          {
            url: postData.image,
            width: 1200,
            height: 630,
            alt: postData.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: postData.title,
        description: postData.content.substring(0, 160),
        images: [postData.image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    // Await the params before using its properties
    const { slug } = await params;

    // Get all posts and find the matching one
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);

    const matchingPost = querySnapshot.docs.find((doc) => {
      const postData = doc.data() as FirestorePost;
      const postSlug = slugify(postData.title);
      return postSlug === slug;
    });

    if (!matchingPost) {
      return notFound();
    }

    const postData = matchingPost.data() as FirestorePost;
    const post = {
      id: matchingPost.id,
      ...postData,
      // Convert Timestamp to string to avoid serialization issues
      date: postData.date.toDate().toISOString(),
    };

    return (
      <div className=''>
        <BlogPost post={post} />
      </div>
    );
  } catch (error) {
    console.error("Error in page component:", error);
    return <div>Error loading post. Please try again later.</div>;
  }
}
