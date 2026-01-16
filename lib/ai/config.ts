// ============================================
// POLYMATH ACADEMY - AI Configuration
// Professor personas & system prompts
// ============================================

import { getProfessorById, PROFESSORS } from '@/lib/data/professors';
import type { Professor } from '@/types/professor';

// ============================================
// SYSTEM PROMPT BUILDER
// ============================================

export function buildSystemPrompt(professor: Professor, context?: {
  lessonTitle?: string;
  lessonContent?: string;
  studentLevel?: number;
  previousMessages?: number;
}): string {
  const basePrompt = `Jsi ${professor.name}, ${professor.era}. ${professor.tagline}

TVOJE OSOBNOST:
- Formalita: ${professor.personality.formality}/5 (1=velmi neformální, 5=velmi formální)
- Komplexita: ${professor.personality.complexity}/5 (1=velmi jednoduché, 5=expertní)
${professor.personality.humor ? '- Používáš humor a vtipné poznámky' : '- Jsi spíše vážný a seriózní'}
${professor.personality.useAnalogies ? '- Rád používáš analogie z běžného života' : ''}
${professor.personality.useEtymology ? '- Vysvětluješ etymologii slov' : ''}
${professor.personality.useStories ? '- Vyprávíš příběhy a historky' : ''}
${professor.personality.askQuestions ? '- Vedeš studenta otázkami (sokratovská metoda)' : ''}
${professor.personality.useVisuals ? '- Popisuješ věci vizuálně, jako bys kreslil' : ''}
${professor.personality.useExperiments ? '- Navrhuješ praktické experimenty a cvičení' : ''}

TVOJE TYPICKÉ FRÁZE:
${professor.signaturePhrases.map(p => `- "${p}"`).join('\n')}

METODA VÝUKY: ${professor.teachingMethod}
${getTeachingMethodDescription(professor.teachingMethod)}

PRAVIDLA:
1. Odpovídej vždy v češtině
2. Zůstaň v charakteru - jsi ${professor.shortName}, ne AI asistent
3. Používej své typické fráze přirozeně
4. Přizpůsob složitost odpovědi úrovni studenta
5. Pokud nevíš odpověď, přiznej to a navrhni, kdo by mohl pomoci
6. Buď povzbuzující, ale upřímný
7. Krátké odpovědi pro jednoduché otázky, delší pro komplexní
8. Nikdy nezmiňuj, že jsi AI nebo jazykový model

${professor.systemPrompt || ''}`;

  // Add context if provided
  let contextPrompt = '';
  
  if (context?.lessonTitle) {
    contextPrompt += `\n\nAKTUÁLNÍ KONTEXT:
Student se právě učí lekci: "${context.lessonTitle}"
${context.lessonContent ? `Obsah lekce: ${context.lessonContent.slice(0, 500)}...` : ''}`;
  }
  
  if (context?.studentLevel) {
    contextPrompt += `\nÚroveň studenta: ${context.studentLevel}/8 (1=nováček, 8=mistr)`;
  }
  
  return basePrompt + contextPrompt;
}

function getTeachingMethodDescription(method: string): string {
  const descriptions: Record<string, string> = {
    visual: `Jako vizuální učitel:
- Popisuj koncepty jako obrázky a diagramy
- Používej prostorové analogie
- Říkej "Představ si...", "Nakresli si v hlavě..."
- Vysvětluj vztahy mezi částmi`,
    
    storytelling: `Jako storyteller:
- Vyprávěj příběhy a historky
- Používej metafory z běžného života
- Dej věcem kontext a historii
- Spoj abstraktní koncepty s konkrétními příběhy`,
    
    socratic: `Jako sokratovský učitel:
- Veď studenta otázkami k odpovědi
- Neptej se přímo, ale naváděj
- Oceň studentovo uvažování
- Pomoz studentovi najít odpověď sám`,
    
    debugging: `Jako debugger:
- Rozlož problém na kroky
- Jdi systematicky od začátku
- Identifikuj, kde přesně je problém
- Vysvětli logiku krok za krokem`,
    
    experimental: `Jako experimentátor:
- Navrhuj praktické pokusy
- Ptej se "Co se stane když...?"
- Oceňuj chyby jako součást učení
- Propoj teorii s praxí`,
  };
  
  return descriptions[method] || '';
}

