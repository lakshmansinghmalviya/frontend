import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import styles from '@/styles/About.module.css';

const About: React.FC = () => {
  return (
    <Container className={styles.aboutContainer}>
      <div>
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <Typography variant="h3" gutterBottom
            sx={{ fontWeight: 'bold', fontSize: '32px' }}
          >
            What <span className={styles.brandName}>Quizzy</span> is ?
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Your Ultimate Trivia Playground!
          </Typography>
        </Box>

        <Box sx={{ marginBottom: '40px' }}>
          <Typography variant="h4" gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph
            fontSize={16}
            className={styles.card}
          >
            Our mission is simple: <strong>to make learning fun and accessible for everyone.</strong> We aim to offer quizzes that challenge your brain, encourage friendly competition, and help you discover new facts along the way. With thousands of quizzes across various topics, you'll always find something to keep you engaged.
          </Typography>
        </Box>

        <Box sx={{ marginBottom: '40px' }}>
          <Typography variant="h4" gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            What We Offer
          </Typography>
          <div className={styles.gridContainer}>
            <div className={styles.gridItem}><Grid item xs={12} sm={6} md={3} className={styles.card}>
              <Typography variant="h6"><b>Diverse Quizzes</b></Typography>
              <Typography variant="body2" fontSize={16} >
                From general knowledge to specialized topics, our quizzes are designed to cater to all interests. our quizzes are designed to cater to all interests.
              </Typography>
            </Grid></div>
            <div className={styles.gridItem}><Grid item xs={12} sm={6} md={3} className={styles.card}>
              <Typography variant="h6"><b>Fun Challenges</b></Typography>
              <Typography variant="body2" fontSize={16}>
                Whether you're competing with friends or challenging yourself, Quizzy provides a competitive but lighthearted space to test your skills.
              </Typography>
            </Grid></div>
            <div className={styles.gridItem}><Grid item xs={12} sm={6} md={3} className={styles.card}>
              <Typography variant="h6"><b>Friendly Competition</b></Typography>
              <Typography variant="body2" fontSize={16}>
                Take on individual challenges or invite your friends to join you and see who tops the leaderboard.
              </Typography>
            </Grid></div>
            <div className={styles.gridItem}><Grid item xs={12} sm={6} md={3} className={styles.card}>
              <Typography variant="h6"><b>Community of Quiz Masters</b></Typography>
              <Typography variant="body2" fontSize={16}>
                Our quizzes are designed by top educators and trivia enthusiasts. Each quiz is crafted with creativity, making sure there's always something new and exciting to explore.
              </Typography>
            </Grid></div>
          </div>

        </Box>
        <Box sx={{ marginBottom: '40px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Meet the Team
          </Typography>

          <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'wrap' }}>

            <Grid item xs={12} sm={6} md={6} lg={6} className={styles.card}
              sx={{
                maxWidth: { xs: '100%', sm: '45%', md: '40%', lg: '40%' },
                marginBottom: '20px'
              }}>
              <Typography variant="h6"><b>Lakshman Malviya</b></Typography>
              <Typography variant="body2" fontSize={16}>
                Co-Founder & Senior Developer
                Lakshman brings his expertise in software development to ensure Quizzy is smooth, fast, and filled with awesome features.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} className={styles.card}
              sx={{
                maxWidth: { xs: '100%', sm: '45%', md: '40%', lg: '40%' },
                marginBottom: '20px'
              }}>
              <Typography variant="h6"><b>Ishaan Ganghgrade</b></Typography>
              <Typography variant="body2" fontSize={16}>
                Co-Founder & Quiz Curator
                Ishaan is the brain behind many of the quizzes you see on Quizzy. His creativity and passion for trivia make sure our content is always fresh and engaging.
              </Typography>
            </Grid>

          </Grid>
        </Box>
        <Box sx={{ marginBottom: '40px' }}>
          <Typography variant="h4" gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Why Quizzy?
          </Typography>
          <Box className={`${styles.benefitsList} ${styles.card}`}>
            <div className={styles.benefitsListItemContainer}>
              <ul>
                <li>
                  <strong>It's Free:</strong> We believe in providing quality content without any barriers. Quizzy is entirely free to use.
                </li>
                <li>
                  <strong>Learn & Have Fun:</strong> Sharpen your knowledge while having a blast. You’ll never realize how much you’ve learned until you're done!
                </li>
                <li>
                  <strong>Compete & Win:</strong> Challenge your friends, family, or even strangers in exciting quiz duels. Bragging rights and fun await!
                </li>
                <li>
                  <strong>Access Anywhere:</strong> With our mobile-friendly platform, you can quiz on the go, at any time.
                </li>
              </ul>
            </div>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default About;
