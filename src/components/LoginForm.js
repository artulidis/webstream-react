import React, {useState, useContext} from 'react'
import { api } from '../api/axios'
import GlobalContext from '../context/GlobalContext'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const { user, setUser, authTokens, setAuthTokens } = useContext(GlobalContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginUser = async (e) => {
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

  return (
    <>
        <div>
            <label>username:</label>
            <input name='username' onChange={(e) => setUsername(e.target.value)}></input>
        </div>

        <div>
            <label>password:</label>
            <input type={'password'} name='password' onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button onClick={(e) => loginUser(e)}>login</button>
    </>
  )
}

export default LoginForm
