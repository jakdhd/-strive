'use client';

import { useState, FormEvent } from 'react';
import { fetchAPI } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetchAPI('/contacts', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setDone(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('حدث خطأ، حاول مرة أخرى');
    }
  }

  return (
    <div className="pt-28 pb-16 bg-gradient-to-b from-secondary to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4 text-white">تواصل معنا</h1>
        <p className="text-white/60 mb-10 text-lg">
          تواصل معنا عبر تليجرام أو املأ النموذج وسنرد عليك فوراً
        </p>

        <div className="flex gap-4 mb-10">
          <a
            href="https://t.me/SSSSSTVE"
            target="_blank"
            className="flex-1 bg-gradient-to-l from-[#0088cc] to-[#0077b5] hover:from-[#0077b5] hover:to-[#006699] text-white text-center py-5 rounded-2xl font-semibold transition hover:shadow-lg shadow-md"
          >
            💬 راسلنا على تليجرام
          </a>
          <a
            href="https://t.me/Strive108"
            target="_blank"
            className="flex-1 bg-secondary hover:bg-surface text-white text-center py-5 rounded-2xl font-semibold transition border border-white/10 hover:border-primary/30 shadow-md"
          >
            📢 قناة التليجرام
          </a>
        </div>

        {done && (
          <div className="bg-gradient-to-l from-green-50 to-emerald-50 text-green-700 p-5 rounded-2xl mb-6 border border-green-200 text-center font-medium">
            تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">الاسم</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="اسمك الكامل"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رقم الجوال</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                placeholder="+964 xxx xxxx"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الرسالة</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field"
              placeholder="اكتب رسالتك هنا..."
            />
          </div>
          <button className="btn-primary w-full text-center text-lg">
            إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  );
}
