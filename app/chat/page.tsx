'use client';

// ============================================
// POLYMATH ACADEMY - Chat Page
// Samostatná stránka pro chat s profesory
// ============================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChatWindow } from '@/components/Chat';
import { PROFESSORS, getProfessorById } from '@/lib/data/professors';
import { LESSONS } from '@/lib/data/lessons';
import { TOPICS } from '@/lib/data/topics';
import { ProfessorAvatar } from '@/components/Professor';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const professorIdParam = searchParams.get('professor');
  const lessonIdParam = searchParams.get('lesson');
  
  const [selectedProfessorId, setSelectedProfessorId] = useState(professorIdParam || 'davinci');
  const [chatStarted, setChatStarted] = useState(false);
  
  // Find lesson context if provided
  let lessonContext = undefined;
  if (lessonIdParam) {
    for (const [topicId, lessons] of Object.entries(LESSONS)) {
      const lesson = lessons.find(l => l.id === lessonIdParam);
      if (lesson) {
        const topic = TOPICS.find(t => t.id === topicId);
        lessonContext = {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonContent: lesson.human_explanation,
        };
        break;
      }
    }
  }
  
  // Professor selection screen
  if (!chatStarted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Zpět</span>
            </Link>
            <h1 className="font-semibold text-gray-900">Chat s profesorem</h1>
            <div className="w-16" /> {/* Spacer */}
          </div>
        </header>
        
        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Lesson context */}
          {lessonContext && (
            <div className="mb-8 p-4 bg-[#7A9E8E]/10 rounded-xl">
              <p className="text-sm text-[#7A9E8E] mb-1">Kontext lekce</p>
              <h2 className="font-semibold text-gray-900">{lessonContext.lessonTitle}</h2>
            </div>
          )}
          
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vyber si profesora
            </h2>
            <p className="text-gray-600">
              Každý profesor má jedinečný styl výuky. Vyber si toho, kdo ti nejvíc sedne.
            </p>
          </div>
          
          {/* Professor grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {PROFESSORS.map((prof) => {
              const isSelected = prof.id === selectedProfessorId;
              
              return (
                <button
                  key={prof.id}
                  onClick={() => setSelectedProfessorId(prof.id)}
                  className={`
                    p-5 rounded-xl text-left transition-all
                    ${isSelected 
                      ? 'bg-white ring-2 ring-[#7A9E8E] shadow-lg' 
                      : 'bg-white hover:shadow-md border border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${prof.accentColor}15` }}
                    >
                      <ProfessorAvatar 
                        professorId={prof.id}
                        className="w-10 h-10"
                        color={prof.accentColor}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{prof.name}</h3>
                      <p className="text-sm text-gray-500">{prof.era}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#7A9E8E] flex items-center justify-center text-white">
                        ✓
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-600">
                    {prof.tagline}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <span 
                      className="text-xs px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: prof.accentColor }}
                    >
                      {prof.teachingMethod}
                    </span>
                    <span className="text-xs text-gray-500">
                      {prof.primaryField}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Start chat button */}
          <div className="text-center">
            <button
              onClick={() => setChatStarted(true)}
              className="px-8 py-4 bg-[#7A9E8E] text-white rounded-xl font-semibold
                         hover:bg-[#6A8E7E] transition-colors shadow-lg"
            >
              Začít chat s {getProfessorById(selectedProfessorId)?.shortName}
            </button>
          </div>
          
          {/* Info */}
          <div className="mt-8 p-4 bg-amber-50 rounded-xl text-center">
            <p className="text-sm text-amber-800">
              💡 <strong>Tip:</strong> Můžeš profesory kdykoli přepnout během chatu.
              Systém ti také může doporučit jiného profesora, pokud tvá otázka spadá do jeho oboru.
            </p>
          </div>
        </main>
      </div>
    );
  }
  
  // Chat screen
  return (
    <div className="h-screen flex flex-col bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setChatStarted(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Zpět</span>
          </button>
          
          {lessonContext && (
            <div className="text-center">
              <p className="text-xs text-gray-500">Lekce</p>
              <p className="text-sm font-medium text-gray-900">{lessonContext.lessonTitle}</p>
            </div>
          )}
          
          <Link 
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Zavřít
          </Link>
        </div>
      </header>
      
      {/* Chat */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto">
          <ChatWindow
            initialProfessorId={selectedProfessorId}
            lessonContext={lessonContext}
            className="h-full rounded-none shadow-none"
          />
        </div>
      </main>
    </div>
  );
}
