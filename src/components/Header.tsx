'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, Search, X } from 'lucide-react';
import styles from './Header.module.css';
import { STORE_NAME } from '@/lib/constants';
import MobileMenu from '@/components/MobileMenu';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Menu"
        >
          <Menu size={24} strokeWidth={1.2} />
        </button>

        <Link href="/" className={styles.logo}>
          {STORE_NAME}
        </Link>
        
        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>{t('home')}</Link>
          <Link href="/boutique" className={styles.navLink}>{t('shop')}</Link>
          <Link href="/boutique?category=heels" className={styles.navLink}>{t('heels')}</Link>
          <Link href="/boutique?category=bags" className={styles.navLink}>{t('bags')}</Link>
        </nav>

        <div className={styles.actions}>
          <div className={styles.localeSwitcherDesktop}>
            <Link href={pathname} locale="fr" className={locale === 'fr' ? styles.activeLocale : ''}>FR</Link>
            <Link href={pathname} locale="en" className={locale === 'en' ? styles.activeLocale : ''}>EN</Link>
            <Link href={pathname} locale="ar" className={locale === 'ar' ? styles.activeLocale : ''}>AR</Link>
          </div>

          <Link href="/boutique" className={styles.iconBtn}>
            <Search size={22} strokeWidth={1.2} />
          </Link>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
