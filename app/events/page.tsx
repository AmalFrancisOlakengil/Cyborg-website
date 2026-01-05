"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Coming Soon",
      date: "will announce soon",
      location: "Will announce soon",
      image: "/events/coming-soon.jpg",
      desc: "Coming soon...",
    },
  ],
  past: [
    {
      id: 2,
      title: "Tech Feud",
      date: "Mar 28, 2025",
      location: "MLCP Lab 6",
      image: "/events/event1.jpeg",
      desc: "Battle of wits in technology-themed quiz competition.",
    },
    {
      id: 3,
      title: "Spotlight Saga",
      date: "April 12, 2024",
      location: "HI-Tech Hall",
      image: "/events/event2.jpeg",
      desc: "The spotlight saga is a tech-themed storytelling competition.",
    },
    {
      id: 4,
      title: "Perspective Panaroma",
      date: "April 12, 2024",
      location: "Admin - 301, 302",
      image: "/events/event3.jpeg",
      desc: "Poster / Paper presentation competition",
    },
  ],
}

export default function EventsPage() {
  useEffect(() => {
    gsap.from(".event-section", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
    })
  }, [])

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold mb-20 text-center">
        Club <span className="text-primary">Chronicles</span>
      </h1>

      {/* Upcoming */}
      <section className="event-section mb-24">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="bg-primary w-2 h-8 rounded-full" />
          Upcoming Events
        </h2>
        <div className="grid md:grid-cols-1 gap-8">
          {eventsData.upcoming.map((event) => (
            <div
              key={event.id}
              className="group relative grid md:grid-cols-2 gap-8 bg-zinc-900 border border-primary/30 rounded-3xl overflow-hidden hover:border-primary transition-colors"
            >
              <div className="relative h-[300px] md:h-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex gap-4 mb-4">
                  <span className="flex items-center gap-2 text-xs font-bold text-primary uppercase border border-primary/20 px-3 py-1 rounded-full">
                    <Calendar size={14} /> {event.date}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase bg-white/5 px-3 py-1 rounded-full">
                    <MapPin size={14} /> {event.location}
                  </span>
                </div>
                <h3 className="text-4xl font-bold mb-4">{event.title}</h3>
                <p className="text-muted-foreground mb-8 text-lg">{event.desc}</p>
                <button className="self-start px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-colors">
                  <s>Register Now</s>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past */}
      <section className="event-section">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="bg-zinc-700 w-2 h-8 rounded-full" />
          Past Events
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {eventsData.past.map((event) => (
            <div key={event.id} className="bg-zinc-900 border border-border rounded-3xl overflow-hidden group">
              <div className="relative h-64 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{event.desc}</p>
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>{event.date}</span>
                  <span className="text-primary uppercase">Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
