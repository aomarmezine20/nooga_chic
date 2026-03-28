import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import SectionHeader from '@/components/SectionHeader';
import Newsletter from '@/components/Newsletter';
import InstagramGallery from '@/components/InstagramGallery';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import styles from './page.module.css';

export default function Home() {
  const t = useTranslations('Home');
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew);
  const hotDeals = MOCK_PRODUCTS.filter(p => p.isPromo);

  return (
    <div className={styles.container}>
      <Hero />
      
      <CategoryGrid />

      <section className="section container">
        <SectionHeader 
          title={t('newArrivals')} 
          subtitle={t('newArrivalsSubtitle')}
        />
        <div className={styles.grid}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.lookbookSection}>
        <div className={styles.lookbookBanner}>
          <div className={styles.lookbookContent}>
            <span className={styles.label}>{t('lookbook')}</span>
            <h2 className={styles.heading}>{t("artDeL'Elegance")}</h2>
            <p className={styles.text}>{t('lookbookDesc')}</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeader 
          title={t('bestSellers')} 
          subtitle={t('bestSellersSubtitle')}
        />
        <div className={styles.grid}>
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {hotDeals.length > 0 && (
        <section className={`${styles.hotDeals} section`}>
          <div className="container">
            <SectionHeader 
              title={t('hotDeals')} 
              subtitle={t('hotDealsSubtitle')}
            />
            <div className={styles.grid}>
              {hotDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <InstagramGallery />
      <Newsletter />
    </div>
  );
}
