"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  MicVocal,
  MapPin,
  Menu,
  X,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  XIcon,
  Award,
  BookOpen,
  Users,
  User,
  Code,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"

// Organizers data
const organizersData = [
  {
    name: "Dr. Venugopal Jalihal",
    role: "Principal of KLS Gogte College Of Commerce",
    photo: "/venugopal.jpg?height=100&width=100",
  },
  {
    name: "Dr. Asmita Deshpande",
    role: "BCA Co-Ordinator",
    photo: "/asmita.jpg?height=100&width=100",
  },
  {
    name: "Prof. Vaishali Shanbhag",
    role: "Event Coordinator",
    photo: "/vaishali.jpg?height=100&width=100",
  },
  {
    name: "Prof. Supriya Balekundri",
    role: "Event Coordinator",
    photo: "/supriya.jpg?height=100&width=100",
  },
  {
    name: "Ranjeet Patil",
    role: "Student Coordinator",
    photo: "/ranjeet.jpg?height=100&width=100",
    contact: "+91 8867340715",
  },
  {
    name: "Praisy Pillay",
    role: "Student Coordinator",
    photo: "/praisy.jpeg?height=100&width=100",
    contact: "+91 8496953722",
  },
]

// Developers data
const developersData = [
  {
    name: "Piyush Gurav",
    photo: "/piyush.jpeg?height=100&width=100",
    contact: "+91 7019450720  ",
  },
  
]

