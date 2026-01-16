'use client';

import React, { useState, useCallback } from 'react';
import { DaliIcons } from '@/components/DaliIcons';
import { TOPICS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import type { Topic, Lesson, QuizQuestion } from '@/types';

// Helper funkce
const getRandomQuestions = (topicId: string, count: number = 5): QuizQuestion[] => {
  const questions = QUIZ_QUESTIONS[topicId] || [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Levels
const LEVELS = [
  { level: 1, name: 'Nováček', icon: '🌟', minXP: 0, maxXP: 50 },
  { level: 2, name: 'Objevitel', icon: '🔍', minXP: 50, maxXP: 100 },
  { level: 3, name: 'Učeň', icon: '🌱', minXP: 100, maxXP: 200 },
  { level: 4, name: 'Student', icon: '📚', minXP: 200, maxXP: 350 },
  { level: 5, name: 'Praktikant', icon: '🔬', minXP: 350, maxXP: 500 },
  { level: 6, name: 'Pokročilý', icon: '⭐', minXP: 500, maxXP: 700 },
  { level: 7, name: 'Expert', icon: '🎓', minXP: 700, maxXP: 1000 },
  { level: 8, name: 'Mistr', icon: '👑', minXP: 1000, maxXP: Infinity },
];

// ============================================
// BIOLO-AI: Living Anatomy Explorer
// Soft Biotech Design System
// ============================================

// === BIOLO-AI IKONY (line-art, organické) ===
const BioloIcons = {
  // Mapa těla - krajina/reliéf
  bodyMap: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c1.5 0 2.5 1 2.5 2.5S13.5 7 12 7s-2.5-1-2.5-2.5S10.5 2 12 2z" />
      <path d="M12 7v3" />
      <path d="M8 10h8" />
      <path d="M9 10v6l-2 6" />
      <path d="M15 10v6l2 6" />
      <path d="M12 13v4" />
      <circle cx="12" cy="4.5" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  // Denní trénink - organický růst
  dailyTrain: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c0-4 2-6 2-10s-2-6-2-10" />
      <path d="M12 22c0-4-2-6-2-10s2-6 2-10" />
      <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="14" cy="16" r="1" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  // Profil - oko/percepce
  profile: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  ),
  // Knowledge Base - kniha/znalosti
  knowledge: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6" opacity="0.5" />
    </svg>
  ),
  // Témata
  planes: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16" opacity="0.5" />
      <path d="M4 12h16" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  directions: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  bones: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <ellipse cx="7" cy="5" rx="3" ry="2" />
      <ellipse cx="17" cy="5" rx="3" ry="2" />
      <path d="M7 7v10" />
      <path d="M17 7v10" />
      <ellipse cx="7" cy="19" rx="3" ry="2" />
      <ellipse cx="17" cy="19" rx="3" ry="2" />
      <rect x="9" y="8" width="6" height="8" rx="1" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  spine: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <ellipse cx="12" cy="4" rx="3" ry="1.5" />
      <ellipse cx="12" cy="8" rx="2.5" ry="1.5" />
      <ellipse cx="12" cy="12" rx="2.5" ry="1.5" />
      <ellipse cx="12" cy="16" rx="2.5" ry="1.5" />
      <ellipse cx="12" cy="20" rx="3" ry="1.5" />
      <path d="M12 2v20" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  joints: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.15" />
      <path d="M6 6L4 4M18 6l2-2M6 18l-2 2M18 18l2 2" strokeWidth="1" />
    </svg>
  ),
  // Stavy
  checkCircle: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  ),
  clock: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  sparkle: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.5" />
    </svg>
  ),
  chevronRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  arrowLeft: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  brain: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 4c-2 0-3.5 1-4 2.5-.5-.3-1.2-.5-2-.5-2 0-3 1.5-3 3s1 3 3 3c0 2 1 3.5 3 4v4" />
      <path d="M12 4c2 0 3.5 1 4 2.5.5-.3 1.2-.5 2-.5 2 0 3 1.5 3 3s-1 3-3 3c0 2-1 3.5-3 4v4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  trophy: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M6 4h12v6c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z" />
      <path d="M6 8H4c0 2 1 4 3 4" />
      <path d="M18 8h2c0 2-1 4-3 4" />
      <path d="M12 16v3" />
      <path d="M8 22h8" />
      <path d="M9 22v-3h6v3" />
    </svg>
  ),
  info: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
};

