import { createContext, useState } from "react";

export const UserContext = createContext({});

export function userContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.prodiver
      value={{ userInfo, setUserInfo }}
    ></UserContext.prodiver>
  );
}
