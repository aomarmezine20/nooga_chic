'use client';

import { MOCK_PRODUCTS } from '@/lib/mock-data';
import styles from './page.module.css';

export default function AdminDashboard() {
  const totalProducts = MOCK_PRODUCTS.length;
  const heelsCount = MOCK_PRODUCTS.filter(p => p.category === 'heels').length;
  const bagsCount = MOCK_PRODUCTS.filter(p => p.category === 'bags').length;

  return (
    <div dir="ltr">
      <h1 className="title-large">Tableau de Bord</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Produits</h3>
          <p>{totalProducts}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Talons</h3>
          <p>{heelsCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Sacs</h3>
          <p>{bagsCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Clics WhatsApp (24h)</h3>
          <p>12</p>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Activité Récente</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <span>Il y a 2h</span>
            <span>Un client de <b>Casablanca</b> a cliqué sur WhatsApp.</span>
          </div>
          <div className={styles.activityItem}>
            <span>Il y a 5h</span>
            <span>Un client de <b>Marrakech</b> a cliqué sur WhatsApp.</span>
          </div>
          <div className={styles.activityItem}>
            <span>Hier</span>
            <span>Nouveau produit ajouté: "Sac Noir Minimal"</span>
          </div>
        </div>
      </div>
    </div>
  );
}
