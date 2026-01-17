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
      <div className="p-3 bg-gradient-to-br from-[#F0F5F2] to-[#E8F0EA] rounded-lg border border-[#A8C4B8]/30 relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A9E8E]/5 via-[#7A9E8E]/10 to-[#7A9E8E]/5 animate-pulse" />
        
        <div className="relative flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7A9E8E] to-[#5C7D6D] flex items-center justify-center shadow-sm">
            <BioloIcons.daVinci className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold text-[#5C7D6D]">{professor} vysvětluje</span>
          {onClose && (
            <button 
              onClick={onClose}
              className="ml-auto w-5 h-5 rounded-full bg-[#9BA8B4]/10 hover:bg-[#9BA8B4]/20 flex items-center justify-center transition-colors"
            >
              <BioloIcons.close className="w-3 h-3 text-[#9BA8B4]" />
            </button>
          )}
        </div>
        {loading ? (
          <div className="relative flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#7A9E8E] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#6B7B8A]">Přemýšlím...</span>
          </div>
        ) : (
          <p className="relative text-sm text-[#2D3640] leading-relaxed">{explanation}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/90 to-[#F0F5F2]/90 rounded-xl p-4 border border-[#A8C4B8]/30 shadow-lg relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7A9E8E]/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#A8C4B8]/10 rounded-full blur-xl" />
      
      <div className="relative flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7A9E8E] to-[#5C7D6D] flex items-center justify-center shadow-md ring-2 ring-[#7A9E8E]/20">
          <BioloIcons.daVinci className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[#5C7D6D] uppercase tracking-wide block">
            {loading ? 'Přemýšlím...' : `${professor} radí`}
          </span>
          <span className="text-[10px] text-[#9BA8B4]">AI asistent</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-auto w-6 h-6 rounded-full bg-[#9BA8B4]/10 hover:bg-[#9BA8B4]/20 flex items-center justify-center transition-colors"
          >
            <BioloIcons.close className="w-4 h-4 text-[#9BA8B4]" />
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="relative flex items-center gap-2 text-[#6B7B8A]">
          <div className="w-5 h-5 border-2 border-[#7A9E8E] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Připravuji vysvětlení...</span>
        </div>
      ) : (
        <p className="relative text-[#2D3640] leading-relaxed">{explanation}</p>
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
      className={`opacity-0 group-hover:opacity-100 transition-all duration-200 w-7 h-7 rounded-full 
                  bg-gradient-to-br from-[#7A9E8E]/10 to-[#7A9E8E]/20 hover:from-[#7A9E8E]/20 hover:to-[#7A9E8E]/30
                  hover:scale-110 hover:shadow-sm
                  flex items-center justify-center ${className}`}
      title="Vysvětli jinak"
    >
      <BioloIcons.daVinci className="w-4 h-4 text-[#5C7D6D]" />
    </button>
  );
}
