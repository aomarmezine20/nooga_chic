'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { useTranslations, useLocale } from 'next-intl';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Admin');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin && pathname !== '/admin/login') {
      router.replace('/admin/login');
    } else if (isAdmin || pathname === '/admin/login') {
      setIsLogged(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.replace('/');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isLogged) return <div style={{ background: '#fff', height: '100vh', width: '100vw' }}></div>;

  return (
    <div className={styles.adminContainer} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>{t('brand')}</div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={pathname === '/admin' ? styles.active : ''}>
            {t('dashboard')}
          </Link>
          <Link href="/admin/produits" className={pathname.includes('/admin/produits') ? styles.active : ''}>
            {t('products')}
          </Link>
          <Link href="/admin/boutique" className={pathname.includes('/admin/boutique') ? styles.active : ''}>
            {t('storefront')}
          </Link>
          <Link href="/admin/reglages" className={pathname === '/admin/reglages' ? styles.active : ''}>
            {t('settings')}
          </Link>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>{t('logout')}</button>
      </aside>
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
