"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@/components/ui"

const databases = [
  {
    id: "mongodb",
    name: "MongoDB",
    description: "NoSQL Database",
    icon: "/placeholder.svg?height=48&width=48",
    color: "bg-green-100 dark:bg-green-900",
    connectionFields: [
      { name: "connectionString", label: "Connection String", type: "text" },
      { name: "database", label: "Database Name", type: "text" },
    ],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "SQL Database",
    icon: "/placeholder.svg?height=48&width=48",
    color: "bg-blue-100 dark:bg-blue-900",
    connectionFields: [
      { name: "host", label: "Host", type: "text" },
      { name: "port", label: "Port", type: "number" },
      { name: "database", label: "Database Name", type: "text" },
      { name: "username", label: "Username", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    description: "SQL Database",
    icon: "/placeholder.svg?height=48&width=48",
    color: "bg-orange-100 dark:bg-orange-900",
    connectionFields: [
      { name: "host", label: "Host", type: "text" },
      { name: "port", label: "Port", type: "number" },
      { name: "database", label: "Database Name", type: "text" },
      { name: "username", label: "Username", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
  },
  {
    id: "firebase",
    name: "Firebase",
    description: "NoSQL Cloud Database",
    icon: "/placeholder.svg?height=48&width=48",
    color: "bg-yellow-100 dark:bg-yellow-900",
    connectionFields: [
      { name: "projectId", label: "Project ID", type: "text" },
      { name: "apiKey", label: "API Key", type: "text" },
    ],
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Open Source Firebase Alternative",
    icon: "/placeholder.svg?height=48&width=48",
    color: "bg-purple-100 dark:bg-purple-900",
    connectionFields: [
      { name: "projectUrl", label: "Project URL", type: "text" },
      { name: "apiKey", label: "API Key", type: "text" },
    ],
  },
]

export function DatabaseSelect() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDatabase, setSelectedDatabase] = useState<any>(null)
  const [connectionDetails, setConnectionDetails] = useState<Record<string, string>>({})
  const [isConnecting, setIsConnecting] = useState(false)

  const filteredDatabases = databases.filter((db) => db.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDatabaseSelect = (db: any) => {
    setSelectedDatabase(db)
    setConnectionDetails({})
  }

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConnecting(true)

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const projectId = new URLSearchParams(window.location.search).get("projectId")
      if (!projectId) {
        throw new Error("No project ID found")
      }

      const projectsData = JSON.parse(sessionStorage.getItem("projects") || "[]")
      const updatedProjects = projectsData.map((project: any) => {
        if (project.id === projectId) {
          return {
            ...project,
            type: selectedDatabase.id,
            connectionDetails: connectionDetails,
          }
        }
        return project
      })

      sessionStorage.setItem("projects", JSON.stringify(updatedProjects))

      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${selectedDatabase.name}`,
      })

      router.push(`/dashboard/${projectId}`)
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to database. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Choose Database</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDatabases.map((db) => (
              <Dialog
                key={db.id}
                open={selectedDatabase?.id === db.id}
                onOpenChange={(open) => {
                  if (!open) setSelectedDatabase(null)
                }}
              >
                <DialogTrigger asChild>
                  <Card
                    className="p-6 cursor-pointer hover:border-primary transition-all"
                    onClick={() => handleDatabaseSelect(db)}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className={`h-12 w-12 rounded-lg ${db.color} flex items-center justify-center`}>
                        <Image src={db.icon || "/placeholder.svg"} alt={db.name} width={24} height={24} />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{db.name}</div>
                        <div className="text-sm text-muted-foreground">{db.description}</div>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Connect to {db.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleConnect} className="space-y-4 pt-4">
                    {db.connectionFields.map((field) => (
                      <div key={field.name} className="grid gap-2">
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                          id={field.name}
                          type={field.type}
                          value={connectionDetails[field.name] || ""}
                          onChange={(e) =>
                            setConnectionDetails({
                              ...connectionDetails,
                              [field.name]: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    ))}
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setSelectedDatabase(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isConnecting} className="bg-green-600 hover:bg-green-700">
                        {isConnecting ? "Connecting..." : "Connect"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

