import { ProjectGrid } from "@/components/project-grid"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <ProjectGrid />
      </main>
    </div>
  )
}

