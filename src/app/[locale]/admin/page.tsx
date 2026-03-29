'use client';

import { useEffect, useState } from 'react';
import AnalyticsStats from '@/components/admin/AnalyticsStats';
import PerformanceChart from '@/components/admin/PerformanceChart';
import styles from './page.module.css';
import { MousePointer2, TrendingUp, AlertCircle, ShoppingBag } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics');
        const json = await res.json();
        
        // Mock data if empty for demo purposes
        if (!json.stats || json.stats.totalVisits === 0) {
          setData(getMockData());
        } else {
          setData(json);
        }
      } catch (err) {
        setData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Chargement du tableau de bord...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tableau de Bord</h1>
      
      <AnalyticsStats data={data.stats} />

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Évolution de l'Activité</h2>
            <PerformanceChart data={data.chartData} type="line" />
          </div>

          <div className={styles.card} style={{ marginTop: '30px' }}>
            <h2 className={styles.cardTitle}>Ventes par Produit (Simulation)</h2>
            <PerformanceChart data={data.topProducts} type="bar" />
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Smart Insights</h2>
            <div className={styles.insights}>
              <div className={styles.insightItem}>
                <TrendingUp size={16} color="#28a745" />
                <p>Le produit <b>{data.stats.mostClicked}</b> est en tendance cette semaine.</p>
              </div>
              <div className={styles.insightItem}>
                <MousePointer2 size={16} color="#000" />
                <p>Votre taux de conversion est de <b>{data.stats.conversionRate.toFixed(1)}%</b> aujourd'hui.</p>
              </div>
              <div className={styles.insightItem}>
                <AlertCircle size={16} color="#e53e3e" />
                <p>Certains produits n'ont encore aucun clic. <b>Optimisez vos tags.</b></p>
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ marginTop: '30px' }}>
            <h2 className={styles.cardTitle}>Activité Récente</h2>
            <div className={styles.activityList}>
              {data.recentActivity.map((activity: any) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.time}>
                    {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={styles.text}>
                    Commande WhatsApp pour <b>{activity.product}</b> {activity.size ? `(Taille: ${activity.size})` : ''}
                  </div>
                </div>
              ))}
              {data.recentActivity.length === 0 && (
                <p className={styles.empty}>Aucune activité récente.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMockData() {
  return {
    stats: {
      totalProducts: 12,
      totalClicks: 24,
      totalVisits: 145,
      conversionRate: 16.5,
      mostClicked: "Escarpin Gold Chic"
    },
    topProducts: [
      { name: "Escarpin Gold Chic", clicks: 12 },
      { name: "Sac Cuir Minimal", clicks: 8 },
      { name: "Sandale Glam Noir", clicks: 5 },
      { name: "Sac Rouge Passion", clicks: 3 },
      { name: "Heels Velvet", clicks: 2 }
    ],
    chartData: [
      { name: 'Lun', visits: 10, clicks: 2 },
      { name: 'Mar', visits: 25, clicks: 5 },
      { name: 'Mer', visits: 15, clicks: 3 },
      { name: 'Jeu', visits: 45, clicks: 12 },
      { name: 'Ven', visits: 30, clicks: 8 },
      { name: 'Sam', visits: 55, clicks: 18 },
      { name: 'Dim', visits: 40, clicks: 15 },
    ],
    recentActivity: [
      { id: '1', time: new Date().setHours(new Date().getHours() - 1), product: "Escarpin Gold Chic", size: 38 },
      { id: '2', time: new Date().setHours(new Date().getHours() - 3), product: "Sac Cuir Minimal" },
      { id: '3', time: new Date().setHours(new Date().getHours() - 5), product: "Sandale Glam Noir", size: 37 },
      { id: '4', time: new Date().setHours(new Date().getHours() - 12), product: "Escarpin Gold Chic", size: 39 },
      { id: '5', time: new Date().setHours(new Date().getHours() - 24), product: "Heels Velvet", size: 40 }
    ]
  };
}
