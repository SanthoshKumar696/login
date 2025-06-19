"use client"

import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import { Toaster } from "./components/ui/toaster"

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return <Dashboard />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  )
}

export default App
