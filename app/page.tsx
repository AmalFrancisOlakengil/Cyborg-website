"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Refs for Hero
  const heroSectionRef = useRef<HTMLElement>(null)
  const tiltCardRef = useRef<HTMLDivElement>(null)
  const tiltImageRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  
  // Ref for Sticky Vision Section
  const visionStickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ===========================================
      // 1. HERO LOGIC (Global)
      // ===========================================
      const xTo = gsap.quickTo(tiltCardRef.current, "rotationY", { duration: 0.3, ease: "power3" })
      const yTo = gsap.quickTo(tiltCardRef.current, "rotationX", { duration: 0.3, ease: "power3" })
      const imgXTo = gsap.quickTo(tiltImageRef.current, "x", { duration: 0.5, ease: "power3" })
      const imgYTo = gsap.quickTo(tiltImageRef.current, "y", { duration: 0.5, ease: "power3" })

      const tl = gsap.timeline()
      tl.from(heroTextRef.current?.children || [], {
        y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out",
      })
      .from(tiltCardRef.current, {
        scale: 0, opacity: 0, rotationY: 180, duration: 1.5, ease: "elastic.out(1, 0.75)",
      }, "-=1")

      const handleMouseMove = (e: MouseEvent) => {
        if (!tiltCardRef.current) return
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const xPos = (clientX / innerWidth - 0.5) * 2
        const yPos = (clientY / innerHeight - 0.5) * 2
        xTo(xPos * 20) 
        yTo(-yPos * 20)
        imgXTo(xPos * 40)
        imgYTo(yPos * 40)
      }

      const handleMouseLeave = () => {
        xTo(0); yTo(0); imgXTo(0); imgYTo(0);
      }

      window.addEventListener("mousemove", handleMouseMove)
      heroSectionRef.current?.addEventListener("mouseleave", handleMouseLeave)

      // ===========================================
      // 2. VISION ANIMATION (RESPONSIVE)
      // ===========================================
      const visionSection = visionStickyRef.current

      // --- DESKTOP ANIMATION (> 1024px) ---
      mm.add("(min-width: 1024px)", () => {
        if (visionSection) {
          const stickyTl = gsap.timeline({
            scrollTrigger: {
              trigger: visionSection,
              start: "top top",
              end: "+=3000",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            }
          })

          stickyTl
            .to(".vision-sticky-header h1", { opacity: 1, y: 0, duration: 2 })
            .to(".vision-card-container", { width: "60%", duration: 2 }, "<") 
            .to(".vision-card-container", { gap: "30px", duration: 2 })
            .to("#v-card-1", { x: -30, borderRadius: "20px", duration: 2 }, "<")
            .to("#v-card-3", { x: 30, borderRadius: "20px", duration: 2 }, "<")
            .to(".vision-card-3d", { borderRadius: "20px", duration: 2 }, "<")
            .to(".vision-card-3d", { 
              rotationY: 180, 
              duration: 3, 
              stagger: 0.1,
              ease: "power2.inOut" 
            })
            .to(["#v-card-1", "#v-card-3"], {
              y: 30,
              rotationZ: (i) => (i === 0 ? -15 : 15),
              duration: 3
            }, "<")
        }
      });

      // --- MOBILE ANIMATION (< 1023px) ---
      mm.add("(max-width: 1023px)", () => {
        
        // 1. Reveal Header
        gsap.to(".vision-sticky-header h1", {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: visionSection,
            start: "top 70%",
            end: "top 40%",
            scrub: 1
          }
        });

        // 2. Separate Container Gaps
        gsap.to(".vision-card-container", {
          gap: "40px",
          scrollTrigger: {
            trigger: visionSection,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1
          }
        });

        // 3. FLIP CARDS INDIVIDUALLY
        const cards = gsap.utils.toArray(".vision-card-3d") as HTMLElement[];
        
        cards.forEach((card) => {
          gsap.to(card, {
            rotationY: 180, 
            borderRadius: "20px", 
            scrollTrigger: {
              trigger: card, 
              start: "top 55%", 
              end: "top 20%", 
              scrub: 1, 
            }
          })
        });
      });

      // ===========================================
      // 3. TEXT REVEAL (Bottom)
      // ===========================================
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

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        heroSectionRef.current?.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="pt-20 overflow-x-hidden bg-black text-white selection:bg-primary selection:text-white">
      
      {/* HERO SECTION */}
      <section 
        ref={heroSectionRef} 
        className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-center overflow-hidden px-4 lg:px-20 perspective-1000"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.15),transparent_50%)] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none opacity-30" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div ref={heroTextRef} className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              CYBORG <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">CLUB</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Innovating at the intersection of Silicon and Biology. We build the future, one robot at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/recruitment" className="bg-primary text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white hover:scale-105 transition-all duration-300 group">
                Join the Hub <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/events" className="border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                Explore Events
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center order-1 lg:order-2 perspective-1000 py-10 lg:py-0">
            <div ref={tiltCardRef} className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-[3rem] bg-gradient-to-br from-zinc-800/50 to-black/80 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(220,38,38,0.3)] flex items-center justify-center transform-style-3d will-change-transform">
               <div className="absolute inset-0 rounded-[3rem] opacity-20 bg-[url('https://assets.codepen.io/16327/noise-e82662fe.png')] mix-blend-overlay pointer-events-none" />
               <div className="absolute inset-4 rounded-[2.5rem] border border-white/5 pointer-events-none" />
               <div ref={tiltImageRef} className="relative w-[80%] h-[80%] transform-style-3d">
                  <Image src="/img.png" alt="Cyborg Logo" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" priority />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NEW SECTION: OUR VISION
          ========================================= */}
      <section 
        ref={visionStickyRef} 
        className="relative w-full min-h-[100vh] flex flex-col justify-center items-center bg-black overflow-hidden border-t border-zinc-900 lg:h-[100vh]"
      >
        <div className="vision-sticky-header">
          <h1 className="text-4xl md:text-6xl font-serif text-white">Three pillars with one purpose</h1>
        </div>

        <div className="vision-card-container">
          
          {/* Card 1: OUR -> Tech Hub */}
          <div className="vision-card-3d" id="v-card-1">
            <div className="vision-card-front">
              <h2 className="vision-front-text font-apple">OUR</h2>
            </div>
            <div className="vision-card-back">
              <span>01</span>
              <p>Tech Hub</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Platform for students to explore AI & Robotics.</p>
            </div>
          </div>

          {/* Card 2: SHARED -> Innovation First */}
          <div className="vision-card-3d" id="v-card-2">
             <div className="vision-card-front">
               {/* Middle word gets primary color for style */}
               <h2 className="vision-front-text font-apple text-primary/70">SHARED</h2>
            </div>
            <div className="vision-card-back">
              <span>02</span>
              <p>Innovation First</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Translate Vision into Reality. Building the future circuits.</p>
            </div>
          </div>

          {/* Card 3: VISION -> Community Impact */}
          <div className="vision-card-3d" id="v-card-3">
             <div className="vision-card-front">
               <h2 className="vision-front-text font-apple">VISION</h2>
            </div>
            <div className="vision-card-back">
              <span>03</span>
              <p>Community Impact</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Bridging the gap between academia and industry.</p>
            </div>
          </div>

        </div>
      </section>

      {/* BIG TEXT SECTION */}
      <section className="py-24 px-4 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black leading-none tracking-tighter">
            <span className="scroll-text-reveal block">BUILDING THE</span>
            <span className="scroll-text-reveal block">NEXT GENERATION</span>
            <span className="scroll-text-reveal block text-primary">OF CYBERNETIC</span>
            <span className="scroll-text-reveal block">INTELLIGENCE.</span>
          </h2>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-zinc-950 text-center px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="absolute -top-8 -left-2 md:-top-10 md:-left-12 text-primary opacity-20 text-6xl md:text-9xl font-serif">"</div>
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