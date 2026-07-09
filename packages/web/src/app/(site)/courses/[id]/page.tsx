'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  duration: number | null;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  level: string;
  lessons: Lesson[];
}

const levelBadge = (lvl: string) => {
  if (lvl === 'beginner') return 'badge badge-beginner';
  if (lvl === 'intermediate') return 'badge badge-intermediate';
  return 'badge badge-advanced';
};
const levelText = (lvl: string) => {
  if (lvl === 'beginner') return 'مبتدئ';
  if (lvl === 'intermediate') return 'متوسط';
  return 'متقدم';
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      fetchAPI<Course>(`/courses/${id}`).then(setCourse).catch(console.error);
    }
  }, [id]);

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-white">
      <div className="text-white/60 text-xl">جاري التحميل...</div>
    </div>
  );

  return (
    <div className="pt-28 pb-16 bg-gradient-to-b from-secondary to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/courses" className="text-primary hover:text-primary-dark transition inline-flex items-center gap-2 mb-8">
          &larr; العودة للكورسات
        </Link>

        <div className="card p-8 mb-8">
          <span className={`${levelBadge(course.level)} mb-4`}>{levelText(course.level)}</span>
          <h1 className="text-4xl font-bold mt-3 mb-4">{course.title}</h1>
          <p className="text-muted mb-8 leading-relaxed text-lg">{course.description}</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-3xl font-bold gradient-text">
              {course.price === 0 ? 'مجاني' : `${course.price} ${course.currency}`}
            </div>
            <a
              href="https://t.me/SSSSSTVE"
              target="_blank"
              className="btn-primary"
            >
              💬 اشتراك عبر تليجرام
            </a>
          </div>
        </div>

        {course.lessons.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              📖 محتوى الكورس
              <span className="text-sm text-muted font-normal">({course.lessons.length} دروس)</span>
            </h2>
            <div className="space-y-3">
              {course.lessons.map((lesson) => (
                <div key={lesson.id} className="card p-5 flex items-center justify-between hover:border-primary/20 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm">
                      {lesson.order}
                    </div>
                    <div>
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <span className="text-xs text-muted">الدرس {lesson.order}</span>
                    </div>
                  </div>
                  {lesson.duration && (
                    <span className="text-sm text-muted bg-gray-50 px-3 py-1 rounded-full">{lesson.duration} دقيقة</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
