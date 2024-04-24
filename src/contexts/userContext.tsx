import { createContext, useContext, useState } from "react";
import User from "../models/user";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};


