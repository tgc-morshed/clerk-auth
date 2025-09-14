"use client"

import { useState } from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react"

const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const verificationSchema = z.object({
    code: z.string().min(6, "Verification code must be 6 digits"),
})

type SignUpFormData = z.infer<typeof signUpSchema>
type VerificationFormData = z.infer<typeof verificationSchema>

export default function SignUpPage() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [verifying, setVerifying] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const signUpForm = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })

    const verificationForm = useForm<VerificationFormData>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            code: "",
        },
    })

    const onSignUpSubmit = async (data: SignUpFormData) => {
        if (!isLoaded) return

        try {
            await signUp.create({
                firstName: data.firstName,
                lastName: data.lastName,
                emailAddress: data.email,
                password: data.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
            setVerifying(true)
        } catch (err: any) {
            signUpForm.setError("root", {
                message: err.errors?.[0]?.message || "An error occurred during sign up",
            })
        }
    }

    const onVerificationSubmit = async (data: VerificationFormData) => {
        if (!isLoaded) return

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: data.code,
            })

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })

                // Send user data to backend API
                const response = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: completeSignUp.createdUserId,
                        email: signUpForm.getValues("email"),
                        firstName: signUpForm.getValues("firstName"),
                        lastName: signUpForm.getValues("lastName"),
                    }),
                })

                if (!response.ok) {
                    console.error("Failed to store user data")
                }

                router.push("/dashboard")
            }
        } catch (err: any) {
            verificationForm.setError("root", {
                message: err.errors?.[0]?.message || "Invalid verification code",
            })
        }
    }

    const handleSocialSignUp = async (strategy: "oauth_google" | "oauth_facebook" | "oauth_slack") => {
        if (!isLoaded) return

        try {
            await signUp.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard",
            })
        } catch (err: any) {
            console.error("Social sign up error:", err)
        }
    }

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        {verifying ? "Verify Your Email" : "Create Account"}
                    </CardTitle>
                    <CardDescription>
                        {verifying ? "Enter the verification code sent to your email" : "Sign up to get started with your account"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!verifying ? (
                        <>
                            <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                className="pl-10"
                                                {...signUpForm.register("firstName")}
                                            />
                                        </div>
                                        {signUpForm.formState.errors.firstName && (
                                            <p className="text-sm text-destructive">{signUpForm.formState.errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input id="lastName" placeholder="Doe" className="pl-10" {...signUpForm.register("lastName")} />
                                        </div>
                                        {signUpForm.formState.errors.lastName && (
                                            <p className="text-sm text-destructive">{signUpForm.formState.errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="pl-10"
                                            {...signUpForm.register("email")}
                                        />
                                    </div>
                                    {signUpForm.formState.errors.email && (
                                        <p className="text-sm text-destructive">{signUpForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-10 pr-10"
                                            {...signUpForm.register("password")}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    {signUpForm.formState.errors.password && (
                                        <p className="text-sm text-destructive">{signUpForm.formState.errors.password.message}</p>
                                    )}
                                </div>

                                {signUpForm.formState.errors.root && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{signUpForm.formState.errors.root.message}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="cursor-pointer w-full bg-gradient-to-b from-[#7B2AE5] to-[#932FFF] text-white shadow-[inset_3px_3px_7.3px_0_rgba(195,195,195,0.25)] hover:bg-none hover:bg-white hover:text-[#7B2AE5] hover:border hover:border-[#7B2AE5] hover:border-dashed" disabled={signUpForm.formState.isSubmitting}>
                                    {signUpForm.formState.isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full bg-gradient-to-b from-[#7B2AE5] to-[#932FFF]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <Button variant="outline" onClick={() => handleSocialSignUp("oauth_google")} className="cursor-pointer w-full bg-[#4F00E2] text-white shadow-[inset_3px_3px_7.3px_0_rgba(195,195,195,0.25)] hover:bg-none hover:text-[#7B2AE5] hover:border hover:border-[#7B2AE5] hover:border-dashed">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                </Button>
                                <Button variant="outline" onClick={() => handleSocialSignUp("oauth_facebook")} className="cursor-pointer w-full bg-[#4F00E2] text-white shadow-[inset_3px_3px_7.3px_0_rgba(195,195,195,0.25)] hover:bg-none hover:text-[#7B2AE5] hover:border hover:border-[#7B2AE5] hover:border-dashed">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </Button>
                                <Button variant="outline" onClick={() => handleSocialSignUp("oauth_slack")} className="cursor-pointer w-full bg-[#4F00E2] text-white shadow-[inset_3px_3px_7.3px_0_rgba(195,195,195,0.25)] hover:bg-none hover:text-[#7B2AE5] hover:border hover:border-[#7B2AE5] hover:border-dashed">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                                    </svg>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    placeholder="Enter 6-digit code"
                                    className="text-center text-lg tracking-widest"
                                    maxLength={6}
                                    {...verificationForm.register("code")}
                                />
                                {verificationForm.formState.errors.code && (
                                    <p className="text-sm text-destructive">{verificationForm.formState.errors.code.message}</p>
                                )}
                            </div>

                            {verificationForm.formState.errors.root && (
                                <Alert variant="destructive">
                                    <AlertDescription>{verificationForm.formState.errors.root.message}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="cursor-pointer w-full bg-gradient-to-b from-[#7B2AE5] to-[#932FFF] text-white shadow-[inset_3px_3px_7.3px_0_rgba(195,195,195,0.25)] hover:bg-none hover:text-[#7B2AE5] hover:border hover:border-[#7B2AE5] hover:border-dashed" disabled={verificationForm.formState.isSubmitting}>
                                {verificationForm.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Email"
                                )}
                            </Button>

                            <Button type="button" variant="ghost" className="cursor-pointer w-full bg-gradient-to-b from-[#7B2AE5] to-[#932FFF] text-white shadow-[inset_3px_3px_7.3px_0_rgba(195,195,195,0.25)] hover:bg-none hover:text-[#7B2AE5] hover:border hover:border-[#7B2AE5] hover:border-dashed" onClick={() => setVerifying(false)}>
                                Back to Sign Up
                            </Button>
                        </form>
                    )}

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/sign-in" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
