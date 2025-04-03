/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselImage {
  src: string
  alt: string
}

export default function ThreeDCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay] = useState(true)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const images: CarouselImage[] = [
    { src: "/evo1.jpeg", alt: "Event participants group photo" },
    { src: "/evo2.jpeg", alt: "Coding competition" },
    { src: "/evo3.jpeg", alt: "Programming workshop" },
    { src: "/evo4.jpeg", alt: "Performance with red costumes" },
    { src: "/evo6.jpeg", alt: "Formal event photo" },
    { src: "/evo7.jpeg", alt: "Students outside at night" },
  ]

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    resetAutoplayTimer()
  }

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    resetAutoplayTimer()
  }

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current)
    }
    
    if (isAutoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        next()
      }, 4000)
    }
  }

  useEffect(() => {
    resetAutoplayTimer()
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
      }
    }
  }, [currentIndex, isAutoplay])

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + images.length) % images.length
    
    if (diff === 0) return { zIndex: 30, x: 0, scale: 1, opacity: 1, rotateY: 0 }
    else if (diff === 1 || diff === images.length - 1) 
      return { 
        zIndex: diff === 1 ? 20 : 10, 
        x: diff === 1 ? "40%" : "-40%", 
        scale: 0.8, 
        opacity: 0.8, 
        rotateY: diff === 1 ? 40 : -40 
      }
    else return { zIndex: 0, x: 0, scale: 0.6, opacity: 0, rotateY: 0 }
  }

  return (
    <div className="w-full py-12 bg-black/60 backdrop-blur-sm border-t border-b border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 
          className="text-3xl md:text-5xl text-center font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent mb-12" 
          style={{ fontFamily: "var(--font-requiem)" }}
        >
          Evogen 13.o
        </h2>
        
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mx-auto perspective">
          <div 
            className="absolute left-0 top-1/2 z-40 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer"
            onClick={prev}
          >
            <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-cyan-400 hover:bg-black/80 transition-colors border border-cyan-500/50">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </div>
          
          <div 
            className="absolute right-0 top-1/2 z-40 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer"
            onClick={next}
          >
            <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-cyan-400 hover:bg-black/80 transition-colors border border-cyan-500/50">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          
          {images.map((image, index) => {
            const position = getPosition(index)
            
            return (
              <motion.div
                key={index}
                className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer"
                initial={false}
                animate={{
                  zIndex: position.zIndex,
                  x: position.x,
                  scale: position.scale,
                  opacity: position.opacity,
                  rotateY: position.rotateY,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => {
                  if (index !== currentIndex) {
                    setCurrentIndex(index)
                    resetAutoplayTimer()
                  }
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="relative w-full max-w-3xl h-full overflow-hidden rounded-xl border-2 border-cyan-500/40 shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                  <Image 
                    src={image.src || "/placeholder.svg"} 
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === currentIndex}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center pointer-events-none">
                    <div className="flex gap-2 justify-center mt-2">
                      {images.map((_, dotIndex) => (
                        <div 
                          key={dotIndex}
                          className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                            dotIndex === currentIndex 
                              ? "bg-cyan-400" 
                              : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
