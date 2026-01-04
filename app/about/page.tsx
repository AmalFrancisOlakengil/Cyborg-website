"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

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
                Founded in 2018, Cyborg was born out of a small group of electronics enthusiasts who wanted to push the
                boundaries of autonomous systems. What started as a robotic-arm project in a garage has now evolved into
                one of the most prestigious technical societies in our college.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-primary pl-4">Our Institution</h2>
            <p className="text-muted-foreground">
              We are proud to be a part of the Excellence Technical Institute, which provides us with the
              state-of-the-art laboratory facilities and resources required to compete at national and international
              levels.
            </p>
          </section>
        </div>

        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-border reveal-up">
          <Image src="/robotics-lab-modern.jpg" alt="Robotics Lab" fill className="object-cover" />
        </div>
      </div>

      <section className="reveal-up">
        <h2 className="text-4xl font-bold mb-12 text-center">Faculty In-Charge</h2>
        <div className="max-w-sm mx-auto bg-zinc-900 border border-border p-8 rounded-3xl text-center">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary">
            <Image src="/professor-portrait.png" alt="Faculty Profile" fill className="object-cover" />
          </div>
          <h3 className="text-2xl font-bold">Dr. Sarah Jenkins</h3>
          <p className="text-primary font-medium mb-4">Department of AI & Robotics</p>
          <p className="text-sm text-muted-foreground italic">
            "Guiding the next generation of engineers to build ethical and powerful AI systems."
          </p>
        </div>
      </section>
    </div>
  )
}