// Event data
const eventData = [
  {
    name: "Brahma's DevScript",
    tagline: "From Vedas to variables, The Code Awaken!",
    icon: "/coding.jpg?height=100&width=100",
    eventImage: "/coding.jpg?height=400&width=600",
    eventbg: "/brahma.jpeg",
    description:
      "Just as Brahma, the  Creator of the universe, shaped existence with Jñāna and Viveka. Brahma's DevScript is a karma bhoomi of intellect where Tarka  meets creativity.This is not just a coding competition; it is an Era-Defining  journey where Shabda transforms into Code, and  Scriptures  evolve into Software.Coders will embark on a journey of problem-solving, algorithmic  prabhutva  and web vikasStep into Tech Yuga and script the future with the divine code of creation!",
    skillsRequired: [
      "Problem solving ability ,Decision making , AI code assistants,Data structures and algorithms",
      "HTML,CSS,JavaScript,Python,Java,C,backend languages of your choice.",
    ],
    requirements: ["2 laptops,Smartphones,earphones(wired)", "Valid college ID", "Team of 2 members"],
    eventHeads: [
      { name: "Piyush Gurav", photo: "/piyush.jpeg?height=100&width=100", contact: "+91 7019450720" },
      { name: "Prajakta Choudhari", photo: "/prajakta.jpeg?height=100&width=100", contact: "+91 8867072219" },
    ],
    coordinators: [
      { name: "Prof. Shruti Kulkarni", photo: "/shruti.jpg?height=100&width=100", contact: "" },
      { name: "Prof. Govind Huligol", photo: "/govind.jpg?height=100&width=100", contact: "" },
      { name: "Miss. Sneha Vandkar", photo: "/placeholder.svg?height=100&width=100", contact: "" },
    ],
  },

  {
    name: "Abhimanyu Cyber's Vyuh",
    tagline: "In every loop, in every bind—Abhimanyu hacks the mastermind.",
    icon: "/cyber.png?height=100&width=100",
    eventImage: "/cyber.png?height=400&width=600",
    eventbg: "/cyber.png",
    description:
      "Welcome to Abhimanyu Cyber Vyuh, where we channel the fearless spirit of Abhimanyu, the master strategist who cracked the uncrackable.This isn't just a cyber event—it's a modern-day Chakra Vyuh, spinning with chaos, deception, and challenge.Gear up for a series of intense competitions, brain-burning challenges, and unexpected twists.Bring your skills. Break the barriers. Hack like Abhimanyu. Rule the chaos.",
    skillsRequired: [
      "🖥️ Operating Systems :	Windows OS and Kali linux OS",
      "🌐 Networking & Network Security: Basic Networking and Subnetting,	Nmap,	Wireshark,	Metasploit,	OSINT",
    ],
    requirements: [
      "2 laptops per team with virtual machine (Kali OS) installed",
      "Accounts required: Instagram, GitHub, Reddit, Try Hack Me, Hack The Box, LinkedIn   profile.",
      "Valid college ID",
      "Team of 2 members",
    ],
    eventHeads: [
      { name: "Gourav Sapaliga", photo: "/gourav.jpeg?height=100&width=100", contact: "+91 9686421932" },
      { name: "Spoorti Chavan", photo: "/placeholder.svg?height=100&width=100", contact: "+91 6361832096" },
    ],
    coordinators: [
      { name: "Dr. Chidambar Inamdar", photo: "/chidambar.jpg?height=100&width=100", contact: "" },
      { name: "Prof. Siddhesh Revankar", photo: "/siddesh.jpeg?height=100&width=100", contact: "" },
      { name: "Mr. Goudappa Goudannvar", photo: "/placeholder.svg?height=100&width=100", contact: "" },
    ],
  },

  {
    name: "Vishwakarma's Shilpverse",
    tagline: "Where ancient artistry meets modern creativity.",
    icon: "/design.png?height=100&width=100",
    eventImage: "/design.png?height=400&width=600",
    eventbg: "/design.png",
    description:
      "Step into the grand forge of srishti (creation) and embrace the legacy of Vishwakarma, the celestial architect. Like his masterpieces, Swargalok, Pushpaka Vimana, and Dwarka, design a digital masterpiece that bridges ancient wisdom with modern technology. Blend UI/UX design and content creation to craft futuristic apps and websites, inspired by India's rich artistic heritage. Bring your creation to life with compelling stories, videos, and microcopy, building a digital mahal (palace) that reflects extraordinary craftsmanship.",
    skillsRequired: ["Figma", "Canva", "Photoshop", "Premier Pro", "Blender", "Illustrator"],
    requirements: ["Laptop, Pendrive , smartphone, Earphone", "Valid college ID", "Team of 1 members"],
    eventHeads: [
      { name: "Prajwal Kulkarni  ", photo: "/placeholder.svg?height=100&width=100", contact: "+91 8722336396" },
      { name: "Sanjana Choudhari", photo: "/placeholder.svg?height=100&width=100", contact: "+91 7899328259" },
    ],
    coordinators: [
      { name: "Prof. Vaishali Kulkarni", photo: "/vaishalik.jpeg?height=100&width=100", contact: "" },
      { name: "Miss. Aniketa Kulkarni", photo: "/placeholder.svg?height=100&width=100", contact: "" },
    ],
  },

  {
    name: "Communication",
    tagline: "From Vedas to variables, The Code Awaken!",
    icon: "/brahma.jpeg?height=100&width=100",
    eventImage: "/placeholder.svg?height=400&width=600",
    eventbg: "/b3.jpg",
    description:
      "A coding competition that challenges participants to solve complex programming problems inspired by ancient wisdom.",
    skillsRequired: [
      "Problem Solving",
      "Data Structures",
      "Algorithms",
      "Any Programming Language (C, C++, Java, Python)",
    ],
    requirements: ["Laptop with coding environment", "Valid college ID", "Team of 2 members"],
    eventHeads: [
      { name: "Prasad Kurdekar", photo: "/prasad.jpeg?height=100&width=100", contact: "+91 9876543210" },
      { name: "Snehal Pilankar", photo: "/placeholder.svg?height=100&width=100", contact: "+91 8765432109" },
    ],
    coordinators: [
      { name: "Shruti Kanchugar", photo: "/shrutik.jpeg?height=100&width=100", contact: "" },
      { name: "Jyoti Patil", photo: "/jyoti.jpeg?height=100&width=100", contact: "" },
    ],
  },

  {
    name: "Varahmihira's Data Nexus",
    tagline: "Decode ancient wisdom, analyze cosmic patterns, and predict the digital future.",
    icon: "/data.png?height=100&width=100",
    eventImage: "/data.png?height=400&width=600",
    eventbg: "/data.png",
    description:
      "The Varahmihira's Data Nexus sets the stage for a battle of intellect, where the spirit of Varahmihira inspires participants to embark on a journey of discovery. In this battle where analytical minds, data wizards, and machine learning pioneers compete, decode patterns, and discover hidden knowledge to claim the title of Kalki of Machine Learning!,",
    skillsRequired: ["Tools : SQL, PowerBi, Tableau, R, Python", "Skills:  Data Preprocessing, EDA and Prediction. "],
    requirements: ["Laptop", "Pendrive", "Valid college ID", "Team of 2 members"],
    eventHeads: [
      { name: "James Fernandes", photo: "/placeholder.svg?height=100&width=100", contact: "+91 8669727820" },
      { name: "Kavya Raikar", photo: "/kavya.jpg?height=100&width=100", contact: "+91 8088252547" },
    ],
    coordinators: [
      { name: "Prof. Vaibhav Ambekar", photo: "/vaibhav.jpg?height=100&width=100", contact: "" },
      { name: "Miss. Vaishnavi Galagali", photo: "/placeholder.svg?height=100&width=100", contact: "" },
    ],
  },

  {
    name: "Ashoka's Edict Quest ",
    tagline: "Unveil the past, Conquer the knowledge!",
    icon: "/quiz.png?height=100&width=100",
    eventImage: "/quiz.png?height=400&width=600",
    eventbg: "/quiz.png",
    description:
      "Are you a Tathya Premi(fact lover) or someone who craves a challenge? Get ready for an experience packed with Romanch (thrill), Adhyayana (learning), and Puraskara (rewards) that are truly worth the fight , In Ashoka's Edict Quest- the arena of a high-octane quiz competition .Sharpen your minds, rise to the occasion, and prepare to dominate the Buddhi Yuddha — the ultimate battle of wisdom!",
    skillsRequired: ["Time management", "Strategic Guessing", "Logical Thinking", "Memory and Retention"],
    requirements: ["Mobile, Laptop"],
    eventHeads: [
      { name: "Vedant Kulkarni", photo: "/vedant.jpg?height=100&width=100", contact: "+91 9110235859" },
      { name: "Tanushree Mulimani", photo: "/placeholder.svg?height=100&width=100", contact: "+91 9036615638" },
    ],
    coordinators: [
      { name: "Prof. Rucha Bapat", photo: "/rucha.jpg?height=100&width=100", contact: "" },
      { name: "Miss. Meghana Joshi ", photo: "/placeholder.svg?height=100&width=100", contact: "" },
    ],
  },
]

