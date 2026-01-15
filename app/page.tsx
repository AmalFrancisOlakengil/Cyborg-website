"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

// --- ALUMNI DATA ---
const alumni = [
  {
    name: "Alex Rivera",
    company: "Google",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Selection_G_Suite_Name_Logo_2015.png",
    batch: "Batch 2020-2024",
    offer: "60 LPA Package",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Sarah Chen",
    company: "NVIDIA",
    companyLogo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
    batch: "Batch 2021-2025",
    offer: "PPO Secured",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Marcus Thorne",
    company: "Tesla",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    batch: "Batch 2019-2023",
    offer: "52 LPA",
    img: "https://avatar.vercel.sh/marcus",
  },
  {
    name: "Priya Das",
    company: "Microsoft",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    batch: "Batch 2020-2024",
    offer: "45 LPA",
    img: "https://avatar.vercel.sh/priya",
  },
]

const AlumniCard = ({ img, name, company, companyLogo, batch, offer }: any) => (
  <figure
    className={cn(
      "relative w-[320px] sm:w-[500px] h-[200px] sm:h-[240px] cursor-pointer overflow-hidden rounded-2xl border flex items-center p-0 mx-4 sm:mx-6",
      "border-white/10 bg-zinc-900/50 hover:bg-zinc-800 transition-all duration-300",
    )}
  >
    <div className="w-[60%] sm:w-2/5 h-full relative border-r border-white/5 shrink-0">
      <img className="object-cover w-full h-full" src={img || "/placeholder.svg"} alt={name} />
    </div>
    
    <div className="w-[40%] sm:w-3/5 p-4 sm:p-8 flex flex-col justify-center gap-1 sm:items-center sm:text-center">
      <div className="flex items-center gap-2 mb-1">
        <img
          src={companyLogo || "/placeholder.svg"}
          alt={company}
          className="h-4 sm:h-5 w-auto object-contain opacity-80"
        />
        <p className="hidden sm:block text-primary font-bold text-[10px] sm:text-xs tracking-widest uppercase">{company}</p>
      </div>
      
      <figcaption className="text-lg sm:text-2xl font-black text-white tracking-tight leading-none mb-1 text-balance">
        {name}
      </figcaption>
      
      <p className="text-zinc-500 text-[10px] sm:text-sm font-medium">{batch}</p>
      
      <div className="mt-2 sm:mt-4">
        <span className="text-[10px] font-black text-green-400 bg-green-400/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-green-400/20 uppercase tracking-widest whitespace-nowrap">
          {offer}
        </span>
      </div>
    </div>
  </figure>
)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const tiltCardRef = useRef<HTMLDivElement>(null)
  const tiltImageRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const visionStickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // 1. HERO ANIMATION
      const xTo = gsap.quickTo(tiltCardRef.current, "rotationY", { duration: 0.3, ease: "power3" })
      const yTo = gsap.quickTo(tiltCardRef.current, "rotationX", { duration: 0.3, ease: "power3" })
      const imgXTo = gsap.quickTo(tiltImageRef.current, "x", { duration: 0.5, ease: "power3" })
      const imgYTo = gsap.quickTo(tiltImageRef.current, "y", { duration: 0.5, ease: "power3" })

      gsap.timeline()
        .from(heroTextRef.current?.children || [], { y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" })
        .from(tiltCardRef.current, { scale: 0, opacity: 0, rotationY: 180, duration: 1.5, ease: "elastic.out(1, 0.75)" }, "-=1")

      const handleMouseMove = (e: MouseEvent) => {
        if (!tiltCardRef.current) return
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const xPos = (clientX / innerWidth - 0.5) * 2
        const yPos = (clientY / innerHeight - 0.5) * 2
        xTo(xPos * 20); yTo(-yPos * 20); imgXTo(xPos * 60); imgYTo(yPos * 60)
      }
      window.addEventListener("mousemove", handleMouseMove)

      // 2. VISION ANIMATION (DESKTOP PIN)
      mm.add("(min-width: 1024px)", () => {
        if (visionStickyRef.current) {
          const stickyTl = gsap.timeline({
            scrollTrigger: {
              trigger: visionStickyRef.current,
              start: "top top",
              end: "+=3000",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          stickyTl
            .to(".vision-sticky-header h1", { opacity: 1, y: 0, duration: 2 })
            .to(".vision-card-container", { width: "60%", duration: 2 }, "<")
            .to(".vision-card-container", { gap: "30px", duration: 2 })
            .to("#v-card-1", { x: -30, borderRadius: "20px", duration: 2 }, "<")
            .to("#v-card-3", { x: 30, borderRadius: "20px", duration: 2 }, "<")
            .to(".vision-card-3d", { borderRadius: "20px", duration: 2 }, "<")
            .to(".vision-card-3d", { rotationY: 180, duration: 3, stagger: 0.1, ease: "power2.inOut" })
            .to(["#v-card-1", "#v-card-3"], { y: 30, rotationZ: (i) => (i === 0 ? -15 : 15), duration: 3 }, "<")
        }
      })

      // 3. VISION ANIMATION (MOBILE)
      mm.add("(max-width: 1023px)", () => {
        gsap.to(".vision-sticky-header h1", {
          opacity: 1,
          y: 0,
          scrollTrigger: { trigger: visionStickyRef.current, start: "top 70%", end: "top 40%", scrub: 1 },
        })

        gsap.to(".vision-card-container", {
          gap: "40px",
          scrollTrigger: {
            trigger: visionStickyRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1
          }
        });

        gsap.utils.toArray(".vision-card-3d").forEach((card: any) => {
          gsap.to(card, {
            rotationY: 180,
            borderRadius: "20px", 
            scrollTrigger: { 
              trigger: card, 
              start: "top 35%", 
              end: "top 0%",
              scrub: 1 
            },
          })
        })
      })

      // 4. TEXT POPUP
      gsap.from(".scroll-text-reveal", {
        scrollTrigger: {
          trigger: ".scroll-text-reveal-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 100, opacity: 0, rotateX: -45, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)",
      })

      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-primary">
      {/* HERO SECTION */}
      <section ref={heroSectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 lg:px-24 pt-32 lg:pt-0 perspective-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.15),transparent_50%)] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none opacity-30" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* TEXT CONTAINER (z-10 to stay under logo if overlaps occur) */}
          <div ref={heroTextRef} className="text-center lg:text-left order-2 lg:order-1 relative z-10">
            {/* UPDATED FONT SIZES:
               lg:text-6xl  -> Safe for small laptops (1024px+)
               xl:text-8xl  -> Safe for large laptops (1280px+)
               2xl:text-[10rem] -> Massive for Desktops/Monitors (1536px+)
            */}
            <h1 className="text-5xl sm:text-7xl lg:text-6xl xl:text-8xl 2xl:text-[10rem] font-black tracking-tighter mb-4 leading-[0.8] uppercase">
              CYBORG <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700">CLUB</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
              Join the elite engineering collective where biology meets precision.
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

          <div className="flex items-center justify-center order-1 lg:order-2 perspective-1000 relative z-20">
            {/* UPDATED CARD SIZES:
               lg:w-[350px] -> Safe for small laptops
               xl:w-[450px] -> Safe for large laptops
               2xl:w-[550px] -> Massive for Desktops
            */}
            <div ref={tiltCardRef} className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] rounded-[3rem] bg-gradient-to-br from-zinc-800/50 to-black/80 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(220,38,38,0.3)] flex items-center justify-center will-change-transform group overflow-visible" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 rounded-[3rem] opacity-20 bg-[url('https://assets.codepen.io/16327/noise-e82662fe.png')] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-6 rounded-[2.5rem] border border-white/5 pointer-events-none" style={{ transform: "translateZ(20px)" }} />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-scan z-10 opacity-50" />
              <div ref={tiltImageRef} className="relative w-[80%] h-[80%] filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}>
                <Image src="/img.png" alt="Cyborg Logo" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section ref={visionStickyRef} className="relative w-full min-h-auto lg:min-h-screen flex flex-col justify-start lg:justify-center items-center bg-black overflow-hidden py-32 lg:py-0 border-t border-zinc-900">
        <div className="vision-sticky-header px-6 mb-16 lg:mb-0 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif text-white opacity-0 translate-y-10">Three pillars with one purpose</h1>
        </div>

        <div className="vision-card-container flex flex-col lg:flex-row items-center lg:gap-0 mt-20 lg:mt-0 w-full lg:w-auto px-6 md:px-0 pt-8">
          
          <div className="vision-card-3d" id="v-card-1">
            <div className="vision-card-front"><h2 className="vision-front-text font-apple">OUR</h2></div>
            <div className="vision-card-back">
              <span>01</span>
              <p>Tech Hub</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Platform for students to explore AI & Robotics.</p>
            </div>
          </div>

          <div className="vision-card-3d" id="v-card-2">
             <div className="vision-card-front"><h2 className="vision-front-text font-apple text-primary/70">SHARED</h2></div>
            <div className="vision-card-back">
              <span>02</span>
              <p>Innovation First</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Translate Vision into Reality. Building the future circuits.</p>
            </div>
          </div>

          <div className="vision-card-3d" id="v-card-3">
             <div className="vision-card-front"><h2 className="vision-front-text font-apple">VISION</h2></div>
            <div className="vision-card-back">
              <span>03</span>
              <p>Community Impact</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Bridging the gap between academia and industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BIG TEXT REVEAL */}
      <section className="py-32 px-6 bg-zinc-950 overflow-hidden scroll-text-reveal-container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1] tracking-tighter">
            {["BUILDING THE", "NEXT GENERATION", "OF CYBERNETIC", "INTELLIGENCE."].map((t, i) => (
              <span key={i} className={cn("scroll-text-reveal block [transform-style:preserve-3d]", i === 2 ? "text-primary" : "text-white")}>{t}</span>
            ))}
          </h2>
        </div>
      </section>

      {/* ALUMNI MARQUEE */}
      <section className="py-32 bg-black overflow-hidden relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase">Our Alumini's</h2>
        </div>
        
        <Marquee 
          pauseOnHover 
          className="[--duration:40s] active:[&_div]:[animation-play-state:paused] select-none"
        >
          {alumni.map((person) => <AlumniCard key={person.name} {...person} />)}
        </Marquee>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black z-10 hidden sm:block"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black z-10 hidden sm:block"></div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-32 bg-zinc-950 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-light italic leading-tight">
            The best way to predict the future is to <span className="text-primary font-bold not-italic uppercase">design it</span> yourself.
          </h2>
          <p className="mt-8 text-xl font-bold uppercase tracking-widest text-muted-foreground">— Cyborg Motto</p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  )
}