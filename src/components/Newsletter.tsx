'use client';

import { useTranslations } from 'next-intl';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const t = useTranslations('Home');

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('newsletter')}</h2>
        <form className={styles.form} onClick={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder={t('newsletterPlaceholder')} 
            className={styles.input}
          />
          <button className={styles.button}>{t('subscribe')}</button>
        </form>
      </div>
    </section>
  );
}
