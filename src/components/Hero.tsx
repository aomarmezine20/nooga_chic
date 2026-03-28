import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';
import { Link } from '@/navigation';

export default function Hero() {
  const t = useTranslations('Hero');
  const h = useTranslations('Home');

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('tagline')}</h1>
          <p className={styles.subtitle}>{h('heroSubtitle')}</p>
          <Link href="/boutique" className="btn">{h('discoverCollection')}</Link>
        </div>
      </div>
    </section>
  );
}
