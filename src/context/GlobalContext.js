import React, { useState, createContext } from 'react'
import jwt_decode from 'jwt-decode'

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

  const [open, setOpen] = useState(false);
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
  const [user, setUser] = useState(localStorage.getItem('tokens') ? jwt_decode(localStorage.getItem('tokens')) : null)

  const context = {
    open, setOpen,
    user, setUser,
    authTokens, setAuthTokens
  }

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
