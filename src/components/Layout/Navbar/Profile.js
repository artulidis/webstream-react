import React, { useContext , useEffect, useState } from "react"
import GlobalContext from "../../../global/GlobalContext"
import styles from '../../../css/layout.module.css'
import { useAxios } from "../../../global/Axios"
import ProfileImage from '../../../icons/general/profile-avatar.png'

const Profile = (props) => {
    
    const { user, open, setOpen, profileInfo } = useContext(GlobalContext)
    const [myProfile, setMyProfile] = useState(null)
    const api = useAxios()

    useEffect(()=> {
      getMyProfile()
    },[profileInfo])

    const getMyProfile = async () => {
      try {
        if(user != null) {
          let my_profile = await api.get(`api/user/${user.username}`)
          setMyProfile(my_profile.data)
        } else {
          setMyProfile(null)
        } 
      } catch(error) {
        console.log(error)
      }
    }
  
    return (
      <div>
        <img src={myProfile ? myProfile.profile_image : ProfileImage} className={styles.profileImage} onClick={() => setOpen(!open)} />
        {open && props.children}
      </div>
    );
  }

export default Profile