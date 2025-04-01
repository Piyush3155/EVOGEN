
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { teamName, coding, designing, dataAnalytics, cyberSecurity, bestManager, communication } = data

    // Create team
    const team = await prisma.team.create({
      data: {
        teamName,
      },
    })

    // Create members for each category
    if (coding && coding.length > 0) {
      for (const member of coding) {
        await prisma.member.create({
          data: {
            name: member.name,
            email: member.email,
            college: member.college,
            usn: member.usn,
            codingTeamId: team.id,
          },
        })
      }
    }

    if (designing && designing.length > 0) {
      for (const member of designing) {
        await prisma.member.create({
          data: {
            name: member.name,
            email: member.email,
            college: member.college,
            usn: member.usn,
            designingTeamId: team.id,
          },
        })
      }
    }

    if (dataAnalytics && dataAnalytics.length > 0) {
      for (const member of dataAnalytics) {
        await prisma.member.create({
          data: {
            name: member.name,
            email: member.email,
            college: member.college,
            usn: member.usn,
            dataAnalyticsTeamId: team.id,
          },
        })
      }
    }

    if (cyberSecurity && cyberSecurity.length > 0) {
      for (const member of cyberSecurity) {
        await prisma.member.create({
          data: {
            name: member.name,
            email: member.email,
            college: member.college,
            usn: member.usn,
            cyberSecurityTeamId: team.id,
          },
        })
      }
    }

    if (bestManager && bestManager.length > 0) {
      for (const member of bestManager) {
        await prisma.member.create({
          data: {
            name: member.name,
            email: member.email,
            college: member.college,
            usn: member.usn,
            bestManagerTeamId: team.id,
          },
        })
      }
    }

    if (communication && communication.length > 0) {
      for (const member of communication) {
        await prisma.member.create({
          data: {
            name: member.name,
            email: member.email,
            college: member.college,
            usn: member.usn,
            communicationTeamId: team.id,
          },
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Team registered successfully',
      teamId: team.id
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to register team', error: String(error) },
      { status: 500 }
    )
  }
}
