"use client"
import { ShaderAnimation } from "@/components/shader-animation";
import { SplineScene } from "@/components/ui/splite";
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
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
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const titleTextRef = useRef<HTMLHeadingElement>(null) 
  const visionStickyRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

useEffect(() => {

  let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const ctx = gsap.context(() => {
      // --- 0. ENTRANCE ANIMATION (Triggered when loading finishes) ---
      if (!isLoading) {
        const entryTl = gsap.timeline();

        entryTl
          .to(loaderRef.current, {
            clipPath: "inset(0 0 100% 0)", // Slide up reveal
            duration: 1.2,
            ease: "power4.inOut",
          })
          .from(heroTextRef.current?.querySelectorAll("h1, p, div"), {
            scale: 1.5,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            stagger: 0.1,
            ease: "power3.out",
          }, "-=0.8");
     }
    // --- 0. MOUSE MOVE TILT LOGIC (Applied to Text Only) ---
    // This creates the quick setter functions for high performance 
    const xTo = gsap.quickTo(titleTextRef.current, "rotationY", { duration: 0.3, ease: "power3" })
    const yTo = gsap.quickTo(titleTextRef.current, "rotationX", { duration: 0.3, ease: "power3" })

    const handleMouseMove = (e: MouseEvent) => {
      if (!titleTextRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate mouse position from center (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2
      const yPos = (clientY / innerHeight - 0.5) * 2
      
      // Apply rotation (Multiplier 20 for subtle, 50 for extreme)
      xTo(xPos * 30) 
      yTo(-yPos * 30)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // --- EXISTING GSAP CONTEXT ---
    
      const mm = gsap.matchMedia()

      // 1. ZOOM OUT & FADE IN LOAD ANIMATION (Updated)
      const tl = gsap.timeline();
      
   

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
            .to(["#v-card-1", "#v-card-3"], { y: 30, rotationZ: (i: number) => (i === 0 ? -15 : 15), duration: 3 }, "<")
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
          scrollTrigger: { trigger: visionStickyRef.current, start: "top 60%", end: "bottom bottom", scrub: 1 }
        });
        gsap.utils.toArray(".vision-card-3d").forEach((card: any) => {
          gsap.to(card, {
            rotationY: 180,
            borderRadius: "20px", 
            scrollTrigger: { trigger: card, start: "top 35%", end: "top 0%", scrub: 1 },
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

    }, containerRef)

    const timeout = setTimeout(() => setIsLoading(false), 2500);
    
    return () => {
     ctx.revert();
      clearTimeout(timeout);
      clearInterval(interval)
    }
  }, [isLoading])

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-primary">

      {/* --- PRELOADER OVERLAY --- */}
      {isLoading && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative w-full max-w-md px-10">
            {/* Cyberpunk Progress Bar */}
            <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-100" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-4 font-mono text-[10px] tracking-widest uppercase text-zinc-500">
              <span>Initializing System</span>
              <span className="text-white">{progress}%</span>
            </div>
          </div>
          
          {/* Big Background Text for Loader */}
          <h2 className="absolute text-[20vw] font-black text-white/5 select-none pointer-events-none uppercase">
            Cyborg
          </h2>
        </div>
      )}
   {/* HERO SECTION */}
      <section 
        ref={heroSectionRef} 
        className={cn(
          "relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 lg:pt-0 perspective-2000",
          isLoading ? "invisible" : "visible" // Hide content until loader finishes
        )}
      >
        {/* SHADER BACKGROUND - FIXED POSITIONING */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ShaderAnimation />
        </div>

        {/* BACKGROUND TINTS & GRIDS */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.2),transparent_70%)] z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-1 pointer-events-none opacity-25" />

        <div className="container mx-auto relative z-10 w-full flex flex-col items-center justify-center">
          
          {/* CENTERED TEXT CONTAINER */}
          <div ref={heroTextRef} className="text-center flex flex-col items-center relative z-20 [transform-style:preserve-3d]">
            
            {/* 3D TILT TEXT */}
            <h1 
              ref={titleTextRef}
              className="text-6xl sm:text-8xl lg:text-[10rem] xl:text-[13rem] font-black tracking-tighter mb-4 leading-[0.8] uppercase text-white drop-shadow-2xl will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              CYBORG <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700">
                CLUB
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mt-8 mb-12 leading-relaxed font-medium">
              Inspired by thought, shaped by action, the Cyborg spirit!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
              <Link href="/recruitment" className="bg-primary text-black px-12 py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white hover:scale-105 transition-all duration-300 group text-lg">
                Join the Hub <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/events" className="border border-white/20 bg-white/5 backdrop-blur-sm px-12 py-5 rounded-full font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center text-lg">
                Explore Events
              </Link>
            </div>
          </div>

        </div>
      </section>
   {/* VISION SECTION */}
      <section ref={visionStickyRef} className="relative w-full min-h-auto lg:min-h-screen flex flex-col justify-start lg:justify-center items-center bg-black overflow-hidden py-32 lg:py-0 border-t border-zinc-900">
        <div className="vision-sticky-header px-6 mb-16 lg:mb-0 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] font-bold tracking-tighter text-white opacity-0 translate-y-10">Three pillars with one purpose</h1>
        </div>

        <div className="vision-card-container flex flex-col lg:flex-row items-center lg:gap-0 mt-20 lg:mt-0 w-full lg:w-auto px-6 md:px-0 pt-8">
          
          <div className="vision-card-3d" id="v-card-1">
            {/* Front */}
            <div className="vision-card-front !bg-white !text-black border-2 border-transparent">
              <h2 className="vision-front-text font-apple !text-black">OUR</h2>
            </div>
            {/* Back */}
            <div className="vision-card-back !text-black border-0">
              <span>01</span>
              <p>Tech Hub</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Where students explore intelligence beyond the classroom</p>
            </div>
          </div>

          <div className="vision-card-3d" id="v-card-2">
              {/* Front */}
              <div className="vision-card-front !bg-white !text-black border-2 border-transparent">
                <h2 className="vision-front-text font-apple !text-black">SHARED</h2>
              </div>
              {/* Back */}
            <div className="vision-card-back !text-white border-0">
              <span>02</span>
              <p>Innovation First</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Turning ideas into reality , the Cyborg way.</p>
            </div>
          </div>

          <div className="vision-card-3d" id="v-card-3">
              {/* Front */}
              <div className="vision-card-front !bg-white !text-black border-2 border-transparent">
                <h2 className="vision-front-text font-apple !text-black">VISION</h2>
              </div>
              {/* Back */}
            <div className="vision-card-back !text-white border-0">
              <span>03</span>
              <p>Community Impact</p>
              <p className="text-sm mt-4 opacity-80 font-sans">Building connections beyond the classroom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BIG TEXT REVEAL & ROBOT SECTION */}
<section className="py-0 px-6 bg-zinc-950 overflow-hidden scroll-text-reveal-container">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
    
    {/* LEFT: Text Reveal */}
    <div className="flex-1 mt-10">
      <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-[1] tracking-tighter">
        {["BUILDING THE", "NEXT GENERATION", "OF CYBERNETIC", "INTELLIGENCE."].map((t, i) => (
          <span 
            key={i} 
            className={cn(
              "scroll-text-reveal block [transform-style:preserve-3d]", 
              i === 2 ? "text-primary" : "text-white"
            )}
          >
            {t}
          </span>
        ))}
      </h2>
    </div>

    {/* RIGHT: Robot Spline Scene */}
    <div className="flex-1 w-full h-[400px] sm:h-[500px] lg:h-[600px] relative">
      <SplineScene 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
      {/* Optional: Add the radial glow behind the robot to make it pop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white opacity-10 blur-[100px] rounded-full pointer-events-none" />
    </div>

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