import React from 'react'
import styles from '../css/app.module.css'
import Navbar, { Profile, DropdownMenu } from '../components/Navbar';
import {ReactComponent as NotificationIcon} from '../icons/notification-icon.svg'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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

    <Sidebar>
      
    </Sidebar>

    <Outlet/>
    </div>
  )
}

export default Layout
