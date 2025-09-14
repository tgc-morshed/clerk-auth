// import { auth } from "@clerk/nextjs/server"
// import { type NextRequest, NextResponse } from "next/server"

// // In-memory storage for demo purposes
// // In a real application, you would use a database like PostgreSQL, MongoDB, etc.
// const users: Array<{
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   createdAt: string
// }> = []

// export async function POST(request: NextRequest) {
//   try {
//     // Verify the user is authenticated
//     const { userId } = await auth()

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await request.json()
//     const { id, email, firstName, lastName } = body

//     // Validate required fields
//     if (!id || !email || !firstName || !lastName) {
//       return NextResponse.json({ error: "Missing required fields: id, email, firstName, lastName" }, { status: 400 })
//     }

//     // Check if user already exists
//     const existingUser = users.find((user) => user.id === id)
//     if (existingUser) {
//       return NextResponse.json({ message: "User already exists", user: existingUser }, { status: 200 })
//     }

//     // Create new user record
//     const newUser = {
//       id,
//       email,
//       firstName,
//       lastName,
//       createdAt: new Date().toISOString(),
//     }

//     users.push(newUser)

//     console.log(`New user stored: ${firstName} ${lastName} (${email})`)

//     return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 })
//   } catch (error) {
//     console.error("Error storing user:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     // Verify the user is authenticated
//     const { userId } = await auth()

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Get query parameters
//     const { searchParams } = new URL(request.url)
//     const userIdParam = searchParams.get("id")

//     if (userIdParam) {
//       // Get specific user
//       const user = users.find((user) => user.id === userIdParam)
//       if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 })
//       }
//       return NextResponse.json({ user }, { status: 200 })
//     }

//     // Get all users (for admin purposes)
//     return NextResponse.json(
//       {
//         users,
//         total: users.length,
//         message: "Users retrieved successfully",
//       },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error("Error retrieving users:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     // Verify the user is authenticated
//     const { userId } = await auth()

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await request.json()
//     const { id, email, firstName, lastName } = body

//     if (!id) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 })
//     }

//     // Find and update user
//     const userIndex = users.findIndex((user) => user.id === id)
//     if (userIndex === -1) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     // Update user data
//     if (email) users[userIndex].email = email
//     if (firstName) users[userIndex].firstName = firstName
//     if (lastName) users[userIndex].lastName = lastName

//     console.log(`User updated: ${users[userIndex].firstName} ${users[userIndex].lastName}`)

//     return NextResponse.json({ message: "User updated successfully", user: users[userIndex] }, { status: 200 })
//   } catch (error) {
//     console.error("Error updating user:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     // Verify the user is authenticated
//     const { userId } = await auth()

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { searchParams } = new URL(request.url)
//     const userIdParam = searchParams.get("id")

//     if (!userIdParam) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 })
//     }

//     // Find and remove user
//     const userIndex = users.findIndex((user) => user.id === userIdParam)
//     if (userIndex === -1) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     const deletedUser = users.splice(userIndex, 1)[0]
//     console.log(`User deleted: ${deletedUser.firstName} ${deletedUser.lastName}`)

//     return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 })
//   } catch (error) {
//     console.error("Error deleting user:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
