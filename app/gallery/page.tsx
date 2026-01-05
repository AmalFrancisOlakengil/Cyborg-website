"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

// Empty array as requested, user can add paths here later
const galleryImages = [
  "/Designathon Footage/img1.jpg",
  "/Designathon Footage/img2.jpg",
  "/Designathon Footage/img3.jpg",
  "/Designathon Footage/img4.jpg",
  "/Designathon Footage/img5.jpg",
  "/Designathon Footage/img6.jpg",
  "/Designathon Footage/img7.jpg",
  "/Designathon Footage/img8.jpg",
]

export default function GalleryPage() {
  useEffect(() => {
    gsap.from(".gallery-item", {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    })
  }, [])

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter uppercase italic">
          Visual <span className="text-primary italic">Dump</span>
        </h1>
        <p className="text-muted-foreground">Snapshots of innovation, teamwork, and excellence.</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((src, idx) => (
          <div
            key={idx}
            className="gallery-item break-inside-avoid relative rounded-3xl overflow-hidden border border-border bg-zinc-900 group"
          >
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
            <Image
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${idx + 1}`}
              width={800}
              height={1000}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-40 border-2 border-dashed border-border rounded-3xl">
          <p className="text-muted-foreground text-xl">The gallery is currently being curated. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
