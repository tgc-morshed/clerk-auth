"use client"

import { useState } from "react"
import { useSignIn } from "@clerk/nextjs"
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
import { Loader2, Lock, Mail, CheckCircle } from "lucide-react"

const resetPasswordSchema = z
    .object({
        code: z.string().min(6, "Verification code must be at least 6 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [isComplete, setIsComplete] = useState(false)
    const router = useRouter()

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            code: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!isLoaded || !signIn) return

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: data.code,
                password: data.password,
            })

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                setIsComplete(true)
                setTimeout(() => {
                    router.push("/dashboard")
                }, 2000)
            }
        } catch (err: any) {
            form.setError("root", {
                message: err.errors?.[0]?.message || "Failed to reset password",
            })
        }
    }

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-primary">Password Reset Complete</CardTitle>
                        <CardDescription>Your password has been successfully reset. You're now signed in.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <AlertDescription>Redirecting you to your dashboard...</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Reset Your Password</CardTitle>
                    <CardDescription>Enter the verification code from your email and choose a new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Verification Code</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    className="pl-10"
                                    {...form.register("code")}
                                />
                            </div>
                            {form.formState.errors.code && (
                                <p className="text-sm text-destructive">{form.formState.errors.code.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    {...form.register("password")}
                                />
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    {...form.register("confirmPassword")}
                                />
                            </div>
                            {form.formState.errors.confirmPassword && (
                                <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {form.formState.errors.root && (
                            <Alert variant="destructive">
                                <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting Password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Remember your password? </span>
                        <Link href="/sign-in" className="text-primary hover:underline font-medium">
                            Back to Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
