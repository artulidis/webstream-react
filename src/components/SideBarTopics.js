import React, {useState} from 'react'
import styles from '../css/app.module.css'

const SideBarTopics = () => {

    const [topics, setTopics] = useState([1,2,3,4,5,6,1,2,3,4,5,6])

  return (
    <div className={styles.topicsContainer}>
    {
        topics.map((topic, index) => (
            <h4 key={index} className={styles.topic}>#action</h4>
        ))
    }
    </div>
  )
}

export default SideBarTopics
