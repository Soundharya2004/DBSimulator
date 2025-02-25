import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Database, Search, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6" />
          <span className="font-semibold">DB Simulator</span>
        </div>
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-sm">
            <Input
              type="search"
              placeholder="Search projects..."
              className="h-8 w-full bg-background"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  )
}

