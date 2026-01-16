// ============================================
// POLYMATH ACADEMY - Supabase Database Types
// Auto-generated from schema, manually maintained
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      professors: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_name: string;
          title: string | null;
          era: string | null;
          avatar: string;
          accent_color: string;
          gradient_from: string;
          gradient_to: string;
          primary_field: string;
          secondary_fields: string[];
          personality: Json;
          teaching_method: string;
          tagline: string | null;
          quote: string | null;
          system_prompt: string | null;
          signature_phrases: string[];
          intro_message: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['professors']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['professors']['Insert']>;
      };
      topics: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          icon: string | null;
          color: string;
          cover_image: string | null;
          is_locked: boolean;
          is_published: boolean;
          sort_order: number;
          professor_id: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['topics']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['topics']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          topic_id: string;
          slug: string;
          title: string;
          why: string | null;
          human_explanation: string | null;
          tip: string | null;
          practice: string | null;
          content_blocks: Json;
          xp_reward: number;
          estimated_minutes: number;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
      };
      lesson_points: {
        Row: {
          id: string;
          lesson_id: string;
          term: string;
          definition: string;
          latin: string | null;
          synonym: string | null;
          tip: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lesson_points']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['lesson_points']['Insert']>;
      };
      quiz_questions: {
        Row: {
          id: string;
          topic_id: string;
          lesson_id: string | null;
          question: string;
          options: Json;
          correct_index: number;
          explanation: string | null;
          difficulty: number;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['quiz_questions']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quiz_questions']['Insert']>;
      };
      knowledge_categories: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          icon: string | null;
          color: string;
          gradient: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['knowledge_categories']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['knowledge_categories']['Insert']>;
      };
      knowledge_items: {
        Row: {
          id: string;
          category_id: string;
          title: string;
          latin: string | null;
          description: string | null;
          details: string | null;
          technique: string | null;
          benefits: Json;
          contraindications: Json;
          br_products: Json;
          tags: Json;
          tip: string | null;
          warning: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['knowledge_items']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['knowledge_items']['Insert']>;
      };
      user_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          xp: number;
          streak: number;
          last_activity_at: string;
          preferred_professor_id: string | null;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>;
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed_at: string;
          time_spent_seconds: number;
        };
        Insert: Omit<Database['public']['Tables']['user_lesson_progress']['Row'], 'id' | 'completed_at'> & {
          id?: string;
          completed_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_lesson_progress']['Insert']>;
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          score: number;
          total_questions: number;
          answers: Json;
          time_spent_seconds: number;
          completed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quiz_results']['Row'], 'id' | 'completed_at'> & {
          id?: string;
          completed_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quiz_results']['Insert']>;
      };
    };
    Functions: {
      get_user_level: {
        Args: { user_xp: number };
        Returns: { level: number; name: string; icon: string }[];
      };
      add_user_xp: {
        Args: { p_user_id: string; p_xp: number };
        Returns: number;
      };
    };
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Convenience exports
export type DBProfessor = Tables<'professors'>;
export type DBTopic = Tables<'topics'>;
export type DBLesson = Tables<'lessons'>;
export type DBLessonPoint = Tables<'lesson_points'>;
export type DBQuizQuestion = Tables<'quiz_questions'>;
export type DBKnowledgeCategory = Tables<'knowledge_categories'>;
export type DBKnowledgeItem = Tables<'knowledge_items'>;
export type DBUserProfile = Tables<'user_profiles'>;
export type DBUserProgress = Tables<'user_lesson_progress'>;
export type DBQuizResult = Tables<'quiz_results'>;
