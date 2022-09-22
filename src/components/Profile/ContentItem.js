import VideoThumbnail from '../../icons/general/video-thumbnail.png'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import styles from '../../css/profile.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import GlobalContext from '../../global/GlobalContext'
import ContentEditButtons from './ContentEditButtons'

TimeAgo.addDefaultLocale(en)

const ContentItem = ({post}) => {

    const { isEdit } = useContext(GlobalContext)

    return (
        <div className={styles.contentItemContainer}>
            {isEdit ? <ContentEditButtons post={post} /> : null}
            <Link to={`/videos/${post.user}/${post.id}`} className={styles.contentItemLink}>
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
            </Link>
        </div>
    )
}

export default ContentItem