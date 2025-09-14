"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Settings, BarChart3, Shield, Mail } from "lucide-react"

const actions = [
  {
    title: "Add User",
    description: "Create a new user account",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Manage Users",
    description: "View and edit user accounts",
    icon: Users,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "System Settings",
    description: "Configure application settings",
    icon: Settings,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "View Analytics",
    description: "Check usage statistics",
    icon: BarChart3,
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "Security Audit",
    description: "Review security logs",
    icon: Shield,
    color: "bg-red-500 hover:bg-red-600",
  },
  {
    title: "Send Notifications",
    description: "Broadcast messages to users",
    icon: Mail,
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 justify-start bg-transparent"
              onClick={() => console.log(`Clicked: ${action.title}`)}
            >
              <div className={`p-2 rounded-md mr-3 ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
