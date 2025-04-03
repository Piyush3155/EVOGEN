"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Users,
  Code,
  Palette,
  Database,
  Shield,
  Award,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Add this function at the top of the file, before the component
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

interface MemberDetails {
  name: string
  email: string
  college: string
  usn: string
}

interface TeamData {
  teamName: string
  coding: MemberDetails[]
  designing: MemberDetails[]
  dataAnalytics: MemberDetails[]
  cyberSecurity: MemberDetails[]
  bestManager: MemberDetails[]
  communication: MemberDetails[]
}

export default function Register() {
  const [currentTab, setCurrentTab] = useState("coding")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const isMobile = useMediaQuery("(max-width: 640px)")

  const [teamData, setTeamData] = useState<TeamData>({
    teamName: "",
    coding: [
      { name: "", email: "", college: "", usn: "" },
      { name: "", email: "", college: "", usn: "" },
    ],
    designing: [{ name: "", email: "", college: "", usn: "" }],
    dataAnalytics: [
      { name: "", email: "", college: "", usn: "" },
      { name: "", email: "", college: "", usn: "" },
    ],
    cyberSecurity: [
      { name: "", email: "", college: "", usn: "" },
      { name: "", email: "", college: "", usn: "" },
    ],
    bestManager: [{ name: "", email: "", college: "", usn: "" }],
    communication: [{ name: "", email: "", college: "", usn: "" }],
  })

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamData({
      ...teamData,
      teamName: e.target.value,
    })
  }

  const handleMemberChange = (category: keyof TeamData, index: number, field: keyof MemberDetails, value: string) => {
    const updatedCategory = [...teamData[category]]
    updatedCategory[index] = {
      ...(updatedCategory[index] as MemberDetails),
      [field]: value,
    }

    setTeamData({
      ...teamData,
      [category]: updatedCategory,
    })
  }

  const validateForm = () => {
    // Check team name
    if (!teamData.teamName.trim()) {
      setFormError("Team name is required")
      return false
    }

    // Check all required fields for each category
    const categories: (keyof TeamData)[] = [
      "coding",
      "designing",
      "dataAnalytics",
      "cyberSecurity",
      "bestManager",
      "communication",
    ]

    for (const category of categories) {
      for (let i = 0; i < teamData[category].length; i++) {
        const member = teamData[category][i]
        if (
          !(member as MemberDetails).name.trim() ||
          !(member as MemberDetails).email.trim() ||
          !(member as MemberDetails).college.trim() ||
          !(member as MemberDetails).usn.trim()
        ) {
          setFormError(`All fields are required for ${category} member ${i + 1}`)
          setCurrentTab(category)
          return false
        }

        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test((member as MemberDetails).email)) {
          setFormError(`Invalid email for ${category} member ${i + 1}`)
          setCurrentTab(category)
          return false
        }
      }
    }

    setFormError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setFormError(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormError("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get event name for display
  const getEventDisplayName = (eventKey: string) => {
    switch (eventKey) {
      case "coding":
        return "Coding"
      case "designing":
        return "Designing"
      case "dataAnalytics":
        return "Data Analytics"
      case "cyberSecurity":
        return "Cyber Security"
      case "bestManager":
        return "Best Manager"
      case "communication":
        return "Communication"
      default:
        return eventKey
    }
  }

  const renderMemberFields = (category: keyof TeamData, index: number, memberNumber: number) => {
    return (
      <div
        key={`${category}-${index}`}
        className="space-y-4 p-3 sm:p-4 bg-black/30 rounded-lg border border-cyan-500/20 transition-all hover:border-cyan-500/40"
      >
        <h3 className="text-base sm:text-lg font-semibold text-cyan-300 flex items-center">
          <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cyan-500/20 text-cyan-300 text-sm mr-2">
            {memberNumber}
          </span>
          Member Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor={`${category}-${index}-name`} className="text-cyan-100 text-sm sm:text-base">
              Full Name
            </Label>
            <Input
              id={`${category}-${index}-name`}
              value={(teamData[category] as MemberDetails[])[index].name}
              onChange={(e) => handleMemberChange(category, index, "name", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white h-9 sm:h-10"
              placeholder="Enter full name"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor={`${category}-${index}-email`} className="text-cyan-100 text-sm sm:text-base">
              Email ID
            </Label>
            <Input
              id={`${category}-${index}-email`}
              type="email"
              value={(teamData[category] as MemberDetails[])[index].email}
              onChange={(e) => handleMemberChange(category, index, "email", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white h-9 sm:h-10"
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor={`${category}-${index}-college`} className="text-cyan-100 text-sm sm:text-base">
              College Name
            </Label>
            <Input
              id={`${category}-${index}-college`}
              value={(teamData[category] as MemberDetails[])[index].college}
              onChange={(e) => handleMemberChange(category, index, "college", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white h-9 sm:h-10"
              placeholder="Enter college name"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor={`${category}-${index}-usn`} className="text-cyan-100 text-sm sm:text-base">
              USN Number
            </Label>
            <Input
              id={`${category}-${index}-usn`}
              value={(teamData[category] as MemberDetails[])[index].usn}
              onChange={(e) => handleMemberChange(category, index, "usn", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white h-9 sm:h-10"
              placeholder="Enter USN number"
            />
          </div>
        </div>
      </div>
    )
  }

  const tabs = ["coding", "designing", "dataAnalytics", "cyberSecurity", "bestManager", "communication"]

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "coding":
        return <Code className="h-4 w-4" />
      case "designing":
        return <Palette className="h-4 w-4" />
      case "dataAnalytics":
        return <Database className="h-4 w-4" />
      case "cyberSecurity":
        return <Shield className="h-4 w-4" />
      case "bestManager":
        return <Award className="h-4 w-4" />
      case "communication":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  const getMemberCount = (category: keyof TeamData) => {
    return teamData[category].length
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-t-lg py-4 sm:py-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white text-center">
                  Registration Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-4 px-4 sm:px-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Thank You for Registering</h2>
                  <p className="text-center text-cyan-100 text-sm sm:text-base max-w-md">
                    Your team &quot;{teamData.teamName}&quot; has been successfully registered for Evogen 14.0.
                    We&apos;ll send a confirmation email with further details shortly.
                  </p>

                  <div className="w-full max-w-md bg-black/50 border border-cyan-500/30 rounded-lg p-4 mt-2">
                    <h3 className="font-medium text-cyan-300 mb-2">Registered Events:</h3>
                    <ul className="space-y-2">
                      {tabs.map((tab) => (
                        <li key={tab} className="flex items-center text-sm sm:text-base">
                          {getTabIcon(tab)}
                          <span className="ml-2 text-cyan-100">{getEventDisplayName(tab)}</span>
                          <span className="ml-auto text-cyan-300">
                            {getMemberCount(tab as keyof TeamData)} member(s)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Link href="/">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-black">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <header className="w-full bg-black/40 backdrop-blur-sm text-white z-10 py-3 sm:py-4 sticky top-0 border-b border-cyan-500/30 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center mb-2 sm:mb-0">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5 text-cyan-400" />
              <span className="text-cyan-400 hover:text-cyan-300 transition-colors">Back</span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              Evogen 14.0 Registration
            </h1>
          </div>
          <div className="hidden sm:block w-24 opacity-0">{/* Spacer for centering */}</div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <CardHeader className="py-4 sm:py-6">
              <CardTitle className="text-xl sm:text-2xl text-cyan-300">Team Registration</CardTitle>
              <CardDescription className="text-cyan-100/80 text-sm sm:text-base">
                Fill in the details for your team members participating in different events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-500/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="teamName" className="text-base sm:text-lg text-cyan-300">
                        Team Name
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="h-6 w-6 p-0 ml-2 text-cyan-400 hover:text-cyan-300">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Team name info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black/90 border-cyan-500/30 text-cyan-100">
                            <p className="max-w-xs">Choose a unique team name for all events</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="teamName"
                      value={teamData.teamName}
                      onChange={handleTeamNameChange}
                      className="bg-black/50 border-cyan-500/30 text-white h-10"
                      placeholder="Enter your team name"
                    />
                  </div>

                  <Separator className="my-4 sm:my-6 bg-cyan-500/20" />

                  <div className="bg-black/30 p-3 rounded-lg border border-cyan-500/20 mb-4">
                    <p className="text-sm text-cyan-100/80">
                      Complete all sections below to register your team for Evogen 14.0. Navigate between event
                      categories using the tabs.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base sm:text-lg font-semibold text-cyan-300">Event Categories</h2>
                    <div className="text-xs sm:text-sm text-cyan-100/70">
                      {tabs.indexOf(currentTab) + 1} of {tabs.length}
                    </div>
                  </div>

                  <Tabs defaultValue="coding" value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <div className="relative">
                      <TabsList className="grid grid-cols-3 sm:grid-cols-6 bg-black/50 border border-cyan-500/30 w-full">
                        {tabs.map((tab) => (
                          <TabsTrigger
                            key={tab}
                            value={tab}
                            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black py-1.5 sm:py-2"
                          >
                            {getTabIcon(tab)}
                            <span className="hidden sm:inline ml-2">{getEventDisplayName(tab)}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {isMobile && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/70 text-white pointer-events-auto"
                            onClick={() => {
                              const currentIndex = tabs.indexOf(currentTab)
                              if (currentIndex > 0) {
                                setCurrentTab(tabs[currentIndex - 1])
                              }
                            }}
                            disabled={tabs.indexOf(currentTab) === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/70 text-white pointer-events-auto"
                            onClick={() => {
                              const currentIndex = tabs.indexOf(currentTab)
                              if (currentIndex < tabs.length - 1) {
                                setCurrentTab(tabs[currentIndex + 1])
                              }
                            }}
                            disabled={tabs.indexOf(currentTab) === tabs.length - 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <TabsContent value="coding" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                        <div className="flex items-center mb-2 sm:mb-4 p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                          <Code className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Coding Event</h2>
                          <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs sm:text-sm">
                            2 Members
                          </div>
                        </div>
                        {renderMemberFields("coding", 0, 1)}
                        {renderMemberFields("coding", 1, 2)}
                      </TabsContent>

                      <TabsContent
                        value="designing"
                        className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
                      >
                        <div className="flex items-center mb-2 sm:mb-4 p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                          <Palette className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Designing Event</h2>
                          <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs sm:text-sm">
                            1 Member
                          </div>
                        </div>
                        {renderMemberFields("designing", 0, 1)}
                      </TabsContent>

                      <TabsContent
                        value="dataAnalytics"
                        className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
                      >
                        <div className="flex items-center mb-2 sm:mb-4 p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                          <Database className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Data Analytics Event</h2>
                          <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs sm:text-sm">
                            2 Members
                          </div>
                        </div>
                        {renderMemberFields("dataAnalytics", 0, 1)}
                        {renderMemberFields("dataAnalytics", 1, 2)}
                      </TabsContent>

                      <TabsContent
                        value="cyberSecurity"
                        className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
                      >
                        <div className="flex items-center mb-2 sm:mb-4 p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                          <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Cyber Security Event</h2>
                          <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs sm:text-sm">
                            2 Members
                          </div>
                        </div>
                        {renderMemberFields("cyberSecurity", 0, 1)}
                        {renderMemberFields("cyberSecurity", 1, 2)}
                      </TabsContent>

                      <TabsContent
                        value="bestManager"
                        className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
                      >
                        <div className="flex items-center mb-2 sm:mb-4 p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                          <Award className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Best Manager Event</h2>
                          <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs sm:text-sm">
                            1 Member
                          </div>
                        </div>
                        {renderMemberFields("bestManager", 0, 1)}
                      </TabsContent>

                      <TabsContent
                        value="communication"
                        className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
                      >
                        <div className="flex items-center mb-2 sm:mb-4 p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                          <MessageSquare className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-lg sm:text-xl font-bold text-cyan-300">Communication Event</h2>
                          <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs sm:text-sm">
                            1 Member
                          </div>
                        </div>
                        {renderMemberFields("communication", 0, 1)}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
                  <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                    {currentTab !== "coding" && (
                      <Button
                        type="button"
                        variant="outline"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-sm h-9 sm:h-10 flex-1 sm:flex-none"
                        onClick={() => {
                          const currentIndex = tabs.indexOf(currentTab)
                          if (currentIndex > 0) {
                            setCurrentTab(tabs[currentIndex - 1])
                          }
                        }}
                      >
                        <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    )}

                    {currentTab !== "communication" && (
                      <Button
                        type="button"
                        className="bg-cyan-500 hover:bg-cyan-400 text-black text-sm h-9 sm:h-10 flex-1 sm:flex-none"
                        onClick={() => {
                          const currentIndex = tabs.indexOf(currentTab)
                          if (currentIndex < tabs.length - 1) {
                            setCurrentTab(tabs[currentIndex + 1])
                          }
                        }}
                      >
                        Next
                        <ChevronRight className="ml-1 sm:ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-4 sm:px-8 py-2 h-10 w-full sm:w-auto text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Register Team
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

