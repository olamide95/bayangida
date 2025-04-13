"use client"

import BlogLayout from "./BlogLayout"

export default function BlogPost({ post }) {
  return (
    <BlogLayout
      title={post.title}
      image={post.image}
      date={post.date}
      category={post.category}
      readTime={post.readTime}
    >
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </BlogLayout>
  )
}
