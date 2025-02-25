import { ProjectDashboard } from "@/components/project-dashboard"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <ProjectDashboard projectId={params.projectId} />
      </main>
    </div>
  )
}

