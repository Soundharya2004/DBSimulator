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

export function MongoDBForm() {
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
        description: "Successfully connected to MongoDB database",
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
          <Image src="/placeholder.svg" alt="MongoDB" width={32} height={32} />
          <CardTitle>Connect to MongoDB</CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Resource Name</Label>
            <Input id="name" placeholder="My MongoDB Database" required />
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
          <div className="space-y-2">
            <Label htmlFor="connectionString">Connection String</Label>
            <Input
              id="connectionString"
              placeholder="mongodb+srv://username:password@cluster.mongodb.net/database"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="database">Database Name</Label>
            <Input id="database" required />
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

