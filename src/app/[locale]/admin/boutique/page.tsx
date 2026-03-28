'use client';

import { useState } from 'react';
import styles from '../produits/nouveau/page.module.css';
import { useRouter } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function AdminStorefront() {
  const router = useRouter();
  const t = useTranslations('Admin');
  const locale = useLocale();
  
  const [heroImage, setHeroImage] = useState('/images/hero.png');
  const [promoBanner, setPromoBanner] = useState('/images/hero.png');
  const [tagline, setTagline] = useState('Élégance au quotidien');

  const handleSave = () => {
    alert(locale === 'fr' ? 'Enregistré !' : 'Saved!');
  };

  const handleImageChange = (setter: (val: string) => void) => {
    const newVal = prompt('URL:', '/images/hero.png');
    if (newVal) setter(newVal);
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="title-large">{t('storefront')}</h1>

      <div className={styles.formCard}>
        <div className={styles.sectionHeader}>Bannière Principale (Hero)</div>
        <div className={styles.imageGallery}>
          <div className={styles.imagePreview} style={{ width: '100%', height: '200px' }}>
            <img src={heroImage} alt="Hero" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handleImageChange(setHeroImage)}>{t('edit')}</button>
        </div>

        <div className={styles.field}>
          <label>Texte d'accroche (Tagline)</label>
          <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} />
        </div>

        <div className={styles.sectionHeader}>Bannière Lookbook</div>
        <div className={styles.imageGallery}>
          <div className={styles.imagePreview} style={{ width: '100%', height: '200px' }}>
            <img src={promoBanner} alt="Lookbook" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handleImageChange(setPromoBanner)}>{t('edit')}</button>
        </div>

        <div className={styles.sectionHeader}>Réseaux Sociaux & Contact</div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>WhatsApp</label>
            <input type="text" placeholder="+212 ..." />
          </div>
          <div className={styles.field}>
            <label>Instagram URL</label>
            <input type="text" placeholder="https://..." />
          </div>
        </div>

        <div className={styles.actions}>
          <button className="btn" onClick={handleSave}>{t('save')}</button>
          <button className="btn btn-secondary" onClick={() => router.back()}>{t('cancel')}</button>
        </div>
      </div>
    </div>
  );
}
