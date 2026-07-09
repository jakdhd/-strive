'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  level: string;
  imageUrl: string | null;
  _count: { lessons: number };
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchAPI<Course[]>('/courses').then(setCourses).catch(console.error);
  }, []);

  return (
    <div className="pt-28 pb-16 bg-gradient-to-b from-secondary to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4 text-white">الكورسات المتاحة</h1>
        <p className="text-white/60 mb-12 text-lg">اختر الكورس المناسب لمستواك وابدأ التعلم اليوم</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card overflow-hidden group">
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-secondary to-surface relative overflow-hidden">
                {course.imageUrl ? (
                  <img src={`/uploads/${course.imageUrl.split('/uploads/')[1] || course.imageUrl}`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-6xl opacity-50">📚</span>
                )}
                <span className={`${levelBadge(course.level)} absolute top-4 right-4`}>{levelText(course.level)}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold gradient-text">
                    {course.price === 0 ? 'مجاني' : `${course.price} ${course.currency}`}
                  </span>
                  <span className="text-sm text-muted">{course._count.lessons} دروس</span>
                </div>
                <Link
                  href={`/courses/${course.id}`}
                  className="block text-center mt-4 bg-gradient-to-l from-primary to-primary-dark text-white py-3 rounded-xl font-semibold transition hover:shadow-lg hover:shadow-primary/20"
                >
                  عرض الكورس
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
