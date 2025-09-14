import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, TrendingUp, Shield } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Sessions",
    value: "1,234",
    change: "+8%",
    icon: Activity,
    color: "text-green-600",
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    title: "Security Score",
    value: "98%",
    change: "+1%",
    icon: Shield,
    color: "text-emerald-600",
  },
]

export function DashboardStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
