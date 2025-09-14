import type { UserResource } from "@clerk/types"

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
  publicMetadata: Record<string, any>
  privateMetadata: Record<string, any>
  unsafeMetadata: Record<string, any>
}

export function serializeUser(user: UserResource): SafeUser {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.primaryEmailAddress?.emailAddress ?? null,
    phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? null,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastSignInAt: user.lastSignInAt,
    publicMetadata: user.publicMetadata,
    privateMetadata: user.privateMetadata,
    unsafeMetadata: user.unsafeMetadata,
  }
}