import React, {useContext, useState} from "react";
import styles from '../css/app.module.css'
import ProfileImage from '../icons/profile-avatar.png'
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const LogoutButton = () => {

  const {setUser, setAuthTokens} = useContext(GlobalContext)

  const logoutUser = () => {
    setUser(null)
    setAuthTokens(null)
    localStorage.removeItem('tokens')
  }

    return (
      <div onClick={() => logoutUser()}>
        Logout
      </div>
    )
}

const LoginButton = () => {
  return (
    <div>
      Login/Register
    </div>
  )
}

function Navbar(props) {
    return (
      <nav className={styles.navbar}>
        <ul>{props.children}</ul>
      </nav>
    );
  } export default Navbar
  

  export const Profile = (props) => {
    
    const { open, setOpen } = useContext(GlobalContext)
  
    return (
      <div>
        <img src={ProfileImage} className={styles.profileImage} onClick={() => setOpen(!open)} />
        {open && props.children}
      </div>
    );
  }
  
  
  export const DropdownMenu = () => {

    const { open, setOpen, user } = useContext(GlobalContext)

    function DropdownItem(props) {
      return (
          !user && props.loginRequired ? 
          null :
          <Link to={props.linkTo} className={styles.menuItem} onClick={()=> setOpen(!open)} >
  
          <span>{props.children}</span>

          </Link>
      );
    }
  
    return (
      <div className={styles.dropdown}>
          <div className="menu">
            <DropdownItem linkTo={'/profile'} loginRequired={true} >My Profile</DropdownItem>
            <DropdownItem
              loginRequired={false}
              linkTo='/login'>
              {user ? <LogoutButton/> : <LoginButton/>}
            </DropdownItem>
          </div>
      </div>
    );
  }