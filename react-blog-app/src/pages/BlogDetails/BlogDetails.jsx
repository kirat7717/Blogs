import React from "react";

import { useParams } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";

function BlogDetails() {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- Main Content Area --- */}
          <main className="lg:col-span-8">
            {/* Header Section */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                Unleashing the Power of Imagination
              </h1>

              {/* Author Info */}
              <div className="flex items-center space-x-4 text-gray-600 mb-8">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ">
                  <img
                    src="https://placehold.co/100x100?text=Profile"
                    alt="Jennifer Erien"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Written by Jennifer Erien
                  </p>
                  <div className="flex items-center text-sm space-x-2 mt-0.5">
                    <span>June 14</span>
                    <span>&middot;</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-10 rounded-xl overflow-hidden">
              <img
                src="https://placehold.co/800x450?text=Creative+Typewriter"
                alt="Typewriter with creative text"
                className="w-full object-cover"
              />
            </div>

            {/* Blog Content Article - Typography Plugin Removed */}
            <article className="text-gray-700 leading-relaxed space-y-6 text-base">
              <p>
                Creativity is the spark that ignites imagination and transforms
                ideas into reality. It allows individuals to express themselves
                uniquely and explore new possibilities, whether in art, design,
                or problem-solving. Embracing creativity can lead to
                groundbreaking solutions and inspire others to think outside the
                box.
              </p>
              <p>
                The Creative Canvas is a platform dedicated to fostering
                creativity in various fields. It offers tools and resources for
                artists, designers, and innovators to collaborate, share ideas,
                and bring their visions to life. This article explores how to
                enhance your creative journey.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 pt-4 pb-1">
                Introducing: The Creative Canvas
              </h2>
              <p>
                The Creative Canvas goes beyond traditional design tools. It
                provides a dynamic environment for users to experiment with
                colors, shapes, and textures, allowing them to create stunning
                visuals. The platform encourages exploration and innovation,
                making it an essential resource for anyone passionate about
                design.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 pt-4 pb-1">
                Benefits of the Creative Canvas
              </h2>
              <ol className="space-y-4 list-decimal list-inside font-semibold text-gray-900">
                <li>
                  Enhanced Creativity and Innovation:
                  <p className="font-normal text-gray-700 mt-2 ml-6">
                    One of the key benefits of the Creative Canvas is its
                    ability to stimulate creativity. By providing a variety of
                    tools and resources, users can explore new ideas and push
                    the boundaries of their imagination.
                  </p>
                </li>
                <li>
                  Collaboration and Community:
                  <p className="font-normal text-gray-700 mt-2 ml-6">
                    The Creative Canvas fosters collaboration among users,
                    allowing them to share their work and receive feedback. This
                    community-driven approach helps individuals grow.
                  </p>
                </li>
                <li>
                  Comprehensive Design Management:
                  <p className="font-normal text-gray-700 mt-2 ml-6">
                    The platform enables users to manage their design projects
                    effectively, ensuring organization and tracking progress
                    from start to finish.
                  </p>
                </li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 pt-4 pb-1">
                How the Creative Canvas Inspires Creators?
              </h2>
              <ol className="space-y-4 list-decimal list-inside font-semibold text-gray-900">
                <li>
                  Fostering Self-Expression and Confidence
                  <p className="font-normal text-gray-700 mt-2 ml-6">
                    The Creative Canvas inspires users by providing a space for
                    self-expression. By experimenting with different design
                    elements, creators gain confidence in their abilities.
                  </p>
                </li>
                <li>
                  Encouraging Exploration and Growth
                  <p className="font-normal text-gray-700 mt-2 ml-6">
                    The platform not only facilitates design but also promotes
                    exploration by encouraging users to try new techniques and
                    expand their creative horizons.
                  </p>
                </li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 pt-4 pb-1">
                In Conclusion
              </h2>
              <p>
                The Creative Canvas is a powerful tool that empowers creators to
                unleash their imagination. By offering a range of resources and
                insights, it helps individuals navigate their creative journeys
                and produce exceptional work.
              </p>
              <p>
                Embracing creativity opens doors to endless possibilities,
                allowing individuals to make their mark in the world of design.
              </p>
            </article>
          </main>

          {/* --- Sidebar Area --- */}
          <aside className="lg:col-span-4">
            {/* Standard div to allow natural document flow and scrolling */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b-2 border-[#0083c9] inline-block pb-1">
                More Like This
              </h3>

              {/* Related Blogs Container */}
              <div className="flex flex-col gap-6">
                <BlogCard />
                <BlogCard />
                <BlogCard />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
