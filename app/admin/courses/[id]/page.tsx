'use client';

// ============================================
// POLYMATH ACADEMY - Course Editor
// Drag & Drop lessons, assign professor
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  AdminLayout, 
  Card, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Badge,
} from '@/components/Admin';
import { TOPICS, getTopicById } from '@/lib/data/topics';
import { LESSONS, getLessonsByTopicId } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import { PROFESSORS } from '@/lib/data/professors';
import { ProfessorAvatar } from '@/components/Professor';

// Drag & Drop ikony
const DragHandle = () => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="6" r="1.5" />
    <circle cx="15" cy="6" r="1.5" />
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="15" cy="18" r="1.5" />
  </svg>
);

interface LessonItem {
  id: string;
  title: string;
  points: number;
  xp: number;
}

export default function CourseEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  // State
  const [course, setCourse] = useState<{
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    is_locked: boolean;
    is_published: boolean;
    professor_id: string;
  } | null>(null);
  
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [activeTab, setActiveTab] = useState<'general' | 'lessons' | 'settings'>('general');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  // Načíst data
  useEffect(() => {
    if (courseId === 'new') {
      setCourse({
        id: '',
        slug: '',
        title: '',
        subtitle: '',
        description: '',
        icon: 'Book',
        color: '#7A9E8E',
        is_locked: false,
        is_published: false,
        professor_id: 'davinci',
      });
      setLessons([]);
    } else {
      const topic = getTopicById(courseId);
      if (topic) {
        setCourse({
          id: topic.id,
          slug: topic.id,
          title: topic.title,
          subtitle: topic.subtitle,
          description: '',
          icon: topic.icon,
          color: topic.color,
          is_locked: topic.is_locked,
          is_published: true,
          professor_id: 'davinci',
        });
        
        const topicLessons = getLessonsByTopicId(courseId);
        setLessons(topicLessons.map(l => ({
          id: l.id,
          title: l.title,
          points: l.points?.length || 0,
          xp: l.xp_reward,
        })));
      } else {
        router.push('/admin/courses');
      }
    }
  }, [courseId, router]);
  
  // Drag & Drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newLessons = [...lessons];
    const draggedItem = newLessons[draggedIndex];
    newLessons.splice(draggedIndex, 1);
    newLessons.splice(index, 0, draggedItem);
    
    setLessons(newLessons);
    setDraggedIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  
  if (!course) {
    return (
      <AdminLayout title="Načítání...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[#7A9E8E] border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }
  
  const questionCount = QUIZ_QUESTIONS[courseId]?.length || 0;
  const selectedProfessor = PROFESSORS.find(p => p.id === course.professor_id);
  
  return (
    <AdminLayout
      title={courseId === 'new' ? 'Nový kurz' : `Upravit: ${course.title}`}
      subtitle={courseId === 'new' ? 'Vytvořit nový kurz' : `${lessons.length} lekcí • ${questionCount} otázek`}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/admin/courses')}>
            Zrušit
          </Button>
          <Button onClick={() => alert('V produkci by se uložilo do Supabase')}>
            Uložit změny
          </Button>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left: Preview */}
        <div className="lg:col-span-1">
          <Card title="Náhled" className="sticky top-20">
            {/* Course card preview */}
            <div 
              className="rounded-xl p-5 mb-4"
              style={{ backgroundColor: `${course.color}15` }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: course.color }}
                >
                  {course.icon?.slice(0, 1) || '📚'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {course.title || 'Název kurzu'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.subtitle || 'Popis kurzu'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">{lessons.length} lekcí</span>
                <span className="text-gray-500">{questionCount} otázek</span>
              </div>
              
              {/* Status badges */}
              <div className="mt-4 flex gap-2">
                <Badge variant={course.is_published ? 'success' : 'default'}>
                  {course.is_published ? 'Publikováno' : 'Koncept'}
                </Badge>
                {course.is_locked && (
                  <Badge variant="warning">🔒 Zamčeno</Badge>
                )}
              </div>
            </div>
            
            {/* Professor */}
            {selectedProfessor && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Přiřazený profesor</p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedProfessor.accentColor}15` }}
                  >
                    <ProfessorAvatar 
                      professorId={selectedProfessor.id}
                      className="w-8 h-8"
                      color={selectedProfessor.accentColor}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedProfessor.name}</p>
                    <p className="text-xs text-gray-500">{selectedProfessor.teachingMethod}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        {/* Right: Editor */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['general', 'lessons', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === tab
                    ? 'bg-[#7A9E8E] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                {tab === 'general' && 'Obecné'}
                {tab === 'lessons' && `Lekce (${lessons.length})`}
                {tab === 'settings' && 'Nastavení'}
              </button>
            ))}
          </div>
          
          {/* Tab: General */}
          {activeTab === 'general' && (
            <Card title="Základní informace">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Název kurzu"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    placeholder="Anatomické roviny"
                  />
                  <Input
                    label="Slug (URL)"
                    value={course.slug}
                    onChange={(e) => setCourse({ ...course, slug: e.target.value })}
                    placeholder="anatomicke-roviny"
                  />
                </div>
                
                <Input
                  label="Podtitul"
                  value={course.subtitle}
                  onChange={(e) => setCourse({ ...course, subtitle: e.target.value })}
                  placeholder="Jak popisujeme polohu struktur"
                />
                
                <Textarea
                  label="Popis"
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  rows={3}
                  placeholder="Detailní popis kurzu..."
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Ikona"
                    value={course.icon}
                    onChange={(e) => setCourse({ ...course, icon: e.target.value })}
                    placeholder="Book, Bone, Heart..."
                  />
                  <Input
                    label="Barva"
                    type="color"
                    value={course.color}
                    onChange={(e) => setCourse({ ...course, color: e.target.value })}
                  />
                </div>
                
                <Select
                  label="Přiřazený profesor"
                  value={course.professor_id}
                  onChange={(e) => setCourse({ ...course, professor_id: e.target.value })}
                  options={PROFESSORS.map(p => ({
                    value: p.id,
                    label: `${p.name} (${p.teachingMethod})`,
                  }))}
                />
              </div>
            </Card>
          )}
          
          {/* Tab: Lessons */}
          {activeTab === 'lessons' && (
            <Card 
              title="Lekce" 
              subtitle="Přetáhněte pro změnu pořadí"
              actions={
                <Link href={`/admin/lessons/new?topic=${courseId}`}>
                  <Button size="sm">+ Nová lekce</Button>
                </Link>
              }
            >
              {lessons.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">Zatím žádné lekce</p>
                  <Link href={`/admin/lessons/new?topic=${courseId}`}>
                    <Button>Vytvořit první lekci</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg border bg-white
                        cursor-move hover:shadow-sm transition-shadow
                        ${draggedIndex === index ? 'opacity-50 border-[#7A9E8E]' : 'border-gray-200'}
                      `}
                    >
                      <div className="cursor-grab active:cursor-grabbing">
                        <DragHandle />
                      </div>
                      
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{lesson.title}</p>
                        <p className="text-xs text-gray-500">
                          {lesson.points} bodů • {lesson.xp} XP
                        </p>
                      </div>
                      
                      <Link href={`/admin/lessons/${lesson.id}`}>
                        <Button variant="ghost" size="sm">Upravit</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Questions link */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Quiz otázky</p>
                    <p className="text-sm text-gray-500">{questionCount} otázek pro tento kurz</p>
                  </div>
                  <Link href={`/admin/questions?topic=${courseId}`}>
                    <Button variant="secondary" size="sm">Spravovat otázky</Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
          
          {/* Tab: Settings */}
          {activeTab === 'settings' && (
            <Card title="Nastavení">
              <div className="space-y-6">
                {/* Visibility */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Viditelnost</h4>
                  
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">Publikovat kurz</p>
                      <p className="text-sm text-gray-500">Kurz bude viditelný pro studenty</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={course.is_published}
                      onChange={(e) => setCourse({ ...course, is_published: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-[#7A9E8E] focus:ring-[#7A9E8E]"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">Zamknout kurz</p>
                      <p className="text-sm text-gray-500">Kurz bude vyžadovat předchozí dokončení</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={course.is_locked}
                      onChange={(e) => setCourse({ ...course, is_locked: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-[#7A9E8E] focus:ring-[#7A9E8E]"
                    />
                  </label>
                </div>
                
                {/* Danger zone */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-red-600 mb-4">Danger Zone</h4>
                  <Button 
                    variant="danger" 
                    onClick={() => {
                      if (confirm('Opravdu chcete smazat tento kurz? Tato akce je nevratná.')) {
                        alert('V produkci by se kurz smazal (soft delete)');
                      }
                    }}
                  >
                    Smazat kurz
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
