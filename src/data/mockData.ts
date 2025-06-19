import { type User, UserRole } from "../types/user"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    role: UserRole.OWNER,
    password: "admin123",
  },
  {
    id: "2",
    name: "Manager User",
    username: "manager",
    email: "manager@example.com",
    role: UserRole.MANAGER,
    password: "manager123",
  },
  {
    id: "3",
    name: "Cashier User",
    username: "cashier",
    email: "cashier@example.com",
    role: UserRole.CASHIER,
    password: "cashier123",
  },
  {
    id: "4",
    name: "Waiter User",
    username: "waiter",
    email: "waiter@example.com",
    role: UserRole.WAITER,
    password: "waiter123",
  },
  {
    id: "5",
    name: "KOT User",
    username: "kot",
    email: "kot@example.com",
    role: UserRole.KOT,
    password: "kot123",
  },
]

export const mockOrders = [
  {
    id: "ORD-001",
    table: "Table 1",
    items: [
      { name: "Chicken Biryani", quantity: 2, price: 250 },
      { name: "Butter Naan", quantity: 4, price: 40 },
    ],
    total: 660,
    status: "Pending",
    timestamp: new Date().getTime() - 1000 * 60 * 30,
    waiter: "Waiter User",
  },
  {
    id: "ORD-002",
    table: "Table 5",
    items: [
      { name: "Paneer Tikka", quantity: 1, price: 180 },
      { name: "Veg Pulao", quantity: 1, price: 150 },
    ],
    total: 330,
    status: "Completed",
    timestamp: new Date().getTime() - 1000 * 60 * 60,
    waiter: "Manager User",
  },
  {
    id: "ORD-003",
    table: "Takeaway",
    items: [
      { name: "Veg Thali", quantity: 2, price: 200 },
      { name: "Gulab Jamun", quantity: 4, price: 30 },
    ],
    total: 520,
    status: "Ready",
    timestamp: new Date().getTime() - 1000 * 60 * 15,
    waiter: "Cashier User",
  },
]

export const mockInventory = [
  { id: "INV001", name: "Rice", quantity: 50, unit: "kg", reorderLevel: 10 },
  { id: "INV002", name: "Wheat Flour", quantity: 25, unit: "kg", reorderLevel: 5 },
  { id: "INV003", name: "Chicken", quantity: 15, unit: "kg", reorderLevel: 5 },
  { id: "INV004", name: "Paneer", quantity: 8, unit: "kg", reorderLevel: 2 },
]

export const mockSalesData = [
  { date: "2023-06-01", sales: 12500 },
  { date: "2023-06-02", sales: 11200 },
  { date: "2023-06-03", sales: 13800 },
  { date: "2023-06-04", sales: 9500 },
  { date: "2023-06-05", sales: 15200 },
]

export const menuItems = [
  { id: 1, name: "Chicken Biryani", price: 250, category: "Main Course" },
  { id: 2, name: "Butter Naan", price: 40, category: "Bread" },
  { id: 3, name: "Paneer Tikka", price: 180, category: "Starter" },
  { id: 4, name: "Veg Pulao", price: 150, category: "Main Course" },
  { id: 5, name: "Raita", price: 50, category: "Side Dish" },
  { id: 6, name: "Masala Dosa", price: 120, category: "Breakfast" },
  { id: 7, name: "Filter Coffee", price: 40, category: "Beverage" },
  { id: 8, name: "Tandoori Chicken", price: 350, category: "Starter" },
]
