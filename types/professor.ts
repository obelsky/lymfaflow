// ============================================
// POLYMATH ACADEMY - Professor Types
// ============================================

export type TeachingMethod = 
  | 'visual'      // Da Vinci - kreslí, diagramy
  | 'socratic'    // Sokrates - otázky vedou k odpovědím
  | 'experimental'// Marie Curie - hands-on experimenty
  | 'storytelling'// Feynman - příběhy a analogie
  | 'debugging';  // Ada - krok za krokem, najdi chybu

export type Field = 
  | 'general'     // Da Vinci - všechno
  | 'anatomy'     // Da Vinci
  | 'physics'     // Feynman
  | 'chemistry'   // Marie Curie
  | 'biology'     // Marie Curie
  | 'programming' // Ada Lovelace
  | 'logic'       // Ada Lovelace
  | 'law'         // Sokrates
  | 'philosophy'  // Sokrates
  | 'ethics';     // Sokrates

export type AudienceLevel = 'child' | 'teen' | 'adult' | 'professional';

export interface ProfessorPersonality {
  formality: 1 | 2 | 3 | 4 | 5;      // 1 = casual, 5 = formal
  complexity: 1 | 2 | 3 | 4 | 5;     // 1 = simple, 5 = expert
  humor: boolean;
  useAnalogies: boolean;
  useEtymology: boolean;
  useStories: boolean;
  askQuestions: boolean;             // Sokratovská metoda
  useVisuals: boolean;
  useExperiments: boolean;
}

export interface Professor {
  id: string;
  name: string;
  shortName: string;
  title: string;                     // "Profesor", "Dr.", etc.
  era: string;                       // "1452-1519"
  
  // Vizuál
  avatar: string;                    // SVG component name
  accentColor: string;               // Hlavní barva
  gradientFrom: string;
  gradientTo: string;
  
  // Specializace
  primaryField: Field;
  secondaryFields: Field[];
  
  // Persona
  personality: ProfessorPersonality;
  teachingMethod: TeachingMethod;
  
  // AI
  tagline: string;                   // Krátký popis
  quote: string;                     // Slavný citát
  systemPrompt: string;              // Pro AI
  signaturePhrases: string[];        // Typické fráze
  
  // Intro message pro studenty
  introMessage: string;
}

export interface ProfessorMessage {
  professorId: string;
  type: 'intro' | 'explanation' | 'question' | 'encouragement' | 'handoff';
  content: string;
  metadata?: {
    nextProfessor?: string;          // Pro handoff
    visualUrl?: string;              // Pro visual content
    experimentSteps?: string[];      // Pro experimenty
  };
}

// Pro lesson bloky
export interface ProfessorBlock {
  type: 'professor';
  professorId: string;
  messageType: ProfessorMessage['type'];
  content: string;
}
