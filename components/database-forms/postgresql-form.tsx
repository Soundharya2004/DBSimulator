"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function PostgreSQLForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConnecting(true)

    try {
      // Simulate connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Database Connected",
        description: "Successfully connected to PostgreSQL database",
      })

      router.push("/dashboard")
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
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Image src="/placeholder.svg" alt="PostgreSQL" width={32} height={32} />
          <CardTitle>Connect to PostgreSQL</CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Resource Name</Label>
            <Input id="name" placeholder="My PostgreSQL Database" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select defaultValue="asia">
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia">Asia (Tokyo)</SelectItem>
                <SelectItem value="us">US (N. Virginia)</SelectItem>
                <SelectItem value="eu">EU (Ireland)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input id="host" placeholder="database.example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input id="port" placeholder="5432" required />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="database">Database</Label>
              <Input id="database" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schema">Schema</Label>
              <Input id="schema" placeholder="public" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isConnecting}>
            {isConnecting ? "Connecting..." : "Connect Database"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

