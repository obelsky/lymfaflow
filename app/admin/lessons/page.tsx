'use client';

import Link from 'next/link';
import { AdminLayout, Card, Badge, Button, DataTable } from '@/components/Admin';
import { LESSONS } from '@/lib/data/lessons';
import { TOPICS } from '@/lib/data/topics';

export default function LessonsPage() {
  // Flatten lessons with topic info
  const allLessons = TOPICS.flatMap(topic => {
    const lessons = LESSONS[topic.id] || [];
    return lessons.map(lesson => ({
      ...lesson,
      topic_id: topic.id,
      topic_title: topic.title,
      topic_color: topic.color,
    }));
  });
  
  return (
    <AdminLayout 
      title="Lekce" 
      subtitle={`${allLessons.length} lekcí`}
      actions={
        <Link href="/admin/lessons/new">
          <Button>+ Nová lekce</Button>
        </Link>
      }
    >
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lekce</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kurz</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Body</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">XP</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{lesson.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: lesson.topic_color }}
                      />
                      <span className="text-sm text-gray-600">{lesson.topic_title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge>{lesson.points?.length || 0}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {lesson.xp_reward} XP
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/lessons/${lesson.id}`}>
                      <Button variant="ghost" size="sm">Upravit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
