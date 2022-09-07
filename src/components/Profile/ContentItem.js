import VideoThumbnail from '../../icons/general/video-thumbnail.png'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import styles from '../../css/profile.module.css'

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

export default ContentItem