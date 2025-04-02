"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const [isSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

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
          return false
        }

        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test((member as MemberDetails).email)) {
          setFormError(`Invalid email for ${category} member ${i + 1}`)
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
 
  }

  const renderMemberFields = (category: keyof TeamData, index: number, memberNumber: number) => {
    return (
      <div key={`${category}-${index}`} className="space-y-4 p-4 bg-black/30 rounded-lg border border-cyan-500/20">
        <h3 className="text-lg font-semibold text-cyan-300">Member {memberNumber}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${category}-${index}-name`} className="text-cyan-100">
              Full Name
            </Label>
            <Input
              id={`${category}-${index}-name`}
              value={(teamData[category] as MemberDetails[])[index].name}
              onChange={(e) => handleMemberChange(category, index, "name", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white"
              placeholder="Enter full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${category}-${index}-email`} className="text-cyan-100">
              Email ID
            </Label>
            <Input
              id={`${category}-${index}-email`}
              type="email"
              value={(teamData[category] as MemberDetails[])[index].email}
              onChange={(e) => handleMemberChange(category, index, "email", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white"
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${category}-${index}-college`} className="text-cyan-100">
              College Name
            </Label>
            <Input
              id={`${category}-${index}-college`}
              value={(teamData[category] as MemberDetails[])[index].college}
              onChange={(e) => handleMemberChange(category, index, "college", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white"
              placeholder="Enter college name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${category}-${index}-usn`} className="text-cyan-100">
              USN Number
            </Label>
            <Input
              id={`${category}-${index}-usn`}
              value={(teamData[category] as MemberDetails[])[index].usn}
              onChange={(e) => handleMemberChange(category, index, "usn", e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white"
              placeholder="Enter USN number"
            />
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-white text-center">Registration Successful!</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-4 px-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-cyan-300">Thank You for Registering</h2>
                  <p className="text-center text-cyan-100 max-w-md">
                    Your team &quot;{teamData.teamName}&quot; has been successfully registered for Evogen 14.0. We&apos;ll send a
                    confirmation email with further details shortly.
                  </p>
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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="w-full bg-black/40 backdrop-blur-sm text-white z-10 py-4 sticky top-0 border-b border-cyan-500/30 mb-8">
        <div className="flex items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5 text-cyan-400" />
              <span className="text-cyan-400 hover:text-cyan-300 transition-colors">Back to Home</span>
            </Link>
          </div>
          <div className="text-center flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              Evogen 14.0 Registration
            </h1>
          </div>
          <div className="w-24 opacity-0">{/* Spacer for centering */}</div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-300">Team Registration</CardTitle>
              <CardDescription className="text-cyan-100/80">
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
                    <Label htmlFor="teamName" className="text-lg text-cyan-300">
                      Team Name
                    </Label>
                    <Input
                      id="teamName"
                      value={teamData.teamName}
                      onChange={handleTeamNameChange}
                      className="bg-black/50 border-cyan-500/30 text-white"
                      placeholder="Enter your team name"
                    />
                  </div>

                  <Separator className="my-6 bg-cyan-500/20" />

                  <Tabs defaultValue="coding" value={currentTab} onValueChange={setCurrentTab}>
                    <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-black/50 border border-cyan-500/30">
                      <TabsTrigger
                        value="coding"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Coding</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="designing"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Designing</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="dataAnalytics"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        <Database className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Data Analytics</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="cyberSecurity"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Cyber Security</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="bestManager"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        <Award className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Best Manager</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="communication"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span className="hidden md:inline">Communication</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-6">
                      <TabsContent value="coding" className="space-y-4">
                        <div className="flex items-center mb-4">
                          <Code className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-xl font-bold text-cyan-300">Coding Event</h2>
                          <div className="ml-auto px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                            2 Members
                          </div>
                        </div>
                        {renderMemberFields("coding", 0, 1)}
                        {renderMemberFields("coding", 1, 2)}
                      </TabsContent>

                      <TabsContent value="designing" className="space-y-4">
                        <div className="flex items-center mb-4">
                          <Palette className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-xl font-bold text-cyan-300">Designing Event</h2>
                          <div className="ml-auto px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                            1 Member
                          </div>
                        </div>
                        {renderMemberFields("designing", 0, 1)}
                      </TabsContent>

                      <TabsContent value="dataAnalytics" className="space-y-4">
                        <div className="flex items-center mb-4">
                          <Database className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-xl font-bold text-cyan-300">Data Analytics Event</h2>
                          <div className="ml-auto px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                            2 Members
                          </div>
                        </div>
                        {renderMemberFields("dataAnalytics", 0, 1)}
                        {renderMemberFields("dataAnalytics", 1, 2)}
                      </TabsContent>

                      <TabsContent value="cyberSecurity" className="space-y-4">
                        <div className="flex items-center mb-4">
                          <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-xl font-bold text-cyan-300">Cyber Security Event</h2>
                          <div className="ml-auto px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                            2 Members
                          </div>
                        </div>
                        {renderMemberFields("cyberSecurity", 0, 1)}
                        {renderMemberFields("cyberSecurity", 1, 2)}
                      </TabsContent>

                      <TabsContent value="bestManager" className="space-y-4">
                        <div className="flex items-center mb-4">
                          <Award className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-xl font-bold text-cyan-300">Best Manager Event</h2>
                          <div className="ml-auto px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                            1 Member
                          </div>
                        </div>
                        {renderMemberFields("bestManager", 0, 1)}
                      </TabsContent>

                      <TabsContent value="communication" className="space-y-4">
                        <div className="flex items-center mb-4">
                          <MessageSquare className="h-5 w-5 mr-2 text-cyan-400" />
                          <h2 className="text-xl font-bold text-cyan-300">Communication Event</h2>
                          <div className="ml-auto px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                            1 Member
                          </div>
                        </div>
                        {renderMemberFields("communication", 0, 1)}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex gap-4">
                    {currentTab !== "coding" && (
                      <Button
                        type="button"
                        variant="outline"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => {
                          const tabs = [
                            "coding",
                            "designing",
                            "dataAnalytics",
                            "cyberSecurity",
                            "bestManager",
                            "communication",
                          ]
                          const currentIndex = tabs.indexOf(currentTab)
                          if (currentIndex > 0) {
                            setCurrentTab(tabs[currentIndex - 1])
                          }
                        }}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    )}

                    {currentTab !== "communication" && (
                      <Button
                        type="button"
                        className="bg-cyan-500 hover:bg-cyan-400 text-black"
                        onClick={() => {
                          const tabs = [
                            "coding",
                            "designing",
                            "dataAnalytics",
                            "cyberSecurity",
                            "bestManager",
                            "communication",
                          ]
                          const currentIndex = tabs.indexOf(currentTab)
                          if (currentIndex < tabs.length - 1) {
                            setCurrentTab(tabs[currentIndex + 1])
                          }
                        }}
                      >
                        Next
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Button>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-8"
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

