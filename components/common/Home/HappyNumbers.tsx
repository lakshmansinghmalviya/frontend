import React from 'react'
import styles from '@/styles/HappyNumbers.module.css'

const HappyNumbers = () => {
    return (

        <div className={styles.happyNumberContainer} >
            <div className={styles.card}>
                <div className={styles.number}>100,000</div>
                <div className={styles.text}>Quizzes Taken</div>
            </div>
            <div className={styles.card}>
                <div className={styles.number}>50,000</div>
                <div className={styles.text}>Happy Users</div>
            </div>
            <div className={styles.card}>
                <div className={styles.number}>100,000</div>
                <div className={styles.text}>Daily Chalenges</div>
            </div>
        </div>
    )
}

export default HappyNumbers