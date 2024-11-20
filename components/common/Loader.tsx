import React from 'react'
import styles from '@/styles/Loader.module.css'

const Loader = () => {
    return (
        <div className={styles.loader}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
        </div>
    )
}

export default Loader