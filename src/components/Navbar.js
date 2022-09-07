import React, {useContext, useEffect, useState} from "react";
import styles from '../css/app.module.css'
import ProfileImage from '../icons/profile-avatar.png'
import { Link } from "react-router-dom";
import useAxios from "../api/useAxios";
import GlobalContext from "../context/GlobalContext";

const LogoutButton = () => {

  const {logoutUser} = useContext(GlobalContext)

    return (
      <div onClick={logoutUser} className={styles.menuItem}>
        <span>Logout</span>
      </div>
    )
}

const LoginButton = () => {

  const {setOpen} = useContext(GlobalContext)

  return (
    <Link to={'/login'} onClick={() => setOpen(false)} className={styles.menuItem}>
      <span>Login/Register</span>
    </Link>
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
    
    const { user, open, setOpen, profileInfo, setProfileInfo } = useContext(GlobalContext)
    const api = useAxios()

    useEffect(()=> {
      getProfileInfo()
    },[])

    const getProfileInfo = async () => {
      try {
        let profile_info = await api.get(`/api/user/${user.username}`)
        setProfileInfo(profile_info.data)   
      } catch(error) {
        console.log("SOMETHING WENT WRONG")
      }
    }
  
    return (
      <div>
        <img src={profileInfo ? profileInfo.profile_image : ProfileImage} className={styles.profileImage} onClick={() => setOpen(!open)} />
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
            {user ? <LogoutButton/> : <LoginButton/>}
          </div>
      </div>
    );
  }