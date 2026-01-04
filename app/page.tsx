"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { ArrowRight, Cpu, Zap, Globe } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Home() {
  const heroRef = useRef(null)
  const missionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-content > *", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      })

      // Mission Reveal
      gsap.from(".mission-item", {
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
      })

      gsap.from(".scroll-text-reveal", {
        scrollTrigger: {
          trigger: ".scroll-text-reveal",
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        },
        opacity: 0.1,
        y: 30,
        stagger: 0.1,
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)]" />
        <div className="hero-content text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            CYBORG <span className="text-primary italic">CLUB</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Innovating at the intersection of Silicon and Biology. We build the future, one robot at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recruitment"
              className="bg-primary text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-700 hover:text-white transition-all group"
            >
              Join the Hub <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="border border-border bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Motto */}
      <section ref={missionRef} className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Vision</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="mission-item p-8 bg-zinc-900/50 border border-border rounded-2xl hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Technological Hub</h3>
              <p className="text-muted-foreground">
                Providing a platform for students to explore Artificial Intelligence, Machine Learning, and Robotics
                through hands-on projects.
              </p>
            </div>

            <div className="mission-item p-8 bg-zinc-900/50 border border-border rounded-2xl hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation First</h3>
              <p className="text-muted-foreground">
                Our motto: "Translate Vision into Reality". We don't just dream of the future; we build the circuits
                that power it.
              </p>
            </div>

            <div className="mission-item p-8 bg-zinc-900/50 border border-border rounded-2xl hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community Impact</h3>
              <p className="text-muted-foreground">
                Fostering a collaborative environment where mentors and learners bridge the gap between academia and
                industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black leading-none tracking-tighter">
            <span className="scroll-text-reveal block">BUILDING THE</span>
            <span className="scroll-text-reveal block text-primary">NEXT GENERATION</span>
            <span className="scroll-text-reveal block">OF CYBERNETIC</span>
            <span className="scroll-text-reveal block">INTELLIGENCE.</span>
          </h2>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-zinc-950 text-center px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 left-0 text-primary opacity-20 text-9xl font-serif">"</div>
          <h2 className="text-3xl md:text-5xl font-light italic leading-tight text-balance">
            The best way to predict the future is to{" "}
            <span className="text-primary font-bold not-italic uppercase">design it</span> yourself.
          </h2>
          <p className="mt-8 text-xl font-bold uppercase tracking-widest text-muted-foreground">— Cyborg Motto</p>
        </div>
      </section>
    </div>
  )
}
