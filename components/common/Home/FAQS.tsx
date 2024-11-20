import React from 'react';
import styles from '@/styles/FAQS.module.css';

const FAQs: React.FC = () => {
    return (
           <div className={styles.container}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>Quizzy FAQs</h1>
            </div>
            <div className={styles.faqsContainer}>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>What is Quizzy all about?</h2>
                    <p className={styles.answer}>
                        Quizzy is your ultimate trivia playground! Dive into a world of quizzes that challenge your brain and tickle your funny bone. Get ready to flex those mental muscles!
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>How do I start a quiz?</h2>
                    <p className={styles.answer}>
                        Simply click on the 'Quizzes' section, pick your poison, and let the fun begin! It's as easy as pie, and way more delicious!
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>Can I compete it individually?</h2>
                    <p className={styles.answer}>
                        Absolutely! Challenge your pals and see who reigns supreme in the trivia arena. May the best brain win!
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>Are there prizes for winners?</h2>
                    <p className={styles.answer}>
                        Oh,NO, you bet! Glory, bragging rights, and maybe even a virtual trophy await the champions. Get ready to bask in your glory!
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>Is it free to play?</h2>
                    <p className={styles.answer}>
                        Yes, indeed! Quizzy is free, fun, and fabulously addictive. Dive in without spending a dime!
                    </p>
                </div>
            </div>
        </div>

    );
};

export default FAQs;
