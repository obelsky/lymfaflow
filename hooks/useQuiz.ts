// ============================================
// LYMFAFLOW - USE QUIZ HOOK
// Správa stavu kvízu
// ============================================

'use client';

import { useState, useCallback, useMemo } from 'react';
import { getQuestionsByTopicId, getRandomQuestions } from '@/lib/data';
import type { QuizQuestion, QuizAnswer, QuizState } from '@/types';

interface UseQuizReturn {
  // State
  state: QuizState;
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion | null;
  
  // Actions
  startQuiz: (topicId: string) => void;
  startRandomQuiz: (count: number) => void;
  answerQuestion: (selectedIndex: number) => void;
  nextQuestion: () => void;
  startReview: () => void;
  nextReviewItem: () => void;
  finishReview: () => void;
  resetQuiz: () => void;
  
  // Computed
  isLastQuestion: boolean;
  correctAnswersCount: number;
  wrongAnswers: QuizAnswer[];
  currentReviewQuestion: QuizQuestion | null;
}

const INITIAL_STATE: QuizState = {
  currentQuestion: 0,
  answers: [],
  showFeedback: false,
  showResult: false,
  score: 0,
  reviewMode: false,
  reviewIndex: 0,
};

export function useQuiz(): UseQuizReturn {
  const [state, setState] = useState<QuizState>(INITIAL_STATE);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const currentQuestion = useMemo(() => {
    return questions[state.currentQuestion] || null;
  }, [questions, state.currentQuestion]);

  const isLastQuestion = useMemo(() => {
    return state.currentQuestion >= questions.length - 1;
  }, [state.currentQuestion, questions.length]);

  const correctAnswersCount = useMemo(() => {
    return state.answers.filter(a => a.is_correct).length;
  }, [state.answers]);

  const wrongAnswers = useMemo(() => {
    return state.answers.filter(a => !a.is_correct);
  }, [state.answers]);

  const currentReviewQuestion = useMemo(() => {
    if (!state.reviewMode || wrongAnswers.length === 0) return null;
    const wrongAnswer = wrongAnswers[state.reviewIndex];
    if (!wrongAnswer) return null;
    return questions.find(q => q.id === wrongAnswer.question_id) || null;
  }, [state.reviewMode, state.reviewIndex, wrongAnswers, questions]);

  const startQuiz = useCallback((topicId: string) => {
    const topicQuestions = getQuestionsByTopicId(topicId);
    setQuestions(topicQuestions);
    setState(INITIAL_STATE);
  }, []);

  const startRandomQuiz = useCallback((count: number) => {
    const randomQuestions = getRandomQuestions(count);
    setQuestions(randomQuestions);
    setState(INITIAL_STATE);
  }, []);

  const answerQuestion = useCallback((selectedIndex: number) => {
    if (state.showFeedback || !currentQuestion) return;

    const isCorrect = selectedIndex === currentQuestion.correct_index;
    const answer: QuizAnswer = {
      question_id: currentQuestion.id,
      selected_index: selectedIndex,
      is_correct: isCorrect,
    };

    setState(prev => ({
      ...prev,
      answers: [...prev.answers, answer],
      showFeedback: true,
    }));
  }, [state.showFeedback, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      // Calculate final score
      const totalCorrect = state.answers.filter(a => a.is_correct).length + 
        (state.showFeedback && state.answers[state.answers.length - 1]?.is_correct ? 0 : 0);
      const score = Math.round((correctAnswersCount / questions.length) * 100);
      
      setState(prev => ({
        ...prev,
        showFeedback: false,
        showResult: true,
        score,
        reviewMode: wrongAnswers.length > 0,
        reviewIndex: 0,
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showFeedback: false,
      }));
    }
  }, [isLastQuestion, correctAnswersCount, questions.length, wrongAnswers.length, state.answers, state.showFeedback]);

  const startReview = useCallback(() => {
    setState(prev => ({
      ...prev,
      reviewMode: true,
      reviewIndex: 0,
    }));
  }, []);

  const nextReviewItem = useCallback(() => {
    if (state.reviewIndex < wrongAnswers.length - 1) {
      setState(prev => ({
        ...prev,
        reviewIndex: prev.reviewIndex + 1,
      }));
    } else {
      finishReview();
    }
  }, [state.reviewIndex, wrongAnswers.length]);

  const finishReview = useCallback(() => {
    setState(prev => ({
      ...prev,
      reviewMode: false,
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState(INITIAL_STATE);
    setQuestions([]);
  }, []);

  return {
    state,
    questions,
    currentQuestion,
    startQuiz,
    startRandomQuiz,
    answerQuestion,
    nextQuestion,
    startReview,
    nextReviewItem,
    finishReview,
    resetQuiz,
    isLastQuestion,
    correctAnswersCount,
    wrongAnswers,
    currentReviewQuestion,
  };
}
