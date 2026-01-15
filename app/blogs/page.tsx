"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { ArrowUpRight, User } from "lucide-react"

// Updated data with the specific image path
const blogsData = [
  {
    id: 1,
    title: <span>OpenAI Gave Us a <span className="italic font-serif text-primary">Glimpse</span> Into Their AI Coding Playbook</span>,
    excerpt: "Lessons from the team that built Codex and launched a number-one app with it.",
    author: "Katie Parrott",
    date: "Jan 12, 2026",
    // Next.js serves files in "public" from the root "/"
    image: "/images/cyborg-white.png", 
    category: "AI & Dev",
  },
  {
    id: 2,
    title: <span>How Every Is <span className="italic font-serif text-primary">Harnessing</span> the World-changing Shift of Opus 4.5</span>,
    excerpt: "Five patterns from our Opus 4.5 Claude Code Camp you can apply today.",
    author: "Katie Parrott",
    date: "Jan 10, 2026",
    image: "/images/cyborg-white.png",
    category: "Technology",
  },
  {
    id: 3,
    title: <span>Claude Code: The Most Common <span className="italic font-serif text-primary">Questions</span> Beginners Ask</span>,
    excerpt: "The 23 questions and answers you need to get started immediately.",
    author: "Nityesh Agarwal",
    date: "Jan 08, 2026",
    image: "/images/cyborg-white.png",
    category: "Tutorials",
  },
  {
    id: 4,
    title: <span>When AI Can Do Your <span className="italic font-serif text-primary">Job</span>, Who Else Are You?</span>,
    excerpt: "Your rare skill just became common. Here's what that makes possible.",
    author: "Danny Aziz",
    date: "Jan 05, 2026",
    image: "/images/cyborg-white.png",
    category: "Career",
  },
  {
    id: 5,
    title: <span>The Future of Web <span className="italic font-serif text-primary">Design</span> in 2026</span>,
    excerpt: "Why minimal interfaces and heavy typography are making a comeback.",
    author: "Alex Rivera",
    date: "Jan 02, 2026",
    image: "/images/cyborg-white.png",
    category: "Design",
  },
]

export default function BlogsPage() {
  useEffect(() => {
    gsap.from(".blog-card", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    })
  }, [])

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-5xl md:text-7xl font-bold mb-20 text-center">
        Club <span className="text-primary">Insights</span>
      </h1>

      {/* Featured/Latest Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="bg-primary w-2 h-8 rounded-full" />
          Latest Articles
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {blogsData.map((blog) => (
            <article 
              key={blog.id} 
              className="blog-card group flex flex-col h-full cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-zinc-900 border border-white/5">
                <Image
                  src={blog.image}
                  alt="Blog cover"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 p-4" // Added p-4 if the PNG is a logo and needs padding
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-bold leading-tight mb-3 text-zinc-100 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10">
                        <User size={14} className="text-zinc-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                            {blog.author}
                        </span>
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                           {blog.date}
                        </span>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}