// ============================================
// LYMFAFLOW - CENTRALIZED TYPES
// Vibekodex Methodology
// ============================================

// === DATABASE ENTITY TYPES ===
// These mirror the Supabase schema (prepared for migration)

export interface Topic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  sort_order: number;
  is_locked: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Lesson {
  id: string;
  topic_id: string;
  slug: string;
  title: string;
  why: string;
  human_explanation: string;
  tip?: string;
  practice?: string;
  sort_order: number;
  xp_reward: number;
  points: LessonPoint[];
  created_at?: string;
  updated_at?: string;
}

export interface LessonPoint {
  id: string;
  lesson_id: string;
  term: string;
  definition: string;
  latin?: string;
  synonym?: string;
  tip?: string;
  sort_order: number;
}

export interface QuizQuestion {
  id: string;
  topic_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: number;
  created_at?: string;
}

export interface KnowledgeCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface BRProduct {
  name: string;
  use: string;
}

export interface KnowledgeItem {
  id: string;
  category_id: string;
  title: string;
  latin?: string;
  description: string;
  details?: string;
  technique?: string;
  benefits?: string[];
  contraindications?: string[];
  br_products?: BRProduct[];
  tip?: string;
  warning?: string;
  tags: string[];
  created_at?: string;
}

// === USER TYPES ===

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  streak: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  answers: QuizAnswer[];
  completed_at: string;
}

export interface QuizAnswer {
  question_id: string;
  selected_index: number;
  is_correct: boolean;
}

// === GAMIFICATION ===

export interface Level {
  level: number;
  name: string;
  min_xp: number;
  icon: string;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  condition: AchievementCondition;
}

export interface AchievementCondition {
  type: 'lessons_completed' | 'quiz_score' | 'streak' | 'xp_earned';
  value: number;
  topic_id?: string;
}

// === PROFESSOR SYSTEM (Polymath Academy) ===

export interface Professor {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  avatar: string;
  primary_field: string;
  secondary_fields: string[];
  personality: ProfessorPersonality;
  system_prompt: string;
  signature_phrases: string[];
  teaching_method: 'visual' | 'socratic' | 'experimental' | 'storytelling' | 'debugging';
  is_active: boolean;
}

export interface ProfessorPersonality {
  formality: 1 | 2 | 3 | 4 | 5;
  complexity: 1 | 2 | 3 | 4 | 5;
  humor: boolean;
  use_analogies: boolean;
  use_etymology: boolean;
  use_stories: boolean;
  ask_questions: boolean;
}

// === APP STATE TYPES ===

export type TabType = 'map' | 'knowledge' | 'train' | 'profile';
export type ViewType = 'home' | 'topic' | 'lesson' | 'quiz' | 'results' | 'daily' | 'knowledge';

export interface AppState {
  activeTab: TabType;
  currentView: ViewType;
  selectedTopic: Topic | null;
  selectedLesson: Lesson | null;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  showFeedback: boolean;
  showResult: boolean;
  score: number;
  reviewMode: boolean;
  reviewIndex: number;
}

// === API RESPONSE TYPES ===

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// === LEGACY TYPE ALIASES ===
// For backward compatibility during migration

/** @deprecated Use Topic instead */
export type LegacyTopic = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  progress: number;
  lessons: number;
  locked: boolean;
};

/** @deprecated Use Lesson instead */
export type LegacyLesson = {
  id: string;
  title: string;
  why: string;
  human: string;
  points: { term: string; def: string; latin?: string; synonym?: string; tip?: string }[];
  tip?: string;
  practice?: string;
};
