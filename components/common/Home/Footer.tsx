import React from 'react';
import styles from '@/styles/Footer.module.css';

export const Footer = () => {
    return (
        <>
            <div className={styles.footerMainContainer}>
                <div className={styles.footAboveContainer}>
                    <div className={styles.aboveFooterText}>
                        Top educators and institutions choose Quizzy to create quizzes
                    </div>
                    <div className={styles.clientsListContainer}>
                        <div className={styles.clientsLogo}>
                            <img src="https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg" alt="clientsLogo" />
                        </div>

                        <div className={styles.clientsLogo}>
                            <img src="https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg" alt="clientsLogo" />
                        </div>
                        <div className={styles.clientsLogo}>
                            <img src="https://cms-images.udemycdn.com/content/ocud9ia7cf/svg/vimeo_logo.svg" alt="clientsLogo" />
                        </div>

                        <div className={styles.clientsLogo}>
                            <img src="https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg" alt="clientsLogo" />
                        </div>

                    </div>
                </div>

                <div className={styles.footerBelowContainer}>
                    <div className={styles.footerSubContainer}>
                        <div className={styles.footerSubContainerItem}>QuizMasters</div>
                        <div className={styles.footerSubContainerItem}>Create Your Quiz</div>
                        <div className={styles.footerSubContainerItem}>About us</div>
                        <div className={styles.footerSubContainerItem}>Contact us</div>
                    </div>

                    <div className={styles.footerSubContainer}>
                        <div className={styles.footerSubContainerItem}>Careers</div>
                        <div className={styles.footerSubContainerItem}>Blog</div>
                        <div className={styles.footerSubContainerItem}>Help and Support</div>
                    </div>
                    <div className={styles.footerSubContainer}>
                        <div className={styles.footerSubContainerItem}>Terms of Service</div>
                        <div className={styles.footerSubContainerItem}>Privacy Policy</div>
                        <div className={styles.footerSubContainerItem}>Accessibility</div>
                    </div>
                </div>
            </div>
        </>
    );
};
