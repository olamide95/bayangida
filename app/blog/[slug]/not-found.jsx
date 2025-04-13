import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
      <p className="text-gray-600 mb-8 text-center">
        Sorry, the blog post you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/blog"
        className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
      >
        Back to Blog
      </Link>
    </div>
  )
}
