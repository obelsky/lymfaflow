'use client';

import { AdminLayout, Card, StatCard } from '@/components/Admin';
import { PROFESSORS } from '@/lib/data/professors';
import { TOPICS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';

export default function AnalyticsPage() {
  const totalLessons = Object.values(LESSONS).flat().length;
  const totalQuestions = Object.values(QUIZ_QUESTIONS).flat().length;
  
  return (
    <AdminLayout 
      title="Analytika" 
      subtitle="Statistiky a přehledy"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Profesoři" value={PROFESSORS.length} />
        <StatCard label="Témata" value={TOPICS.length} />
        <StatCard label="Lekce" value={totalLessons} />
        <StatCard label="Otázky" value={totalQuestions} />
      </div>
      
      <Card>
        <div className="text-center py-12">
          <p className="text-4xl mb-4">📊</p>
          <h3 className="font-semibold text-gray-900 mb-2">Analytika</h3>
          <p className="text-gray-500 mb-4">
            Detailní statistiky vyžadují Supabase pro ukládání dat o používání.
          </p>
          <p className="text-sm text-gray-400">
            Bude implementováno ve FÁZI 5.
          </p>
        </div>
      </Card>
      
      {/* Content stats */}
      <Card title="Obsah podle témat" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Téma</th>
                <th className="text-center py-2">Lekce</th>
                <th className="text-center py-2">Otázky</th>
                <th className="text-center py-2">Body</th>
              </tr>
            </thead>
            <tbody>
              {TOPICS.map(topic => {
                const lessons = LESSONS[topic.id] || [];
                const questions = QUIZ_QUESTIONS[topic.id] || [];
                const totalPoints = lessons.reduce((sum, l) => sum + (l.points?.length || 0), 0);
                
                return (
                  <tr key={topic.id} className="border-b">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: topic.color }}
                        />
                        {topic.title}
                      </div>
                    </td>
                    <td className="text-center py-2">{lessons.length}</td>
                    <td className="text-center py-2">{questions.length}</td>
                    <td className="text-center py-2">{totalPoints}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
