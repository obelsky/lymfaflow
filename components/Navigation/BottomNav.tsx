// ============================================
// LYMFAFLOW - Bottom Navigation
// Mobile navigation
// ============================================

'use client';

import React from 'react';
import Link from 'next/link';
import { BioloIcons } from '@/components/BioloIcons';
import { type TabType } from '@/components/Learning/types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: TabType; icon: React.FC<{ className?: string }>; label: string }[] = [
    { id: 'map', icon: BioloIcons.bodyMap, label: 'Mapa' },
    { id: 'knowledge', icon: BioloIcons.knowledge, label: 'Vzdělávání' },
    { id: 'br', icon: BioloIcons.brFlask, label: 'BR' },
    { id: 'train', icon: BioloIcons.dailyTrain, label: 'Trénink' },
    { id: 'profile', icon: BioloIcons.profile, label: 'Profil' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E6EA] z-50">
      <div className="flex justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeTab === item.id
                ? 'text-[#7A9E8E]'
                : 'text-[#9BA8B4]'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      
      {/* Floating AI Chat Button */}
      <Link
        href="/chat"
        className="absolute -top-16 right-4 w-14 h-14 bg-gradient-to-br from-[#7A9E8E] to-[#5C7D6D] 
                   rounded-full shadow-lg flex items-center justify-center text-white
                   hover:shadow-xl hover:scale-105 transition-all"
      >
        <BioloIcons.aiChat className="w-7 h-7" />
      </Link>
    </nav>
  );
}
