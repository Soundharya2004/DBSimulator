import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background/10 to-background/30">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}

