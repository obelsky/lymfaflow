'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AdminLayout, Card, Badge, Button, Select } from '@/components/Admin';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import { TOPICS } from '@/lib/data/topics';
import { useState } from 'react';

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const topicFilter = searchParams.get('topic') || '';
  const [selectedTopic, setSelectedTopic] = useState(topicFilter);
  
  // Get filtered questions
  const allQuestions = selectedTopic
    ? (QUIZ_QUESTIONS[selectedTopic] || []).map(q => ({ ...q, topic_id: selectedTopic }))
    : TOPICS.flatMap(topic => 
        (QUIZ_QUESTIONS[topic.id] || []).map(q => ({ ...q, topic_id: topic.id }))
      );
  
  const selectedTopicData = TOPICS.find(t => t.id === selectedTopic);
  
  return (
    <AdminLayout 
      title="Otázky" 
      subtitle={`${allQuestions.length} otázek`}
      actions={
        <Link href={`/admin/questions/new${selectedTopic ? `?topic=${selectedTopic}` : ''}`}>
          <Button>+ Nová otázka</Button>
        </Link>
      }
    >
      {/* Filter */}
      <div className="mb-6">
        <Select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          options={[
            { value: '', label: 'Všechny kurzy' },
            ...TOPICS.map(t => ({ value: t.id, label: `${t.title} (${QUIZ_QUESTIONS[t.id]?.length || 0})` })),
          ]}
        />
      </div>
      
      {/* Questions list */}
      <Card padding={false}>
        <div className="divide-y divide-gray-100">
          {allQuestions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="mb-4">Žádné otázky</p>
              <Link href="/admin/questions/new">
                <Button>Vytvořit první otázku</Button>
              </Link>
            </div>
          ) : (
            allQuestions.map((question, index) => {
              const topic = TOPICS.find(t => t.id === question.topic_id);
              
              return (
                <Link
                  key={question.id}
                  href={`/admin/questions/${question.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {question.question}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        {topic && (
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: topic.color }}
                            />
                            <span className="text-gray-500">{topic.title}</span>
                          </div>
                        )}
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">
                          {question.options.length} odpovědí
                        </span>
                      </div>
                    </div>
                    <Badge variant="success">Správná: {question.options[question.correct_index]?.slice(0, 20)}...</Badge>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </Card>
    </AdminLayout>
  );
}
