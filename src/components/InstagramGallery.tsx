import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './InstagramGallery.module.css';
import SectionHeader from './SectionHeader';

export default function InstagramGallery() {
  const t = useTranslations('Home');
  const images = [
    '/images/hero.png',
    '/images/gold_heels.png',
    '/images/bags_cat.png',
    '/images/heels_cat.png',
    '/images/hero.png',
    '/images/bags_cat.png'
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionHeader 
          title={t('instagram')} 
          subtitle={t('instagramSubtitle')}
        />
        <div className={styles.gallery}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.item}>
              <Image src={img} alt={`Social ${idx}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div className={styles.overlay}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
