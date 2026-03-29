'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Heart, Trash2, MessageCircle } from 'lucide-react';
import styles from './page.module.css';

export default function WishlistPage() {
  const t = useTranslations('Product');
  const locale = useLocale() as 'fr' | 'en' | 'ar';
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const remove = (id: string) => {
    const updated = wishlist.filter(w => w !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const handleWhatsApp = (product: any) => {
    const name = product.name[locale];
    const price = product.discountPrice || product.price;
    const msg = `Bonjour Nooga Chic!\nJe souhaite commander: *${name}*\n💰 Prix: ${price} MAD\n📍 Merci de me contacter.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!mounted) return null;

  const items = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <Heart size={60} strokeWidth={1} style={{ color: '#ddd', marginBottom: 20 }} />
        <h2 className={styles.emptyTitle}>
          {locale === 'fr' ? 'Votre liste de souhaits est vide' : 
           locale === 'ar' ? 'قائمة الرغبات فارغة' : 'Your wishlist is empty'}
        </h2>
        <p className={styles.emptySub}>
          {locale === 'fr' ? 'Explorez notre boutique et ajoutez des articles.' :
           locale === 'ar' ? 'تصفحي متجرنا وأضيفي مقالات.' :
           'Explore our store and save your favorite pieces.'}
        </p>
        <Link href="/boutique" className="btn" style={{ width: 'auto', marginTop: 24 }}>
          {locale === 'fr' ? 'DÉCOUVRIR LA BOUTIQUE' : locale === 'ar' ? 'استكشفي المتجر' : 'EXPLORE STORE'}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'fr' ? 'Mes Favoris' : locale === 'ar' ? 'مفضلتي' : 'My Wishlist'}
        </h1>
        <span className={styles.count}>{items.length} {locale === 'ar' ? 'منتج' : 'article(s)'}</span>
      </div>

      <div className={styles.grid}>
        {items.map(product => {
          const name = product.name[locale];
          const price = product.discountPrice || product.price;

          return (
            <div key={product.id} className={styles.card}>
              <Link href={`/produit/${product.id}`} className={styles.imageWrapper}>
                <Image
                  src={product.images[0]}
                  alt={name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {product.isNew && <span className={styles.badge}>NEW</span>}
                {product.isPromo && <span className={`${styles.badge} ${styles.badgePromo}`}>SALE</span>}
              </Link>

              <div className={styles.info}>
                <p className={styles.category}>{product.category}</p>
                <Link href={`/produit/${product.id}`}>
                  <p className={styles.name}>{name}</p>
                </Link>
                <p className={styles.price}>{price} MAD</p>

                <div className={styles.actions}>
                  <button
                    className={styles.whatsappBtn}
                    onClick={() => handleWhatsApp(product)}
                    aria-label="Order on WhatsApp"
                  >
                    <MessageCircle size={16} strokeWidth={1.5} />
                    <span>{t('commander')}</span>
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => remove(product.id)}
                    aria-label="Remove"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
