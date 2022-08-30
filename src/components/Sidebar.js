import React, { useState, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import styles from '../css/app.module.css'
import SideBarMenu from './SideBarMenu'
import SideBarSubscriptions from './SideBarSubscriptions'
import SideBarTopics from './SideBarTopics'

const Sidebar = () => {

    const {user} = useContext(GlobalContext)

  return (
    <div className={styles.sideBar}>
        <h3>menu</h3>
        <SideBarMenu />
        <div className={styles.sideBarDivider}></div>

       { user ?
        <>
            <h3 className={styles.subscriptionsHeader}>subscribtions</h3>
            <SideBarSubscriptions />
            <div className={styles.topicsDivider}></div>
        </> : null
       }

        <h3>topics</h3>
        <SideBarTopics />
    </div>
  )
}

export default Sidebar
