import { createContext, useState } from "react";
export  const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const authenticatedUser = JSON.parse(localStorage.getItem('user'))

  const [user,setUser] = useState(authenticatedUser || null)
  const setAuthUser = (authUser) =>{
    setUser(authUser)
  }

  const logout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setAuthUser(null)
  }





  return <authContext.Provider value={{
    setAuthUser,user,logout
  }}>{children}</authContext.Provider>;
}
