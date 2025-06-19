"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "./Sidebar"
import Header from "./Header"
import DashboardHome from "./dashboard/DashboardHome"
import Billing from "./dashboard/Billing"
import Orders from "./dashboard/Orders"
import Reports from "./dashboard/Reports"
import Inventory from "./dashboard/Inventory"
import Settings from "./dashboard/Settings"
import Users from "./dashboard/Users"
import KitchenDisplay from "./dashboard/KitchenDisplay"
import { getRolePermissions } from "../types/user"

const Dashboard = () => {
  const { user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!user) return null

  const permissions = getRolePermissions(user.role)

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardHome />
      case "billing":
        return permissions.billing ? <Billing /> : <AccessDenied />
      case "orders":
        return permissions.orders.view ? <Orders permissions={permissions.orders} /> : <AccessDenied />
      case "reports":
        return permissions.reports.view ? <Reports canEdit={permissions.reports.edit} /> : <AccessDenied />
      case "inventory":
        return permissions.inventory ? <Inventory /> : <AccessDenied />
      case "settings":
        return permissions.settings ? <Settings /> : <AccessDenied />
      case "users":
        return permissions.users ? <Users /> : <AccessDenied />
      case "kitchen":
        return permissions.kot.view ? (
          <KitchenDisplay canMarkPrepared={permissions.kot.markPrepared} />
        ) : (
          <AccessDenied />
        )
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        permissions={permissions}
        isMobile={isMobile}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} user={user} isMobile={isMobile} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderActiveView()}</main>
      </div>
    </div>
  )
}

const AccessDenied = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
      <p className="text-gray-500">You don't have permission to access this section.</p>
    </div>
  </div>
)

export default Dashboard
