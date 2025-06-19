"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useToast } from "../ui/use-toast"
import { Plus, Minus, Trash2, Search, ShoppingCart, Printer } from "lucide-react"
import { menuItems } from "../../data/mockData"

const categories = [...new Set(menuItems.map((item) => item.category))]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const Billing = () => {
  const [activeTab, setActiveTab] = useState("dine-in")
  const [tableNumber, setTableNumber] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const addToCart = (item: (typeof menuItems)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    })
  }

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxRate = 0.05
  const tax = subtotal * taxRate
  const total = subtotal + tax

  const handlePayment = (paymentMethod: string) => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to the cart before proceeding to payment.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Payment successful",
      description: `Payment of ₹${total.toFixed(2)} processed via ${paymentMethod}.`,
    })
    setCart([])
  }

  const printKOT = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to the cart before printing KOT.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "KOT printed",
      description: `KOT for ${activeTab === "dine-in" ? `Table ${tableNumber}` : activeTab} has been sent to the kitchen.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
      </div>

      <Tabs defaultValue="dine-in" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dine-in">Dine In</TabsTrigger>
          <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {activeTab === "dine-in" && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="table-number" className="w-24">
                        Table Number:
                      </Label>
                      <Input
                        id="table-number"
                        type="number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-24"
                        min="1"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="Search menu items..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={selectedCategory === null ? "bg-[#E30613] hover:bg-[#c00510]" : ""}
                      >
                        All
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={selectedCategory === category ? "bg-[#E30613] hover:bg-[#c00510]" : ""}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Menu Items</CardTitle>
                  <CardDescription>
                    {selectedCategory ? `${selectedCategory} items` : "All menu items"}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => addToCart(item)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                          <span className="font-semibold">₹{item.price}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 w-full text-[#E30613] hover:bg-[#E30613] hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(item)
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    ))}

                    {filteredItems.length === 0 && (
                      <div className="col-span-full p-8 text-center text-gray-500">
                        No items found matching your criteria.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader className="bg-[#F7A900] text-white rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {activeTab === "dine-in"
                        ? `Table ${tableNumber}`
                        : activeTab === "takeaway"
                          ? "Takeaway"
                          : "Delivery"}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-yellow-600"
                      onClick={() => setCart([])}
                    >
                      Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="mx-auto h-12 w-12 opacity-20 mb-2" />
                      <p>Your cart is empty</p>
                      <p className="text-sm">Add items from the menu</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center pb-2 border-b">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              ₹{item.price} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {cart.length > 0 && (
                    <div className="mt-6 space-y-2 border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (5%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Button onClick={printKOT} className="w-full bg-[#F7A900] hover:bg-[#e09800] text-white">
                          <Printer className="mr-2 h-4 w-4" />
                          Print KOT
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => handlePayment("Cash")}
                            variant="outline"
                            className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                          >
                            Cash
                          </Button>
                          <Button
                            onClick={() => handlePayment("Card")}
                            variant="outline"
                            className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                          >
                            Card
                          </Button>
                        </div>

                        <Button
                          onClick={() => handlePayment("UPI")}
                          className="w-full bg-[#E30613] hover:bg-[#c00510] text-white"
                        >
                          Pay via UPI
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Billing
