import type { User } from "@clerk/nextjs/server"
import type { UserResource } from "@clerk/types"

type AnyUser = User | UserResource

export type SafeUser = {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
  fullName: string | null
  email: string | null
  phoneNumber: string | null
  imageUrl: string
  createdAt: number
  updatedAt: number
  lastSignInAt: number | null
}

export function serializeUser(user: AnyUser | null | undefined): SafeUser | null {
  if (!user) return null

  return {
    id: user.id,
    username: user.username ?? null,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null,
    email: user.primaryEmailAddress?.emailAddress ?? null,
    phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? null,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt ? new Date(user.createdAt).getTime() : 0,
    updatedAt: user.updatedAt ? new Date(user.updatedAt).getTime() : 0,
    lastSignInAt: user.lastSignInAt
      ? new Date(user.lastSignInAt).getTime()
      : null,
  }
}
