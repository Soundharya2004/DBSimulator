import { DatabaseSelect } from "@/components/database-select"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DatabaseSelectPage({
  params,
}: {
  params: { projectId: string }
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <DatabaseSelect projectId={params.projectId} />
      </main>
    </div>
  )
}

