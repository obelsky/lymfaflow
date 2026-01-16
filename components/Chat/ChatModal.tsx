'use client';

// ============================================
// POLYMATH ACADEMY - Chat Modal
// Floating chat modal pro lekce
// ============================================

import React, { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { getProfessorById } from '@/lib/data/professors';
import { ProfessorAvatar } from '@/components/Professor';

interface ChatModalProps {
  lessonId?: string;
  lessonTitle?: string;
  lessonContent?: string;
  defaultProfessorId?: string;
}

export function ChatModal({ 
  lessonId, 
  lessonTitle, 
  lessonContent,
  defaultProfessorId = 'davinci' 
}: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const professor = getProfessorById(defaultProfessorId)!;
  
  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-40
          w-14 h-14 rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-200 hover:scale-110
          ${isOpen ? 'scale-0' : 'scale-100'}
        `}
        style={{ backgroundColor: professor.accentColor }}
      >
        <div className="relative">
          <ProfessorAvatar 
            professorId={professor.id}
            className="w-8 h-8"
            color="#fff"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>
      </button>
      
      {/* Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-24 z-40 animate-pulse">
          <div className="bg-white px-4 py-2 rounded-xl shadow-lg text-sm">
            <p className="font-medium text-gray-900">Potřebuješ pomoct?</p>
            <p className="text-gray-500">Zeptej se {professor.shortName}!</p>
          </div>
        </div>
      )}
      
      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat window */}
          <div className={`
            fixed z-50
            
            /* Mobile: fullscreen */
            inset-4
            
            /* Desktop: floating panel */
            lg:inset-auto lg:bottom-6 lg:right-6
            lg:w-[420px] lg:h-[600px]
            
            transition-all duration-200
          `}>
            <ChatWindow
              initialProfessorId={defaultProfessorId}
              lessonContext={lessonId ? {
                lessonId,
                lessonTitle,
                lessonContent,
              } : undefined}
              onClose={() => setIsOpen(false)}
              className="h-full"
            />
          </div>
        </>
      )}
    </>
  );
}

// ============================================
// CHAT BUBBLE (Inline)
// ============================================

interface ChatBubbleProps {
  professorId: string;
  message: string;
  showReply?: boolean;
  onReply?: () => void;
}

export function ChatBubble({ professorId, message, showReply = true, onReply }: ChatBubbleProps) {
  const professor = getProfessorById(professorId)!;
  
  return (
    <div 
      className="rounded-xl p-4 mb-4"
      style={{ backgroundColor: `${professor.accentColor}10` }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${professor.accentColor}20` }}
        >
          <ProfessorAvatar 
            professorId={professor.id}
            className="w-7 h-7"
            color={professor.accentColor}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{professor.shortName}</span>
            <span className="text-xs text-gray-500">{professor.teachingMethod}</span>
          </div>
          <p className="text-sm text-gray-700">{message}</p>
          
          {showReply && (
            <button
              onClick={onReply}
              className="mt-2 text-sm font-medium hover:underline"
              style={{ color: professor.accentColor }}
            >
              Zeptej se na víc →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// PROFESSOR HINT
// ============================================

interface ProfessorHintProps {
  professorId: string;
  topic: string;
  onClick?: () => void;
}

export function ProfessorHint({ professorId, topic, onClick }: ProfessorHintProps) {
  const professor = getProfessorById(professorId)!;
  
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
    >
      <div 
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: professor.accentColor }}
      >
        <ProfessorAvatar 
          professorId={professor.id}
          className="w-4 h-4"
          color="#fff"
        />
      </div>
      <span className="text-gray-700">
        Zeptej se {professor.shortName} na {topic}
      </span>
    </button>
  );
}
