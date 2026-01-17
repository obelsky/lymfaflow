// ============================================
// LYMFAFLOW - Main App
// Refactored orchestrator (~300 lines vs 1300+)
// ============================================

'use client';

import React, { useState, useCallback } from 'react';

// Components
import { Sidebar, BottomNav } from '@/components/Navigation';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import { BiologiqueRecherche } from '@/components/BR';
import {
  HomeView,
  TopicView,
  LessonView,
  QuizEngine,
  QuizResults,
  QuizReview,
  ProfileView,
  // Types & helpers
  INITIAL_USER,
  INITIAL_QUIZ_STATE,
  getDailyQuestions,
  type User,
  type QuizState,
  type TabType,
  type ViewType,
  type AIExplanation,
  type TermExplanation,
} from '@/components/Learning';

// Data
import { TOPICS } from '@/lib/data/topics';
import { LESSONS } from '@/lib/data/lessons';
import { QUIZ_QUESTIONS } from '@/lib/data/questions';
import type { Topic, Lesson, QuizQuestion } from '@/types';

export default function LymfaFlowApp() {
  // === STATE ===
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const [dailyQuestions, setDailyQuestions] = useState<QuizQuestion[]>([]);
  
  // AI State
  const [aiExplanation, setAiExplanation] = useState<AIExplanation>({ 
    text: '', professor: '', loading: false 
  });
  const [termExplanation, setTermExplanation] = useState<TermExplanation | null>(null);

  // === AI HELPERS ===
  const fetchAiExplanation = async (question: string, wrongAnswer: string, correctAnswer: string) => {
    setAiExplanation({ text: '', professor: '', loading: true });
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wrong_answer',
          question, wrongAnswer, correctAnswer,
          professorStyle: 'visual',
        }),
      });
      const data = await res.json();
      setAiExplanation({ 
        text: data.explanation, 
        professor: data.professor || 'Da Vinci',
        loading: false 
      });
    } catch {
      setAiExplanation({ 
        text: 'Zkus si zapamatovat latinský původ slova.', 
        professor: 'Da Vinci',
        loading: false 
      });
    }
  };

  const fetchTermExplanation = async (term: string, definition: string) => {
    setTermExplanation({ term, text: '', loading: true });
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'term', term, definition,
          professorStyle: 'visual',
        }),
      });
      const data = await res.json();
      setTermExplanation({ term, text: data.explanation, loading: false });
    } catch {
      setTermExplanation({ term, text: definition, loading: false });
    }
  };

  // === NAVIGATION ===
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'map') {
      setCurrentView('home');
      setSelectedTopic(null);
      setSelectedLesson(null);
    } else if (tab === 'train') {
      startDailyTraining();
    } else if (tab === 'knowledge') {
      setCurrentView('knowledge');
    } else if (tab === 'br') {
      setCurrentView('home'); // BR má vlastní stav uvnitř
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
    }
  };

  // === QUIZ LOGIC ===
  const startQuiz = () => {
    setQuizState(INITIAL_QUIZ_STATE);
    setCurrentView('quiz');
  };

  const startDailyTraining = () => {
    setDailyQuestions(getDailyQuestions(5));
    setQuizState(INITIAL_QUIZ_STATE);
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

    if (!isCorrect) {
      fetchAiExplanation(question.question, question.options[answerIndex], question.options[question.correct_index]);
    } else {
      setAiExplanation({ text: '', professor: '', loading: false });
    }
  };

  const nextQuestion = (isDaily = false) => {
    const questions = isDaily ? dailyQuestions : (QUIZ_QUESTIONS[selectedTopic?.id || ''] || []);
    setAiExplanation({ text: '', professor: '', loading: false });
    
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1, showFeedback: false }));
    } else {
      const score = Math.round((quizState.answers.filter(a => a.correct).length / questions.length) * 100);
      setQuizState(prev => ({ ...prev, showResult: true, score }));
      
      if (!isDaily && selectedTopic) {
        setUser(prev => ({ ...prev, quizResults: { ...prev.quizResults, [selectedTopic.id]: score } }));
        if (score >= 70) {
          setUser(prev => ({ ...prev, xp: prev.xp + 50 }));
        }
      }
      setCurrentView('results');
    }
  };

  const completeLesson = () => {
    if (!selectedLesson || user.completedLessons.includes(selectedLesson.id)) return;
    setUser(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, selectedLesson.id],
      xp: prev.xp + 20,
    }));
  };

  // === RENDER ===
  const renderContent = () => {
    const isDaily = currentView === 'daily';
    const questions = isDaily ? dailyQuestions : (QUIZ_QUESTIONS[selectedTopic?.id || ''] || []);

    // Quiz
    if (currentView === 'quiz' || currentView === 'daily') {
      return (
        <QuizEngine
          questions={questions}
          quizState={quizState}
          topic={selectedTopic}
          isDaily={isDaily}
          aiExplanation={aiExplanation}
          onAnswer={(i) => answerQuestion(i, isDaily)}
          onNext={() => nextQuestion(isDaily)}
          onBack={goBack}
        />
      );
    }

    // Results
    if (currentView === 'results') {
      if (quizState.reviewMode) {
        const wrongAnswers = quizState.answers.filter(a => !a.correct);
        const wrongAnswer = wrongAnswers[quizState.reviewIndex];
        const wrongQuestion = questions.find(q => q.id === wrongAnswer?.questionId);
        
        if (wrongQuestion) {
          return (
            <QuizReview
              wrongAnswer={wrongAnswer}
              question={wrongQuestion}
              reviewIndex={quizState.reviewIndex}
              totalWrong={wrongAnswers.length}
              onNext={() => setQuizState(prev => ({ ...prev, reviewIndex: prev.reviewIndex + 1 }))}
              onFinish={() => setQuizState(prev => ({ ...prev, reviewMode: false }))}
            />
          );
        }
      }
      
      return (
        <QuizResults
          quizState={quizState}
          questions={questions}
          topic={selectedTopic}
          isDaily={isDaily}
          onReview={() => setQuizState(prev => ({ ...prev, reviewMode: true, reviewIndex: 0 }))}
          onRetry={() => isDaily ? startDailyTraining() : startQuiz()}
          onBack={() => isDaily ? handleTabChange('map') : setCurrentView('topic')}
        />
      );
    }

    // Lesson
    if (currentView === 'lesson' && selectedLesson && selectedTopic) {
      return (
        <LessonView
          lesson={selectedLesson}
          topic={selectedTopic}
          user={user}
          termExplanation={termExplanation}
          onBack={goBack}
          onComplete={completeLesson}
          onAskTerm={fetchTermExplanation}
          onCloseTermExplanation={() => setTermExplanation(null)}
        />
      );
    }

    // Topic
    if (currentView === 'topic' && selectedTopic) {
      return (
        <TopicView
          topic={selectedTopic}
          lessons={LESSONS[selectedTopic.id] || []}
          user={user}
          onBack={goBack}
          onSelectLesson={(lesson) => { setSelectedLesson(lesson); setCurrentView('lesson'); }}
          onStartQuiz={startQuiz}
        />
      );
    }

    // Profile
    if (activeTab === 'profile') {
      return <ProfileView user={user} />;
    }
    
    // Knowledge Base (Vzdělávání)
    if (activeTab === 'knowledge' || currentView === 'knowledge') {
      return <KnowledgeBase />;
    }
    
    // Biologique Recherche
    if (activeTab === 'br') {
      return <BiologiqueRecherche />;
    }

    // Home
    return (
      <HomeView
        user={user}
        onSelectTopic={(topic) => { setSelectedTopic(topic); setCurrentView('topic'); }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      <Sidebar user={user} activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
