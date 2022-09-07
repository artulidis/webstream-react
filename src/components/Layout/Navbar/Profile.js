import React, { useContext , useEffect } from "react"
import GlobalContext from "../../../global/GlobalContext"
import styles from '../../../css/layout.module.css'
import { useAxios } from "../../../global/Axios"
import ProfileImage from '../../../icons/general/profile-avatar.png'

const Profile = (props) => {
    
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

export default Profile