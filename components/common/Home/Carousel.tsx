import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '@/styles/Carousel.module.css';
import { isBase64 } from '@/services/CommonServices';
import { User } from '@/types/types';

interface MeetEducatorsProps {
  educators: User[];
}

const MeetEducators: React.FC<MeetEducatorsProps> = ({ educators }) => {

  const settings = {
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    dots: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>,
  };
  const educator = {
    profilePic: '/addPic.png',
    name: 'John Doe',
    bio: 'This is a bio.',
  }
  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {
          educators.map((educator, index) => (
            <div>
              <div
              > <img src={isBase64(educator.profilePic)} style={{ width: '200px', height: '200px' }} />
                <h3>{educator.name}</h3>
                <p>{educator.bio}</p>
              </div>
            </div>
          ))
        }
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>2</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>3</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>4</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>5</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>6</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>7</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>8</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>9</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>10</h3></div>
        <div><h3 style={{ maxWidth: '200px', minHeight: '250px', textAlign: 'center', backgroundColor: 'red', borderRadius: '10px', border: '2px solid black' }}>10</h3></div>
      </Slider>
    </div>
  );
};

export default MeetEducators;
