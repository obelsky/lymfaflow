'use client';

// ============================================
// POLYMATH ACADEMY - AI Test Console
// Admin interface pro testování AI profesorů
// ============================================

import React, { useState } from 'react';
import { AdminLayout, Card, Button, Input, Select, Badge, Textarea } from '@/components/Admin';
import { ChatWindow } from '@/components/Chat';
import { PROFESSORS, getProfessorById } from '@/lib/data/professors';
import { TOPICS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { buildSystemPrompt } from '@/lib/ai/config';
import { ProfessorAvatar } from '@/components/Professor';

export default function AITestPage() {
  const [selectedProfessorId, setSelectedProfessorId] = useState('davinci');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);
  const [testMode, setTestMode] = useState<'chat' | 'prompt'>('chat');
  
  const professor = getProfessorById(selectedProfessorId)!;
  const topicLessons = selectedTopicId ? (LESSONS[selectedTopicId] || []) : [];
  const selectedLesson = selectedLessonId 
    ? topicLessons.find(l => l.id === selectedLessonId) 
    : undefined;
  
  // Build system prompt for preview
  const systemPrompt = buildSystemPrompt(professor, {
    lessonTitle: selectedLesson?.title,
    lessonContent: selectedLesson?.human_explanation,
    studentLevel: 3,
  });
  
  return (
    <AdminLayout
      title="AI Test Console"
      subtitle="Testování AI profesorů a system promptů"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Left: Configuration */}
        <div className="space-y-6">
          {/* Professor Selection */}
          <Card title="Výběr profesora">
            <div className="grid grid-cols-5 gap-2">
              {PROFESSORS.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setSelectedProfessorId(prof.id)}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                    ${prof.id === selectedProfessorId 
                      ? 'bg-[#7A9E8E] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: prof.id === selectedProfessorId 
                        ? 'rgba(255,255,255,0.2)' 
                        : `${prof.accentColor}15` 
                    }}
                  >
                    <ProfessorAvatar 
                      professorId={prof.id}
                      className="w-7 h-7"
                      color={prof.id === selectedProfessorId ? '#fff' : prof.accentColor}
                    />
                  </div>
                  <span className="text-xs font-medium">{prof.shortName}</span>
                </button>
              ))}
            </div>
            
            {/* Professor info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-gray-900">{professor.name}</h4>
                <Badge>{professor.teachingMethod}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{professor.tagline}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{professor.primaryField}</Badge>
                {professor.secondaryFields.map(f => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Context Selection */}
          <Card title="Kontext (volitelné)">
            <div className="space-y-4">
              <Select
                label="Téma/Kurz"
                value={selectedTopicId}
                onChange={(e) => {
                  setSelectedTopicId(e.target.value);
                  setSelectedLessonId('');
                }}
                options={[
                  { value: '', label: '-- Žádné téma --' },
                  ...TOPICS.map(t => ({ value: t.id, label: t.title })),
                ]}
              />
              
              {topicLessons.length > 0 && (
                <Select
                  label="Lekce"
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  options={[
                    { value: '', label: '-- Žádná lekce --' },
                    ...topicLessons.map(l => ({ value: l.id, label: l.title })),
                  ]}
                />
              )}
              
              {selectedLesson && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="font-medium text-gray-700 mb-1">{selectedLesson.title}</p>
                  <p className="text-gray-500 line-clamp-2">{selectedLesson.human_explanation}</p>
                </div>
              )}
            </div>
          </Card>
          
          {/* Mode Toggle */}
          <Card title="Režim testu">
            <div className="flex gap-2">
              <Button
                variant={testMode === 'chat' ? 'primary' : 'secondary'}
                onClick={() => setTestMode('chat')}
              >
                💬 Chat
              </Button>
              <Button
                variant={testMode === 'prompt' ? 'primary' : 'secondary'}
                onClick={() => setTestMode('prompt')}
              >
                📝 System Prompt
              </Button>
            </div>
          </Card>
          
          {/* System Prompt Preview */}
          {testMode === 'prompt' && (
            <Card title="System Prompt" subtitle="Aktuálně generovaný prompt">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {systemPrompt.length} znaků
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(systemPrompt)}
                  >
                    📋 Kopírovat
                  </Button>
                </div>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto">
                  {systemPrompt}
                </pre>
              </div>
            </Card>
          )}
          
          {/* API Status */}
          <Card title="API Status">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Anthropic API</span>
                <Badge variant={process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ? 'success' : 'warning'}>
                  {process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ? 'Nakonfigurováno' : 'Mock režim'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Model</span>
                <Badge variant="info">claude-sonnet-4-20250514</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 V mock režimu vrací API předpřipravené odpovědi podle osobnosti profesora.
              </p>
            </div>
          </Card>
        </div>
        
        {/* Right: Chat Test */}
        <div>
          {testMode === 'chat' ? (
            <div className="h-[700px]">
              <ChatWindow
                key={`${selectedProfessorId}-${selectedLessonId}`}
                initialProfessorId={selectedProfessorId}
                lessonContext={selectedLesson ? {
                  lessonId: selectedLesson.id,
                  lessonTitle: selectedLesson.title,
                  lessonContent: selectedLesson.human_explanation,
                } : undefined}
                className="h-full"
              />
            </div>
          ) : (
            <Card title="Personality breakdown">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Osobnost</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      Formalita: {professor.personality.formality}/5
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Komplexita: {professor.personality.complexity}/5
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Humor: {professor.personality.humor ? '✅' : '❌'}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Analogie: {professor.personality.useAnalogies ? '✅' : '❌'}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Etymologie: {professor.personality.useEtymology ? '✅' : '❌'}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Příběhy: {professor.personality.useStories ? '✅' : '❌'}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Otázky: {professor.personality.askQuestions ? '✅' : '❌'}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      Vizuály: {professor.personality.useVisuals ? '✅' : '❌'}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Typické fráze</h4>
                  <ul className="space-y-1">
                    {professor.signaturePhrases.map((phrase, i) => (
                      <li key={i} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                        "{phrase}"
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Intro zpráva</h4>
                  <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded italic">
                    {professor.introMessage}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
