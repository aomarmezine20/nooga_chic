'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import styles from './page.module.css';

export default function ProductPage() {
  const params = useParams();
  const locale = useLocale() as 'fr' | 'en' | 'ar';
  const t = useTranslations('Product');
  
  const id = params.id as string;
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <div className="container section">Produit non trouvé.</div>;
  }

  const name = product.name[locale];
  const description = product.description[locale];

  const handleWhatsAppOrder = async () => {
    if (product.category === 'heels' && !selectedSize) {
      alert(t('selectSize'));
      return;
    }

    const message = `Bonjour Nooga Chic!
Je souhaite commander:
👉 *${name}*
${selectedSize ? `📏 Taille: ${selectedSize}` : ''}
🔢 Quantité: ${quantity}
💰 Prix total: ${ (product.discountPrice || product.price) * quantity } MAD

📍 Merci de me contacter pour la livraison.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div style={{ padding: 0, maxWidth: '100%' }}>
      <div className={styles.productLayout}>
        <div className={styles.galleryContainer}>
          <div className={styles.mainImageWrapper}>
            <div className={styles.mainImage}>
              <Image 
                src={product.images[activeImage]} 
                alt={name} 
                fill 
                className={styles.zoomImage}
                priority
              />
            </div>
            {product.isPromo && <div className={styles.promoBadge}>{t('sale')}</div>}
          </div>
          <div className={styles.thumbnailList}>
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                className={`${styles.thumbnail} ${activeImage === idx ? styles.activeThumbnail : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <Image src={img} alt={`${name} ${idx}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <nav className={styles.breadcrumb}>
            <Link href="/boutique">{t('availability')}</Link> / 
            <span>{name}</span>
          </nav>

          <h1 className={styles.name}>{name}</h1>
          
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

          <div className={styles.divider}></div>
          <p className={styles.description}>{description}</p>

          {product.category === 'heels' && product.sizes && (
            <div className={styles.optionsSection}>
              <h4 className={styles.optionLabel}>{t('size')}</h4>
              <div className={styles.sizeGrid}>
                {product.sizes.map(size => {
                  const isOutOfStock = product.stock ? product.stock[size] === 0 : false;
                  return (
                    <button 
                      key={size}
                      disabled={isOutOfStock}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''} ${isOutOfStock ? styles.outOfStock : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                      {isOutOfStock && <span className={styles.stockLabel}>✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.optionsSection}>
            <h4 className={styles.optionLabel}>{t('qty')}</h4>
            <div className={styles.qtyContainer}>
              <div className={styles.qtyControl}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <span className={styles.availability}>
                <span className={styles.dot}></span> {t('inStock')}
              </span>
            </div>
          </div>

          <button className={styles.cta} onClick={handleWhatsAppOrder}>
            {t('commander')}
          </button>
          
          <div className={styles.extraInfo}>
            <p>{t('deliveryInfo')}</p>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar — Zara style */}
      <div className={styles.stickyBar}>
        <div>
          {product.discountPrice ? (
            <>
              <span className={styles.stickyOldPrice}>{product.price} MAD</span>
              <span className={styles.stickyPrice}>{product.discountPrice} MAD</span>
            </>
          ) : (
            <span className={styles.stickyPrice}>{product.price} MAD</span>
          )}
        </div>
        <button className={styles.stickyBtn} onClick={handleWhatsAppOrder}>
          {t('commander')}
        </button>
      </div>
    </div>
  );
}
