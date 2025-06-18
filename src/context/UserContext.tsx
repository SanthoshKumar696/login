/* eslint-disable react-refresh/only-export-components */
// UserContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { User } from "../types/types";

const UserContext = createContext<
  [User[], React.Dispatch<React.SetStateAction<User[]>>] | undefined
>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  return (
    <UserContext.Provider value={[users, setUsers]}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};