// ============================================
// HANDOFF SYSTEM
// ============================================

export interface HandoffSuggestion {
  fromProfessor: Professor;
  toProfessor: Professor;
  reason: string;
  transitionMessage: string;
}

export function checkForHandoff(
  currentProfessor: Professor,
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>
): HandoffSuggestion | null {
  const messageLower = userMessage.toLowerCase();
  
  // Keywords that might trigger handoff
  const handoffTriggers: Array<{
    keywords: string[];
    targetField: string;
    reason: string;
  }> = [
    {
      keywords: ['kód', 'programování', 'python', 'javascript', 'funkce', 'algoritmus', 'loop', 'cyklus'],
      targetField: 'programming',
      reason: 'programování a kód',
    },
    {
      keywords: ['fyzika', 'síla', 'energie', 'pohyb', 'gravitace', 'elektřina', 'magnetismus'],
      targetField: 'physics',
      reason: 'fyzikální principy',
    },
    {
      keywords: ['chemie', 'reakce', 'molekula', 'atom', 'prvek', 'sloučenina', 'kyselina'],
      targetField: 'chemistry',
      reason: 'chemické procesy',
    },
    {
      keywords: ['právo', 'zákon', 'spravedlnost', 'etika', 'morálka', 'filozofie', 'smysl'],
      targetField: 'philosophy',
      reason: 'etické a filozofické otázky',
    },
    {
      keywords: ['anatomie', 'tělo', 'sval', 'kost', 'orgán', 'krev', 'nerv', 'tkáň'],
      targetField: 'anatomy',
      reason: 'anatomii lidského těla',
    },
  ];
  
  // Check if current professor can handle it
  const currentFields = [currentProfessor.primaryField, ...currentProfessor.secondaryFields];
  
  for (const trigger of handoffTriggers) {
    const hasKeyword = trigger.keywords.some(kw => messageLower.includes(kw));
    
    if (hasKeyword && !currentFields.includes(trigger.targetField as any)) {
      // Find a professor who specializes in this
      const targetProfessor = PROFESSORS.find(p => 
        p.primaryField === trigger.targetField || 
        p.secondaryFields.includes(trigger.targetField as any)
      );
      
      if (targetProfessor && targetProfessor.id !== currentProfessor.id) {
        return {
          fromProfessor: currentProfessor,
          toProfessor: targetProfessor,
          reason: trigger.reason,
          transitionMessage: generateHandoffMessage(currentProfessor, targetProfessor, trigger.reason),
        };
      }
    }
  }
  
  return null;
}

function generateHandoffMessage(from: Professor, to: Professor, topic: string): string {
  const templates = [
    `${from.signaturePhrases[0] || 'Hmm,'} na ${topic} je ${to.shortName} skutečný expert. Předám tě do dobrých rukou!`,
    `Víš co? Pro ${topic} bych ti doporučil ${to.name}. ${to.tagline}`,
    `Tady bych přizval ${to.shortName} - ${topic} je přesně jejich parketa.`,
    `Pro ${topic} máme specialistu! ${to.name} ti to vysvětlí lépe než já.`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// ============================================
// CONVERSATION HELPERS
// ============================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  professorId?: string;
  timestamp: Date;
  isHandoff?: boolean;
}

export function formatMessagesForAPI(
  messages: ChatMessage[]
): Array<{ role: 'user' | 'assistant'; content: string }> {
  return messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));
}

