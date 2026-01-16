// ============================================
// LYMFAFLOW - Quiz Engine
// Kvíz logika, otázky, feedback
// ============================================

'use client';

import React from 'react';
import { BioloIcons } from '@/components/BioloIcons';
import { AIExplainCard } from '@/components/AI/AIExplainCard';
import type { QuizQuestion, Topic } from '@/types';
import type { QuizState, QuizAnswer, AIExplanation } from './types';

interface QuizEngineProps {
  questions: QuizQuestion[];
  quizState: QuizState;
  topic?: Topic | null;
  isDaily?: boolean;
  aiExplanation: AIExplanation;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuizEngine({
  questions,
  quizState,
  topic,
  isDaily = false,
  aiExplanation,
  onAnswer,
  onNext,
  onBack,
}: QuizEngineProps) {
  const question = questions[quizState.currentQuestion];
  if (!question) return null;

  const currentAnswer = quizState.answers[quizState.currentQuestion];
  const showFeedback = quizState.showFeedback;
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="animate-fade-in min-h-screen bg-[#FAF8F5] p-5 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7B8A] hover:text-[#2D3640] transition-colors"
          >
            <BioloIcons.arrowLeft className="w-5 h-5" />
            <span>Zpět</span>
          </button>
          <span className="text-sm text-[#6B7B8A]">
            {quizState.currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-[#E2E6EA] rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-[#7A9E8E] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#2D3640] leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = currentAnswer?.answer === i;
            const isCorrect = i === question.correct_index;
            
            let styles = 'bg-white border-[#E2E6EA] hover:border-[#7A9E8E] hover:bg-[#F7F4EF]';
            if (showFeedback && isCorrect) styles = 'bg-[#EDF5EF] border-[#6B9E7A]';
            else if (showFeedback && isSelected && !isCorrect) styles = 'bg-[#FDF2F2] border-[#C27B7B]';
            else if (showFeedback) styles = 'bg-white border-[#E2E6EA] opacity-50';

            return (
              <button
                key={i}
                onClick={() => !showFeedback && onAnswer(i)}
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
        {showFeedback && (
          <QuizFeedback
            isCorrect={currentAnswer?.correct ?? false}
            correctAnswer={question.options[question.correct_index]}
            explanation={question.explanation}
            aiExplanation={aiExplanation}
            onNext={onNext}
            isLast={quizState.currentQuestion >= questions.length - 1}
          />
        )}
      </div>
    </div>
  );
}

// === QUIZ FEEDBACK ===

interface QuizFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  aiExplanation: AIExplanation;
  onNext: () => void;
  isLast: boolean;
}

function QuizFeedback({
  isCorrect,
  correctAnswer,
  explanation,
  aiExplanation,
  onNext,
  isLast,
}: QuizFeedbackProps) {
  return (
    <div className={`mt-6 rounded-2xl overflow-hidden ${
      isCorrect 
        ? 'bg-[#EDF5EF] border border-[#6B9E7A]/30' 
        : 'bg-gradient-to-b from-[#FAF6ED] to-[#F5EFE6] border border-[#C9A962]/30'
    }`}>
      {/* Hlavní feedback */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isCorrect ? 'bg-[#6B9E7A]' : 'bg-[#C9A962]'
          }`}>
            {isCorrect ? (
              <BioloIcons.checkCircle className="w-5 h-5 text-white" />
            ) : (
              <span className="text-white text-lg">✕</span>
            )}
          </div>
          <div className="flex-1">
            <h4 className={`font-bold text-lg mb-1 ${
              isCorrect ? 'text-[#5C7D6D]' : 'text-[#A68B4B]'
            }`}>
              {isCorrect ? '🎉 Správně!' : 'Správná odpověď:'}
            </h4>
            {!isCorrect && (
              <p className="font-semibold text-[#2D3640] text-lg">{correctAnswer}</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Vysvětlení - pouze při špatné odpovědi */}
      {!isCorrect && (
        <div className="px-5 pb-5">
          <AIExplainCard
            explanation={aiExplanation.text || explanation}
            professor={aiExplanation.professor || 'Da Vinci'}
            loading={aiExplanation.loading}
          />
        </div>
      )}

      {/* Tlačítko */}
      <div className="px-5 pb-5">
        <button
          onClick={onNext}
          className="w-full py-4 bg-[#7A9E8E] hover:bg-[#5C7D6D] text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
        >
          {isLast ? 'Zobrazit výsledky →' : 'Další otázka →'}
        </button>
      </div>
    </div>
  );
}
