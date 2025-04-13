import { blogPosts } from "../../data/blogPosts"
import BlogPost from "../../components/BlogPosts"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Bayangida Farms`,
    description: `Read about ${post.title} on the Bayangida Farms blog.`,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
