// ============================================
// POLYMATH ACADEMY - Chat API Route
// POST /api/chat
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt, checkForHandoff, type ChatMessage } from '@/lib/ai/config';
import { getProfessorById } from '@/lib/data/professors';

// Types
interface ChatRequest {
  messages: ChatMessage[];
  professorId: string;
  lessonContext?: {
    lessonId: string;
    lessonTitle: string;
    lessonContent?: string;
  };
  studentLevel?: number;
  checkHandoff?: boolean;
}

interface ChatResponse {
  message: string;
  professorId: string;
  handoff?: {
    suggested: boolean;
    toProfessorId?: string;
    reason?: string;
    transitionMessage?: string;
  };
}

// Claude API configuration
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 1024;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, professorId, lessonContext, studentLevel, checkHandoff: shouldCheckHandoff } = body;
    
    // Validate
    if (!messages || !professorId) {
      return NextResponse.json(
        { error: 'Missing required fields: messages, professorId' },
        { status: 400 }
      );
    }
    
    // Get professor
    const professor = getProfessorById(professorId);
    if (!professor) {
      return NextResponse.json(
        { error: `Professor not found: ${professorId}` },
        { status: 404 }
      );
    }
    
    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Development mode - return mock response
      return NextResponse.json(mockResponse(professor, messages, lessonContext));
    }
    
    // Check for handoff suggestion
    let handoffSuggestion = null;
    if (shouldCheckHandoff && messages.length > 0) {
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        handoffSuggestion = checkForHandoff(professor, lastUserMessage.content, messages);
      }
    }
    
    // Build system prompt
    const systemPrompt = buildSystemPrompt(professor, {
      lessonTitle: lessonContext?.lessonTitle,
      lessonContent: lessonContext?.lessonContent,
      studentLevel,
      previousMessages: messages.length,
    });
    
    // Format messages for Claude API
    const apiMessages = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
    
    // Call Claude API
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: apiMessages,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return NextResponse.json(
        { error: 'AI service error', details: error },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text || 'Omlouvám se, něco se pokazilo.';
    
    // Build response
    const chatResponse: ChatResponse = {
      message: assistantMessage,
      professorId: professor.id,
    };
    
    // Add handoff info if suggested
    if (handoffSuggestion) {
      chatResponse.handoff = {
        suggested: true,
        toProfessorId: handoffSuggestion.toProfessor.id,
        reason: handoffSuggestion.reason,
        transitionMessage: handoffSuggestion.transitionMessage,
      };
    }
    
    return NextResponse.json(chatResponse);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================
// MOCK RESPONSE (Development)
// ============================================

function mockResponse(
  professor: any,
  messages: ChatMessage[],
  lessonContext?: { lessonTitle?: string }
): ChatResponse {
  const lastMessage = messages.filter(m => m.role === 'user').pop();
  const userText = lastMessage?.content?.toLowerCase() || '';
  
  // Simulate different responses based on professor and content
  let response = '';
  
  if (userText.includes('ahoj') || userText.includes('čau') || userText.includes('dobrý den')) {
    response = getGreeting(professor);
  } else if (userText.includes('?')) {
    response = getQuestionResponse(professor, userText, lessonContext?.lessonTitle);
  } else if (userText.includes('díky') || userText.includes('děkuji')) {
    response = getThanksResponse(professor);
  } else if (userText.includes('nechápu') || userText.includes('nerozumím')) {
    response = getConfusionResponse(professor);
  } else {
    response = getGenericResponse(professor, userText);
  }
  
  return {
    message: response,
    professorId: professor.id,
  };
}

function getGreeting(professor: any): string {
  const greetings: Record<string, string> = {
    davinci: 'Ciao! Rád tě vidím. Co bys chtěl dnes prozkoumat? Můžeme si společně nakreslit, jak věci fungují!',
    feynman: 'Hele, ahoj! Super, že jsi tu. Víš, co je na učení nejlepší? Že nikdy nevíš, co objevíš! O čem si chceš povídat?',
    socrates: 'Buď zdráv, příteli. Těší mě, že hledáš poznání. Řekni mi - co tě dnes přivedlo? Jakou otázku nosíš v mysli?',
    ada: 'Dobrý den. Jsem připravena pomoci ti rozložit jakýkoli problém na srozumitelné kroky. Čím začneme?',
    marie: 'Ahoj! Skvělé, že jsi tu! Jsi připraven/a experimentovat a objevovat? Co tě zajímá?',
  };
  return greetings[professor.id] || greetings.davinci;
}

function getQuestionResponse(professor: any, question: string, lessonTitle?: string): string {
  const responses: Record<string, string[]> = {
    davinci: [
      `Výborná otázka! Pojď, nakreslím ti to. Představ si to takto...`,
      `Zajímavé, že se ptáš! Víš, já vždy říkám - nejlepší způsob, jak něco pochopit, je to nakreslit.`,
      `${professor.signaturePhrases[0]} Tohle téma je jako puzzle - musíme ho poskládat kousek po kousku.`,
    ],
    feynman: [
      `Super otázka! Hele, zkus si to představit takhle jednoduše...`,
      `To je ono! Přesně tahle zvědavost je důležitá. Víš co? Je to vlastně jako...`,
      `${professor.signaturePhrases[0]} Pojďme na to zábavně - představ si, že...`,
    ],
    socrates: [
      `Dobrá otázka. Ale nejdřív mi řekni - co si o tom myslíš ty?`,
      `Zajímavé. A proč se ptáš právě na tohle? Co tě k tomu vede?`,
      `Než odpovím, zkus mi říct, jak bys to vysvětlil/a sám/sama.`,
    ],
    ada: [
      `Rozeberme to systematicky. Krok 1: definujme, co přesně potřebujeme vědět...`,
      `Dobrá otázka. Pojďme to rozložit na části - nejdřív základy, pak detaily.`,
      `Začněme od začátku. Co už víš a kde přesně vzniká zmatek?`,
    ],
    marie: [
      `Skvělá otázka! Nejlepší způsob, jak to zjistit, je pokus. Co kdybys...`,
      `Zajímavé! Víš, v laboratoři bychom to ověřili experimentem. Zkus si představit...`,
      `To je přesně ten typ otázky, který miluju! Pojďme na to vědecky...`,
    ],
  };
  
  const list = responses[professor.id] || responses.davinci;
  const base = list[Math.floor(Math.random() * list.length)];
  
  if (lessonTitle) {
    return `${base} V kontextu "${lessonTitle}" je to obzvlášť důležité pochopit.`;
  }
  
  return base;
}

function getThanksResponse(professor: any): string {
  const responses: Record<string, string> = {
    davinci: 'Není zač! Pamatuj - nejlepší učení je takové, které tě baví. Máš další otázky?',
    feynman: 'Hele, v pohodě! Bavilo mě to vysvětlovat. Ozvi se, kdyby bylo cokoli!',
    socrates: 'Radost je má, že hledáš poznání. Pamatuj - moudrost začíná tam, kde uznáme, že nevíme.',
    ada: 'Rádo se stalo. Systematický přístup vždy funguje. Pokud budeš potřebovat další pomoc, jsem tu.',
    marie: 'Není zač! A pamatuj - každá chyba je jen další krok k objevu. Neboj se experimentovat!',
  };
  return responses[professor.id] || responses.davinci;
}

function getConfusionResponse(professor: any): string {
  const responses: Record<string, string> = {
    davinci: 'Nic se neděje! Pojďme to nakreslit jinak. Někdy stačí změnit úhel pohledu. Kde přesně se ti to zamotává?',
    feynman: 'Hele, to je úplně v pořádku! Nejlepší vědci jsou ti, co přiznají zmatek. Zkusím to jednodušeji...',
    socrates: 'Zmatek je začátek moudrosti. Řekni mi, co konkrétně ti nedává smysl?',
    ada: 'Vraťme se o krok zpět. Kde přesně se ztratila logická nit? Pojďme to systematicky.',
    marie: 'Žádný problém! I v laboratoři se někdy pokusy nepodaří napoprvé. Zkusíme jiný přístup!',
  };
  return responses[professor.id] || responses.davinci;
}

function getGenericResponse(professor: any, userText: string): string {
  const responses: Record<string, string[]> = {
    davinci: [
      'Zajímavé! Pojď, pojďme to prozkoumat vizuálně. Co kdybychom si to nakreslili?',
      'To mě fascinuje! Víš, každý koncept má svou vizuální podobu. Pojďme ji najít.',
      'Výborně! Přemýšlím, jak ti to nejlépe ukázat. Představ si...',
    ],
    feynman: [
      'Super! Hele, tohle téma je úžasné. Pojďme se do toho ponořit!',
      'Víš co? Tohle mi připomíná jednu věc... Zkus si to představit jako...',
      'To je zajímavá myšlenka! Pojďme to rozebrat hravě.',
    ],
    socrates: [
      'Zajímavá úvaha. Co tě k ní vede?',
      'Pokračuj v této myšlence. Kam tě zavede?',
      'A co z toho plyne? Zkus domyslet důsledky.',
    ],
    ada: [
      'Dobře, pojďme to strukturovat. Máme několik bodů k řešení.',
      'Rozumím. Nejdřív identifikujme klíčové části problému.',
      'Systematicky: co víme, co potřebujeme zjistit, jak to propojit.',
    ],
    marie: [
      'To zní jako příležitost k experimentu! Co kdybychom...',
      'Zajímavé! V laboratoři bychom to ověřili prakticky. Představ si...',
      'Pojďme na to vědeckou metodou - hypotéza, experiment, závěr!',
    ],
  };
  
  const list = responses[professor.id] || responses.davinci;
  return list[Math.floor(Math.random() * list.length)];
}
