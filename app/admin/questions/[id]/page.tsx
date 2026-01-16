'use client';

// ============================================
// POLYMATH ACADEMY - Quiz Question Editor
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { 
  AdminLayout, 
  Card, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Badge,
} from '@/components/Admin';
import { TOPICS } from '@/lib/data/topics';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import { LESSONS } from '@/lib/data/lessons';

interface QuestionData {
  id: string;
  topic_id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: number;
  is_published: boolean;
}

export default function QuestionEditor() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = params.id as string;
  const topicIdFromQuery = searchParams.get('topic');
  
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewAnswer, setPreviewAnswer] = useState<number | null>(null);
  
  // Načíst data
  useEffect(() => {
    if (questionId === 'new') {
      setQuestion({
        id: '',
        topic_id: topicIdFromQuery || '',
        lesson_id: '',
        question: '',
        options: ['', '', '', ''],
        correct_index: 0,
        explanation: '',
        difficulty: 1,
        is_published: false,
      });
    } else {
      // Najít otázku v datech
      let foundQuestion = null;
      let foundTopicId = '';
      
      for (const [topicId, questions] of Object.entries(QUIZ_QUESTIONS)) {
        const found = questions.find(q => q.id === questionId);
        if (found) {
          foundQuestion = found;
          foundTopicId = topicId;
          break;
        }
      }
      
      if (foundQuestion) {
        setQuestion({
          id: foundQuestion.id,
          topic_id: foundTopicId,
          lesson_id: '',
          question: foundQuestion.question,
          options: foundQuestion.options,
          correct_index: foundQuestion.correct,
          explanation: foundQuestion.explanation,
          difficulty: 1,
          is_published: true,
        });
      } else {
        router.push('/admin/questions');
      }
    }
  }, [questionId, topicIdFromQuery, router]);
  
  // Update option
  const updateOption = (index: number, value: string) => {
    if (!question) return;
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };
  
  // Add option
  const addOption = () => {
    if (!question || question.options.length >= 6) return;
    setQuestion({ ...question, options: [...question.options, ''] });
  };
  
  // Remove option
  const removeOption = (index: number) => {
    if (!question || question.options.length <= 2) return;
    const newOptions = question.options.filter((_, i) => i !== index);
    const newCorrect = question.correct_index >= index 
      ? Math.max(0, question.correct_index - 1) 
      : question.correct_index;
    setQuestion({ ...question, options: newOptions, correct_index: newCorrect });
  };
  
  if (!question) {
    return (
      <AdminLayout title="Načítání...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[#7A9E8E] border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }
  
  const selectedTopic = TOPICS.find(t => t.id === question.topic_id);
  const topicLessons = question.topic_id ? (LESSONS[question.topic_id] || []) : [];
  
  return (
    <AdminLayout
      title={questionId === 'new' ? 'Nová otázka' : 'Upravit otázku'}
      subtitle={selectedTopic ? `Kurz: ${selectedTopic.title}` : 'Quiz otázka'}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/admin/questions')}>
            Zrušit
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowPreview(!showPreview);
              setPreviewAnswer(null);
            }}
          >
            {showPreview ? 'Editor' : 'Náhled'}
          </Button>
          <Button onClick={() => alert('V produkci by se uložilo do Supabase')}>
            Uložit
          </Button>
        </div>
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-6">
          <Card title="Otázka">
            <div className="space-y-4">
              <Select
                label="Kurz"
                value={question.topic_id}
                onChange={(e) => setQuestion({ ...question, topic_id: e.target.value, lesson_id: '' })}
                options={[
                  { value: '', label: '-- Vyberte kurz --' },
                  ...TOPICS.map(t => ({ value: t.id, label: t.title })),
                ]}
              />
              
              {topicLessons.length > 0 && (
                <Select
                  label="Lekce (volitelné)"
                  value={question.lesson_id}
                  onChange={(e) => setQuestion({ ...question, lesson_id: e.target.value })}
                  options={[
                    { value: '', label: '-- Žádná konkrétní lekce --' },
                    ...topicLessons.map(l => ({ value: l.id, label: l.title })),
                  ]}
                />
              )}
              
              <Textarea
                label="Text otázky"
                value={question.question}
                onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                rows={3}
                placeholder="Která rovina dělí tělo na přední a zadní část?"
              />
            </div>
          </Card>
          
          <Card 
            title="Odpovědi" 
            subtitle="Označte správnou odpověď"
            actions={
              question.options.length < 6 && (
                <Button size="sm" variant="secondary" onClick={addOption}>
                  + Přidat
                </Button>
              )
            }
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <button
                    onClick={() => setQuestion({ ...question, correct_index: index })}
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center
                      transition-colors flex-shrink-0
                      ${question.correct_index === index
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    {question.correct_index === index && '✓'}
                  </button>
                  
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Odpověď ${index + 1}`}
                    className="flex-1"
                  />
                  
                  {question.options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Klikněte na kroužek pro označení správné odpovědi.
            </p>
          </Card>
          
          <Card title="Vysvětlení & Nastavení">
            <div className="space-y-4">
              <Textarea
                label="Vysvětlení (po odpovědi)"
                value={question.explanation}
                onChange={(e) => setQuestion({ ...question, explanation: e.target.value })}
                rows={3}
                placeholder="Čelní rovina prochází tělem zleva doprava..."
              />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Obtížnost: {question.difficulty}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={question.difficulty}
                    onChange={(e) => setQuestion({ ...question, difficulty: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Snadná</span>
                    <span>Těžká</span>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={question.is_published}
                      onChange={(e) => setQuestion({ ...question, is_published: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-[#7A9E8E] focus:ring-[#7A9E8E]"
                    />
                    <span className="text-sm text-gray-700">Publikovat otázku</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Preview */}
        <div>
          <Card title="Náhled" className="sticky top-20">
            <div className="space-y-6">
              {/* Question */}
              <div>
                <Badge variant={question.difficulty <= 2 ? 'success' : question.difficulty <= 4 ? 'warning' : 'danger'}>
                  Obtížnost {question.difficulty}/5
                </Badge>
                <h3 className="text-lg font-semibold text-gray-900 mt-3">
                  {question.question || 'Text otázky...'}
                </h3>
              </div>
              
              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, index) => {
                  const isSelected = previewAnswer === index;
                  const isCorrect = question.correct_index === index;
                  const showResult = previewAnswer !== null;
                  
                  let bgColor = 'bg-white hover:bg-gray-50';
                  let borderColor = 'border-gray-200';
                  
                  if (showResult) {
                    if (isCorrect) {
                      bgColor = 'bg-green-50';
                      borderColor = 'border-green-500';
                    } else if (isSelected) {
                      bgColor = 'bg-red-50';
                      borderColor = 'border-red-500';
                    }
                  } else if (isSelected) {
                    borderColor = 'border-[#7A9E8E]';
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !showResult && setPreviewAnswer(index)}
                      disabled={showResult}
                      className={`
                        w-full p-4 rounded-xl border-2 text-left
                        transition-all ${bgColor} ${borderColor}
                        ${!showResult ? 'cursor-pointer' : 'cursor-default'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`
                          w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm
                          ${showResult && isCorrect ? 'border-green-500 bg-green-500 text-white' : ''}
                          ${showResult && isSelected && !isCorrect ? 'border-red-500 bg-red-500 text-white' : ''}
                          ${!showResult ? 'border-gray-300' : ''}
                        `}>
                          {showResult && isCorrect && '✓'}
                          {showResult && isSelected && !isCorrect && '✕'}
                          {!showResult && String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-900">
                          {option || `Odpověď ${index + 1}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Explanation */}
              {previewAnswer !== null && question.explanation && (
                <div className={`
                  p-4 rounded-xl
                  ${previewAnswer === question.correct_index ? 'bg-green-50' : 'bg-amber-50'}
                `}>
                  <p className="font-medium mb-1">
                    {previewAnswer === question.correct_index ? '✅ Správně!' : '❌ Špatně'}
                  </p>
                  <p className="text-sm text-gray-700">{question.explanation}</p>
                </div>
              )}
              
              {/* Reset */}
              {previewAnswer !== null && (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setPreviewAnswer(null)}
                >
                  Zkusit znovu
                </Button>
              )}
              
              {previewAnswer === null && (
                <p className="text-center text-sm text-gray-500">
                  Klikněte na odpověď pro test
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
