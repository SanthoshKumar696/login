"use client"

import { useAuth } from "../contexts/AuthContext"
import type { Permission } from "../types/user"
import {
  LayoutDashboard,
  Receipt,
  ClipboardList,
  BarChart3,
  Package,
  Settings,
  Users,
  ChefHat,
  LogOut,
} from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  permissions: Permission
  isMobile: boolean
  activeView: string
  setActiveView: (view: string) => void
}

const Sidebar = ({ isOpen, setIsOpen, permissions, isMobile, activeView, setActiveView }: SidebarProps) => {
  const { user, logout } = useAuth()

  if (!user) return null

  const handleNavClick = (view: string) => {
    setActiveView(view)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsOpen(false)} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-[#E30613] text-white">
            <div className="flex items-center space-x-2">
            <img src="../assets/react.svg" alt="image" />
             
            </div>
              
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#F7A900] flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {permissions.dashboard && (
              <button
                onClick={() => handleNavClick("dashboard")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "dashboard" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
            )}

            {permissions.billing && (
              <button
                onClick={() => handleNavClick("billing")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "billing" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Receipt className="h-5 w-5" />
                <span>Billing</span>
              </button>
            )}

            {permissions.orders.view && (
              <button
                onClick={() => handleNavClick("orders")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "orders" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <ClipboardList className="h-5 w-5" />
                <span>Orders</span>
              </button>
            )}

            {permissions.kot.view && (
              <button
                onClick={() => handleNavClick("kitchen")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "kitchen" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <ChefHat className="h-5 w-5" />
                <span>Kitchen Display</span>
              </button>
            )}

            {permissions.reports.view && (
              <button
                onClick={() => handleNavClick("reports")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "reports" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Reports</span>
              </button>
            )}

            {permissions.inventory && (
              <button
                onClick={() => handleNavClick("inventory")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "inventory" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </button>
            )}

            {permissions.users && (
              <button
                onClick={() => handleNavClick("users")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "users" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </button>
            )}

            {permissions.settings && (
              <button
                onClick={() => handleNavClick("settings")}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left",
                  activeView === "settings" ? "bg-[#E30613] text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            )}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:bg-gray-100 hover:text-[#E30613]"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
