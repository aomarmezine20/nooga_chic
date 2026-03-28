'use client';

import { MOCK_PRODUCTS } from '@/lib/mock-data';
import styles from './page.module.css';
import { Link } from '@/navigation';
import Image from 'next/image';

export default function AdminProducts() {
  return (
    <div dir="ltr">
      <div className={styles.header}>
        <h1 className="title-large">Gestion des Produits</h1>
        <Link href="/admin/produits/nouveau" className="btn">Ajouter un produit</Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom (FR / EN / AR)</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.map(product => (
              <tr key={product.id}>
                <td>
                  <div className={styles.imgThumbnail}>
                    <Image src={product.images[0]} alt={product.name.fr} width={60} height={80} style={{ objectFit: 'cover' }} />
                  </div>
                </td>
                <td>
                  <div className={styles.nameList}>
                    <span>🇫🇷 {product.name.fr}</span>
                    <span>🇬🇧 {product.name.en}</span>
                    <span dir="rtl">🇲🇦 {product.name.ar}</span>
                  </div>
                </td>
                <td>{product.category === 'heels' ? 'Talons' : 'Sacs'}</td>
                <td>
                  {product.discountPrice ? (
                    <div className={styles.priceCol}>
                      <span className={styles.oldPrice}>{product.price} MAD</span>
                      <span className={styles.promoPrice}>{product.discountPrice} MAD</span>
                    </div>
                  ) : (
                    <span>{product.price} MAD</span>
                  )}
                </td>
                <td>
                  <div className={styles.tagList}>
                    {product.isNew && <span className={styles.tagBadge}>NEW</span>}
                    {product.isHot && <span className={styles.tagBadge}>HOT</span>}
                    {product.isPromo && <span className={styles.tagBadge}>SALE</span>}
                  </div>
                </td>
                <td className={styles.actions}>
                  <Link href={`/admin/produits/modifier/${product.id}`}>Modifier</Link>
                  <button className={styles.deleteBtn} onClick={() => alert('Supprimer non implémenté dans la démo')}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
