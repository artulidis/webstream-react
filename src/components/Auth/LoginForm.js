import React, {useState, useContext} from 'react'
import GlobalContext from '../../global/GlobalContext'

const LoginForm = () => {

  const { loginUser } = useContext(GlobalContext)

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
