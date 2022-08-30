import React from 'react'
import styles from '../css/login.module.css'
import { ReactComponent as PlusIcon } from '../icons/plus-icon.svg'

const RegisterForm = () => {
  return (
    <div className={styles.registerFormContainer}>
      <div className={styles.registerTopForms}>
        <div>
            <label className={styles.registerLabel}>full name</label>
            <input className={styles.registerInput}></input>
        </div>

        <div>
            <label className={styles.registerLabel}>username</label>
            <input className={styles.registerInput}></input>
        </div>

        <div>
            <label className={styles.registerLabel}>password</label>
            <input className={styles.registerInput} type={'password'}></input>
        </div>

        <div>
            <label className={styles.registerLabel}>email</label>
            <input className={styles.registerInput}></input>
        </div>
      </div>

    <div className={styles.registerAddAvatar}>
        <label className={styles.registerLabel}>profile picture</label>
        <PlusIcon className={styles.registerAddIcon} />
    </div>

    <div className={styles.registerBio}>
        <label className={styles.registerLabel}>bio:</label>
        <textarea></textarea>
        <button className={styles.registerButton}>Register</button>
    </div>
    </div>
  )
}

export default RegisterForm
