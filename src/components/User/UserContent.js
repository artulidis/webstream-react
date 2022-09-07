import React, {useEffect, useContext} from 'react'
import VideoThumbnail from '../../icons/general/video-thumbnail.png'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import styles from '../../css/user.module.css'
import { useAxios } from '../../global/Axios'
import GlobalContext from '../../global/GlobalContext'



TimeAgo.addDefaultLocale(en)

const ContentItem = ({post}) => {
    return (
        <div className={styles.contentItem}>
            <img src={VideoThumbnail} alt='video-thumbnail' className={styles.videoThumbnail} />
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

const UserContent = ({profileProps}) => {

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

export default UserContent
