/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ClockIcon, TagIcon } from "@heroicons/react/24/outline";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "tutorials", name: "Tutorials" },
    { id: "updates", name: "Updates" },
    { id: "tips", name: "Tips & Tricks" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with DelpCap",
      excerpt:
        "Learn how to use DelpCap to create professional captions for your videos in minutes.",
      date: "2024-04-01",
      readTime: "5 min read",
      category: "tutorials",
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "New Features in DelpCap v1.0",
      excerpt:
        "Discover the latest features and improvements in our newest release.",
      date: "2024-03-15",
      readTime: "3 min read",
      category: "updates",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca88454b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Best Practices for Video Captions",
      excerpt:
        "Learn the best practices for creating effective and accessible video captions.",
      date: "2024-03-01",
      readTime: "7 min read",
      category: "tips",
      image:
        "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-light/80 text-lg">
          Latest updates, tutorials, and tips for using DelpCap
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-primary text-dark"
                : "bg-dark/50 text-light/80 hover:bg-dark/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group bg-dark/50 rounded-xl overflow-hidden border border-light/10 hover:border-primary/20 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-light/60 mb-3">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-light/80 mb-4">{post.excerpt}</p>
              <div className="flex items-center space-x-2">
                <TagIcon className="h-4 w-4 text-light/60" />
                <span className="text-sm text-light/60">
                  {categories.find((c) => c.id === post.category)?.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-dark/50 rounded-xl p-8 border border-light/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-light/80 mb-6">
            Subscribe to our newsletter to receive the latest updates and tips
            about DelpCap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-dark/30 border border-light/10 text-light/80 focus:outline-none focus:border-primary/50"
            />
            <button className="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
