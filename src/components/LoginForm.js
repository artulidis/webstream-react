import React, {useState, useContext} from 'react'
import { api } from '../api/axios'
import GlobalContext from '../context/GlobalContext'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const { user, setUser, authTokens, setAuthTokens, loginUser } = useContext(GlobalContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


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
        <button onClick={(e) => loginUser(e, username, password)}>login</button>
    </>
  )
}

export default LoginForm
