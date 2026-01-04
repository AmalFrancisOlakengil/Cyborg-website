"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"

// Dummy Data
const teamMembers = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "President",
    image: "/tech-lead-portrait.png",
    bio: "AI Researcher with a passion for computer vision.",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    id: 2,
    name: "Maya Chen",
    role: "Technical Head",
    image: "/female-engineer-portrait.png",
    bio: "Robotics expert specialized in ROS and control systems.",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Events Coordinator",
    image: "/male-student-portrait.png",
    bio: "Bridging the gap between tech and community engagement.",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  // Add more as needed
]

export default function TeamPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-card", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">
          The <span className="text-primary uppercase">Elite</span> Team
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Meet the minds behind the machines. Our diverse team of developers, designers, and roboticists.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="team-card group relative bg-zinc-900 border border-border rounded-3xl p-6 overflow-hidden hover:border-primary/50 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors" />

            <div className="relative h-64 mb-6 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>

            <h3 className="text-2xl font-bold">{member.name}</h3>
            <p className="text-primary font-mono text-sm uppercase tracking-tighter mb-4">{member.role}</p>
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{member.bio}</p>

            <div className="flex gap-4">
              <a href={member.socials.linkedin} className="text-muted-foreground hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={member.socials.github} className="text-muted-foreground hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={member.socials.twitter} className="text-muted-foreground hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
