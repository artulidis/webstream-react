import React, { useState, createContext, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { api } from '../global/Axios'
import { useNavigate } from 'react-router-dom'

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

  const [open, setOpen] = useState(false);
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
  const [user, setUser] = useState(() => localStorage.getItem('tokens') ? jwt_decode(localStorage.getItem('tokens')) : null)
  const [profileContent, setProfileContent] = useState(null)
  const [profileInfo, setProfileInfo] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [profile_image, setProfile_Image] = useState(null)
  const navigate = useNavigate()



  const logoutUser = () => {
    setUser(null)
    setAuthTokens(null)
    setOpen(false)
    setProfileInfo(null)
    localStorage.removeItem('tokens')
    navigate('/login')
  }


  const loginUser = async (e, username, password) => {
    e.preventDefault()
    let response = await api.post('api/token/', {
      username: username,
      password: password
    })
    setAuthTokens(response.data)
    setUser(jwt_decode(response.data.access))
    localStorage.setItem('tokens', JSON.stringify(response.data))
    if(response.status === 200) {
      navigate('/profile')
    }
  }


  useEffect(()=> {
    if(authTokens) {
      setUser(jwt_decode(authTokens.access))
    }
  },[authTokens])


  const context = {
    open, setOpen,
    authTokens, setAuthTokens,
    user, setUser,
    profileContent, setProfileContent,
    loginUser, logoutUser,
    profileInfo, setProfileInfo,
    profile_image, setProfile_Image,
    isEdit, setIsEdit
  }

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
