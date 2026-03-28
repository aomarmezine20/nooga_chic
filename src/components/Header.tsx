'use client';

import { Link, usePathname } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Header.module.css';
import { STORE_NAME } from '@/lib/constants';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        {STORE_NAME}
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>{t('home')}</Link>
        <Link href="/boutique" className={styles.navLink}>{t('shop')}</Link>
        <Link href="/boutique?category=heels" className={styles.navLink}>{t('heels')}</Link>
        <Link href="/boutique?category=bags" className={styles.navLink}>{t('bags')}</Link>
      </nav>

      <div className={styles.actions}>
        <div className={styles.localeSwitcher}>
          <Link href={pathname} locale="fr" className={locale === 'fr' ? styles.activeLocale : ''}>FR</Link>
          <Link href={pathname} locale="en" className={locale === 'en' ? styles.activeLocale : ''}>EN</Link>
          <Link href={pathname} locale="ar" className={locale === 'ar' ? styles.activeLocale : ''}>AR</Link>
        </div>

        <Link href="/boutique">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Link>
        <Link href="/admin">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
      </div>
    </header>
  );
}
