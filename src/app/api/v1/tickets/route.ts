import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to generate a unique ticket code
function generateTicketCode() {
  const prefix = "EVOGEN";
  const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `${prefix}${randomDigits}`;
}

// ✅ POST: Book a Ticket
export async function POST(request: Request) {
    try {
      const data = await request.json()
      const { name, email, mobileNumber, teamName } = data
  
      if (!name || !email || !mobileNumber) {
        return NextResponse.json(
          { success: false, message: "Name, email, and mobile number are required fields" },
          { status: 400 },
        )
      }
  
      // Ensure ticketCode uniqueness
      let ticketCode = generateTicketCode()
      let isUnique = false
  
      while (!isUnique) {
        const existingTicket = await prisma.ticket.findUnique({
          where: { ticketCode }, // Ensure field name matches the schema
        })
  
        if (!existingTicket) {
          isUnique = true
        } else {
          ticketCode = generateTicketCode()
        }
      }
  
      // Create the ticket
      const ticket = await prisma.ticket.create({
        data: {
          name,
          email,
          mobileNumber,
          teamName: teamName || "",
          ticketCode,
          ticketType: "STANDARD",
          ticketCount: 1,
          totalAmount: 500.0, // Set a default or calculate dynamically
        },
      })
  
      return NextResponse.json({
        success: true,
        message: "Ticket booked successfully",
        ticketId: ticket.id,
        ticketCode: ticket.ticketCode,
      })
    } catch (error) {
      console.error("Ticket booking error:", error)
      return NextResponse.json(
        { success: false, message: "Failed to book ticket", error: String(error) },
        { status: 500 },
      )
    }
  }
  
// ✅ GET: Retrieve Tickets
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketCode = searchParams.get("ticketCode"); // ✅ Corrected key

    if (ticketCode) {
      // Look up a specific ticket
      const ticket = await prisma.ticket.findUnique({
        where: { ticketCode }, // ✅ Use `ticketCode`
      });

      if (!ticket) {
        return NextResponse.json({ success: false, message: "Ticket not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, ticket });
    } else {
      // Return all tickets (with pagination in a real app)
      const tickets = await prisma.ticket.findMany({
        orderBy: { createdAt: "desc" },
        take: 100, // Limit results
      });

      return NextResponse.json({
        success: true,
        count: tickets.length,
        tickets,
      });
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tickets", error: String(error) },
      { status: 500 }
    );
  }
}
