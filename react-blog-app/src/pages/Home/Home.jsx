import React from "react";
import BlogCard from "../../components/BlogCard/BlogCard";

function Home() {
  return (
    <>
<main className="bg-gray-50/50 py-12 min-h-screen">
<div className="mx-auto max-w-7xl px-8">        
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
</div>
        </div>
      </main>

      <div>home page</div>
    </>
  );
}

export default Home;
