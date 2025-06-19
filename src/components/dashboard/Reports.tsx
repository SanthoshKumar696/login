import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { mockSalesData, mockOrders } from "../../data/mockData"
import { Download, TrendingUp, ShoppingCart, DollarSign } from "lucide-react"

interface ReportsProps {
  canEdit: boolean
}

const Reports = ({ canEdit }: ReportsProps) => {
  const totalSales = mockSalesData.reduce((sum, day) => sum + day.sales, 0)
  const totalOrders = mockOrders.length
  const avgOrderValue = totalSales / totalOrders

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <Button className="bg-[#E30613] hover:bg-[#c00510]">
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgOrderValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Report</CardTitle>
          <CardDescription>Daily sales breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Sales</th>
                  <th className="py-3 px-4 text-left font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {mockSalesData.map((day, index) => {
                  const prevDay = mockSalesData[index - 1]
                  const growth = prevDay ? ((day.sales - prevDay.sales) / prevDay.sales) * 100 : 0
                  return (
                    <tr key={day.date} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{new Date(day.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 font-semibold">₹{day.sales.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {growth >= 0 ? "+" : ""}
                          {growth.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {!canEdit && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            You have read-only access to reports. Contact an administrator to edit report settings.
          </p>
        </div>
      )}
    </div>
  )
}

export default Reports
