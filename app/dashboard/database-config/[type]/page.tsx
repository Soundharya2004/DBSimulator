import { DatabaseConfig } from "@/components/database-config"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DatabaseConfigPage({ params }: { params: { type: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <DatabaseConfig type={params.type} />
      </main>
    </div>
  )
}

