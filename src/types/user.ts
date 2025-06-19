export enum UserRole {
  OWNER = "owner",
  MANAGER = "manager",
  CASHIER = "cashier",
  WAITER = "waiter",
  KOT = "kot",
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  role: UserRole
  avatar?: string
  password?: string
}

export interface Permission {
  dashboard: boolean
  billing: boolean
  orders: {
    view: boolean
    create: boolean
    modify: boolean
  }
  reports: {
    view: boolean
    edit: boolean
  }
  inventory: boolean
  settings: boolean
  users: boolean
  discounts: boolean
  kot: {
    view: boolean
    print: boolean
    markPrepared: boolean
  }
  taxes: boolean
}

export const getRolePermissions = (role: UserRole): Permission => {
  switch (role) {
    case UserRole.OWNER:
      return {
        dashboard: true,
        billing: true,
        orders: { view: true, create: true, modify: true },
        reports: { view: true, edit: true },
        inventory: true,
        settings: true,
        users: true,
        discounts: true,
        kot: { view: true, print: true, markPrepared: true },
        taxes: true,
      }
    case UserRole.MANAGER:
      return {
        dashboard: true,
        billing: true,
        orders: { view: true, create: true, modify: true },
        reports: { view: true, edit: true },
        inventory: true,
        settings: false,
        users: false,
        discounts: true,
        kot: { view: true, print: true, markPrepared: true },
        taxes: true,
      }
    case UserRole.CASHIER:
      return {
        dashboard: true,
        billing: true,
        orders: { view: true, create: true, modify: true },
        reports: { view: true, edit: true },
        inventory: false,
        settings: false,
        users: false,
        discounts: true,
        kot: { view: true, print: true, markPrepared: false },
        taxes: false,
      }
    case UserRole.WAITER:
      return {
        dashboard: true,
        billing: false,
        orders: { view: true, create: true, modify: true },
        reports: { view: false, edit: false },
        inventory: false,
        settings: false,
        users: false,
        discounts: false,
        kot: { view: true, print: true, markPrepared: false },
        taxes: false,
      }
    case UserRole.KOT:
      return {
        dashboard: true,
        billing: false,
        orders: { view: true, create: false, modify: false },
        reports: { view: false, edit: false },
        inventory: false,
        settings: false,
        users: false,
        discounts: false,
        kot: { view: true, print: false, markPrepared: true },
        taxes: false,
      }
    default:
      return {
        dashboard: false,
        billing: false,
        orders: { view: false, create: false, modify: false },
        reports: { view: false, edit: false },
        inventory: false,
        settings: false,
        users: false,
        discounts: false,
        kot: { view: false, print: false, markPrepared: false },
        taxes: false,
      }
  }
}
