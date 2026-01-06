"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const MaskContainer = ({
  children,
  revealImage,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode
  revealImage?: string
  size?: number
  revealSize?: number
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null })
  const containerRef = useRef<any>(null)

  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition)
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", updateMousePosition)
      }
    }
  }, [])

  const maskSize = isHovered ? revealSize : size

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-screen", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-white text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px]"
        animate={{
          maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.15, ease: "linear" },
        }}
      >
        <div
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
          className="relative z-20 h-full w-full flex items-center justify-center overflow-hidden"
        >
          {revealImage && (
            <Image src={revealImage || "/placeholder.svg"} alt="Reveal image" fill className="object-contain" />
          )}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto max-w-4xl text-center text-4xl font-bold text-white">{children}</div>
      </div>
    </motion.div>
  )
}
