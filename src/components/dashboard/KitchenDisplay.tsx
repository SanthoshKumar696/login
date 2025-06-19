"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { mockOrders } from "../../data/mockData"
import { Clock, CheckCircle, ChefHat } from "lucide-react"

interface KitchenDisplayProps {
  canMarkPrepared: boolean
}

const KitchenDisplay = ({ canMarkPrepared }: KitchenDisplayProps) => {
  const [orders, setOrders] = useState(mockOrders)
  const { toast } = useToast()

  const pendingOrders = orders.filter((order) => order.status === "Pending" || order.status === "Preparing")

  const handleMarkPrepared = (orderId: string) => {
    if (!canMarkPrepared) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to mark orders as prepared",
        variant: "destructive",
      })
      return
    }

    setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? { ...order, status: "Ready" } : order)))

    toast({
      title: "Order Ready",
      description: `Order ${orderId} has been marked as ready`,
    })
  }

  const getOrderTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / (1000 * 60))
    return `${minutes}m ago`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-800 border-red-200"
      case "Preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Ready":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight flex items-center">
          <ChefHat className="mr-2 h-6 w-6" />
          Kitchen Display System
        </h2>
        <div className="text-sm text-gray-500">{pendingOrders.length} orders in queue</div>
      </div>

      {pendingOrders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending orders</h3>
              <p className="text-gray-500">All orders have been completed!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pendingOrders.map((order) => (
            <Card key={order.id} className={`border-2 ${getStatusColor(order.status)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    {getOrderTime(order.timestamp)}
                  </div>
                </div>
                <CardDescription className="font-medium">
                  {order.table} • {order.waiter}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-medium">{item.name}</span>
                      <span className="bg-[#F7A900] text-white px-2 py-1 rounded text-sm font-bold">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                  {canMarkPrepared && order.status !== "Ready" && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkPrepared(order.id)}
                      className="bg-[#E30613] hover:bg-[#c00510]"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Mark Ready
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default KitchenDisplay
