import React, {useEffect, useContext} from 'react'
import styles from '../../css/profile.module.css'
import { useAxios } from '../../global/Axios'
import GlobalContext from '../../global/GlobalContext'
import ContentItem from './ContentItem'

const ProfileContent = () => {

    const {user, profileContent, setProfileContent} = useContext(GlobalContext)
    const api = useAxios()

    useEffect(()=> {
        getProfileContent()
      },[])

    const getProfileContent = async () => {
    try {
        let videos = await api.get(`api/videos/${user.user_id}`)
        console.log(videos.data)
        setProfileContent(videos.data)
    } 
    catch(error) {
        console.log("SOMETHING WENT WRONG")
    }
    }


  return (
    <div className={styles.profileContent}>
        {
            profileContent?.sort((a,b)=> a.created < b.created).map((post, index) => (
                 <ContentItem post={post} key={index} />
            ))
        }
    </div>
  )
}

export default ProfileContent
