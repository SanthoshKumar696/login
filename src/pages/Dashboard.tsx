"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import DashboardHome from "../components/dashboard/DashboardHome"
import Billing from "../components/dashboard/Billing"
import Orders from "../components/dashboard/Orders"
import Reports from "../components/dashboard/Reports"
import Inventory from "../components/dashboard/Inventory"
import Settings from "../components/dashboard/Settings"
import Users from "../components/dashboard/Users"
import KitchenDisplay from "../components/dashboard/KitchenDisplay"
import { getRolePermissions } from "../types/user"

const Dashboard = () => {
  const { user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const permissions = getRolePermissions(user.role)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} permissions={permissions} isMobile={isMobile} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} user={user} isMobile={isMobile} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            {permissions.billing && <Route path="/billing" element={<Billing />} />}
            {permissions.orders.view && <Route path="/orders" element={<Orders permissions={permissions.orders} />} />}
            {permissions.reports.view && (
              <Route path="/reports" element={<Reports canEdit={permissions.reports.edit} />} />
            )}
            {permissions.inventory && <Route path="/inventory" element={<Inventory />} />}
            {permissions.settings && <Route path="/settings" element={<Settings />} />}
            {permissions.users && <Route path="/users" element={<Users />} />}
            {permissions.kot.view && (
              <Route path="/kitchen" element={<KitchenDisplay canMarkPrepared={permissions.kot.markPrepared} />} />
            )}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
