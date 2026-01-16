'use client';

import Link from 'next/link';
import { AdminLayout, Card, Badge, Button } from '@/components/Admin';
import { TOPICS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';

export default function CoursesPage() {
  return (
    <AdminLayout 
      title="Kurzy" 
      subtitle={`${TOPICS.length} témat`}
      actions={
        <Link href="/admin/courses/new">
          <Button>+ Nový kurz</Button>
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOPICS.map(topic => {
          const lessons = LESSONS[topic.id] || [];
          const questions = QUIZ_QUESTIONS[topic.id] || [];
          
          return (
            <Link
              key={topic.id}
              href={`/admin/courses/${topic.id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: topic.color }}
                  >
                    {topic.icon?.slice(0, 1) || '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{topic.subtitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{lessons.length} lekcí</span>
                  <span className="text-gray-500">{questions.length} otázek</span>
                </div>
                
                <div className="mt-3 flex gap-2">
                  {topic.is_locked && <Badge variant="warning">🔒 Zamčeno</Badge>}
                  <Badge variant="success">Publikováno</Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
