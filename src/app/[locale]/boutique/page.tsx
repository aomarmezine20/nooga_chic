import ProductCard from '@/components/ProductCard';
import SectionHeader from '@/components/SectionHeader';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import styles from './page.module.css';

export default async function Boutique({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category: categoryFilter, sort } = await searchParams;
  const t = await getTranslations('Filters');
  const th = await getTranslations('Header');

  let filteredProducts = categoryFilter 
    ? MOCK_PRODUCTS.filter(p => p.category === categoryFilter)
    : MOCK_PRODUCTS;

  if (sort === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sort === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  }

  return (
    <div className="container section">
      <SectionHeader 
        title={th('shop')} 
        subtitle={`${filteredProducts.length} produits trouvés`}
        center={false}
      />

      <div className={styles.controls}>
        <div className={styles.filters}>
          <Link href="/boutique" className={!categoryFilter ? styles.activeFilter : ''}>{t('all')}</Link>
          <Link href="/boutique?category=heels" className={categoryFilter === 'heels' ? styles.activeFilter : ''}>{th('heels')}</Link>
          <Link href="/boutique?category=bags" className={categoryFilter === 'bags' ? styles.activeFilter : ''}>{th('bags')}</Link>
        </div>

        <div className={styles.sorting}>
          <Link href={`/boutique?category=${categoryFilter || ''}&sort=price-asc`}>↑ Prix</Link>
          <Link href={`/boutique?category=${categoryFilter || ''}&sort=price-desc`}>↓ Prix</Link>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
