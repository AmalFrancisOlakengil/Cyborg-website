"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

// 1. Faculty data list defined at the start
const FACULTY_MEMBERS = [
  {
    name: "Dr. Balika J Chelliah",
    department: "Vice Principal - Founder",
    quote: "Building a future where human intelligence and machine precision coexist to solve the world's greatest challenges.",
    image: "/about/faculty2.jpg"
  },
  {
    name: "Dr. Judy Flavia",
    department: "Assistant Professor, CSE AIML",
    quote: "AI is not just about writing code; it's about architecting systems that can perceive, learn, and reason.",
    image: "/professor-portrait.png"
  },
  {
    name: "Dr. Rubin Bose",
    department: "Assistant Professor, CSE AIML",
    quote: "Data is the new raw material, and machine learning is the tool that shapes it into meaningful innovation.",
    image: "/about/faculty3.jpg"
  },
  {
    name: "Mrs. Swathi",
    department: "Assistant Professor, CSE AIML",
    quote: "Empowering students to move beyond being users of technology to becoming the creators of intelligent solutions.",
    image: "/about/faculty1.jpg"
  }
];

export default function AboutPage() {
  useEffect(() => {
    gsap.from(".reveal-up", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold mb-16 reveal-up">
        About <span className="text-primary">Us</span>
      </h1>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8 reveal-up">
          <section>
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-primary pl-4">Our History</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Cyborg was founded by Dr. Ballika J. Chelliah under the Department of Artificial Intelligence & Machine Learning with the vision of creating a platform where students could explore, innovate, and excel. What began as a platform for technical curiosity has evolved into a dynamic, collaborative community.
              </p>
              <p>
                At the heart of Cyborg lies a vibrant ecosystem of developers, designers, and thinkers. We believe that the best innovations happen at the intersection of diverse perspectives.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-primary pl-4">Our Institution</h2>
            <p className="text-muted-foreground">
              We are proud to be a part of SRM Ramapuram campus, which provides us with the
              state-of-the-art laboratory facilities and resources required to compete at national and international
              levels.
            </p>
          </section>
        </div>

        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-border reveal-up">
          <Image src="/about/Cyborg_team.jpg" alt="Club picture" fill className="object-cover" />
        </div>
      </div>

      <section className="reveal-up">
        <h2 className="text-4xl font-bold mb-12 text-center">Faculty In-Charge</h2>
        
        {/* 2. Mapping through the faculty list */}
        <div className="flex flex-wrap justify-center gap-8">
          {FACULTY_MEMBERS.map((faculty, index) => (
            <div 
              key={index} 
              className="max-w-sm w-full bg-zinc-900 border border-border p-8 rounded-3xl text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary">
                <Image 
                  src={faculty.image} 
                  alt={faculty.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h3 className="text-2xl font-bold">{faculty.name}</h3>
              <p className="text-primary font-medium mb-4">{faculty.department}</p>
              <p className="text-sm text-muted-foreground italic">
                "{faculty.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}