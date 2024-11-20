import { useState } from 'react';
import styles from '@/styles/MeetEducators.module.css';
import { User } from '@/types/types';
import { isBase64 } from '@/services/CommonServices';

interface MeetEducatorsProps {
  educators: User[];
}

const MeetEducators: React.FC<MeetEducatorsProps> = ({ educators }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const visibleCards = 4;

  const handleNext = (): void => {
    if (currentIndex < educators.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.educatorContainer}>
      <div className={styles.educatorHeading}>
        <h1>Meet Our QuizMasters</h1>
      </div>
      <div className={styles.carouselContainer}>
        <button onClick={handlePrev} className={styles.navButton} disabled={currentIndex === 0}>‹</button>
        <div className={styles.carouselTrack}>
          <div
            className={styles.carouselCards}
            style={{ transform: `translateX(-${currentIndex * (100 / Math.min(educators.length, visibleCards))}%)` }}
          >
            {educators.map((educator, index) => (
              <div
                key={index}
                className={`${styles.card} ${educators.length < visibleCards ? styles.centeredCard : ''}`}
                style={{ flex: `0 0 ${100 / Math.min(educators.length, visibleCards)}%` }}
              > <img src={isBase64(educator.profilePic)} style={{ width: '200px', height: '200px' }} />
                <h3>{educator.name}</h3>
                <p>{educator.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className={styles.navButton} disabled={currentIndex >= educators.length - visibleCards}>›</button>
      </div>
    </div>
  );
};

export default MeetEducators;