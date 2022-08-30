import React from 'react'
import ProfilePicture from '../icons/profile-picture.png'
import styles from '../css/profile.module.css'
import ProfileContent from '../components/ProfileContent'
import ProfileInfo from '../components/ProfileInfo'


const ProfilePage = () => {
  return (
    <div>
      <img src={ProfilePicture} className={styles.profilePicture} />

        <ProfileInfo/>

        <ProfileContent />

    </div>
  )
}

export default ProfilePage
