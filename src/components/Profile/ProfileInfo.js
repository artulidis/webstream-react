import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../css/profile.module.css'
import { useAxios } from '../../global/Axios'
import GlobalContext from '../../global/GlobalContext'
import ProfileImage from './ProfileImage'

const ProfileInfo = (props) => {

  const { user, profile_image, profileContent, isEdit, setIsEdit, profileInfo, setProfileInfo, getProfileInfo } = useContext(GlobalContext)
  const api = useAxios()
  const params = useParams()

  const [formData, setFormData] = useState({
    username: null,
    full_name: null,
    bio: null
  })

  useEffect(()=> {
    setFormData({
      username: profileInfo?.username,
      full_name: profileInfo?.full_name,
      bio: profileInfo?.bio
    })
  },[profileInfo])

  const handleProfileEdit = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    if(!isEdit) {
      setIsEdit(!isEdit)
    } else {
      e.preventDefault()
      let response = await api.putForm(`/api/user/${user.username}`, {
        "username": formData.username,
        "password": profileInfo?.password,
        "email": profileInfo?.email,
        "full_name": formData.full_name,
        "profile_image": profile_image,
        "followers": profileInfo?.followers,
        "following": profileInfo?.following,
        "bio": formData.bio
      })
      if(response.status === 200) {
        props.getProfile()
        setIsEdit(!isEdit)
      }
    }
  }


  return (
    <>
      <ProfileImage />
      <div className={styles.profileInfo}>
          <div className={styles.profileInfoTop}>
              <h4 className={styles.usernameLabel}>{profileInfo?.username}</h4> 
              {profileInfo?.username === user?.username ? <button className={!isEdit ? styles.editProfile : styles.editProfileEdit} onClick={(e)=> handleSubmit(e)}>{!isEdit ? 'Edit Profile' : 'Apply'}</button> : null}
          </div>
          
          <div className={styles.statContainer}>
              <div><h4>{profileContent ? profileContent.length : 0}</h4><span>posts</span></div>
              <div><h4>{profileInfo?.followers}</h4><span>followers</span></div>
              <div><h4>{profileInfo?.following}</h4><span>following</span></div>
          </div>

          <div className={styles.bioContainer}>
              { !isEdit ? <h4 className={styles.fullName}>{`${profileInfo?.full_name} `}</h4> : <input name='full_name' value={formData.full_name} className={styles.fullNameEdit} onChange={(e)=> handleProfileEdit(e)}/>}
              {!isEdit ? <p className={styles.bio}>{profileInfo?.bio}</p> : <textarea name='bio' value={formData.bio} className={styles.bioEdit} onChange={(e)=> handleProfileEdit(e)} />}
          </div>
      </div>
    </>
  )
}

export default ProfileInfo
