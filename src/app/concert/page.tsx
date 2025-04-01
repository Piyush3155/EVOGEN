"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Music, Ticket, Calendar, MapPin, CheckCircle, AlertCircle, User, CreditCard } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TicketData {
  name: string
  email: string
  mobileNumber: string
  teamName: string
  ticketType: string
  ticketCount: number
}

interface TicketResponse {
  id: string
  name: string
  email: string
  mobileNumber: string
  teamName: string
  ticketType: string
  ticketCount: number
  totalAmount: number
  ticketCode: string
  createdAt: string
}

export default function TicketBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [ticketResponse, setTicketResponse] = useState<TicketResponse | null>(null)

  const [ticketData, setTicketData] = useState<TicketData>({
    name: "",
    email: "",
    mobileNumber: "",
    teamName: "",
    ticketType: "STANDARD",
    ticketCount: 1
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTicketData({
      ...ticketData,
      [name]: value,
    })
  }

  const handleTicketTypeChange = (value: string) => {
    setTicketData({
      ...ticketData,
      ticketType: value,
    })
  }

  const handleTicketCountChange = (value: string) => {
    setTicketData({
      ...ticketData,
      ticketCount: parseInt(value),
    })
  }

  const validateForm = () => {
    if (!ticketData.name.trim()) {
      setFormError("Name is required")
      return false
    }

    if (!ticketData.email.trim()) {
      setFormError("Email is required")
      return false
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(ticketData.email)) {
      setFormError("Invalid email format")
      return false
    }

    if (!ticketData.mobileNumber.trim()) {
      setFormError("Mobile number is required")
      return false
    }

    // Basic mobile number validation (10 digits)
    if (!/^\d{10}$/.test(ticketData.mobileNumber)) {
      setFormError("Mobile number must be 10 digits")
      return false
    }

    setFormError("")
    return true
  }

  const calculatePrice = () => {
    let basePrice = 0
    switch (ticketData.ticketType) {
      case "STANDARD":
        basePrice = 499
        break
      case "VIP":
        basePrice = 999
        break
      case "PREMIUM":
        basePrice = 1499
        break
      default:
        basePrice = 499
    }
    return basePrice * ticketData.ticketCount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/v1/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      })

      const result = await response.json()

      if (result.success) {
        setTicketResponse(result.ticket)
        alert("Your Ticket has been booked suucessfully")
        setIsSubmitted(true)
      } else {
        setFormError(result.message || 'Ticket booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted && ticketResponse) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-white text-center">Ticket Booked Successfully!</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-4 px-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-cyan-300">Thank You for Your Booking</h2>
                  
                  <div className="w-full max-w-md bg-black/50 border border-cyan-500/30 rounded-lg p-6 mt-4">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-cyan-500/20">
                      <div className="flex items-center">
                        <Music className="h-6 w-6 text-cyan-400 mr-2" />
                        <h3 className="text-lg font-bold text-cyan-300">Evogen Concert</h3>
                      </div>
                      <div className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                        {ticketResponse.ticketType}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-cyan-100/70">Ticket Code:</span>
                        <span className="font-mono font-bold text-cyan-300">{ticketResponse.ticketCode}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-cyan-100/70">Name:</span>
                        <span className="text-cyan-100">{ticketResponse.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-cyan-100/70">Tickets:</span>
                        <span className="text-cyan-100">{ticketResponse.ticketCount} × {ticketResponse.ticketType}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-cyan-100/70">Total Amount:</span>
                        <span className="text-cyan-300 font-bold">₹{ticketResponse.totalAmount}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-cyan-100/70">Date:</span>
                        <span className="text-cyan-100">April 15, 2025</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-cyan-100/70">Venue:</span>
                        <span className="text-cyan-100">Gogte College Auditorium</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-cyan-500/20 text-center">
                      <p className="text-sm text-cyan-100/70">A confirmation has been sent to your email: {ticketResponse.email}</p>
                    </div>
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
              Evogen Concert Tickets
            </h1>
          </div>
          <div className="w-24 opacity-0">{/* Spacer for centering */}</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Concert Info */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image 
                    src="/b3.jpg" 
                    alt="Concert" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="px-3 py-1 bg-cyan-500 text-black text-sm font-bold rounded-full w-fit">
                      LIVE CONCERT
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-2">Evogen 14.0 Concert Night</h2>
                  </div>
                </div>
                
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-cyan-300">Date & Time</h3>
                        <p className="text-cyan-100/80">April 15, 2025 • 7:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-cyan-300">Venue</h3>
                        <p className="text-cyan-100/80">Gogte College Auditorium</p>
                        <p className="text-cyan-100/80">GSS Road, Belagavi</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Music className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-cyan-300">Featuring</h3>
                        <p className="text-cyan-100/80">Live performances by top artists and student bands</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-cyan-500/20">
                    <h3 className="font-medium text-cyan-300 mb-3">Ticket Types</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-100">Standard</span>
                        <span className="font-bold text-cyan-300">₹499</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-100">VIP</span>
                        <span className="font-bold text-cyan-300">₹999</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-100">Premium</span>
                        <span className="font-bold text-cyan-300">₹1499</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="border border-cyan-500/50 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <CardHeader>
                  <CardTitle className="text-2xl text-cyan-300">Book Your Tickets</CardTitle>
                  <CardDescription className="text-cyan-100/80">
                    Fill in your details to reserve your spot at the Evogen concert
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
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 flex items-center">
                          <User className="mr-2 h-5 w-5" />
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-cyan-100">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={ticketData.name}
                              onChange={handleInputChange}
                              className="bg-black/50 border-cyan-500/30 text-white"
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="teamName" className="text-cyan-100">
                              Team Name (Optional)
                            </Label>
                            <Input
                              id="teamName"
                              name="teamName"
                              value={ticketData.teamName}
                              onChange={handleInputChange}
                              className="bg-black/50 border-cyan-500/30 text-white"
                              placeholder="Enter your team name"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-cyan-100">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={ticketData.email}
                              onChange={handleInputChange}
                              className="bg-black/50 border-cyan-500/30 text-white"
                              placeholder="Enter your email"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="mobileNumber" className="text-cyan-100">
                              Mobile Number
                            </Label>
                            <Input
                              id="mobileNumber"
                              name="mobileNumber"
                              value={ticketData.mobileNumber}
                              onChange={handleInputChange}
                              className="bg-black/50 border-cyan-500/30 text-white"
                              placeholder="Enter 10-digit mobile number"
                              maxLength={10}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 flex items-center">
                          <Ticket className="mr-2 h-5 w-5" />
                          Ticket Information
                        </h3>
                        
                        <div className="space-y-2">
                          <Label className="text-cyan-100">Ticket Type</Label>
                          <RadioGroup 
                            defaultValue="STANDARD" 
                            value={ticketData.ticketType}
                            onValueChange={handleTicketTypeChange}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                          >
                            <div className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors">
                              <RadioGroupItem value="STANDARD" id="standard" className="text-cyan-500" />
                              <Label htmlFor="standard" className="flex flex-col">
                                <span className="font-medium">Standard</span>
                                <span className="text-sm text-cyan-100/70">₹499</span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors">
                              <RadioGroupItem value="VIP" id="vip" className="text-cyan-500" />
                              <Label htmlFor="vip" className="flex flex-col">
                                <span className="font-medium">VIP</span>
                                <span className="text-sm text-cyan-100/70">₹999</span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 bg-black/30 p-3 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors">
                              <RadioGroupItem value="PREMIUM" id="premium" className="text-cyan-500" />
                              <Label htmlFor="premium" className="flex flex-col">
                                <span className="font-medium">Premium</span>
                                <span className="text-sm text-cyan-100/70">₹1499</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ticketCount" className="text-cyan-100">
                            Number of Tickets
                          </Label>
                          <Select 
                            value={ticketData.ticketCount.toString()} 
                            onValueChange={handleTicketCountChange}
                          >
                            <SelectTrigger className="bg-black/50 border-cyan-500/30 text-white">
                              <SelectValue placeholder="Select number of tickets" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-cyan-500/30">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'ticket' : 'tickets'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-cyan-100">Total Amount</span>
                          <span className="text-xl font-bold text-cyan-300">₹{calculatePrice()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-5 w-5" />
                            Book Tickets Now
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
      </div>
    </div>
  )
}
