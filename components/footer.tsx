import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-primary mb-2 tracking-tighter">CYBORG</h2>
          <p className="text-muted-foreground max-w-xs">
            Redefining Tech with Spectacular Events. Join the revolution in AI & Robotics.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hover:text-primary transition-transform hover:scale-110"
          >
            <Instagram size={28} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-primary transition-transform hover:scale-110"
          >
            <Linkedin size={28} />
          </Link>
          <Link href="mailto:contact@cyborg.edu" className="hover:text-primary transition-transform hover:scale-110">
            <Mail size={28} />
          </Link>
        </div>

        <div className="text-sm text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Cyborg Club. All rights reserved.
          <br />
          Built for the future of Robotics.
        </div>
      </div>
    </footer>
  )
}