// Generate intro message for a lesson
export function generateLessonIntro(professor: Professor, lessonTitle: string): string {
  const intros: Record<string, string[]> = {
    davinci: [
      `Pojď, nakreslíme si ${lessonTitle} společně! Co o tom už víš?`,
      `${lessonTitle}? Fascinující téma! Představ si to jako mapu, kterou budeme společně objevovat.`,
      `Začneme vizuálně - ${lessonTitle} je jako puzzle, které složíme kousek po kousku.`,
    ],
    feynman: [
      `Hele, ${lessonTitle} zní složitě, ale ve skutečnosti je to super jednoduché! Pojďme na to.`,
      `Víš, co mě na ${lessonTitle} fascinuje? Je to jako... vlastně, zkus mi nejdřív říct, co si o tom myslíš ty!`,
      `${lessonTitle}! To mi připomíná jednu historku... ale nejdřív - máš nějakou představu, o co jde?`,
    ],
    socrates: [
      `${lessonTitle}... zajímavé téma. Řekni mi nejdřív - proč se to chceš naučit?`,
      `Co víš o ${lessonTitle}? A co si myslíš, že nevíš?`,
      `Než začneme s ${lessonTitle}, položím ti otázku: Co je podle tebe nejdůležitější pochopit?`,
    ],
    ada: [
      `${lessonTitle} - pojďme to rozložit na logické kroky. Připraven/a?`,
      `Začneme systematicky. ${lessonTitle} má jasnou strukturu, kterou projdeme krok za krokem.`,
      `Dobrá, ${lessonTitle}. Nejdřív definujeme problém, pak najdeme řešení. Jakou máš představu?`,
    ],
    marie: [
      `${lessonTitle}? Skvělé! Nejlepší způsob, jak to pochopit, je vyzkoušet si to. Jsi připraven/a experimentovat?`,
      `Pojďme na ${lessonTitle} prakticky! Co kdybychom začali jednoduchým pokusem?`,
      `${lessonTitle} - teorie je fajn, ale praxe je lepší. Máš připravené ruce i hlavu?`,
    ],
  };
  
  const professorIntros = intros[professor.id] || intros.davinci;
  return professorIntros[Math.floor(Math.random() * professorIntros.length)];
}

// ============================================
// QUICK RESPONSES
// ============================================

export const quickResponses = {
  greeting: (professor: Professor) => {
    const greetings: Record<string, string[]> = {
      davinci: ['Ciao!', 'Ahoj, mladý umělče!', 'Vítej v mém ateliéru!'],
      feynman: ['Hele, ahoj!', 'Super, že jsi tu!', 'Nazdar!'],
      socrates: ['Buď zdráv.', 'Vítej, příteli.', 'Rád tě poznávám.'],
      ada: ['Dobrý den.', 'Vítej.', 'Připraven/a začít?'],
      marie: ['Ahoj!', 'Vítej v laboratoři!', 'Skvělé, že jsi tu!'],
    };
    const list = greetings[professor.id] || greetings.davinci;
    return list[Math.floor(Math.random() * list.length)];
  },
  
  encouragement: (professor: Professor) => {
    const phrases: Record<string, string[]> = {
      davinci: ['Výborně!', 'Přesně tak!', 'Tvůj pohled je zajímavý.'],
      feynman: ['Super!', 'To je ono!', 'Přesně! Není to cool?'],
      socrates: ['Zajímavá úvaha.', 'Jdeš správným směrem.', 'Přemýšlíš dobře.'],
      ada: ['Správně.', 'Přesný postup.', 'Výborná logika.'],
      marie: ['Skvělý pokus!', 'Ano, přesně!', 'To je vědecký přístup!'],
    };
    const list = phrases[professor.id] || phrases.davinci;
    return list[Math.floor(Math.random() * list.length)];
  },
  
  confusion: (professor: Professor) => {
    const phrases: Record<string, string[]> = {
      davinci: ['Pojďme to nakreslit jinak...', 'Zkusím to vysvětlit vizuálněji.', 'Představ si to takto...'],
      feynman: ['Hele, zkusím to jednodušeji...', 'Počkej, mám lepší analogii!', 'OK, jiný příklad...'],
      socrates: ['Zkusme se na to podívat z jiného úhlu.', 'Co kdybys odpověděl/a na tuto otázku...', 'Vraťme se k základům.'],
      ada: ['Pojďme krok zpět.', 'Zopakuji to systematičtěji.', 'Rozložme to na menší části.'],
      marie: ['Zkusíme jiný experiment!', 'Pojďme na to praktičtěji.', 'Co kdybys to zkusil/a sám/sama?'],
    };
    const list = phrases[professor.id] || phrases.davinci;
    return list[Math.floor(Math.random() * list.length)];
  },
};

export default {
  buildSystemPrompt,
  checkForHandoff,
  formatMessagesForAPI,
  generateLessonIntro,
  quickResponses,
};
