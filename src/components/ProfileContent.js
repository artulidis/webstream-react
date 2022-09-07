import React, {useState, useEffect, useContext} from 'react'
import styles from '../css/profile.module.css'
import VideoThumbnail from '../icons/video-thumbnail.png'
import DeleteIcon from '../icons/delete-icon.png'
import EditIcon from '../icons/edit-icon.png'
import GlobalContext from '../context/GlobalContext'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import useAxios from '../api/useAxios'

TimeAgo.addDefaultLocale(en)

const ContentItem = ({post}) => {
    return (
        <div className={styles.contentItem}>
            <img src={VideoThumbnail} className={styles.videoThumbnail} />
            <p className={styles.videoTitle}>{post.name}</p>
            <h5 className={styles.views}>{post.views} views • {<ReactTimeAgo date={Date.parse(post.created)} locale="en-US" />}</h5>

            <div className={styles.tags}>

                {
                    post.topics.map((topic, index) => (
                        <h5 key={index} className={styles.tag}>{topic.name}</h5>
                    ))
                }

            </div>
        </div>
    )
}

const ProfileContent = ({profileProps}) => {

    const {user, userContent, setUserContent} = useContext(GlobalContext)
    const api = useAxios()
    console.log(profileProps)

    useEffect(()=> {
        getUserContent()
      },[])

    const getUserContent = async () => {
    try {
        let videos = await api.get(`/api/videos/${user.user_id}`)
        console.log(videos.data)
        setUserContent(videos.data)
    } 
    catch(error) {
        console.log("SOMETHING WENT WRONG")
    }
    }


  return (
    <div className={styles.profileContent}>
        {
            userContent?.sort((a,b)=> a.created < b.created).map((post, index) => (
                 <ContentItem post={post} key={index} />
            ))
        }
    </div>
  )
}

export default ProfileContent
