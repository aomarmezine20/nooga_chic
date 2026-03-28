'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useTranslations, useLocale } from 'next-intl';
import { WHATSAPP_NUMBER, INSTAGRAM_LINK, STORE_TAGLINE } from '@/lib/constants';

export default function AdminSettings() {
  const t = useTranslations('Admin');
  const locale = useLocale();
  const [whatsapp, setWhatsapp] = useState(WHATSAPP_NUMBER);
  const [instagram, setInstagram] = useState(INSTAGRAM_LINK);
  const [tagline, setTagline] = useState(STORE_TAGLINE);

  const handleSave = () => {
    alert(locale === 'ar' ? 'تم الحفظ بنجاح' : 'Paramètres sauvegardés');
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="title-large">{t('settings')}</h1>

      <div className={styles.formCard}>
        <div className={styles.field}>
          <label>WhatsApp</label>
          <input 
            type="text" 
            value={whatsapp} 
            onChange={(e) => setWhatsapp(e.target.value)} 
          />
        </div>

        <div className={styles.field}>
          <label>Instagram URL</label>
          <input 
            type="text" 
            value={instagram} 
            onChange={(e) => setInstagram(e.target.value)} 
          />
        </div>

        <div className={styles.field}>
          <label>{t('brand')}</label>
          <input 
            type="text" 
            value={tagline} 
            onChange={(e) => setTagline(e.target.value)} 
          />
        </div>

        <div className={styles.field}>
          <label>{t('description')}</label>
          <textarea 
            rows={5}
            defaultValue={`Bonjour, je veux commander...`}
          />
        </div>

        <button className={`btn ${styles.submitBtn}`} onClick={handleSave}>{t('save')}</button>
      </div>
    </div>
  );
}
