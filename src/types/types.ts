export interface RawUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  status: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  permissions: string;
  status: "Active" | "Inactive";
}
