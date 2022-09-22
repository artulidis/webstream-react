import React, { useState, createContext, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { api } from '../global/Axios'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

  const [open, setOpen] = useState(false);
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
  const [user, setUser] = useState(() => localStorage.getItem('tokens') ? jwt_decode(localStorage.getItem('tokens')) : null)
  const [profileContent, setProfileContent] = useState(null)
  const [profileInfo, setProfileInfo] = useState(null)
  const [following, setFollowing] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [profile_image, setProfile_Image] = useState(null)
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)

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
    try {
      e.preventDefault()
      let response = await api.post('api/token/', {
      username: username,
      password: password
      })
      setAuthTokens(response.data)
      setUser(jwt_decode(response.data.access))
      setIsError(false)
      setError(null)
      localStorage.setItem('tokens', JSON.stringify(response.data))
      navigate('/profile')
    } catch(error) {
        if(!isError) {
          setIsError(true)
          setError(error.response.statusText)
        }

        setTimeout(()=> {
          setIsError(false)
          setError(null)
        },2300)
    }
  }

  useEffect(()=> {
    if(authTokens) {
      setUser(jwt_decode(authTokens.access))
    }
  },[authTokens])

  useEffect(() => {
    getUserFollowing()
  },[])

  const getUserFollowing = async () => {
    let followingList = await axios.get(`http://127.0.0.1:8000/api/following/${user.user_id}`)
    setFollowing(followingList.data.users)
  }


  const context = {
    open, setOpen,
    authTokens, setAuthTokens,
    user, setUser,
    profileContent, setProfileContent,
    loginUser, logoutUser,
    profileInfo, setProfileInfo,
    profile_image, setProfile_Image,
    isEdit, setIsEdit,
    error, setError,
    isError, setIsError,
    following, setFollowing,
  }

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
