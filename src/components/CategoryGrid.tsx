import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
  const t = useTranslations('Home');

  const categories = [
    {
      id: 'heels',
      name: t('shopByCategory'),
      sub: t('heels'),
      image: '/images/heels_cat.png',
      href: '/boutique?category=heels'
    },
    {
      id: 'bags',
      name: t('shopByCategory'),
      sub: t('bags'),
      image: '/images/bags_cat.png',
      href: '/boutique?category=bags'
    }
  ];

  return (
    <section className="section">
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.href} className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <Image 
                src={cat.image} 
                alt={cat.sub} 
                fill 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <span className={styles.categoryName}>{cat.sub}</span>
                <span className={styles.cta}>{t('discover')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
