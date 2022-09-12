import React, {useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../css/profile.module.css'
import { useAxios } from '../../global/Axios'
import GlobalContext from '../../global/GlobalContext'
import ContentItem from './ContentItem'

const ProfileContent = (props) => {

    const {user, profileContent, setProfileContent, profileInfo} = useContext(GlobalContext)
    const api = useAxios()
    const params = useParams()


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