// Sample event date
const eventDate = new Date("2025-04-15T09:00:00")

export default function Home() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const router = useRouter()

  interface CustomEvent {
    name: string
    tagline: string
    icon: string
    eventImage: string
    description: string
    skillsRequired: string[]
    requirements: string[]
    eventHeads: { name: string; photo: string; contact: string }[]
    coordinators: { name: string; photo: string; contact: string }[]
  }

  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showOrganizers, setShowOrganizers] = useState(false)
  const [showDevelopers, setShowDevelopers] = useState(false)

  // Countdown timer
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

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/sounds/notification.mp3")
    audio.loop = true
    audio.volume = 0.5
    setAudioElement(audio)

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Open event details modal
  const openEventDetails = (event: CustomEvent) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
    document.body.style.overflow = "hidden"
  }

  // Close event details modal
  const closeEventDetails = () => {
    setShowEventDetails(false)
    document.body.style.overflow = "auto"
  }

  // Open organizers modal
  const openOrganizers = () => {
    setShowOrganizers(true)
    setIsMenuOpen(false)
    document.body.style.overflow = "hidden"
  }

  // Close organizers modal
  const closeOrganizers = () => {
    setShowOrganizers(false)
    document.body.style.overflow = "auto"
  }

  // Open developers modal
  const openDevelopers = () => {
    setShowDevelopers(true)
    setIsMenuOpen(false)
    document.body.style.overflow = "hidden"
  }

  // Close developers modal
  const closeDevelopers = () => {
    setShowDevelopers(false)
    document.body.style.overflow = "auto"
  }

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioElement) {
      audioElement.muted = !audioElement.muted
      setIsMuted(!isMuted)
    }
  }

  const handleRegisterClick = () => {
    router.push("/register")
  }

  const handleconcertClick = () =>{
    router.push("/concert")
  }
  return (
    <div
      className="relative w-full overflow-x-hidden min-h-screen bg-gray-900 text-white "
      style={{ fontFamily: "var(--font-requiem)" }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 right-6 z-50 p-3 bg-cyan-500/80 rounded-full shadow-lg backdrop-blur-md hover:bg-cyan-400/80 transition-all duration-300 md:hidden"
      >
        {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-blue-900/90 backdrop-blur-md "></div>
            <div className="relative h-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-16 text-center"
                style={{ fontFamily: "var(--font-requiem)" }}
              >
                <h2
                  className="text-4xl md:text-8xl font-extrabold drop-shadow-[0_0_15px_rgba(0,229,255,0.5)] bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "url('/textbg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    fontFamily: "var(--font-requiem)",
                  }}
                >
                  EVOGEN 14.o
                </h2>

                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
              </motion.div>

              <nav className="flex flex-col items-center space-y-8">
                {["Home", "Events", "Register", "Contact", "Organizers", "Developers"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={
                      item === "Organizers"
                        ? "#"
                        : item === "Developers"
                          ? "#"
                          : item === "Register"
                            ? "/register"
                            : `#${item.toLowerCase()}`
                    }
                    onClick={
                      item === "Organizers"
                        ? openOrganizers
                        : item === "Developers"
                          ? openDevelopers
                          : item === "Register"
                            ? () => {
                                toggleMenu()
                                router.push("/register")
                              }
                            : toggleMenu
                    }
                    className="text-2xl font-medium text-white hover:text-cyan-400 transition-colors relative"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="relative z-10 flex items-center">
                      {item === "Organizers" && <Users className="mr-2 h-5 w-5" />}
                      {item === "Developers" && <Code className="mr-2 h-5 w-5" />}
                      {item}
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-cyan-500/10 rounded-lg -z-10"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="absolute bottom-10 flex space-x-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <a
                  href="https://www.facebook.com/KLSGCCBGM/"
                  className="text-cyan-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/gcc_bca/?hl=en"
                  className="text-cyan-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.youtube.com/@gccbca2574"
                  className="text-cyan-400 hover:text-white transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full bg-black/40 backdrop-blur-sm text-white z-10 py-2 sticky top-0 border-b border-cyan-500/30">
        <div
          className="flex items-center justify-between px-4 md:px-8 max-w-7xl mx-auto"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
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
            <p className="text-xs md:text-lg font-medium text-cyan-300">Karnatak Law Society&apos;s</p>
            <p className="font-semibold text-white text-sm md:text-2xl">Gogte College of Commerce</p>
            <p className="font-bold text-white text-sm md:text-2xl">Bachelor of Computer Applications</p>
            <p className="font-light text-cyan-300 text-xs md:text-base">Presents</p>
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
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/70 backdrop-blur-sm p-2 rounded-full border border-cyan-500/30 shadow-lg">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black hover:bg-cyan-400 transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-cyan-400 hover:bg-black/70 transition-colors"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop Navigation - Added animated navigation */}

      {/* Hero Section with Background Image */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image src="/b3.jpg" alt="Background" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
        </div>

        {/* Background Text */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center opacity-0">
          <h1
            className="text-[60px] md:text-[180px] font-extrabold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] bg-clip-text text-transparent"
            style={{
              backgroundImage: "url('/textbg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontFamily: "var(--font-requiem)",
            }}
          >
            ।। एवोजेन ।।
          </h1>
        </div>

        {/* Animated Foreground Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center px-4"
        >
          <h1
            className="text-6xl md:text-8xl font-extrabold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] bg-clip-text text-transparent"
            style={{
              backgroundImage: "url('/textbg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontFamily: "var(--font-requiem)",
            }}
          >
            Evogen 14.o
          </h1>
          <br />
          <p
            className="text-xl font-extrabold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] bg-clip-text text-transparent"
            style={{
              backgroundImage: "url('/textbg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontFamily: "var(--font-modern)",
            }}
          >
            TECH - YUGA
          </p>

          <div className="mt-8 relative">
            <div className="h-0.5 w-32 md:w-64 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto"></div>
            <div className="h-8 w-8 rounded-full bg-yellow-400/50 border border-yellow-400 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 glow-border"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full px-6 md:px-14 py-16 md:py-24 bg-black/50 backdrop-blur-sm mt-20 md:mt-10 rounded-xl border border-cyan-500/20">
          <h2
            className="text-3xl md:text-5xl font-bold text-cyan-400 mb-12 md:mb-14"
            style={{ fontFamily: "var(--font-requiem)" }}
          >
            About Evogen 14.o{" "}
          </h2>
          <hr className="border-cyan-500/30" />
          <br />
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg transform rotate-3 -z-10"></div>
                <Image
                  src="/b4.jpg"
                  alt="About"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover max-w-full h-auto border border-cyan-500/50 glow-border"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <p
                className="text-base md:text-2xl text-cyan-100 max-w-2xl mx-auto text-justify "
                style={{ fontFamily: "var(--font-requiem)" }}
              >
                Evogen is a dynamic platform that empowers students to unleash their creativity and technical skills.
                From coding and web development to designing and UI/UX, it provides exciting opportunities to build
                innovative websites, applications, and user-centric experiences. In the field of cybersecurity,
                participants safeguard digital systems and tackle real-world problems. The quiz challenges test not only
                technical expertise but also quick thinking under pressure. Through communication and digital marketing
                events, students craft compelling content and drive ideas with creativity. Data analytics and machine
                learning tracks enable them to turn data into smart, actionable insights. Evogen fosters innovation,
                collaboration, and personal growth — where passion turns into potential, and skills meet real
                opportunities.
              </p>
            </div>
          </div>

          <br />
          <hr className="border-cyan-500/30" />
        </div>
      </section>

      <section className="py-16 bg-black">
        {/* Events Section */}
        <h2
          className="text-3xl md:text-5xl text-center font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent mb-12 md:mb-14"
          style={{ fontFamily: "var(--font-requiem)" }}
        >
          Events
        </h2>

        <hr className="border-cyan-500/30 max-w-4xl mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4 md:px-8">
          {eventData.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
              className="flex flex-col items-center justify-center text-center p-6 transition-all duration-300 relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden group"
              style={{
                backgroundImage: `url(${event.eventbg})`,
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm group-hover:bg-black/50 transition-all duration-300"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full border-4 border-cyan-500/50 bg-black/80 flex items-center justify-center overflow-hidden mb-6 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  <Image
                    src={event.icon || "/placeholder.svg"}
                    alt={event.name}
                    width={220}
                    height={220}
                    className="object-fill group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {event && (
                  <>
                    <h3 className="font-bold text-xl text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-amber-300 mb-4 max-w-xs">{event.tagline}</p>
                    <button
                      className="relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-black font-medium py-2 px-6 rounded-full transition-colors group-hover:shadow-[0_0_10px_rgba(6,182,212,0.7)]"
                      onClick={() => event && openEventDetails(event)}
                    >
                      <span className="relative z-10">Know More</span>
                      <span className="absolute inset-0 bg-cyan-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <div className="w-full flex justify-center items-center mt-6 mb-6 gap-4">
        <motion.button
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/20 sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegisterClick}
        >
          Register Here
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/20 sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleconcertClick}
        >
          Concert<MicVocal className="ml-2 h-5 w-5" />
        </motion.button>
      </div>
      {/* Organizers and Developers Buttons - Added after events section */}
      <section className="w-full py-10 bg-black/40 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              onClick={openOrganizers}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/20 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="mr-2 h-5 w-5" />
              Meet the Organizers
            </motion.button>

            <motion.button
              onClick={openDevelopers}
              className="px-6 py-3 bg-transparent hover:bg-cyan-500/10 text-cyan-400 font-semibold rounded-lg border-2 border-cyan-500 flex items-center justify-center transition-colors w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="mr-2 h-5 w-5" />
              Development Team
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="w-full py-8 md:py-12 bg-black/60 backdrop-blur-sm text-white text-center border-t border-b border-cyan-500/20">
        <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 mb-4">Countdown to Evogen</h2>
        <div className="flex justify-center gap-8 text-lg md:text-2xl font-semibold">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-black/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 glow-border">
              {days}
            </div>
            <span className="text-cyan-400 text-sm mt-1">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-black/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 glow-border">
              {hours}
            </div>
            <span className="text-cyan-400 text-sm mt-1">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-black/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 glow-border">
              {minutes}
            </div>
            <span className="text-cyan-400 text-sm mt-1">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-black/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 glow-border">
              {seconds}
            </div>
            <span className="text-cyan-400 text-sm mt-1">Seconds</span>
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
            <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4">Contact Us</h2>
            <p className="text-cyan-100 text-lg max-w-2xl mx-auto">Have questions? Reach out to our team</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg text-center border border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-border">
                <MapPin className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Address</h3>
              <p className="text-cyan-100/80">
                Gogte College of Commerce
                <br />
                GSS Road, Belagavi
                <br />
                Karnataka, India - 590001
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg text-center border border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-border">
                <Mail className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Email</h3>
              <p className="text-cyan-100/80">
                evogen@gccbca.edu.in
                <br />
                info@gccbca.edu.in
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg text-center border border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 glow-border">
                <Phone className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Phone</h3>
              <p className="text-cyan-100/80">
                +91 1234567890
                <br />
                +91 9876543210
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-black/70 backdrop-blur-sm text-white border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-cyan-400">EVOGEN 14.0</h2>
              <p className="text-cyan-100/70 mt-1">A Tech Fest</p>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/KLSGCCBGM/"
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/gcc_bca/?hl=en"
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@gccbca2574"
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 mt-8 pt-8 text-center">
            <p className="text-cyan-100/60">
              © {new Date().getFullYear()} EVOGEN - BCA Department, Gogte College of Commerce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventDetails && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeEventDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black/90 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/50 glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white">{selectedEvent.name}</h2>
                <button
                  onClick={closeEventDetails}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <XIcon className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-8 relative">
                  <div className="w-full h-96 md:h-80 overflow-hidden rounded-lg border border-cyan-500/30 glow-border">
                    <Image
                      src={selectedEvent.eventImage || "/placeholder.svg"}
                      alt={selectedEvent.name}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 flex items-center mb-3">
                    <BookOpen className="mr-2 h-5 w-5" /> Event Description
                  </h3>
                  <p className="text-cyan-100">{selectedEvent.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 flex items-center mb-3">
                    <Award className="mr-2 h-5 w-5" /> Skills Required
                  </h3>
                  <ul className="list-disc pl-5 text-cyan-100">
                    {selectedEvent.skillsRequired.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 flex items-center mb-3">
                    <BookOpen className="mr-2 h-5 w-5" /> Requirements
                  </h3>
                  <ul className="list-disc pl-5 text-cyan-100">
                    {selectedEvent.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 flex items-center mb-3">
                    <User className="mr-2 h-5 w-5" /> Event Coordinators
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedEvent.coordinators.map((coordinator, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-black/80 p-3 rounded-lg border border-cyan-500/30"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-3 border-2 border-cyan-500/50">
                          <Image
                            src={coordinator.photo || "/placeholder.svg"}
                            alt={coordinator.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-cyan-300">{coordinator.name}</p>
                          <p className="text-cyan-100/80 text-sm">{coordinator.contact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 flex items-center mb-3">
                    <Users className="mr-2 h-5 w-5" /> Event Heads
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedEvent.eventHeads.map((head, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-black/80 p-3 rounded-lg border border-cyan-500/30"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-3 border-2 border-cyan-500/50">
                          <Image
                            src={head.photo || "/placeholder.svg"}
                            alt={head.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-cyan-300">{head.name}</p>
                          <p className="text-cyan-100/80 text-sm">{head.contact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div></div>
      {/* Organizers Modal */}
      <AnimatePresence>
        {showOrganizers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeOrganizers}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black/90 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/50 glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white">Event Organizers</h2>
                <button
                  onClick={closeOrganizers}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <XIcon className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {organizersData.map((organizer, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/70 rounded-lg p-4 border border-cyan-500/30 flex flex-col items-center"
                    >
                      <div className="w-38 h-38 rounded-full overflow-hidden mb-4 border-2 border-cyan-500/50 glow-border">
                        <Image
                          src={organizer.photo || "/placeholder.svg"}
                          alt={organizer.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-cyan-300">{organizer.name}</h3>
                      <p className="text-amber-300 mb-2">{organizer.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developers Modal */}
      <AnimatePresence>
        {showDevelopers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeDevelopers}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black/90 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/50 glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-t-xl">
                <h2 className="text-2xl font-bold text-white">Development Team</h2>
                <button
                  onClick={closeDevelopers}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <XIcon className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {developersData.map((developer, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/70 rounded-lg p-4 border border-cyan-500/30 flex flex-col items-center"
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-cyan-500/50 glow-border">
                        <Image
                          src={developer.photo || "/placeholder.svg"}
                          alt={developer.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-cyan-300">{developer.name}</h3>
                      <p className="text-cyan-100 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {developer.contact}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

