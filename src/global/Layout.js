import React from 'react'
import styles from '../css/layout.module.css'
import Navbar from '../components/Layout/Navbar/Navbar'
import {ReactComponent as NotificationIcon} from '../icons/general/notification-icon.svg'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Layout/Sidebar/Sidebar'
import Profile from '../components/Layout/Navbar/Profile'
import DropdownMenu from '../components/Layout/Navbar/DropdownMenu'

const Layout = () => {

  return (
    <div>
    <Navbar>
        <h1>ak streaming</h1>
        <NotificationIcon className={styles.notificationIcon}/>
        <Profile>
            <DropdownMenu></DropdownMenu>
        </Profile>
    </Navbar>

    <Sidebar />

    <Outlet/>
    </div>
  )
}

export default Layout
