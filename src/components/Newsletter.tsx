'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('success');
    setEmail('');
    
    // Simulate API delay
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('newsletter')}</h2>
        
        {status === 'success' ? (
          <div className={styles.success}>
            {locale === 'ar' ? 'شكراً لاشتراككم!' : 
             locale === 'fr' ? 'Merci pour votre inscription !' : 
             'Thank you for subscribing!'}
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder={t('newsletterPlaceholder')} 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>{t('subscribe')}</button>
          </form>
        )}
      </div>
    </section>
  );
}
