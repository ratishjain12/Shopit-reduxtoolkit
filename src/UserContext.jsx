import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [status, setStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ status, setStatus, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
