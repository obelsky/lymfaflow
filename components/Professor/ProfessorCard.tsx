// ============================================
// POLYMATH ACADEMY - Professor Card
// Kartička profesora pro výběr nebo přehled
// ============================================

'use client';

import React from 'react';
import { ProfessorAvatar } from './ProfessorAvatar';
import type { Professor } from '@/types/professor';

interface ProfessorCardProps {
  professor: Professor;
  variant?: 'default' | 'compact' | 'selectable';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ProfessorCard: React.FC<ProfessorCardProps> = ({
  professor,
  variant = 'default',
  selected = false,
  onClick,
  className = '',
}) => {
  // Teaching method ikony
  const methodIcons: Record<string, string> = {
    visual: '🎨',
    socratic: '❓',
    experimental: '🧪',
    storytelling: '📖',
    debugging: '🔍',
  };
  
  // Kompaktní varianta
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center gap-3 p-3 rounded-xl
          transition-all hover:scale-[1.02] active:scale-[0.98]
          ${selected 
            ? 'ring-2 shadow-md' 
            : 'bg-white hover:shadow-sm'
          }
          ${className}
        `}
        style={{ 
          backgroundColor: selected ? `${professor.accentColor}10` : undefined,
          ringColor: selected ? professor.accentColor : undefined,
        }}
      >
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${professor.accentColor}20` }}
        >
          <ProfessorAvatar 
            professorId={professor.id} 
            className="w-8 h-8"
            color={professor.accentColor}
          />
        </div>
        <div className="flex-1 text-left">
          <h4 className="font-semibold text-sm text-[#2D3640]">
            {professor.shortName}
          </h4>
          <p className="text-xs text-gray-500">
            {professor.primaryField}
          </p>
        </div>
        {selected && (
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
            style={{ backgroundColor: professor.accentColor }}
          >
            ✓
          </div>
        )}
      </button>
    );
  }
  
  // Selectable varianta
  if (variant === 'selectable') {
    return (
      <button
        onClick={onClick}
        className={`
          relative overflow-hidden rounded-2xl p-5 text-left
          transition-all hover:scale-[1.02] active:scale-[0.98]
          ${selected 
            ? 'ring-2 shadow-lg' 
            : 'bg-white shadow-sm hover:shadow-md'
          }
          ${className}
        `}
        style={{ 
          ringColor: selected ? professor.accentColor : undefined,
        }}
      >
        {/* Selected indicator */}
        {selected && (
          <div 
            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: professor.accentColor }}
          >
            ✓
          </div>
        )}
        
        {/* Avatar */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${professor.accentColor}15` }}
        >
          <ProfessorAvatar 
            professorId={professor.id} 
            className="w-12 h-12"
            color={professor.accentColor}
          />
        </div>
        
        {/* Info */}
        <h3 className="font-bold text-[#2D3640] mb-1">
          {professor.shortName}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {professor.era}
        </p>
        
        {/* Tagline */}
        <p className="text-sm text-gray-600 italic mb-3">
          "{professor.tagline}"
        </p>
        
        {/* Method badge */}
        <div 
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: `${professor.accentColor}15`,
            color: professor.accentColor,
          }}
        >
          <span>{methodIcons[professor.teachingMethod]}</span>
          <span className="capitalize">{professor.teachingMethod}</span>
        </div>
      </button>
    );
  }
  
  // Default varianta - plná karta
  return (
    <div 
      className={`
        rounded-2xl overflow-hidden shadow-md
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Header s gradientem */}
      <div 
        className="p-5"
        style={{ 
          background: `linear-gradient(135deg, ${professor.gradientFrom}, ${professor.gradientTo})` 
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <ProfessorAvatar 
              professorId={professor.id} 
              className="w-14 h-14"
              color="white"
            />
          </div>
          <div className="text-white">
            <h3 className="text-lg font-bold">{professor.name}</h3>
            <p className="text-white/70 text-sm">{professor.era}</p>
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="bg-white p-5">
        {/* Quote */}
        <p className="text-gray-600 italic text-sm mb-3">
          "{professor.quote}"
        </p>
        
        {/* Tagline */}
        <p 
          className="font-medium text-sm mb-4"
          style={{ color: professor.accentColor }}
        >
          {professor.tagline}
        </p>
        
        {/* Fields */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span 
            className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: professor.accentColor }}
          >
            {professor.primaryField}
          </span>
          {professor.secondaryFields.slice(0, 2).map(field => (
            <span 
              key={field}
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${professor.accentColor}15`,
                color: professor.accentColor,
              }}
            >
              {field}
            </span>
          ))}
        </div>
        
        {/* Teaching method */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{methodIcons[professor.teachingMethod]}</span>
          <span>Metoda: <span className="capitalize">{professor.teachingMethod}</span></span>
        </div>
        
        {/* Signature phrases */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Typické fráze:</p>
          <div className="space-y-1">
            {professor.signaturePhrases.slice(0, 2).map((phrase, i) => (
              <p key={i} className="text-xs text-gray-600 italic">
                "{phrase}"
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid profesorů pro výběr
interface ProfessorGridProps {
  professors: Professor[];
  selectedId?: string;
  onSelect?: (professor: Professor) => void;
  variant?: 'default' | 'compact' | 'selectable';
  columns?: 2 | 3;
}

export const ProfessorGrid: React.FC<ProfessorGridProps> = ({
  professors,
  selectedId,
  onSelect,
  variant = 'selectable',
  columns = 2,
}) => {
  return (
    <div 
      className={`
        grid gap-4
        ${columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}
      `}
    >
      {professors.map(professor => (
        <ProfessorCard
          key={professor.id}
          professor={professor}
          variant={variant}
          selected={professor.id === selectedId}
          onClick={() => onSelect?.(professor)}
        />
      ))}
    </div>
  );
};

export default ProfessorCard;
