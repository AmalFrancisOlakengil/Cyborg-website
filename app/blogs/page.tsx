"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { ArrowUpRight, User } from "lucide-react"

const blogsData = [
  {
    id: 1,
    title: <span>Teaching LLMs How to <span className="italic font-serif text-primary">Count</span> Correctly</span>,
    excerpt: "IBM researchers propose a variation on a popular architecture to improve memory and logical reasoning for math problems.",
    author: "Kim Martineau",
    date: "Dec 05, 2025",
    image: "/blogs/img1.jpeg", 
    category: "Research",
    link: "https://research.ibm.com/blog/state-tracking-for-state-space-models"
  },
  {
    id: 2,
    title: <span>Building the Inference Cloud: What Comes <span className="italic font-serif text-primary">Next</span></span>,
    excerpt: "Why 2026 is the year of the inference cloud and how it integrates AI workflows for digital native enterprises.",
    author: "Paddy Srinivasan",
    date: "Jan 07, 2026",
    image: "/blogs/img2.jpeg", 
    category: "Cloud & AI",
    link: "https://www.digitalocean.com/blog/building-inference-cloud-what-comes-next"
  },
  {
    id: 3,
    title: <span>AI Literacy Resources for Teens and <span className="italic font-serif text-primary">Parents</span></span>,
    excerpt: "A new guide to help families use ChatGPT thoughtfully, including how models are trained and tips for responsible use.",
    author: "OpenAI Team",
    date: "Dec 18, 2025",
    // Swapped to be correct: 3rd link = img3
    image: "/blogs/img3.jpeg", 
    category: "Education",
    link: "https://openai.com/index/ai-literacy-resources-for-teens-and-parents/"
  },
  {
    id: 4,
    title: <span>Emergent Affective Computing: The Unintended <span className="italic font-serif text-primary">Evolution</span></span>,
    excerpt: "How AI is developing accidental emotional intelligence and what that means for human-machine interaction.",
    author: "S. Bhattacharjee",
    date: "Jan 06, 2026",
    // Swapped to be correct: 4th link = img4
    image: "/blogs/img4.jpeg", 
    category: "Machine Learning",
    link: "https://towardsai.net/p/machine-learning/emergent-affective-computing-the-unintended-evolution-of-machine-emotional-intelligence"
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
              className="blog-card group flex flex-col h-full"
            >
              {/* Image Container - Linked */}
              <a 
                href={blog.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-zinc-900 border border-white/5 block"
              >
                <Image
                  src={blog.image}
                  alt="Blog cover"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 p-4" 
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {blog.category}
                </div>
              </a>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <a href={blog.link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-2xl font-bold leading-tight mb-3 text-zinc-100 group-hover:text-primary transition-colors cursor-pointer">
                    {blog.title}
                    </h3>
                </a>

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
                  
                  {/* The Arrow Link */}
                  <a 
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}