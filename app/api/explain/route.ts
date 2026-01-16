// ============================================
// LYMFAFLOW - Quick Explain API
// Pro inline AI vysvětlení v testech a lekcích
// ============================================

import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

interface ExplainRequest {
  type: 'wrong_answer' | 'term' | 'concept';
  question?: string;
  wrongAnswer?: string;
  correctAnswer?: string;
  term?: string;
  definition?: string;
  context?: string;
  professorStyle?: 'visual' | 'storytelling' | 'socratic' | 'systematic' | 'experimental';
}

const PROFESSOR_STYLES = {
  visual: {
    name: 'Da Vinci',
    instruction: 'Odpovídej vizuálně - používej přirovnání k obrazům, tvarům, kreslení. Říkej "představ si", "nakresli si v hlavě".',
  },
  storytelling: {
    name: 'Feynman', 
    instruction: 'Vysvětluj jako příběh nebo analogii z běžného života. Buď nadšený a hravý. Používej "hele", "víš co".',
  },
  socratic: {
    name: 'Sókratés',
    instruction: 'Pokládej otázky, které vedou k pochopení. Nechej studenta přemýšlet.',
  },
  systematic: {
    name: 'Ada',
    instruction: 'Rozepiš to krok za krokem, logicky a strukturovaně. Buď precizní.',
  },
  experimental: {
    name: 'Marie Curie',
    instruction: 'Vysvětluj přes praktické příklady a experimenty. Buď povzbudivá.',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: ExplainRequest = await request.json();
    const { type, question, wrongAnswer, correctAnswer, term, definition, context, professorStyle = 'visual' } = body;
    
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    // Build prompt based on type
    let userPrompt = '';
    let systemPrompt = `Jsi učitel anatomie pro české studenty masérství a kosmetiky. 
${PROFESSOR_STYLES[professorStyle].instruction}
Odpovídej ČESKY, stručně (max 2-3 věty), přátelsky a srozumitelně.
Nepoužívej formální oslovení. Piš jako kamarád, který pomáhá.`;

    if (type === 'wrong_answer') {
      userPrompt = `Student odpověděl špatně na otázku.
Otázka: "${question}"
Špatná odpověď: "${wrongAnswer}"
Správná odpověď: "${correctAnswer}"

Vysvětli KRÁTCE proč je správná odpověď správná. Použij mnemotechniku nebo přirovnání, aby si to student zapamatoval.`;
    } else if (type === 'term') {
      userPrompt = `Vysvětli jednoduše pojem: "${term}"
${definition ? `Základní definice: ${definition}` : ''}
${context ? `Kontext: ${context}` : ''}

Vysvětli to jinak, jednodušeji, s příkladem nebo přirovnáním.`;
    } else if (type === 'concept') {
      userPrompt = `Vysvětli koncept: "${term}"
${context ? `V kontextu: ${context}` : ''}

Vysvětli stručně a použij praktický příklad.`;
    }

    // If no API key, return smart fallback
    if (!apiKey) {
      return NextResponse.json({
        explanation: getFallbackExplanation(type, { question, wrongAnswer, correctAnswer, term, definition }),
        professor: PROFESSOR_STYLES[professorStyle].name,
      });
    }

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
        max_tokens: 256,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return NextResponse.json({
        explanation: getFallbackExplanation(type, { question, wrongAnswer, correctAnswer, term, definition }),
        professor: PROFESSOR_STYLES[professorStyle].name,
        fallback: true,
      });
    }

    const data = await response.json();
    const explanation = data.content?.[0]?.text || getFallbackExplanation(type, { question, wrongAnswer, correctAnswer, term, definition });

    return NextResponse.json({
      explanation,
      professor: PROFESSOR_STYLES[professorStyle].name,
    });

  } catch (error) {
    console.error('Explain API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Fallback vysvětlení když není API
function getFallbackExplanation(
  type: string,
  data: { question?: string; wrongAnswer?: string; correctAnswer?: string; term?: string; definition?: string }
): string {
  if (type === 'wrong_answer' && data.correctAnswer) {
    const mnemonics: Record<string, string> = {
      'dorzální': '💡 Dorsum = záda latinsky. Dorzální = směrem k zádům. U ruky je to hřbet.',
      'ventrální': '💡 Venter = břicho latinsky. Ventrální = směrem k břichu.',
      'mediální': '💡 Medium = střed. Mediální = směrem ke středu těla.',
      'laterální': '💡 Latus = bok latinsky. Laterální = směrem k boku, od středu.',
      'proximální': '💡 Proximus = nejbližší. Proximální = blíže k trupu.',
      'distální': '💡 Distantia = vzdálenost. Distální = dále od trupu.',
      'frontální': '💡 Frons = čelo. Frontální rovina = jako bys stál čelem ke sklu.',
      'sagitální': '💡 Sagitta = šíp. Sagitální rovina prochází jako šíp zepředu dozadu.',
      'transverzální': '💡 Trans = přes. Transverzální = vodorovný řez napříč tělem.',
    };
    
    const lower = data.correctAnswer.toLowerCase();
    for (const [key, value] of Object.entries(mnemonics)) {
      if (lower.includes(key)) {
        return value;
      }
    }
    
    return `💡 Správná odpověď je "${data.correctAnswer}". Zkus si to zapamatovat pomocí latinského kořene slova.`;
  }
  
  if (type === 'term' && data.term) {
    return `${data.term}: ${data.definition || 'Pojem z anatomie.'} 💡 Tip: Rozebeř si latinský původ slova.`;
  }
  
  return '💡 Zkus si to představit vizuálně nebo použij mnemotechniku.';
}
