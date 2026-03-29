'use client';

import { Link, usePathname } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { X, ChevronRight, Globe } from 'lucide-react';
import styles from './MobileMenu.module.css';
import { INSTAGRAM_LINK, WHATSAPP_NUMBER } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink} onClick={onClose}>
            {t('home')} <ChevronRight size={18} strokeWidth={1} />
          </Link>
          <Link href="/boutique" className={styles.navLink} onClick={onClose}>
            {t('shop')} <ChevronRight size={18} strokeWidth={1} />
          </Link>
          <Link href="/boutique?category=heels" className={styles.navLink} onClick={onClose}>
            {t('heels')} <ChevronRight size={18} strokeWidth={1} />
          </Link>
          <Link href="/boutique?category=bags" className={styles.navLink} onClick={onClose}>
            {t('bags')} <ChevronRight size={18} strokeWidth={1} />
          </Link>
        </nav>

        <div className={styles.footer}>
          <div className={styles.locales}>
            <div className={styles.localeTitle}>
              <Globe size={16} /> Language
            </div>
            <div className={styles.localeGrid}>
              <Link href={pathname} locale="fr" onClick={onClose} className={locale === 'fr' ? styles.activeLocale : ''}>Français</Link>
              <Link href={pathname} locale="en" onClick={onClose} className={locale === 'en' ? styles.activeLocale : ''}>English</Link>
              <Link href={pathname} locale="ar" onClick={onClose} className={locale === 'ar' ? styles.activeLocale : ''}>العربية</Link>
            </div>
          </div>

          <div className={styles.socials}>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.5 8.5 0 0 1 3.8.9l5.7-1.1-1.1 5.7z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
