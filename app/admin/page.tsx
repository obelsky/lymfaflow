'use client';

// ============================================
// POLYMATH ACADEMY - Admin Dashboard
// Přehled statistik a rychlé akce
// ============================================

import React from 'react';
import Link from 'next/link';
import { AdminLayout, StatCard, Card, Badge, AdminIcons } from '@/components/Admin';
import { PROFESSORS } from '@/lib/data/professors';
import { TOPICS, LEVELS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import { KNOWLEDGE_ITEMS, KNOWLEDGE_CATEGORIES } from '@/lib/data/knowledge';
import { ProfessorAvatar } from '@/components/Professor';

// Ikony pro statistiky
const StatsIcons = {
  Professors: AdminIcons.Professors,
  Courses: AdminIcons.Courses,
  Lessons: AdminIcons.Lessons,
  Questions: AdminIcons.Questions,
  Students: AdminIcons.Students,
  Knowledge: AdminIcons.Knowledge,
};

// Quick Actions
const quickActions = [
  { label: 'Nový profesor', href: '/admin/professors/new', icon: '🎓', color: 'bg-[#7A9E8E]' },
  { label: 'Nová lekce', href: '/admin/lessons/new', icon: '📖', color: 'bg-[#5B8AF7]' },
  { label: 'Nová otázka', href: '/admin/questions/new', icon: '❓', color: 'bg-[#9B7ED9]' },
  { label: 'Knowledge item', href: '/admin/knowledge/new', icon: '💡', color: 'bg-[#F5A623]' },
];

export default function AdminDashboard() {
  // Spočítat statistiky
  const totalLessons = Object.values(LESSONS).flat().length;
  const totalQuestions = Object.values(QUIZ_QUESTIONS).flat().length;
  
  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Přehled Polymath Academy"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Profesoři"
          value={PROFESSORS.length}
          icon={StatsIcons.Professors}
          change="Aktivní"
          changeType="positive"
        />
        <StatCard
          label="Témata"
          value={TOPICS.length}
          icon={StatsIcons.Courses}
        />
        <StatCard
          label="Lekce"
          value={totalLessons}
          icon={StatsIcons.Lessons}
        />
        <StatCard
          label="Otázky"
          value={totalQuestions}
          icon={StatsIcons.Questions}
        />
      </div>
      
      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <Card title="Rychlé akce" className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-lg`}>
                  {action.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>
        
        {/* Professors Overview */}
        <Card 
          title="Profesoři" 
          subtitle={`${PROFESSORS.length} aktivních`}
          className="lg:col-span-2"
          actions={
            <Link 
              href="/admin/professors" 
              className="text-sm text-[#7A9E8E] hover:underline"
            >
              Zobrazit vše →
            </Link>
          }
        >
          <div className="space-y-3">
            {PROFESSORS.map((prof) => (
              <Link
                key={prof.id}
                href={`/admin/professors/${prof.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${prof.accentColor}15` }}
                >
                  <ProfessorAvatar 
                    professorId={prof.id}
                    className="w-10 h-10"
                    color={prof.accentColor}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900">{prof.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{prof.tagline}</p>
                </div>
                <Badge variant="success">{prof.teachingMethod}</Badge>
              </Link>
            ))}
          </div>
        </Card>
        
        {/* Topics Overview */}
        <Card 
          title="Témata" 
          subtitle={`${TOPICS.length} témat`}
          actions={
            <Link 
              href="/admin/courses" 
              className="text-sm text-[#7A9E8E] hover:underline"
            >
              Spravovat →
            </Link>
          }
        >
          <div className="space-y-2">
            {TOPICS.slice(0, 5).map((topic) => {
              const lessonCount = LESSONS[topic.id]?.length || 0;
              const questionCount = QUIZ_QUESTIONS[topic.id]?.length || 0;
              
              return (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: topic.color }}
                    />
                    <span className="font-medium text-gray-700">{topic.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{lessonCount} lekcí</span>
                    <span>•</span>
                    <span>{questionCount} otázek</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        
        {/* Knowledge Base Overview */}
        <Card 
          title="Knowledge Base" 
          subtitle={`${KNOWLEDGE_ITEMS.length} položek`}
          actions={
            <Link 
              href="/admin/knowledge" 
              className="text-sm text-[#7A9E8E] hover:underline"
            >
              Spravovat →
            </Link>
          }
        >
          <div className="space-y-2">
            {KNOWLEDGE_CATEGORIES.map((cat) => {
              const itemCount = KNOWLEDGE_ITEMS.filter(i => i.category_id === cat.id).length;
              
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                      style={{ background: cat.gradient }}
                    >
                      {cat.icon.slice(0, 1)}
                    </div>
                    <span className="font-medium text-gray-700">{cat.title}</span>
                  </div>
                  <Badge>{itemCount} položek</Badge>
                </div>
              );
            })}
          </div>
        </Card>
        
        {/* Levels Overview */}
        <Card 
          title="Level systém" 
          subtitle={`${LEVELS.length} úrovní`}
        >
          <div className="space-y-2">
            {LEVELS.map((level) => (
              <div
                key={level.level}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{level.icon}</span>
                  <span className="font-medium text-gray-700">{level.name}</span>
                </div>
                <span className="text-sm text-gray-500">{level.min_xp}+ XP</span>
              </div>
            ))}
          </div>
        </Card>
        
      </div>
      
      {/* System Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-xl">
        <h3 className="font-medium text-gray-700 mb-3">Systémové informace</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Verze:</span>
            <span className="ml-2 font-medium">1.0.0</span>
          </div>
          <div>
            <span className="text-gray-500">Databáze:</span>
            <span className="ml-2 font-medium text-amber-600">Lokální (TS)</span>
          </div>
          <div>
            <span className="text-gray-500">AI Profesoři:</span>
            <span className="ml-2 font-medium text-green-600">Aktivní</span>
          </div>
          <div>
            <span className="text-gray-500">Supabase:</span>
            <span className="ml-2 font-medium text-gray-400">Připraveno</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
