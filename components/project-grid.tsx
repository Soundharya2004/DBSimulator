"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  useToast,
} from "@/components/ui"
import { Plus, Database } from "lucide-react"

interface Project {
  id: string
  name: string
  type?: string
  createdAt: string
  color: string
}

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Database",
    type: "postgresql",
    createdAt: "2024-02-20",
    color: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
  },
  {
    id: "2",
    name: "User Analytics",
    type: "mongodb",
    createdAt: "2024-02-21",
    color: "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100",
  },
  {
    id: "3",
    name: "Inventory System",
    type: "mysql",
    createdAt: "2024-02-22",
    color: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100",
  },
  {
    id: "4",
    name: "Blog CMS",
    type: "mongodb",
    createdAt: "2024-02-23",
    color: "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100",
  },
  {
    id: "5",
    name: "Customer Support Tickets",
    type: "postgresql",
    createdAt: "2024-02-24",
    color: "bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100",
  },
]

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedProjects = sessionStorage.getItem("projects")
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      setProjects(sampleProjects)
      sessionStorage.setItem("projects", JSON.stringify(sampleProjects))
    }
  }, [])

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating project...")
    setIsCreating(true)

    const colors = [
      "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
      "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100",
      "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100",
      "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100",
      "bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100",
    ]

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      createdAt: new Date().toISOString().split("T")[0],
      color: colors[Math.floor(Math.random() * colors.length)],
    }

    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    sessionStorage.setItem("projects", JSON.stringify(updatedProjects))

    console.log("New project:", newProject)
    console.log("Updated projects:", updatedProjects)

    toast({
      title: "Project Created",
      description: `Successfully created project "${projectName}"`,
    })

    setDialogOpen(false)
    setProjectName("")
    setIsCreating(false)

    console.log("Redirecting to:", `/database-select?projectId=${newProject.id}`)
    router.push(`/database-select?projectId=${newProject.id}`)
  }

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/${projectId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Projects</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setDialogOpen(true)}>
          <CardContent className="p-6 h-[200px] flex flex-col items-center justify-center">
            <Plus className="h-8 w-8 mb-4" />
            <span className="text-lg font-medium">Create New Project</span>
          </CardContent>
        </Card>
        {projects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleProjectClick(project.id)}
          >
            <CardContent className="p-6 h-[200px] flex flex-col">
              <div className={`rounded-full w-10 h-10 flex items-center justify-center mb-4 ${project.color}`}>
                <Database className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground">Created {project.createdAt}</p>
              </div>
              {project.type && (
                <div className={`mt-4 text-xs px-2.5 py-1 rounded-full w-fit ${project.color}`}>{project.type}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new project 👋</DialogTitle>
            <DialogDescription>Give your project a name to get started</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateProject}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project name</Label>
                <Input
                  id="project-name"
                  placeholder="My Awesome Project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)} type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating || !projectName.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {isCreating ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

