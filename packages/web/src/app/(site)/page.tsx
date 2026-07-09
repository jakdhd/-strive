'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {});
  }, []);

  const siteName = settings.site_name || 'Strive';
  const heroTitle = settings.hero_title || `ابدأ رحلة التداول مع <span class="gradient-text">${siteName}</span>`;
  const heroSubtitle = settings.hero_subtitle || 'منصة تعليمية متكاملة لتعليم التداول من الصفر حتى الاحتراف';
  const aboutText = settings.about_text || '';

  return (
    <div>
      <section className="relative min-h-screen flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 70% 50%, #f97316 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 pt-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">{heroSubtitle}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses" className="btn-primary text-lg">
              تصفح الكورسات
            </Link>
            <Link href="/contact" className="btn-outline text-lg">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">لماذا <span className="gradient-text">{siteName}</span>؟</h2>
          <p className="section-subtitle">منصة تعليمية متكاملة صممت خصيصاً لرحلة تداول ناجحة</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="card p-8 text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-secondary to-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="text-white">
                <div className="text-4xl font-bold gradient-text mb-2">{s.value}</div>
                <div className="text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {aboutText && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="section-title mb-8">عن <span className="gradient-text">{siteName}</span></h2>
            <p className="text-lg text-muted leading-relaxed">{aboutText}</p>
          </div>
        </section>
      )}
    </div>
  );
}

const features = [
  { icon: '📊', title: 'تعليم احترافي', desc: 'محتوى تعليمي مبسط من خبراء التداول، يغطي كل المستويات من المبتدئ إلى المحترف.' },
  { icon: '🛡️', title: 'إدارة مخاطر', desc: 'تعلم كيف تحمي رأس مالك وتدير مخاطرك بذكاء لتحقيق أرباح مستدامة.' },
  { icon: '💬', title: 'دعم مباشر', desc: 'فريق دعم متاح عبر تليجرام للإجابة على استفساراتك ومساعدتك في أي وقت.' },
];

const stats = [
  { value: '٤٠+', label: 'درس تعليمي' },
  { value: '٣', label: 'مستويات تدريب' },
  { value: '٢٤/٧', label: 'دعم متواصل' },
];
