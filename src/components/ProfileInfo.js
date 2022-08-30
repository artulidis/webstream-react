import React, {useContext, useEffect, useState} from 'react'
import styles from '../css/profile.module.css'
import { api } from '../api/axios'
import GlobalContext from '../context/GlobalContext'

const ProfileInfo = () => {

  const { user } = useContext(GlobalContext)
  const [profileInfo, setProfileInfo] = useState(null)

  useEffect(() => {
    getProfileInfo()
  },[])

  const getProfileInfo = () => {
    let response = api.get(`/api/user/${user.username}`)
    console.log(response.data)
  }

  return (
    <div className={styles.profileInfo}>
        <div className={styles.profileInfoTop}>
            <h4 className={styles.usernameLabel}>artulidis_1113</h4>
            <button className={styles.editProfile}>Edit profile</button>
        </div>
        
        <div className={styles.statContainer}>
            <div><h4>22</h4><span>posts</span></div>
            <div><h4>748</h4><span>followers</span></div>
            <div><h4>137</h4><span>following</span></div>
        </div>

        <div className={styles.bioContainer}>
            <h4 className={styles.fullName}>Arthur Kakulidis</h4>
            <p className={styles.bio}>Jack of all trades, master of none, the saying goes. But it is culturally telling that we have chopped off the ending</p>
        </div>
    </div>
  )
}

export default ProfileInfo
