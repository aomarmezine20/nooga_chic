import styles from '@/app/[locale]/admin/page.module.css';
import { ShoppingBag, MousePointer, Target, TrendingUp } from 'lucide-react';

interface StatsProps {
  data: {
    totalProducts: number;
    totalClicks: number;
    totalVisits: number;
    conversionRate: number;
    mostClicked: string;
  }
}

export default function AnalyticsStats({ data }: StatsProps) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconBox}><ShoppingBag size={20} /></div>
          <span>Total Produits</span>
        </div>
        <p className={styles.statValue}>{data.totalProducts}</p>
        <span className={styles.statTrend}>+0% ce mois</span>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconBox}><MousePointer size={20} /></div>
          <span>Clics WhatsApp</span>
        </div>
        <p className={styles.statValue}>{data.totalClicks}</p>
        <span className={styles.statTrend}>Interactions directes</span>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconBox}><Target size={20} /></div>
          <span>Taux Conversion</span>
        </div>
        <p className={styles.statValue}>{data.conversionRate.toFixed(1)}%</p>
        <span className={styles.statTrend}>Visite → Commande</span>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconBox}><TrendingUp size={20} /></div>
          <span>Produit Star</span>
        </div>
        <p className={styles.statValue}>{data.mostClicked}</p>
        <span className={styles.statTrend}>Le plus populaire</span>
      </div>
    </div>
  );
}
