// ============================================
// LYMFAFLOW - Sidebar Navigation
// Desktop navigation
// ============================================

'use client';

import React from 'react';
import Link from 'next/link';
import { BioloIcons } from '@/components/BioloIcons';
import { LEVELS, getCurrentLevel, getProgressToNextLevel, type TabType, type User } from '@/components/Learning/types';

interface SidebarProps {
  user: User;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Sidebar({ user, activeTab, onTabChange }: SidebarProps) {
  const currentLevel = getCurrentLevel(user.xp);
  const progressToNext = getProgressToNextLevel(user.xp, currentLevel);
  
  const navItems: { id: TabType; icon: React.FC<{ className?: string }>; label: string }[] = [
    { id: 'map', icon: BioloIcons.bodyMap, label: 'Mapa těla' },
    { id: 'knowledge', icon: BioloIcons.knowledge, label: 'Vzdělávání' },
    { id: 'train', icon: BioloIcons.dailyTrain, label: 'Denní trénink' },
    { id: 'profile', icon: BioloIcons.profile, label: 'Profil' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-56 bg-[#2D3640] text-white flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7A9E8E] flex items-center justify-center">
            <BioloIcons.bodyMap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white">LymfaFlow</h1>
            <p className="text-xs text-white/50">Anatomy Explorer</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#7A9E8E] flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-xs text-[#7A9E8E]">{LEVELS[currentLevel].name}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div className="bg-white/5 rounded-lg py-2">
            <p className="text-lg font-semibold text-white">{user.streak}</p>
            <p className="text-[10px] text-white/50">dní</p>
          </div>
          <div className="bg-white/5 rounded-lg py-2">
            <p className="text-lg font-semibold text-white">{user.xp}</p>
            <p className="text-[10px] text-white/50">XP</p>
          </div>
          <div className="bg-white/5 rounded-lg py-2">
            <p className="text-lg font-semibold text-white">{user.completedLessons.length}</p>
            <p className="text-[10px] text-white/50">lekcí</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-white/50">{LEVELS[currentLevel].name}</span>
          <span className="text-white/50">{LEVELS[currentLevel + 1]?.name || 'Max'}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#7A9E8E] rounded-full transition-all" 
            style={{ width: `${progressToNext}%` }} 
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              activeTab === item.id
                ? 'bg-[#7A9E8E] text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
        
        {/* AI Chat Link */}
        <Link
          href="/chat"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all
                     bg-gradient-to-r from-[#7A9E8E]/20 to-[#5C7D6D]/20 
                     text-white hover:from-[#7A9E8E]/30 hover:to-[#5C7D6D]/30 mt-4 border border-white/10"
        >
          <BioloIcons.aiChat className="w-5 h-5" />
          <span className="font-medium text-sm">AI Profesor</span>
          <span className="ml-auto text-xs bg-[#7A9E8E] px-2 py-0.5 rounded-full">NEW</span>
        </Link>
      </nav>

      {/* Level indicator */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/50">{LEVELS[currentLevel].name}</span>
          <span className="text-[#7A9E8E]">{user.xp} XP</span>
        </div>
      </div>
    </aside>
  );
}
