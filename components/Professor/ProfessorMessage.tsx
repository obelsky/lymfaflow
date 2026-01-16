// ============================================
// POLYMATH ACADEMY - Professor Message
// "Profesor říká..." bublina
// ============================================

'use client';

import React from 'react';
import { ProfessorAvatar } from './ProfessorAvatar';
import { getProfessorById } from '@/lib/data/professors';

interface ProfessorMessageProps {
  professorId: string;
  children: React.ReactNode;
  variant?: 'default' | 'intro' | 'question' | 'tip' | 'handoff';
  showName?: boolean;
  className?: string;
  onContinue?: () => void;
}

export const ProfessorMessage: React.FC<ProfessorMessageProps> = ({
  professorId,
  children,
  variant = 'default',
  showName = true,
  className = '',
  onContinue,
}) => {
  const professor = getProfessorById(professorId);
  
  if (!professor) return null;
  
  // Varianty stylů
  const variantStyles = {
    default: {
      bg: 'bg-white',
      border: `border-l-4`,
      borderColor: professor.accentColor,
      icon: null,
    },
    intro: {
      bg: 'bg-gradient-to-br from-white to-gray-50',
      border: 'border',
      borderColor: professor.accentColor,
      icon: '👋',
    },
    question: {
      bg: 'bg-purple-50',
      border: 'border-l-4 border-purple-400',
      borderColor: '#9B7ED9',
      icon: '❓',
    },
    tip: {
      bg: 'bg-amber-50',
      border: 'border-l-4 border-amber-400',
      borderColor: '#F5A623',
      icon: '💡',
    },
    handoff: {
      bg: 'bg-blue-50',
      border: 'border-l-4 border-blue-400',
      borderColor: '#5B8AF7',
      icon: '🔄',
    },
  };
  
  const style = variantStyles[variant];
  
  return (
    <div 
      className={`
        rounded-2xl p-5 shadow-sm
        ${style.bg} ${style.border}
        ${className}
      `}
      style={{ borderLeftColor: style.borderColor }}
    >
      {/* Header s avatarem */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ backgroundColor: `${professor.accentColor}20` }}
        >
          <ProfessorAvatar 
            professorId={professorId} 
            className="w-12 h-12"
            color={professor.accentColor}
          />
        </div>
        
        {/* Obsah */}
        <div className="flex-1 min-w-0">
          {/* Jméno profesora */}
          {showName && (
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="font-semibold text-sm"
                style={{ color: professor.accentColor }}
              >
                {professor.shortName}
              </span>
              <span className="text-xs text-gray-400">říká:</span>
              {style.icon && (
                <span className="text-sm">{style.icon}</span>
              )}
            </div>
          )}
          
          {/* Zpráva */}
          <div className="text-[#2D3640] text-[15px] leading-relaxed whitespace-pre-line">
            {children}
          </div>
        </div>
      </div>
      
      {/* Tlačítko pokračovat */}
      {onContinue && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onContinue}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              text-white transition-all
              hover:opacity-90 active:scale-[0.98]
            "
            style={{ backgroundColor: professor.accentColor }}
          >
            Pokračovat →
          </button>
        </div>
      )}
    </div>
  );
};

// Speciální varianta pro intro
interface ProfessorIntroProps {
  professorId: string;
  onStart?: () => void;
}

export const ProfessorIntro: React.FC<ProfessorIntroProps> = ({
  professorId,
  onStart,
}) => {
  const professor = getProfessorById(professorId);
  
  if (!professor) return null;
  
  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{ 
        background: `linear-gradient(135deg, ${professor.gradientFrom}, ${professor.gradientTo})` 
      }}
    >
      {/* Header */}
      <div className="p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <ProfessorAvatar 
              professorId={professorId} 
              className="w-14 h-14"
              color="white"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{professor.name}</h3>
            <p className="text-white/70 text-sm">{professor.era}</p>
          </div>
        </div>
        
        <p className="text-white/90 text-lg italic mb-2">
          "{professor.quote}"
        </p>
        <p className="text-white/60 text-sm">
          {professor.tagline}
        </p>
      </div>
      
      {/* Intro zpráva */}
      <div className="bg-white p-6">
        <p className="text-[#2D3640] text-[15px] leading-relaxed whitespace-pre-line mb-4">
          {professor.introMessage}
        </p>
        
        {onStart && (
          <button
            onClick={onStart}
            className="
              w-full py-3 rounded-xl text-white font-semibold
              transition-all hover:opacity-90 active:scale-[0.98]
            "
            style={{ backgroundColor: professor.accentColor }}
          >
            Začít s {professor.shortName} →
          </button>
        )}
      </div>
    </div>
  );
};

// Kompaktní verze pro inline použití
interface ProfessorQuoteProps {
  professorId: string;
  children: React.ReactNode;
  className?: string;
}

export const ProfessorQuote: React.FC<ProfessorQuoteProps> = ({
  professorId,
  children,
  className = '',
}) => {
  const professor = getProfessorById(professorId);
  
  if (!professor) return null;
  
  return (
    <div 
      className={`flex items-start gap-3 py-3 ${className}`}
    >
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${professor.accentColor}15` }}
      >
        <ProfessorAvatar 
          professorId={professorId} 
          className="w-6 h-6"
          color={professor.accentColor}
        />
      </div>
      <div className="flex-1">
        <span 
          className="text-xs font-medium"
          style={{ color: professor.accentColor }}
        >
          {professor.shortName}:
        </span>
        <p className="text-[#2D3640] text-sm leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};

export default ProfessorMessage;
