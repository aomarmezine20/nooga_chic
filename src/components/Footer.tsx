import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import styles from './Footer.module.css';
import { STORE_NAME, INSTAGRAM_LINK } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>{STORE_NAME}</h2>
          <p className={styles.manifesto}>{t('manifesto')}</p>
          <p className={styles.copyright}>© {new Date().getFullYear()} {STORE_NAME}. {t('allRightsReserved')}.</p>
          <Link href="/admin/login" className={styles.adminLink}>Connexion</Link>
        </div>
        
        <div className={styles.linksCols}>
          <div className={styles.links}>
            <h3>{t('help')}</h3>
            <Link href="/">{t('shipping')}</Link>
            <Link href="/">{t('returns')}</Link>
            <Link href="/">{t('contact')}</Link>
          </div>

          <div className={styles.links}>
            <h3>{t('social')}</h3>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TikTok</a>
          </div>
          
          <div className={styles.links}>
            <h3>{t('legal')}</h3>
            <Link href="/">{t('privacy')}</Link>
            <Link href="/">{t('terms')}</Link>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.paymentIcons}>
          <span>🇲🇦 {t('morocco')}</span>
          <div className={styles.dot}></div>
          <span>{t('cod')}</span>
        </div>
      </div>
    </footer>
  );
}
