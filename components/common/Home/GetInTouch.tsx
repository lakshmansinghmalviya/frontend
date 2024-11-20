import React from 'react';
import styles from '@/styles/GetInTouch.module.css';

const GetInTouch = () => {
  return (
    <div className={styles.contactForm}>
      <div>
        <form>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Name" className={`${styles.inputField} ${styles.nameField}`} />
            <input type="email" placeholder="Email" className={`${styles.inputField} ${styles.emailField}`} />
          </div>
          <div className={styles.textareaField}>
            <div>
              <textarea placeholder="Message" className={`${styles.inputField}`}>
              </textarea>
            </div>
            <div>
              <button type="submit" className={styles.submitBtn}>Send It!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
