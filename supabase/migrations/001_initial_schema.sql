-- ============================================
-- POLYMATH ACADEMY - Supabase Schema
-- Migration: 001_initial_schema.sql
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFESSORS
-- ============================================
CREATE TABLE professors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  title TEXT,
  era TEXT,
  
  -- Visual
  avatar TEXT DEFAULT 'davinci',
  accent_color TEXT DEFAULT '#7A9E8E',
  gradient_from TEXT DEFAULT '#7A9E8E',
  gradient_to TEXT DEFAULT '#5B7A6A',
  
  -- Fields
  primary_field TEXT NOT NULL,
  secondary_fields TEXT[] DEFAULT '{}',
  
  -- Personality (JSONB for flexibility)
  personality JSONB DEFAULT '{
    "formality": 3,
    "complexity": 3,
    "humor": false,
    "useAnalogies": true,
    "useEtymology": false,
    "useStories": true,
    "askQuestions": false,
    "useVisuals": true,
    "useExperiments": false
  }'::jsonb,
  
  teaching_method TEXT DEFAULT 'visual',
  
  -- AI
  tagline TEXT,
  quote TEXT,
  system_prompt TEXT,
  signature_phrases TEXT[] DEFAULT '{}',
  intro_message TEXT,
  
  -- Meta
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TOPICS (Courses)
-- ============================================
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  
  -- Visual
  icon TEXT,
  color TEXT DEFAULT '#7A9E8E',
  cover_image TEXT,
  
  -- Settings
  is_locked BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  
  -- Relations
  professor_id UUID REFERENCES professors(id),
  
  -- Meta
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ -- soft delete
);

-- ============================================
-- LESSONS
-- ============================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  
  -- Content
  why TEXT, -- Proč se to učit
  human_explanation TEXT, -- Lidské vysvětlení
  tip TEXT,
  practice TEXT,
  
  -- Blocks (block-based editor)
  content_blocks JSONB DEFAULT '[]'::jsonb,
  
  -- Settings
  xp_reward INT DEFAULT 20,
  estimated_minutes INT DEFAULT 5,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  
  -- Meta
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE(topic_id, slug)
);

-- ============================================
-- LESSON POINTS (Key terms in lesson)
-- ============================================
CREATE TABLE lesson_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  latin TEXT,
  synonym TEXT,
  tip TEXT,
  
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- QUIZ QUESTIONS
-- ============================================
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL, -- optional link to lesson
  
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- ["option1", "option2", "option3", "option4"]
  correct_index INT NOT NULL,
  explanation TEXT,
  
  -- Settings
  difficulty INT DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  
  -- Meta
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ============================================
-- KNOWLEDGE CATEGORIES
-- ============================================
CREATE TABLE knowledge_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  
  -- Visual
  icon TEXT,
  color TEXT DEFAULT '#7A9E8E',
  gradient TEXT,
  
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- KNOWLEDGE ITEMS
-- ============================================
CREATE TABLE knowledge_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES knowledge_categories(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  latin TEXT,
  description TEXT,
  details TEXT,
  technique TEXT,
  
  -- Arrays as JSONB
  benefits JSONB DEFAULT '[]'::jsonb,
  contraindications JSONB DEFAULT '[]'::jsonb,
  br_products JSONB DEFAULT '[]'::jsonb, -- [{name, use}]
  tags JSONB DEFAULT '[]'::jsonb,
  
  tip TEXT,
  warning TEXT,
  
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- ============================================
-- USER PROFILES (extends Supabase Auth)
-- ============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  display_name TEXT,
  avatar_url TEXT,
  
  -- Gamification
  xp INT DEFAULT 0,
  streak INT DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT now(),
  
  -- Preferences
  preferred_professor_id UUID REFERENCES professors(id),
  settings JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- USER PROGRESS
-- ============================================
CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  
  completed_at TIMESTAMPTZ DEFAULT now(),
  time_spent_seconds INT DEFAULT 0,
  
  UNIQUE(user_id, lesson_id)
);

