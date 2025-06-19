"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import { mockInventory } from "../../data/mockData"
import { Plus, Search, AlertTriangle, Package } from "lucide-react"

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const filteredInventory = mockInventory.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const lowStockItems = mockInventory.filter((item) => item.quantity <= item.reorderLevel)

  const handleAddItem = () => {
    toast({
      title: "Add Item",
      description: "Opening add inventory item form",
    })
  }

  const handleReorder = (itemName: string) => {
    toast({
      title: "Reorder Item",
      description: `Reordering ${itemName}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
        <Button onClick={handleAddItem} className="bg-[#E30613] hover:bg-[#c00510]">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Low Stock Alert
            </CardTitle>
            <CardDescription className="text-yellow-700">
              {lowStockItems.length} items are running low on stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {item.quantity} {item.unit} left
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleReorder(item.name)}
                      className="bg-[#F7A900] hover:bg-[#e09800]"
                    >
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Manage your restaurant inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Item</th>
                  <th className="py-3 px-4 text-left font-medium">Quantity</th>
                  <th className="py-3 px-4 text-left font-medium">Unit</th>
                  <th className="py-3 px-4 text-left font-medium">Reorder Level</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.unit}</td>
                    <td className="py-3 px-4">{item.reorderLevel}</td>
                    <td className="py-3 px-4">
                      {item.quantity <= item.reorderLevel ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        {item.quantity <= item.reorderLevel && (
                          <Button
                            size="sm"
                            onClick={() => handleReorder(item.name)}
                            className="bg-[#F7A900] hover:bg-[#e09800]"
                          >
                            Reorder
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredInventory.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="mx-auto h-12 w-12 opacity-20 mb-2" />
                <p>No inventory items found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inventory
