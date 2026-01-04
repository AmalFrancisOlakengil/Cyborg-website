"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Phone, Mail, Send } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    gsap.from(".reveal", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      alert("Message sent successfully! We'll get back to you soon.")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="reveal">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-xl mb-12">
            Have a question? Interested in a collaboration? Or just want to talk about robots? Drop us a line.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Secretary</h3>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Public Relations</h3>
                <p className="text-muted-foreground">+91 98765 43211</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-muted-foreground">cyborg@college.edu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal bg-zinc-900 p-8 md:p-12 rounded-[2rem] border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-black border border-border rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-black border border-border rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                className="w-full bg-black border border-border rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Transmitting..." : "Send Message"} <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
