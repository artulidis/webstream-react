import React from 'react'
import styles from '../css/profile.module.css'
import ProfileContent from '../components/ProfileContent'
import ProfileInfo from '../components/ProfileInfo'


const ProfilePage = () => {
  return (
    <div>
        <ProfileInfo/>

        <ProfileContent />
    </div>
  )
}

export default ProfilePage
