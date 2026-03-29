'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, Search, X, Heart } from 'lucide-react';
import { useWishlist } from '@/lib/use-wishlist';
import styles from './Header.module.css';
import { useRouter } from '@/navigation';
import { STORE_NAME } from '@/lib/constants';
import MobileMenu from '@/components/MobileMenu';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlist } = useWishlist();

  const handleSearch = () => {
    if (!searchQuery) return;
    router.push(`/boutique?search=${searchQuery}`);
    setIsSearchOpen(false);
  };

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
          {isSearchOpen && (
            <div className={styles.searchBar}>
              <input 
                type="text" 
                placeholder={t('shop')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)}><X size={18} /></button>
            </div>
          )}
          
          <div className={styles.localeSwitcherDesktop}>
            <Link href={pathname} locale="fr" className={locale === 'fr' ? styles.activeLocale : ''}>FR</Link>
            <Link href={pathname} locale="en" className={locale === 'en' ? styles.activeLocale : ''}>EN</Link>
            <Link href={pathname} locale="ar" className={locale === 'ar' ? styles.activeLocale : ''}>AR</Link>
          </div>

          <button className={styles.iconBtn} onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search size={22} strokeWidth={1.2} />
          </button>

          <Link href="/favoris" className={styles.iconBtn}>
            <Heart size={22} strokeWidth={1.2} fill={wishlist.length > 0 ? "black" : "none"} />
            {wishlist.length > 0 && <span className={styles.wishlistBadge}>{wishlist.length}</span>}
          </Link>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
