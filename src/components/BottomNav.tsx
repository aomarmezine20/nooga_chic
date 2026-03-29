'use client';

import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Home, ShoppingBag, Heart, User, MessageCircle } from 'lucide-react';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
        <Home size={22} />
        <span>{t('home')}</span>
      </Link>
      <Link href="/boutique" className={`${styles.navItem} ${pathname.includes('/boutique') ? styles.active : ''}`}>
        <ShoppingBag size={22} />
        <span>{t('shop')}</span>
      </Link>
      <Link href="/favoris" className={`${styles.navItem} ${pathname.includes('/favoris') ? styles.active : ''}`}>
        <Heart size={22} fill={pathname.includes('/favoris') ? "currentColor" : "none"} />
        <span>Favoris</span>
      </Link>
      <Link href="/admin" className={`${styles.navItem} ${pathname.includes('/admin') ? styles.active : ''}`}>
        <User size={22} />
        <span>Admin</span>
      </Link>
    </nav>
  );
}
