// ============================================
// POLYMATH ACADEMY - Supabase Client
// ============================================

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Environment variables (set in .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Create typed client
export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Helper for server-side with service role
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceRoleKey) return null;
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// ============================================
// CRUD Helpers
// ============================================

// Professors
export const professorService = {
  getAll: async () => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('professors').select('*').order('sort_order');
  },
  
  getById: async (id: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('professors').select('*').eq('id', id).single();
  },
  
  create: async (professor: Database['public']['Tables']['professors']['Insert']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('professors').insert(professor).select().single();
  },
  
  update: async (id: string, updates: Database['public']['Tables']['professors']['Update']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('professors').update(updates).eq('id', id).select().single();
  },
};

// Topics
export const topicService = {
  getAll: async () => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('topics').select('*').is('deleted_at', null).order('sort_order');
  },
  
  getById: async (id: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('topics').select('*').eq('id', id).single();
  },
  
  getWithLessons: async (id: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('topics').select(`*, lessons (*)`).eq('id', id).single();
  },
  
  create: async (topic: Database['public']['Tables']['topics']['Insert']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('topics').insert(topic).select().single();
  },
  
  update: async (id: string, updates: Database['public']['Tables']['topics']['Update']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('topics').update(updates).eq('id', id).select().single();
  },
  
  delete: async (id: string) => {
    if (!supabase) return { error: new Error('Supabase not configured') };
    return supabase.from('topics').update({ deleted_at: new Date().toISOString() }).eq('id', id);
  },
};

// Lessons
export const lessonService = {
  getByTopicId: async (topicId: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('lessons').select('*').eq('topic_id', topicId).is('deleted_at', null).order('sort_order');
  },
  
  getById: async (id: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('lessons').select(`*, lesson_points (*)`).eq('id', id).single();
  },
  
  create: async (lesson: Database['public']['Tables']['lessons']['Insert']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('lessons').insert(lesson).select().single();
  },
  
  update: async (id: string, updates: Database['public']['Tables']['lessons']['Update']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('lessons').update(updates).eq('id', id).select().single();
  },
  
  delete: async (id: string) => {
    if (!supabase) return { error: new Error('Supabase not configured') };
    return supabase.from('lessons').update({ deleted_at: new Date().toISOString() }).eq('id', id);
  },
};

// Quiz Questions
export const questionService = {
  getByTopicId: async (topicId: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('quiz_questions').select('*').eq('topic_id', topicId).is('deleted_at', null).order('sort_order');
  },
  
  getById: async (id: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('quiz_questions').select('*').eq('id', id).single();
  },
  
  create: async (question: Database['public']['Tables']['quiz_questions']['Insert']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('quiz_questions').insert(question).select().single();
  },
  
  update: async (id: string, updates: Database['public']['Tables']['quiz_questions']['Update']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('quiz_questions').update(updates).eq('id', id).select().single();
  },
  
  delete: async (id: string) => {
    if (!supabase) return { error: new Error('Supabase not configured') };
    return supabase.from('quiz_questions').update({ deleted_at: new Date().toISOString() }).eq('id', id);
  },
};

// User
export const userService = {
  getProfile: async (userId: string) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('user_profiles').select('*').eq('id', userId).single();
  },
  
  updateProfile: async (userId: string, updates: Database['public']['Tables']['user_profiles']['Update']) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('user_profiles').update(updates).eq('id', userId).select().single();
  },
  
  addXp: async (userId: string, xp: number) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.rpc('add_user_xp', { p_user_id: userId, p_xp: xp });
  },
  
  completeLesson: async (userId: string, lessonId: string, timeSpent: number) => {
    if (!supabase) return { data: null, error: new Error('Supabase not configured') };
    return supabase.from('user_lesson_progress').upsert({
      user_id: userId,
      lesson_id: lessonId,
      time_spent_seconds: timeSpent,
    }).select().single();
  },
};

export default supabase;