-- ============================================
-- QUIZ RESULTS
-- ============================================
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  
  score INT NOT NULL,
  total_questions INT NOT NULL,
  answers JSONB NOT NULL, -- [{question_id, selected_index, is_correct}]
  time_spent_seconds INT DEFAULT 0,
  
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_lessons_topic ON lessons(topic_id);
CREATE INDEX idx_lesson_points_lesson ON lesson_points(lesson_id);
CREATE INDEX idx_quiz_questions_topic ON quiz_questions(topic_id);
CREATE INDEX idx_knowledge_items_category ON knowledge_items(category_id);
CREATE INDEX idx_user_progress_user ON user_lesson_progress(user_id);
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Public read for content
CREATE POLICY "Public read professors" ON professors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read topics" ON topics FOR SELECT USING (is_published = true AND deleted_at IS NULL);
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (is_published = true AND deleted_at IS NULL);
CREATE POLICY "Public read lesson_points" ON lesson_points FOR SELECT USING (true);
CREATE POLICY "Public read quiz_questions" ON quiz_questions FOR SELECT USING (is_published = true AND deleted_at IS NULL);
CREATE POLICY "Public read knowledge_categories" ON knowledge_categories FOR SELECT USING (is_published = true);
CREATE POLICY "Public read knowledge_items" ON knowledge_items FOR SELECT USING (is_published = true AND deleted_at IS NULL);

-- User can read/write own profile
CREATE POLICY "Users read own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- User can read/write own progress
CREATE POLICY "Users read own progress" ON user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress" ON user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User can read/write own quiz results
CREATE POLICY "Users read own results" ON quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own results" ON quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_professors_updated_at BEFORE UPDATE ON professors FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_knowledge_items_updated_at BEFORE UPDATE ON knowledge_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate user level from XP
CREATE OR REPLACE FUNCTION get_user_level(user_xp INT)
RETURNS TABLE(level INT, name TEXT, icon TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE
      WHEN user_xp >= 1000 THEN 8
      WHEN user_xp >= 700 THEN 7
      WHEN user_xp >= 500 THEN 6
      WHEN user_xp >= 350 THEN 5
      WHEN user_xp >= 200 THEN 4
      WHEN user_xp >= 100 THEN 3
      WHEN user_xp >= 50 THEN 2
      ELSE 1
    END AS level,
    CASE
      WHEN user_xp >= 1000 THEN 'Mistr'
      WHEN user_xp >= 700 THEN 'Expert'
      WHEN user_xp >= 500 THEN 'Pokročilý'
      WHEN user_xp >= 350 THEN 'Praktikant'
      WHEN user_xp >= 200 THEN 'Student'
      WHEN user_xp >= 100 THEN 'Učeň'
      WHEN user_xp >= 50 THEN 'Objevitel'
      ELSE 'Nováček'
    END AS name,
    CASE
      WHEN user_xp >= 1000 THEN '👑'
      WHEN user_xp >= 700 THEN '🎓'
      WHEN user_xp >= 500 THEN '⭐'
      WHEN user_xp >= 350 THEN '🔬'
      WHEN user_xp >= 200 THEN '📚'
      WHEN user_xp >= 100 THEN '🌱'
      WHEN user_xp >= 50 THEN '🔍'
      ELSE '🌟'
    END AS icon;
END;
$$ LANGUAGE plpgsql;

-- Add XP to user
CREATE OR REPLACE FUNCTION add_user_xp(p_user_id UUID, p_xp INT)
RETURNS INT AS $$
DECLARE
  new_xp INT;
BEGIN
  UPDATE user_profiles
  SET xp = xp + p_xp, last_activity_at = now()
  WHERE id = p_user_id
  RETURNING xp INTO new_xp;
  
  RETURN new_xp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
