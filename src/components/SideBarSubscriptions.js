import React, {useState} from 'react'
import styles from '../css/app.module.css'
import ProfileImage from '../icons/profile-picture.png'

const SideBarSubscriptions = () => {

  const [subscribtions, setSubscriptions] = useState([1,2,3,4,5,6])

  return (
    <div className={styles.subscriptionContainer}>
    {
        subscribtions.map((subscription, index)=> (
            <div key={index} className={styles.subscription}>
                <img src={ProfileImage} className={styles.subscriptionProfilePicture}/>
                <h4>jekulidi894</h4>
            </div>
        ))
    }
    </div>
  )
}

export default SideBarSubscriptions
