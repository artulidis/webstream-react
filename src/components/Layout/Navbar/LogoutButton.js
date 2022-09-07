import React, {useContext} from "react"
import styles from '../../../css/layout.module.css'
import GlobalContext from "../../../global/GlobalContext"

const LogoutButton = () => {

    const {logoutUser} = useContext(GlobalContext)
  
      return (
        <div onClick={logoutUser} className={styles.menuItem}>
          <span>Logout</span>
        </div>
      )
  }

export default LogoutButton