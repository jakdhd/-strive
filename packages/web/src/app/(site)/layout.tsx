'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoUrl = settings.logo_url ? `/uploads/${settings.logo_url.split('/uploads/')[1] || settings.logo_url}` : null;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-wider flex items-center gap-2 text-white">
            {logoUrl ? (
              <img src={logoUrl} alt="Strive" className="h-10" />
            ) : (
              <span className="gradient-text">STRIVE</span>
            )}
          </Link>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="text-white/80 hover:text-primary transition">الرئيسية</Link>
            <Link href="/courses" className="text-white/80 hover:text-primary transition">الكورسات</Link>
            <Link href="/contact" className="text-white/80 hover:text-primary transition">تواصل معنا</Link>
          </div>
        </nav>
      </header>
      <main className="min-h-screen">{children}</main>
      <footer className="bg-secondary text-white/60 text-center py-8 text-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <span className="gradient-text font-bold text-lg block mb-2">STRIVE</span>
          © {new Date().getFullYear()} جميع الحقوق محفوظة.
        </div>
      </footer>
    </>
  );
}
