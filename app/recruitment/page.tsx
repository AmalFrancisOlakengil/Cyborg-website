"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Clock, Bell } from "lucide-react"

export default function RecruitmentPage() {
  useEffect(() => {
    gsap.from(".recruit-content", {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    })
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
      <div className="recruit-content my-12 max-w-2xl w-full bg-zinc-900 border border-primary/20 p-12 rounded-[3rem] text-center shadow-[0_0_50px_rgba(255,0,0,0.1)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-primary" />

        <div className="mb-8 inline-flex bg-primary/10 p-6 rounded-full text-primary">
          <Clock size={64} className="animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Cycle <span className="text-primary">Ended</span>
        </h1>

        <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
          Thank you for your overwhelming interest in joining CYBORG. The current recruitment window has closed as of
          last week.
        </p>

        <div className="p-6 bg-black/50 border border-border rounded-2xl mb-8">
          <p className="text-lg font-bold">Next Recruitment Cycle Begins:</p>
          <p className="text-primary font-mono text-2xl mt-2 tracking-widest">AUGUST 2026</p>
        </div>

        <button className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto py-4 border border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" /> Notify Me
        </button>

        <p className="mt-8 text-sm text-muted-foreground uppercase tracking-tighter">
          Follow our socials to stay updated on flash-recruitment events!
        </p>
      </div>
    </div>
  )
}
