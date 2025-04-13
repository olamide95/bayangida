"use client"

import { useRouter } from "next/router"
import BlogLayout from "../../components/BlogLayout"
import { blogPosts } from "../../data/blogPosts"

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  // Find the blog post with the matching slug
  const post = blogPosts.find((post) => post.slug === slug)

  // If the post is not found or the page is still loading, show a loading state
  if (!post) {
    return <div>Loading...</div>
  }

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
