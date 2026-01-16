// ============================================
// LYMFAFLOW - AI Explain Card
// Inline AI vysvětlení
// ============================================

'use client';

import React from 'react';
import { BioloIcons } from '@/components/BioloIcons';

interface AIExplainCardProps {
  explanation: string;
  professor: string;
  loading?: boolean;
  onClose?: () => void;
  compact?: boolean;
}

export function AIExplainCard({
  explanation,
  professor,
  loading = false,
  onClose,
  compact = false,
}: AIExplainCardProps) {
  if (compact) {
    return (
      <div className="p-3 bg-[#F0F5F2] rounded-lg border border-[#A8C4B8]/30">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-[#7A9E8E] flex items-center justify-center">
            <BioloIcons.aiChat className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-[#7A9E8E]">{professor} vysvětluje</span>
          {onClose && (
            <button 
              onClick={onClose}
              className="ml-auto text-xs text-[#9BA8B4] hover:text-[#6B7B8A]"
            >
              ✕
            </button>
          )}
        </div>
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-[#7A9E8E] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#6B7B8A]">Přemýšlím...</span>
          </div>
        ) : (
          <p className="text-sm text-[#2D3640]">{explanation}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-xl p-4 border border-[#E8E0D0]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-[#7A9E8E] flex items-center justify-center">
          <BioloIcons.aiChat className="w-4 h-4 text-white" />
        </div>
        <span className="text-xs font-semibold text-[#7A9E8E] uppercase tracking-wide">
          {loading ? 'Přemýšlím...' : `${professor} radí`}
        </span>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-auto text-xs text-[#9BA8B4] hover:text-[#6B7B8A]"
          >
            ✕
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="flex items-center gap-2 text-[#6B7B8A]">
          <div className="w-4 h-4 border-2 border-[#7A9E8E] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Připravuji vysvětlení...</span>
        </div>
      ) : (
        <p className="text-[#2D3640] leading-relaxed">{explanation}</p>
      )}
    </div>
  );
}

// === AI ASK BUTTON ===

interface AIAskButtonProps {
  onClick: () => void;
  className?: string;
}

export function AIAskButton({ onClick, className = '' }: AIAskButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full 
                  bg-[#7A9E8E]/10 hover:bg-[#7A9E8E]/20 flex items-center justify-center ${className}`}
      title="Vysvětli jinak"
    >
      <span className="text-xs">💡</span>
    </button>
  );
}
