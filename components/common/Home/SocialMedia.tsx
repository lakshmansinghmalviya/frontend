import React from 'react';
import styles from '@/styles/SocialMedia.module.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const SocialMedia: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Join the Quiz Revolution!</h1>
            <div className={styles.iconsCotainer}>

                <div className={styles.iconCard}>
                    <FacebookIcon style={{ ...iconStyle, color: '#0862F7' }} />
                </div>
                <div className={styles.iconCard}>
                    <TwitterIcon style={{ ...iconStyle, color: '#1C96E8' }} />
                </div>
                <div className={styles.iconCard}>
                    <InstagramIcon style={{ ...iconStyle, color: '#F70272' }} />
                </div>
                <div className={styles.iconCard}>
                    <LinkedInIcon style={{ ...iconStyle, color: '#0077AF' }} />
                </div>
                <div className={styles.iconCard}>
                    <YouTubeIcon style={{ ...iconStyle, color: '#FF0000', }} />
                </div>
            </div>
        </div>
    );
};
const iconStyle = {
    padding: '10px',
    fontSize: '50px',
    backgroundColor: '#F4F4F9',
    borderRadius: '30px'
}

export default SocialMedia;
