import React, {useState} from 'react'
import styles from '../css/profile.module.css'
import VideoThumbnail from '../icons/video-thumbnail.png'
import DeleteIcon from '../icons/delete-icon.png'
import EditIcon from '../icons/edit-icon.png'

const ContentItem = ({tags}) => {
    return (
        <div className={styles.contentItem}>
            <img src={VideoThumbnail} className={styles.videoThumbnail} />
            <p className={styles.videoTitle}>Prepare for your first skateboard jump in a very long while!</p>
            <h5 className={styles.views}>53k views • 2 weeks ago</h5>

            <div className={styles.tags}>

                {
                    tags.map((tag, index) => (
                        <h5 key={index} className={styles.tag}>django</h5>
                    ))
                }

            </div>
        </div>
    )
}

const ProfileContent = () => {

    const [userPosts, setUserPosts] = useState([1,2,3,4,5])

  return (
    <div className={styles.profileContent}>
        {
            userPosts.map((post, index) => (
                <ContentItem tags={[1,2]} key={index} />
            ))
        }
    </div>
  )
}

export default ProfileContent
