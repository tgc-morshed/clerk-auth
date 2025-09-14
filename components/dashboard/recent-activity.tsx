import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    action: "Signed up",
    time: "2 minutes ago",
    status: "success",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    action: "Updated profile",
    time: "5 minutes ago",
    status: "info",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: 3,
    user: "Mike Johnson",
    email: "mike@example.com",
    action: "Password reset",
    time: "10 minutes ago",
    status: "warning",
    avatar: "/thoughtful-man.png",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    email: "sarah@example.com",
    action: "Account verified",
    time: "15 minutes ago",
    status: "success",
    avatar: "/professional-teamwork.png",
  },
  {
    id: 5,
    user: "Tom Brown",
    email: "tom@example.com",
    action: "Failed login attempt",
    time: "20 minutes ago",
    status: "destructive",
    avatar: "/diverse-group.png",
  },
]

const statusVariants = {
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user activities and system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={statusVariants[activity.status as keyof typeof statusVariants]}>
                  {activity.action}
                </Badge>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
