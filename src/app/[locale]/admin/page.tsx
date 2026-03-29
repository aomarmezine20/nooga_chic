'use client';

import { useEffect, useState } from 'react';
import AnalyticsStats from '@/components/admin/AnalyticsStats';
import PerformanceChart from '@/components/admin/PerformanceChart';
import styles from './page.module.css';
import { MousePointer2, TrendingUp, AlertCircle, Info } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Chargement des données réelles...</div>;
  }

  if (error || !data) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Tableau de Bord</h1>
        <div className={styles.errorBox}>
          <AlertCircle size={40} color="#e53e3e" />
          <p>Impossible de charger les statistiques réelles. Vérifiez votre connexion à la base de données.</p>
        </div>
      </div>
    );
  }

  const hasData = data.stats.totalVisits > 0 || data.stats.totalClicks > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tableau de Bord</h1>
      
      <AnalyticsStats data={data.stats} />

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Évolution de l'Activité (Réelle)</h2>
            {hasData ? (
              <PerformanceChart data={data.chartData} type="line" />
            ) : (
              <div className={styles.emptyState}>
                <Info size={30} />
                <p>En attente de vos premières visites pour générer le graphique...</p>
              </div>
            )}
          </div>

          <div className={styles.card} style={{ marginTop: '30px' }}>
            <h2 className={styles.cardTitle}>Performance par Produit</h2>
            {data.topProducts.length > 0 ? (
              <PerformanceChart data={data.topProducts} type="bar" />
            ) : (
              <div className={styles.emptyState}>
                <p>Aucun clic enregistré sur vos produits pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Insights Business</h2>
            <div className={styles.insights}>
              {hasData ? (
                <>
                  <div className={styles.insightItem}>
                    <TrendingUp size={16} color="#28a745" />
                    <p>Produit le plus vu : <b>{data.stats.mostClicked}</b></p>
                  </div>
                  <div className={styles.insightItem}>
                    <MousePointer2 size={16} color="#000" />
                    <p>Taux de conversion global : <b>{data.stats.conversionRate.toFixed(1)}%</b></p>
                  </div>
                </>
              ) : (
                <div className={styles.insightItem}>
                  <AlertCircle size={16} color="#bbb" />
                  <p>Pas encore assez de données pour générer des insights automatiques.</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.card} style={{ marginTop: '30px' }}>
            <h2 className={styles.cardTitle}>Dernières Interactions</h2>
            <div className={styles.activityList}>
              {data.recentActivity.map((activity: any) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.time}>
                    {new Date(activity.time).toLocaleDateString()} {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={styles.text}>
                    {activity.type === 'WHATSAPP_CLICK' ? 'Commande WhatsApp' : 'Visite'} : <b>{activity.product}</b>
                  </div>
                </div>
              ))}
              {data.recentActivity.length === 0 && (
                <p className={styles.empty}>Aucune activité enregistrée.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
