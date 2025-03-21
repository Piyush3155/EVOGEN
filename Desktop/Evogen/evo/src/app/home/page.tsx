"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react"

const eventData = [
  {
    name: "Brahma's DevScript",
    tagline: "From Vedas to variables, The Code Awaken!",
    icon: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Designing",
    tagline: "Craft Divine Visuals",
    icon: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Cyber Security",
    tagline: "Guard the Sacred Knowledge",
    icon: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Quiz",
    tagline: "Test Your Mythical Wisdom",
    icon: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Data Analytics",
    tagline: "Decipher the Cosmic Patterns",
    icon: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Communication",
    tagline: "Speak the Language of Gods",
    icon: "/placeholder.svg?height=100&width=100",
  },
]

// Sample event date - replace with your actual event date
const eventDate = new Date("2025-04-15T09:00:00")

export default function Home() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        return
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image src="/background.jpg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 bg-amber-500 rounded-full shadow-lg md:hidden"
      >
        {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-black/90 z-40 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-white">
          <a href="#home" onClick={toggleMenu} className="text-2xl font-bold hover:text-amber-400 transition-colors">
            Home
          </a>
          <a href="#events" onClick={toggleMenu} className="text-2xl font-bold hover:text-amber-400 transition-colors">
            Events
          </a>
          <a
            href="#register"
            onClick={toggleMenu}
            className="text-2xl font-bold hover:text-amber-400 transition-colors"
          >
            Register
          </a>
          <a href="#contact" onClick={toggleMenu} className="text-2xl font-bold hover:text-amber-400 transition-colors">
            Contact
          </a>
        </div>
      </div>

      {/* Header */}
      <header id="home" className="w-full bg-black/40 backdrop-blur-sm text-white z-10 py-2 sticky top-0">
        <div className="flex items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
          <div className="h-16 w-16 md:h-24 md:w-24 flex items-center">
            <Image
              src="/gcclogo.png?height=96&width=96"
              alt="GCC Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>

          <div className="text-center flex-grow">
            <p className="text-xs md:text-lg font-medium text-white">The Karnataka Law Society's</p>
            <p className="font-semibold text-white text-sm md:text-2xl">Gogte College of Commerce</p>
            <p className="font-bold text-white text-sm md:text-2xl">Bachelor of Computer Applications</p>
            <p className="font-light text-white text-xs md:text-base">Presents</p>
          </div>

          <div className="h-16 w-16 md:h-24 md:w-24 flex items-center justify-end">
            <Image
              src="/bca.jpg?height=96&width=96"
              alt="BCA Logo"
              width={96}
              height={96}
              className="object-contain mr-0 md:mr-3"
            />
          </div>
        </div>

      </header>

      {/* Hero Section with EVOGEN Title */}
      <section className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
        {/* Sanskrit Text - Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center opacity-15">
          <h1 className="text-[60px] md:text-[180px] font-extrabold text-black select-none">।। एवोजेन ।।</h1>
        </div>

        {/* EVOGEN Title - Centered for all devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-amber-500 drop-shadow-lg relative top-30">EVOGEN</h1>
          
        </motion.div>
      </section>
    <br /><br /><br /><br /><br /><br /><br /><br />
      {/* Events Section */}
      <section id="events" className="w-full py-16 md:py-24 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-amber-500 mb-4">Events</h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Explore our divine collection of technical and creative competitions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
  {eventData.slice(0, 6).map((event, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center bg-amber-100/90 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-amber-300/20 transition-all duration-300"
    >
      <div className="w-24 h-24 rounded-full border-4 border-amber-500 bg-amber-50 flex items-center justify-center overflow-hidden mb-4">
        <Image
          src={event.icon || "/placeholder.svg"}
          alt={event.name}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      <h3 className="font-bold text-lg text-center text-amber-900">{event.name}</h3>
      <p className="text-sm text-amber-700 text-center mt-1">{event.tagline}</p>
      <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white text-sm py-1 px-4 rounded-full transition-colors">
        Known More
      </button>
    </motion.div>
  ))}
</div>

        </div>
      </section>

     
      {/* Contact Section */}
      <section id="contact" className="w-full py-16 md:py-24 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-amber-500 mb-4">Contact Us</h2>
            <p className="text-white text-lg max-w-2xl mx-auto">Have questions? Reach out to our team</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-100/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Address</h3>
              <p className="text-white/80">
                Gogte College of Commerce
                <br />
                GSS Road, Belagavi
                <br />
                Karnataka, India - 590001
              </p>
            </div>

            <div className="bg-amber-100/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-white/80">
                evogen@gccbca.edu.in
                <br />
                info@gccbca.edu.in
              </p>
            </div>

            <div className="bg-amber-100/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-white/80">
                +91 1234567890
                <br />
                +91 9876543210
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-black/70 backdrop-blur-sm text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-amber-500">EVOGEN</h2>
              <p className="text-white/70 mt-1">A Tech Fest</p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © {new Date().getFullYear()} EVOGEN - BCA Department, Gogte College of Commerce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