// Icon mapper pro témata
const getTopicIcon = (iconName: string) => {
  const map: Record<string, React.FC<{ className?: string }>> = {
    'Layers': BioloIcons.planes,
    'Compass': BioloIcons.directions,
    'Bone': BioloIcons.bones,
    'Spine': BioloIcons.spine,
    'Joint': BioloIcons.joints,
  };
  return map[iconName] || BioloIcons.bodyMap;
};

// === TYPY ===
interface User {
  name: string;
  xp: number;
  streak: number;
  completedLessons: string[];
  quizResults: Record<string, number>;
}

interface QuizState {
  currentQuestion: number;
  answers: { questionId: string; answer: number; correct: boolean }[];
  showFeedback: boolean;
  showResult: boolean;
  score: number;
  reviewMode: boolean;
  reviewIndex: number;
}

type TabType = 'map' | 'knowledge' | 'train' | 'profile';
type ViewType = 'home' | 'topic' | 'lesson' | 'quiz' | 'results' | 'daily' | 'knowledge';

// === HLAVNÍ KOMPONENTA ===
export default function BioloAIApp() {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<User>({
    name: 'Student',
    xp: 125,
    streak: 3,
    completedLessons: [],
    quizResults: {},
  });
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    showFeedback: false,
    showResult: false,
    score: 0,
    reviewMode: false,
    reviewIndex: 0,
  });
  const [dailyQuestions, setDailyQuestions] = useState<QuizQuestion[]>([]);

  // Level calculation
  const getCurrentLevel = useCallback(() => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (user.xp >= LEVELS[i].minXP) return i;
    }
    return 0;
  }, [user.xp]);

  const currentLevel = getCurrentLevel();
  const nextLevel = LEVELS[currentLevel + 1];
  const progressToNext = nextLevel 
    ? ((user.xp - LEVELS[currentLevel].minXP) / (nextLevel.minXP - LEVELS[currentLevel].minXP)) * 100 
    : 100;

  // === NAVIGACE ===
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'map') {
      setCurrentView('home');
      setSelectedTopic(null);
      setSelectedLesson(null);
    } else if (tab === 'knowledge') {
      setCurrentView('knowledge');
    } else if (tab === 'train') {
      startDailyTraining();
    } else if (tab === 'profile') {
      setCurrentView('home');
    }
  };

  const goBack = () => {
    if (currentView === 'topic') {
      setCurrentView('home');
      setSelectedTopic(null);
    } else if (currentView === 'lesson' || currentView === 'quiz' || currentView === 'results') {
      setCurrentView('topic');
      setSelectedLesson(null);
    } else if (currentView === 'daily') {
      setCurrentView('home');
      setActiveTab('map');
    } else if (currentView === 'knowledge') {
      setCurrentView('home');
      setActiveTab('map');
    }
  };

  // === QUIZ LOGIKA ===
  const startQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      showFeedback: false,
      showResult: false,
      score: 0,
      reviewMode: false,
      reviewIndex: 0,
    });
    setCurrentView('quiz');
  };

  const startDailyTraining = () => {
    const questions = getRandomQuestions(5);
    setDailyQuestions(questions);
    setQuizState({
      currentQuestion: 0,
      answers: [],
      showFeedback: false,
      showResult: false,
      score: 0,
      reviewMode: false,
      reviewIndex: 0,
    });
    setCurrentView('daily');
  };

  const answerQuestion = (answerIndex: number, isDaily = false) => {
    if (quizState.showFeedback) return;
    
    const questions = isDaily ? dailyQuestions : (QUIZ_QUESTIONS[selectedTopic?.id || ''] || []);
    const question = questions[quizState.currentQuestion];
    const isCorrect = answerIndex === question.correct_index;
    
    setQuizState(prev => ({
      ...prev,
      answers: [...prev.answers, { questionId: question.id, answer: answerIndex, correct: isCorrect }],
      showFeedback: true,
    }));
  };

  const nextQuestion = (isDaily = false) => {
    const questions = isDaily ? dailyQuestions : (QUIZ_QUESTIONS[selectedTopic?.id || ''] || []);
    
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showFeedback: false,
      }));
    } else {
      const score = Math.round((quizState.answers.filter(a => a.correct).length / questions.length) * 100);
      const wrongAnswers = quizState.answers.filter(a => !a.correct);
      
      setQuizState(prev => ({
        ...prev,
        showFeedback: false,
        showResult: true,
        score,
        reviewMode: wrongAnswers.length > 0,
        reviewIndex: 0,
      }));
      
      setUser(prev => ({
        ...prev,
        xp: prev.xp + Math.round(score / 2),
        ...(selectedTopic && { quizResults: { ...prev.quizResults, [selectedTopic.id]: score } }),
      }));
      
      if (!isDaily) setCurrentView('results');
    }
  };

  const completeLesson = () => {
    if (!selectedLesson) return;
    if (!user.completedLessons.includes(selectedLesson.id)) {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + 20,
        completedLessons: [...prev.completedLessons, selectedLesson.id],
      }));
    }
    goBack();
  };

  // ============================================
  // SIDEBAR (Desktop)
  // ============================================
  const renderSidebar = () => (
    <aside className="hidden lg:flex flex-col w-64 bg-[#2D3640] text-white h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7A9E8E] flex items-center justify-center">
            <BioloIcons.bodyMap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">LymfaFlow</h1>
            <p className="text-xs text-white/50">Anatomy Explorer</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#7A9E8E] flex items-center justify-center text-lg font-semibold">
            {user.name[0]}
          </div>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-[#7A9E8E]">{LEVELS[currentLevel].name}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-lg font-bold">{user.streak}</p>
            <p className="text-[10px] text-white/50">dní</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-lg font-bold">{user.xp}</p>
            <p className="text-[10px] text-white/50">XP</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-lg font-bold">{user.completedLessons.length}</p>
            <p className="text-[10px] text-white/50">lekcí</p>
          </div>
        </div>
        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>{LEVELS[currentLevel].name}</span>
              <span>{nextLevel.name}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#7A9E8E] rounded-full transition-all" style={{ width: `${progressToNext}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        {[
          { id: 'map' as TabType, icon: BioloIcons.bodyMap, label: 'Mapa těla' },
          { id: 'knowledge' as TabType, icon: BioloIcons.knowledge, label: 'Vzdělávání' },
          { id: 'train' as TabType, icon: BioloIcons.dailyTrain, label: 'Denní trénink' },
          { id: 'profile' as TabType, icon: BioloIcons.profile, label: 'Profil' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
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

  // ============================================
  // BOTTOM NAV (Mobile)
  // ============================================
  const renderBottomNav = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E6EA] z-50">
      <div className="flex justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        {[
          { id: 'map' as TabType, icon: BioloIcons.bodyMap, label: 'Mapa' },
          { id: 'knowledge' as TabType, icon: BioloIcons.knowledge, label: 'Vzdělávání' },
          { id: 'train' as TabType, icon: BioloIcons.dailyTrain, label: 'Trénink' },
          { id: 'profile' as TabType, icon: BioloIcons.profile, label: 'Profil' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
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
    </nav>
  );

  // ============================================
  // MAPA TĚLA (Home)
  // ============================================
  const renderBodyMap = () => (
    <div className="animate-fade-in pb-24 lg:pb-8">
      {/* Header */}
      <header className="px-5 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div>
              <h1 className="text-xl font-semibold text-[#2D3640]">Ahoj, {user.name}</h1>
              <p className="text-sm text-[#6B7B8A]">Pokračuj v průzkumu</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F0F5F2] rounded-full">
              <BioloIcons.sparkle className="w-4 h-4 text-[#7A9E8E]" />
              <span className="text-sm font-semibold text-[#5C7D6D]">{user.streak} dní</span>
            </div>
          </div>

          {/* Daily CTA */}
          <button
            onClick={() => handleTabChange('train')}
            className="w-full p-4 bg-[#7A9E8E] rounded-2xl text-white mb-6 flex items-center justify-between group hover:bg-[#5C7D6D] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BioloIcons.dailyTrain className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Dnešní trénink</p>
                <p className="text-sm text-white/70">5 otázek • 3 min</p>
              </div>
            </div>
            <BioloIcons.chevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Topics Grid */}
      <section className="px-5 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#2D3640] mb-4">Anatomické regiony</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPICS.map((topic) => {
              const TopicIcon = getTopicIcon(topic.icon);
              const topicLessons = LESSONS[topic.id] || [];
              const completedCount = topicLessons.filter(l => user.completedLessons.includes(l.id)).length;
              const progress = topicLessons.length > 0 ? (completedCount / topicLessons.length) * 100 : 0;
              const quizScore = user.quizResults[topic.id];
              
              let statusColor = '#7A9E8E'; // nové
              let statusBg = '#F0F5F2';
              if (progress === 100 && quizScore && quizScore >= 70) {
                statusColor = '#6B9E7A'; // zvládnuto
                statusBg = '#EDF5EF';
              } else if (progress > 0) {
                statusColor = '#C9A962'; // k opakování
                statusBg = '#FAF6ED';
              }

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setCurrentView('topic');
                  }}
                  className="bg-white border border-[#E2E6EA] rounded-2xl p-4 text-left hover:border-[#A8C4B8] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: statusBg, color: statusColor }}
                    >
                      <TopicIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#2D3640] mb-0.5">{topic.title}</h3>
                      <p className="text-xs text-[#6B7B8A] mb-2">{topic.subtitle}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-[#EDF0F2] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all" 
                            style={{ width: `${progress}%`, backgroundColor: statusColor }}
                          />
                        </div>
                        <span className="text-[10px] text-[#9BA8B4] font-medium">
                          {completedCount}/{topicLessons.length}
                        </span>
                      </div>
                    </div>
                    <BioloIcons.chevronRight className="w-5 h-5 text-[#9BA8B4] group-hover:text-[#7A9E8E] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );

  // ============================================
  // DETAIL TÉMATU
  // ============================================
  const renderTopicDetail = () => {
    if (!selectedTopic) return null;
    const topicLessons = LESSONS[selectedTopic.id] || [];
    const questions = QUIZ_QUESTIONS[selectedTopic.id] || [];
    const TopicIcon = getTopicIcon(selectedTopic.icon);

    return (
      <div className="animate-fade-in pb-24 lg:pb-8">
        {/* Header */}
        <header className="sticky top-0 z-10 px-5 lg:px-8 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2E6EA]">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <button onClick={goBack} className="w-10 h-10 rounded-xl bg-white border border-[#E2E6EA] flex items-center justify-center hover:bg-[#F7F4EF] transition-all">
              <BioloIcons.arrowLeft className="w-5 h-5 text-[#6B7B8A]" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-[#2D3640]">{selectedTopic.title}</h1>
              <p className="text-xs text-[#6B7B8A]">{selectedTopic.subtitle}</p>
            </div>
          </div>
        </header>

        <div className="px-5 lg:px-8 py-6 max-w-3xl mx-auto">
          {/* Topic intro */}
          <div className="bg-white border border-[#E2E6EA] rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#F0F5F2] flex items-center justify-center">
                <TopicIcon className="w-7 h-7 text-[#7A9E8E]" />
              </div>
              <div>
                <h2 className="font-semibold text-[#2D3640]">{selectedTopic.title}</h2>
                <p className="text-sm text-[#6B7B8A]">{topicLessons.length} lekcí</p>
              </div>
            </div>
            
            {questions.length > 0 && (
              <button
                onClick={startQuiz}
                className="w-full py-3 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
              >
                <BioloIcons.brain className="w-5 h-5" />
                Spustit test ({questions.length} otázek)
              </button>
            )}
          </div>

          {/* Lessons */}
          <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3">Lekce</h3>
          <div className="space-y-2">
            {topicLessons.map((lesson, index) => {
              const isCompleted = user.completedLessons.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setCurrentView('lesson');
                  }}
                  className="w-full bg-white border border-[#E2E6EA] rounded-xl p-4 text-left hover:border-[#A8C4B8] transition-all group flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-[#EDF5EF]' : 'bg-[#F7F4EF]'
                  }`}>
                    {isCompleted ? (
                      <BioloIcons.checkCircle className="w-5 h-5 text-[#6B9E7A]" />
                    ) : (
                      <span className="text-sm font-semibold text-[#9BA8B4]">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#2D3640] group-hover:text-[#5C7D6D] transition-colors">{lesson.title}</h4>
                    <p className="text-xs text-[#9BA8B4] truncate">{lesson.why}</p>
                  </div>
                  <BioloIcons.chevronRight className="w-5 h-5 text-[#9BA8B4] group-hover:text-[#7A9E8E] group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // LEKCE
  // ============================================
  const renderLesson = () => {
    if (!selectedLesson || !selectedTopic) return null;

    return (
      <div className="animate-fade-in pb-24 lg:pb-8">
        <header className="sticky top-0 z-10 px-5 lg:px-8 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2E6EA]">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <button onClick={goBack} className="w-10 h-10 rounded-xl bg-white border border-[#E2E6EA] flex items-center justify-center hover:bg-[#F7F4EF] transition-all">
              <BioloIcons.arrowLeft className="w-5 h-5 text-[#6B7B8A]" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-[#2D3640] truncate">{selectedLesson.title}</h1>
              <p className="text-xs text-[#6B7B8A]">{selectedTopic.title}</p>
            </div>
          </div>
        </header>

        <div className="px-5 lg:px-8 py-6 max-w-3xl mx-auto">
          {/* Proč je to důležité */}
          <div className="bg-[#F0F5F2] border border-[#A8C4B8]/30 rounded-2xl p-5 mb-4">
            <p className="text-xs font-semibold text-[#5C7D6D] uppercase tracking-wide mb-1">Proč to potřebuješ</p>
            <p className="text-[#2D3640]">{selectedLesson.why}</p>
          </div>

          {/* Lidsky */}
          <div className="bg-[#FAF6ED] border border-[#C9A962]/30 rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-[#A68B4B] uppercase tracking-wide mb-1">Lidsky řečeno</p>
            <p className="text-[#2D3640]">{selectedLesson.human}</p>
          </div>

          {/* Klíčové pojmy */}
          <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3">Klíčové pojmy</h3>
          <div className="space-y-3 mb-6">
            {selectedLesson.points.map((point, i) => (
              <div key={i} className="bg-white border border-[#E2E6EA] rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold text-[#2D3640]">{point.term}</h4>
                  {point.latin && (
                    <span className="text-xs text-[#9BA8B4] italic bg-[#F7F4EF] px-2 py-0.5 rounded">
                      {point.latin}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7B8A] leading-relaxed">{point.def}</p>
                {point.tip && (
                  <div className="mt-3 p-3 bg-[#FAF6ED] rounded-lg">
                    <p className="text-xs text-[#A68B4B]">{point.tip}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tip */}
          {selectedLesson.tip && (
            <div className="bg-white border border-[#E2E6EA] rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <BioloIcons.info className="w-5 h-5 text-[#7A9E8E] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#6B7B8A]">{selectedLesson.tip}</p>
              </div>
            </div>
          )}

          {/* Practice */}
          {selectedLesson.practice && (
            <div className="bg-[#F0F5F2] border border-[#A8C4B8]/30 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-[#5C7D6D] uppercase tracking-wide mb-1">Vyzkoušej</p>
              <p className="text-sm text-[#2D3640]">{selectedLesson.practice}</p>
            </div>
          )}

          <button
            onClick={completeLesson}
            className="w-full py-4 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-medium transition-all"
          >
            {user.completedLessons.includes(selectedLesson.id) ? 'Hotovo' : 'Dokončit lekci (+20 XP)'}
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // KVÍZ
  // ============================================
  const renderQuiz = (isDaily = false) => {
    const questions = isDaily ? dailyQuestions : (QUIZ_QUESTIONS[selectedTopic?.id || ''] || []);
    const question = questions[quizState.currentQuestion];
    if (!question) return null;

    const currentAnswer = quizState.answers[quizState.currentQuestion];

    return (
      <div className="animate-fade-in min-h-screen bg-[#FAF8F5]">
        {/* Header */}
        <header className="sticky top-0 z-10 px-5 lg:px-8 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <button onClick={goBack} className="flex items-center gap-2 text-[#6B7B8A] hover:text-[#2D3640] transition-colors">
                <BioloIcons.arrowLeft className="w-4 h-4" />
                <span className="text-sm">Zpět</span>
              </button>
              <span className="text-sm font-medium text-[#2D3640]">{quizState.currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="h-1.5 bg-[#E2E6EA] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#7A9E8E] rounded-full transition-all duration-300" 
                style={{ width: `${((quizState.currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </header>

        <div className="px-5 lg:px-8 py-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#2D3640] mb-8 text-center leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = currentAnswer?.answer === i;
              const isCorrect = i === question.correct_index;
              const showFeedback = quizState.showFeedback;

              let styles = 'bg-white border-[#E2E6EA] hover:border-[#A8C4B8]';
              if (showFeedback && isCorrect) styles = 'bg-[#EDF5EF] border-[#6B9E7A]';
              else if (showFeedback && isSelected && !isCorrect) styles = 'bg-[#F9F0F0] border-[#C27B7B]';
              else if (showFeedback) styles = 'bg-white border-[#E2E6EA] opacity-50';

              return (
                <button
                  key={i}
                  onClick={() => !showFeedback && answerQuestion(i, isDaily)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${styles}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      showFeedback && isCorrect ? 'bg-[#6B9E7A] text-white' :
                      showFeedback && isSelected && !isCorrect ? 'bg-[#C27B7B] text-white' :
                      'bg-[#F7F4EF] text-[#6B7B8A]'
                    }`}>
                      {showFeedback && isCorrect ? (
                        <BioloIcons.checkCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </div>
                    <span className="flex-1 text-[#2D3640]">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {quizState.showFeedback && (
            <div className={`mt-6 p-5 rounded-xl ${currentAnswer?.correct ? 'bg-[#EDF5EF] border border-[#6B9E7A]/30' : 'bg-[#FAF6ED] border border-[#C9A962]/30'}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${currentAnswer?.correct ? 'bg-[#6B9E7A]' : 'bg-[#C9A962]'}`}>
                  {currentAnswer?.correct ? (
                    <BioloIcons.checkCircle className="w-4 h-4 text-white" />
                  ) : (
                    <BioloIcons.info className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${currentAnswer?.correct ? 'text-[#5C7D6D]' : 'text-[#A68B4B]'}`}>
                    {currentAnswer?.correct ? 'Správně!' : 'Správná odpověď:'}
                  </h4>
                  {!currentAnswer?.correct && (
                    <p className="font-medium text-[#2D3640] mb-2">{question.options[question.correct_index]}</p>
                  )}
                  <p className="text-sm text-[#6B7B8A] leading-relaxed">{question.explanation}</p>
                </div>
              </div>

              <button
                onClick={() => nextQuestion(isDaily)}
                className="w-full mt-4 py-3 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-medium transition-all"
              >
                {quizState.currentQuestion < questions.length - 1 ? 'Další otázka' : 'Zobrazit výsledky'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // VÝSLEDKY
  // ============================================
  const renderResults = () => {
    const questions = QUIZ_QUESTIONS[selectedTopic?.id || ''] || [];
    const passed = quizState.score >= 70;
    const wrongAnswers = quizState.answers.filter(a => !a.correct);

    // Review mode
    if (quizState.reviewMode && wrongAnswers.length > 0) {
      const wrongAnswer = wrongAnswers[quizState.reviewIndex];
      const wrongQuestion = questions.find(q => q.id === wrongAnswer.questionId);
      if (!wrongQuestion) return null;

      return (
        <div className="animate-fade-in min-h-screen bg-[#FAF8F5] p-5 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6ED] flex items-center justify-center">
                  <BioloIcons.clock className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#2D3640]">Opakování</h2>
                  <p className="text-xs text-[#6B7B8A]">{quizState.reviewIndex + 1} z {wrongAnswers.length}</p>
                </div>
              </div>
              <button 
                onClick={() => setQuizState(prev => ({ ...prev, reviewMode: false }))}
                className="text-sm text-[#6B7B8A] hover:text-[#2D3640]"
              >
                Přeskočit
              </button>
            </div>

            <div className="bg-white border border-[#E2E6EA] rounded-2xl p-5 mb-4">
              <h3 className="font-semibold text-[#2D3640] mb-4">{wrongQuestion.question}</h3>
              <div className="space-y-2">
                {wrongQuestion.options.map((option, i) => {
                  const isCorrect = i === wrongQuestion.correct_index;
                  const wasSelected = i === wrongAnswer.answer;
                  return (
                    <div 
                      key={i}
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        isCorrect ? 'bg-[#EDF5EF] border border-[#6B9E7A]/30' :
                        wasSelected ? 'bg-[#F9F0F0] border border-[#C27B7B]/30' :
                        'bg-[#F7F4EF]'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCorrect ? 'bg-[#6B9E7A] text-white' :
                        wasSelected ? 'bg-[#C27B7B] text-white' :
                        'bg-[#E2E6EA] text-[#6B7B8A]'
                      }`}>
                        {isCorrect ? <BioloIcons.checkCircle className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                      </div>
                      <span className={isCorrect ? 'text-[#5C7D6D] font-medium' : wasSelected ? 'text-[#C27B7B]' : 'text-[#9BA8B4]'}>
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#FAF6ED] border border-[#C9A962]/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <BioloIcons.info className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#6B7B8A]">{wrongQuestion.explanation}</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (quizState.reviewIndex < wrongAnswers.length - 1) {
                  setQuizState(prev => ({ ...prev, reviewIndex: prev.reviewIndex + 1 }));
                } else {
                  setQuizState(prev => ({ ...prev, reviewMode: false }));
                }
              }}
              className="w-full py-4 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-medium transition-all"
            >
              {quizState.reviewIndex < wrongAnswers.length - 1 ? 'Další' : 'Dokončit'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in min-h-screen flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white border border-[#E2E6EA] rounded-2xl p-8 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-[#EDF5EF]' : 'bg-[#FAF6ED]'}`}>
            {passed ? (
              <BioloIcons.trophy className="w-10 h-10 text-[#6B9E7A]" />
            ) : (
              <BioloIcons.clock className="w-10 h-10 text-[#C9A962]" />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-[#2D3640] mb-2">{passed ? 'Výborně!' : 'Zkus to znovu'}</h2>
          <p className="text-[#6B7B8A] mb-6">{passed ? 'Téma máš zvládnuté.' : 'Projdi si lekce a zkus test znovu.'}</p>
          <div className="text-5xl font-bold text-[#7A9E8E] mb-2">{quizState.score}%</div>
          <p className="text-sm text-[#9BA8B4] mb-8">{quizState.answers.filter(a => a.correct).length} z {questions.length} správně</p>

          <div className="space-y-3">
            {wrongAnswers.length > 0 && (
              <button
                onClick={() => setQuizState(prev => ({ ...prev, reviewMode: true, reviewIndex: 0 }))}
                className="w-full py-3 bg-[#FAF6ED] text-[#A68B4B] rounded-xl font-medium hover:bg-[#F5EFE0] transition-all"
              >
                Zopakovat chyby ({wrongAnswers.length})
              </button>
            )}
            <button onClick={goBack} className="w-full py-3 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-medium transition-all">
              Zpět k tématu
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // DENNÍ TRÉNINK
  // ============================================
  const renderDailyTraining = () => {
    if (quizState.showResult) {
      const passed = quizState.score >= 60;
      return (
        <div className="animate-fade-in min-h-screen flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white border border-[#E2E6EA] rounded-2xl p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-[#EDF5EF]' : 'bg-[#FAF6ED]'}`}>
              {passed ? (
                <BioloIcons.trophy className="w-10 h-10 text-[#6B9E7A]" />
              ) : (
                <BioloIcons.dailyTrain className="w-10 h-10 text-[#C9A962]" />
              )}
            </div>
            <h2 className="text-2xl font-semibold text-[#2D3640] mb-2">
              {passed ? 'Skvělá práce!' : 'Dobrý začátek'}
            </h2>
            <p className="text-[#6B7B8A] mb-6">
              {passed ? `Streak: ${user.streak + 1} dní` : 'Pokračuj zítra!'}
            </p>
            <div className="text-5xl font-bold text-[#7A9E8E] mb-2">{quizState.score}%</div>
            <p className="text-sm text-[#9BA8B4] mb-8">+{Math.round(quizState.score / 2)} XP</p>

            <button 
              onClick={() => handleTabChange('map')} 
              className="w-full py-3 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-medium transition-all"
            >
              Zpět na mapu
            </button>
          </div>
        </div>
      );
    }

    return renderQuiz(true);
  };

  // ============================================
  // PROFIL
  // ============================================
  const renderProfile = () => (
    <div className="animate-fade-in pb-24 lg:pb-8 p-5 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* User Card */}
        <div className="bg-white border border-[#E2E6EA] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#7A9E8E] flex items-center justify-center text-2xl font-semibold text-white">
              {user.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#2D3640]">{user.name}</h2>
              <p className="text-sm text-[#7A9E8E]">{LEVELS[currentLevel].name}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#2D3640]">{user.streak}</p>
              <p className="text-xs text-[#6B7B8A]">Streak</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#2D3640]">{user.xp}</p>
              <p className="text-xs text-[#6B7B8A]">XP</p>
            </div>
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#2D3640]">{user.completedLessons.length}</p>
              <p className="text-xs text-[#6B7B8A]">Lekcí</p>
            </div>
          </div>

          {/* Progress */}
          {nextLevel && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7B8A]">{LEVELS[currentLevel].name}</span>
                <span className="text-[#7A9E8E]">{user.xp} / {nextLevel.minXP} XP</span>
              </div>
              <div className="h-2 bg-[#EDF0F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#7A9E8E] rounded-full transition-all" style={{ width: `${progressToNext}%` }} />
              </div>
              <p className="text-xs text-[#9BA8B4] mt-2 text-center">
                {nextLevel.minXP - user.xp} XP do úrovně {nextLevel.name}
              </p>
            </div>
          )}
        </div>

        {/* Quiz Results */}
        <h3 className="text-sm font-semibold text-[#6B7B8A] uppercase tracking-wide mb-3">Výsledky testů</h3>
        <div className="space-y-2">
          {TOPICS.map(topic => {
            const score = user.quizResults[topic.id];
            const TopicIcon = getTopicIcon(topic.icon);
            return (
              <div key={topic.id} className="bg-white border border-[#E2E6EA] rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F0F5F2] flex items-center justify-center">
                  <TopicIcon className="w-5 h-5 text-[#7A9E8E]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#2D3640]">{topic.title}</p>
                </div>
                {score !== undefined ? (
                  <span className={`font-semibold ${score >= 70 ? 'text-[#6B9E7A]' : 'text-[#C9A962]'}`}>
                    {score}%
                  </span>
                ) : (
                  <span className="text-[#9BA8B4] text-sm">—</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDER
  // ============================================
  // ============================================
  // KNOWLEDGE BASE (Vzdělávání)
  // ============================================
  const renderKnowledge = () => {
    const KnowledgeBase = React.lazy(() => import('@/components/KnowledgeBase'));
    return (
      <React.Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-8 h-8 border-4 border-[#7A9E8E] border-t-transparent rounded-full" />
        </div>
      }>
        <KnowledgeBase />
      </React.Suspense>
    );
  };

  const renderContent = () => {
    if (currentView === 'daily') return renderDailyTraining();
    if (currentView === 'knowledge' || activeTab === 'knowledge') return renderKnowledge();
    if (activeTab === 'profile') return renderProfile();
    
    switch (currentView) {
      case 'topic': return renderTopicDetail();
      case 'lesson': return renderLesson();
      case 'quiz': return renderQuiz();
      case 'results': return renderResults();
      default: return renderBodyMap();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      {renderSidebar()}
      <main className="flex-1 min-h-screen lg:ml-0">
        {renderContent()}
      </main>
      {renderBottomNav()}
    </div>
  );
}
