import { DashboardHeader } from "@/components/dashboard/dashboard-header"
// import { DashboardStats } from "@/components/dashboard/dashboard-stats"
// import { QuickActions } from "@/components/dashboard/quick-actions"
// import { RecentActivity } from "@/components/dashboard/recent-activity"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export default async function DashboardPage() {
    const user = await currentUser()
    if (!user) {
        redirect("/sign-in")
    }

    // const userData = {
    //     id: user.id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     imageUrl: user.imageUrl,
    //     emailAddress: user.emailAddresses[0]?.emailAddress || null,
    // }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            <DashboardHeader />
            {/* <main className="container mx-auto px-4 py-8 space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <DashboardStats />
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <RecentActivity />
                    </div>
                    <div>
                        <QuickActions />
                    </div>
                </div>
            </main> */}
        </div>
    )
}
