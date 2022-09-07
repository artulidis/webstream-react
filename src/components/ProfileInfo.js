import React, {useContext, useEffect, useState} from 'react'
import styles from '../css/profile.module.css'
import useAxios from '../api/useAxios'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'

const ProfileInfo = () => {

  const { user, userContent, profileInfo, setProfileInfo } = useContext(GlobalContext)
  const api = useAxios()

  const [isEdit, setIsEdit] = useState(false)
  const [isImageSelected, setIsImageSelected] = useState(false)
  const [imageSelected, setImageSelected] = useState('')
  const [profile_image, setProfile_Image] = useState(null)
  const [formData, setFormData] = useState({
    username: null,
    full_name: null,
    bio: null
  })

  const ProfileImage = () => {

    const handleImageUpload = (e) => {
      if(e.target.files[0]) {
        let reader = new FileReader()
  
        reader.onload = (reader) => {
          setImageSelected(reader.target.result)
        }
        setProfile_Image(e.target.files[0])
        console.log(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
        setIsImageSelected(true)
      }
    }
  
    if(isEdit) {
      return (
        <div className={styles.registerAddAvatar}>
          <label className={styles.registerImageLabel} htmlFor={'image-input'}>
            {isImageSelected ? <img src={imageSelected} className={styles.profilPictureEdit} /> : <img src={profileInfo?.profile_image} className={!isEdit ? styles.profilePicture : styles.profilPictureEdit} />}
          </label>
          <input name={'profile_image'} id='image-input' type='file' accept='image/*' onChange={(e) => handleImageUpload(e)}></input>
        </div>
      )
    }
  
  return (
    <img src={profileInfo?.profile_image} className={!isEdit ? styles.profilePicture : styles.profilPictureEdit} />
  )
}

  useEffect(()=> {
    getProfileInfo()
  },[])

  useEffect(()=> {
    setFormData({
      username: profileInfo?.username,
      full_name: profileInfo?.full_name,
      bio: profileInfo?.bio
    })
  },[profileInfo])

  const getProfileInfo = async () => {
    try {
      let profile_content = await api.get(`/api/user/${user.username}`)
      setProfileInfo(profile_content.data)
    } catch(error) {
      console.log(error)
    }
  }

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
        getProfileInfo()
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
            <button className={!isEdit ? styles.editProfile : styles.editProfileEdit} onClick={(e)=> handleSubmit(e)}>{!isEdit ? 'Edit Profile' : 'Apply'}</button>
        </div>
        
        <div className={styles.statContainer}>
            <div><h4>{userContent ? userContent.length : 0}</h4><span>posts</span></div>
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
