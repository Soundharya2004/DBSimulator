"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export function DatabaseConfig({ type }: { type: string }) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add database configuration logic here
    router.push("/dashboard/database")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold capitalize">Configure {type}</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Connection Details</CardTitle>
            <CardDescription>Enter your database connection details to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Resource Name</Label>
              <Input id="name" placeholder="My Database" required />
              <p className="text-sm text-muted-foreground">This is how you and your team will identify this resource</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentials">Connection Credentials</Label>
              <Textarea
                id="credentials"
                placeholder="Paste your connection string or credentials JSON here"
                className="min-h-[100px] font-mono"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Connect Database</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

