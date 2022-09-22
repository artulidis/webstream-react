import React from 'react'
import styles from '../../../css/layout.module.css'
import { ReactComponent as CompassIcon } from '../../../icons/sidebar/compass-icon.svg'
import { ReactComponent as WatchListIcon } from '../../../icons/sidebar/watchlist-icon.svg'
import { ReactComponent as ChannelIcon } from '../../../icons/sidebar/channel-icon.svg'
import { ReactComponent as ActivityIcon } from '../../../icons/sidebar/activity-icon.svg'
import { ReactComponent as LikedIcon } from '../../../icons/sidebar/like-icon.svg'

const SideBarMenu = () => {
  return (
    <div className={styles.menuContainer}>
        <div className={styles.sideBarItem}>
            <CompassIcon className={styles.sideBarIcon} />
            <h4 className={styles.sideBarHeader}>Discover</h4>
        </div>

        <div className={styles.sideBarItem}>
            <ChannelIcon className={styles.sideBarIcon} />
            <h4 className={styles.sideBarHeader}>My Channel</h4>
        </div>

        <div className={styles.sideBarItem}>
            <LikedIcon className={styles.sideBarIcon} />
            <h4 className={styles.sideBarHeader}>Liked</h4>
        </div>
    </div>
  )
}

export default SideBarMenu
