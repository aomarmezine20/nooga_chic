'use client';

import { Link } from '@/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import styles from './ProductCard.module.css';
import { Product } from '@/lib/mock-data';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/use-wishlist';
import { trackInteraction } from '@/lib/analytics';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as 'fr' | 'en' | 'ar';
  const t = useTranslations('Product');
  const { toggle, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const name = product.name[locale];
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <Link 
      href={`/produit/${product.id}`} 
      className={styles.card}
      onClick={() => trackInteraction('VISIT', product.id)}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={mainImage} 
          alt={name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
        <Image 
          src={hoverImage} 
          alt={name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${styles.image} ${styles.hoverImage}`}
        />
        
        <button 
          className={`${styles.wishlistBtn} ${isFavorite ? styles.isFavorite : ''}`}
          onClick={handleWishlist}
          aria-label="Ajouter aux favoris"
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} strokeWidth={1.2} />
        </button>

        <div className={styles.tags}>
          {product.isNew && <span className={`${styles.tag} ${styles.tagNew}`}>{t('new')}</span>}
          {product.isHot && <span className={`${styles.tag} ${styles.tagHot}`}>{t('hot')}</span>}
          {product.isPromo && <span className={`${styles.tag} ${styles.tagPromo}`}>{t('sale')}</span>}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.category}>{product.category === 'heels' ? 'Talons' : 'Sacs'}</p>
        </div>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.priceContainer}>
          {product.discountPrice ? (
            <>
              <span className={styles.oldPrice}>{product.price} MAD</span>
              <span className={styles.discountPrice}>{product.discountPrice} MAD</span>
            </>
          ) : (
            <span className={styles.price}>{product.price} MAD</span>
          )}
        </div>
      </div>
    </Link>
  );
}
