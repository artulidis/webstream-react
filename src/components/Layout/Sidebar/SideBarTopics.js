import axios from 'axios'
import React, {useEffect, useState} from 'react'
import styles from '../../../css/layout.module.css'

const SideBarTopics = () => {

    const [topics, setTopics] = useState([])

    useEffect(() => {
      getTopics()
    },[])

    const getTopics = async () => {
      let response = await axios.get('http://127.0.0.1:8000/api/topics/')
      setTopics(response.data) 
    }

  return (
    <div className={styles.topicsContainer}>
    {
        topics.map((topic, index) => (
            <h4 key={index} className={styles.topic}>#{topic?.name}</h4>
        ))
    }
    </div>
  )
}

export default SideBarTopics
