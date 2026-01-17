// ============================================
// LYMFAFLOW - BIOLOGIQUE RECHERCHE SECTION
// Prémiová francouzská dermokosmtika
// AI-powered Skin Instant analýza
// ============================================

'use client';

import React, { useState } from 'react';

// === IKONY ===
const BRIcons = {
  Droplet: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2c0 0-7 9-7 13a7 7 0 1014 0c0-4-7-13-7-13z" />
      <circle cx="12" cy="15" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  Leaf: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2c-4 4-8 8-8 14a8 8 0 0016 0c0-6-4-10-8-14z" />
      <path d="M12 22V8" opacity="0.5" />
      <path d="M8 14c2-1 4-1 6 0" opacity="0.5" />
    </svg>
  ),
  Flask: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M9 3h6v5l4 9a2 2 0 01-2 3H7a2 2 0 01-2-3l4-9V3z" />
      <path d="M9 3h6" strokeWidth="2" />
      <path d="M7 15h10" opacity="0.5" />
      <circle cx="10" cy="17" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="14" cy="18" r="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  Layers: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" opacity="0.5" />
    </svg>
  ),
  Sparkle: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  Face: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M8 15c1.5 2 6.5 2 8 0" />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Arrow: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Back: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  Info: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  Star: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

// === TYPY ===
type SkinInstant = 
  | 'seborrheique' // Mastná, akné
  | 'deshydratee'  // Dehydratovaná
  | 'sensible'     // Citlivá
  | 'mature'       // Zralá, vrásky
  | 'pigmentee'    // Pigmentové skvrny
  | 'mixte';       // Smíšená

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    points: Partial<Record<SkinInstant, number>>;
  }[];
}

interface Product {
  id: string;
  name: string;
  nameShort: string;
  category: 'cleansing' | 'lotion' | 'serum' | 'cream' | 'mask' | 'eye';
  description: string;
  keyIngredients: string[];
  skinInstants: SkinInstant[];
  layerOrder: number;
  isCult?: boolean;
  tip?: string;
}

interface SkinInstantInfo {
  id: SkinInstant;
  name: string;
  nameCZ: string;
  description: string;
  characteristics: string[];
  color: string;
  gradient: string;
}

// === DATA ===
const SKIN_INSTANTS: SkinInstantInfo[] = [
  {
    id: 'seborrheique',
    name: 'Séborrhéique',
    nameCZ: 'Mastná pleť',
    description: 'Nadměrná produkce kožního mazu, rozšířené póry, sklon k akné a černým tečkám.',
    characteristics: ['Lesklá T-zóna', 'Rozšířené póry', 'Černé tečky', 'Akné'],
    color: '#7FB069',
    gradient: 'linear-gradient(135deg, #7FB069 0%, #5E9B4D 100%)',
  },
  {
    id: 'deshydratee',
    name: 'Déshydratée',
    nameCZ: 'Dehydratovaná pleť',
    description: 'Nedostatek vody v pokožce, pocit napnutí, jemné dehydratační linky.',
    characteristics: ['Pocit napnutí', 'Matný vzhled', 'Jemné linky', 'Drsnost'],
    color: '#5DA9E9',
    gradient: 'linear-gradient(135deg, #5DA9E9 0%, #3D8BC9 100%)',
  },
  {
    id: 'sensible',
    name: 'Sensible',
    nameCZ: 'Citlivá pleť',
    description: 'Reaktivní pleť se sklonem k zarudnutí, podráždění a nepohodlí.',
    characteristics: ['Zarudnutí', 'Reaktivita', 'Pálení', 'Intolerance'],
    color: '#E8A0BF',
    gradient: 'linear-gradient(135deg, #E8A0BF 0%, #D4789C 100%)',
  },
  {
    id: 'mature',
    name: 'Mature',
    nameCZ: 'Zralá pleť',
    description: 'Známky stárnutí - vrásky, ztráta pevnosti, povislost, ztráta objemu.',
    characteristics: ['Vrásky', 'Ztráta pevnosti', 'Povislost', 'Ztráta jasu'],
    color: '#C9A962',
    gradient: 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)',
  },
  {
    id: 'pigmentee',
    name: 'Pigmentée',
    nameCZ: 'Pigmentová pleť',
    description: 'Nerovnoměrný tón pleti, pigmentové skvrny, hyperpigmentace.',
    characteristics: ['Skvrny', 'Nerovný tón', 'Sluneční poškození', 'Melasma'],
    color: '#9B7EBD',
    gradient: 'linear-gradient(135deg, #9B7EBD 0%, #7B5E9D 100%)',
  },
  {
    id: 'mixte',
    name: 'Mixte',
    nameCZ: 'Smíšená pleť',
    description: 'Kombinace více stavů - typicky mastná T-zóna a suché tváře.',
    characteristics: ['Mastná T-zóna', 'Suché tváře', 'Nerovnoměrnost', 'Variabilita'],
    color: '#6B9E7A',
    gradient: 'linear-gradient(135deg, #6B9E7A 0%, #4B7E5A 100%)',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Jak vypadá tvá pleť ráno po probuzení?',
    options: [
      { text: 'Lesklá, zejména na čele a nose', points: { seborrheique: 3, mixte: 1 } },
      { text: 'Napnutá a suchá', points: { deshydratee: 3, sensible: 1 } },
      { text: 'Zarudlá na některých místech', points: { sensible: 3 } },
      { text: 'V pohodě, ale vidím jemné vrásky', points: { mature: 3, deshydratee: 1 } },
    ],
  },
  {
    id: 'q2',
    question: 'Jak reaguje tvá pleť na nové produkty?',
    options: [
      { text: 'Často se mi ucpávají póry', points: { seborrheique: 3 } },
      { text: 'Bývá ještě sušší', points: { deshydratee: 3 } },
      { text: 'Zčervená nebo pálí', points: { sensible: 3 } },
      { text: 'Většinou dobře, ale efekt netrvá', points: { mature: 2, mixte: 1 } },
    ],
  },
  {
    id: 'q3',
    question: 'Jaký je tvůj hlavní problém s pletí?',
    options: [
      { text: 'Akné, černé tečky, lesk', points: { seborrheique: 3 } },
      { text: 'Suchost, pocit stažení', points: { deshydratee: 3 } },
      { text: 'Citlivost, reaktivita', points: { sensible: 3 } },
      { text: 'Vrásky, povislost', points: { mature: 3 } },
      { text: 'Skvrny, nerovný tón', points: { pigmentee: 3 } },
      { text: 'Kombinace více problémů', points: { mixte: 3 } },
    ],
  },
  {
    id: 'q4',
    question: 'Jak vypadají tvé póry?',
    options: [
      { text: 'Rozšířené, viditelné', points: { seborrheique: 3, mixte: 1 } },
      { text: 'Jemné, téměř neviditelné', points: { deshydratee: 2, sensible: 1 } },
      { text: 'Normální, ale pleť je nerovná', points: { pigmentee: 2, mature: 1 } },
      { text: 'Rozšířené jen v T-zóně', points: { mixte: 3 } },
    ],
  },
  {
    id: 'q5',
    question: 'Kolik ti je let?',
    options: [
      { text: 'Pod 25', points: { seborrheique: 2, sensible: 1 } },
      { text: '25-35', points: { deshydratee: 1, mixte: 1 } },
      { text: '35-45', points: { mature: 1, pigmentee: 1 } },
      { text: 'Nad 45', points: { mature: 3, pigmentee: 2 } },
    ],
  },
  {
    id: 'q6',
    question: 'Jak často jsi na slunci?',
    options: [
      { text: 'Často, miluji sluníčko', points: { pigmentee: 3, mature: 1 } },
      { text: 'Občas, používám SPF', points: { mixte: 1 } },
      { text: 'Vyhýbám se, mám citlivou pleť', points: { sensible: 2 } },
      { text: 'Minimálně, pracuji uvnitř', points: { deshydratee: 1 } },
    ],
  },
];

const BR_PRODUCTS: Product[] = [
  // Čištění
  {
    id: 'lait-u',
    name: 'Lait U',
    nameShort: 'Lait U',
    category: 'cleansing',
    description: 'Univerzální čisticí mléko pro všechny typy pleti. Jemně odstraňuje nečistoty a make-up.',
    keyIngredients: ['Výtažky z okurky', 'Mléčné proteiny', 'Glycerin'],
    skinInstants: ['deshydratee', 'sensible', 'mixte'],
    layerOrder: 1,
  },
  {
    id: 'lait-vip-o2',
    name: 'Lait VIP O2',
    nameShort: 'VIP O2',
    category: 'cleansing',
    description: 'Okysličující čisticí mléko pro unavenou a matnou pleť. Revitalizuje a rozjasňuje.',
    keyIngredients: ['Kyslíkový komplex', 'Vitamín E', 'Shea máslo'],
    skinInstants: ['mature', 'pigmentee', 'deshydratee'],
    layerOrder: 1,
  },
  // Lotiony
  {
    id: 'p50',
    name: 'Lotion P50',
    nameShort: 'P50',
    category: 'lotion',
    description: 'Kultovní exfoliační lotion. Reguluje pH, obnovuje texturu, čistí póry. "Facelift v lahvičce".',
    keyIngredients: ['Kyselina mléčná', 'Kyselina salicylová', 'Síra', 'Niacinamid'],
    skinInstants: ['seborrheique', 'mixte', 'pigmentee'],
    layerOrder: 2,
    isCult: true,
    tip: 'Nanášej na bavlněný tampón a jemně potírej. První týdny může mírně štípat - to je normální!',
  },
  {
    id: 'p50w',
    name: 'Lotion P50W',
    nameShort: 'P50W',
    category: 'lotion',
    description: 'Jemnější verze P50 pro citlivou pleť. Stejné výsledky, šetrnější formule.',
    keyIngredients: ['Kyselina mléčná', 'Niacinamid', 'Fytosfingosiny'],
    skinInstants: ['sensible', 'deshydratee', 'mature'],
    layerOrder: 2,
    isCult: true,
  },
  {
    id: 'p50-pigm400',
    name: 'Lotion P50 PIGM 400',
    nameShort: 'P50 PIGM',
    category: 'lotion',
    description: 'Speciální P50 proti pigmentaci. Sjednocuje tón a zesvětluje skvrny.',
    keyIngredients: ['Kyselina azelainová', 'Vitamín C', 'Arbutin'],
    skinInstants: ['pigmentee', 'mature'],
    layerOrder: 2,
    isCult: true,
  },
  // Séra
  {
    id: 'serum-placenta',
    name: 'Sérum Placenta',
    nameShort: 'Placenta',
    category: 'serum',
    description: 'Regenerační sérum s rostlinnými placentami. Zlepšuje elasticitu a hojení.',
    keyIngredients: ['Rostlinná placenta', 'Kolagen', 'Elastin'],
    skinInstants: ['mature', 'deshydratee'],
    layerOrder: 3,
  },
  {
    id: 'serum-a-glyca',
    name: 'Sérum A-Glyca',
    nameShort: 'A-Glyca',
    category: 'serum',
    description: 'Anti-glykační sérum proti stárnutí. Brání zkřížení kolagenových vláken.',
    keyIngredients: ['Anti-glykační komplex', 'Peptidy', 'Kyselina hyaluronová'],
    skinInstants: ['mature', 'pigmentee'],
    layerOrder: 3,
  },
  {
    id: 'serum-t-lwc',
    name: 'Sérum T.E.W.L.',
    nameShort: 'T.E.W.L.',
    category: 'serum',
    description: 'Hydratační sérum obnovující kožní bariéru. Proti transepidermální ztrátě vody.',
    keyIngredients: ['Ceramidy', 'Skvalen', 'Mastné kyseliny'],
    skinInstants: ['deshydratee', 'sensible'],
    layerOrder: 3,
  },
  {
    id: 'serum-sebum',
    name: 'Sérum Sébum',
    nameShort: 'Sébum',
    category: 'serum',
    description: 'Seboregulační sérum pro mastnou pleť. Kontroluje lesk a čistí póry.',
    keyIngredients: ['Zinek', 'Kyselina salicylová', 'Výtažek z kopřivy'],
    skinInstants: ['seborrheique', 'mixte'],
    layerOrder: 3,
  },
  // Krémy
  {
    id: 'creme-dermopurifiante',
    name: 'Crème Dermopurifiante',
    nameShort: 'Dermopurif.',
    category: 'cream',
    description: 'Čisticí krém pro problematickou pleť. Matuje a zabraňuje nedokonalostem.',
    keyIngredients: ['Zinek', 'Síra', 'Výtažek z lopuchu'],
    skinInstants: ['seborrheique', 'mixte'],
    layerOrder: 4,
  },
  {
    id: 'creme-vg',
    name: 'Crème VG',
    nameShort: 'VG',
    category: 'cream',
    description: 'Anti-aging krém s komplexem proti vráskám. Vyplňuje a zpevňuje.',
    keyIngredients: ['Peptidy', 'Koenzym Q10', 'Vitamín A'],
    skinInstants: ['mature'],
    layerOrder: 4,
  },
  {
    id: 'creme-dermo-rl',
    name: 'Crème Dermo-RL',
    nameShort: 'Dermo-RL',
    category: 'cream',
    description: 'Zklidňující krém pro reaktivní pleť. Posiluje kapilární stěny.',
    keyIngredients: ['Vitamín K', 'Arnika', 'Rutin'],
    skinInstants: ['sensible'],
    layerOrder: 4,
  },
  {
    id: 'creme-msr-h',
    name: 'Crème MSR-H',
    nameShort: 'MSR-H',
    category: 'cream',
    description: 'Intenzivně hydratační krém. Obnovuje komfort a pružnost suché pleti.',
    keyIngredients: ['Kyselina hyaluronová', 'Ceramidy', 'Aloe vera'],
    skinInstants: ['deshydratee', 'sensible'],
    layerOrder: 4,
  },
  // Masky
  {
    id: 'masque-vivant',
    name: 'Masque Vivant',
    nameShort: 'Vivant',
    category: 'mask',
    description: 'Kultovní kvasnicová maska. Čistí, zjemňuje a rozjasňuje pleť.',
    keyIngredients: ['Kvasinky', 'Vitamíny skupiny B', 'Zinek'],
    skinInstants: ['seborrheique', 'mixte', 'mature'],
    layerOrder: 5,
    isCult: true,
    tip: 'Nech působit 15-20 minut. Může mít specifický zápach - to jsou aktivní kvasinky!',
  },
  {
    id: 'masque-vip-o2',
    name: 'Masque VIP O2',
    nameShort: 'VIP O2',
    category: 'mask',
    description: 'Okysličující maska pro zářivou pleť. Detoxikuje a revitalizuje.',
    keyIngredients: ['Kyslík', 'Vitamíny', 'Výtažky z řas'],
    skinInstants: ['mature', 'deshydratee', 'pigmentee'],
    layerOrder: 5,
  },
  // Oční péče
  {
    id: 'creme-contour-yeux',
    name: 'Crème Contour des Yeux',
    nameShort: 'Contour Yeux',
    category: 'eye',
    description: 'Oční krém proti váčkům a kruhům. Drenážní a zpevňující účinek.',
    keyIngredients: ['Kofein', 'Peptidy', 'Vitamín K'],
    skinInstants: ['mature', 'deshydratee', 'sensible', 'pigmentee', 'seborrheique', 'mixte'],
    layerOrder: 4,
  },
];

// === KOMPONENTY ===

// Intro sekce
function BRIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-[#F5F0E8]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUE5NjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative px-6 pt-12 pb-16 text-center">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm mb-8">
            <BRIcons.Flask className="w-5 h-5 text-[#C9A962]" />
            <span className="text-sm font-medium text-[#2D3640]">Biologique Recherche</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light text-[#2D3640] mb-4 tracking-wide">
            Objevte svůj
            <span className="block font-semibold text-[#C9A962]">Skin Instant®</span>
          </h1>
          
          <p className="text-[#6B7B8A] max-w-md mx-auto mb-8 leading-relaxed">
            Vaše pleť je jedinečná a mění se každý den. 
            Zjistěte svůj aktuální stav pleti a získejte personalizovanou péči.
          </p>
          
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#A68B4B] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <BRIcons.Face className="w-5 h-5" />
            Analyzovat pleť
            <BRIcons.Arrow className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Co je Skin Instant */}
      <div className="px-6 py-12 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6ED] flex items-center justify-center">
              <BRIcons.Sparkle className="w-6 h-6 text-[#C9A962]" />
            </div>
            <div>
              <h2 className="font-semibold text-[#2D3640]">Co je Skin Instant®?</h2>
              <p className="text-sm text-[#6B7B8A]">Revoluce v péči o pleť</p>
            </div>
          </div>
          
          <div className="space-y-4 text-[#4A5568]">
            <p>
              <strong className="text-[#2D3640]">Biologique Recherche</strong> změnila pohled na kosmetiku. 
              Místo statických "typů pleti" pracuje s konceptem <strong className="text-[#C9A962]">Skin Instant®</strong> – 
              momentálním stavem vaší pleti, který se mění podle sezóny, stresu, hormonů či stravy.
            </p>
            <p>
              Díky tomu dostanete <em>přesně to, co vaše pleť právě teď potřebuje</em>, 
              ne univerzální řešení pro "suchou" nebo "mastnou" pleť.
            </p>
          </div>
        </div>
      </div>
      
      {/* Proč BR */}
      <div className="px-6 py-12">
        <h3 className="text-center text-lg font-semibold text-[#2D3640] mb-8">Proč Biologique Recherche?</h3>
        
        <div className="grid gap-4 max-w-2xl mx-auto">
          {[
            { icon: BRIcons.Flask, title: 'Klinická účinnost', desc: 'Vysoké koncentrace aktivních látek. Až 21% účinných složek.' },
            { icon: BRIcons.Leaf, title: 'Přírodní základ', desc: 'Rostlinné výtažky, biomimetické peptidy, žádné parabeny.' },
            { icon: BRIcons.Layers, title: 'Layering metodologie', desc: 'Správné vrstvení produktů pro maximální účinek.' },
            { icon: BRIcons.Droplet, title: 'Personalizace', desc: 'Každá péče je sestavena na míru vašemu Skin Instant.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#F0F5F2] flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-[#7A9E8E]" />
              </div>
              <div>
                <h4 className="font-medium text-[#2D3640] mb-1">{item.title}</h4>
                <p className="text-sm text-[#6B7B8A]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="px-6 py-12 text-center">
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-[#2D3640] to-[#1a2028] rounded-2xl text-white">
          <BRIcons.Face className="w-12 h-12 mx-auto mb-4 text-[#C9A962]" />
          <h3 className="text-lg font-semibold mb-2">Připraveni?</h3>
          <p className="text-white/70 text-sm mb-6">
            6 otázek, 2 minuty, personalizovaná doporučení
          </p>
          <button
            onClick={onStart}
            className="w-full py-3 bg-[#C9A962] hover:bg-[#B8984F] text-[#2D3640] font-semibold rounded-xl transition-colors"
          >
            Spustit analýzu
          </button>
        </div>
      </div>
    </div>
  );
}

// Quiz komponenta
function SkinQuiz({ 
  onComplete 
}: { 
  onComplete: (results: Record<SkinInstant, number>) => void 
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<SkinInstant, number>>({
    seborrheique: 0,
    deshydratee: 0,
    sensible: 0,
    mature: 0,
    pigmentee: 0,
    mixte: 0,
  });
  
  const question = QUIZ_QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUIZ_QUESTIONS.length) * 100;
  
  const handleAnswer = (optionIndex: number) => {
    const option = question.options[optionIndex];
    const newScores = { ...scores };
    
    Object.entries(option.points).forEach(([key, value]) => {
      newScores[key as SkinInstant] += value || 0;
    });
    
    setScores(newScores);
    
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      setTimeout(() => onComplete(newScores), 300);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-white px-6 py-8">
      {/* Progress */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex items-center justify-between text-sm text-[#6B7B8A] mb-2">
          <span>Otázka {currentQ + 1} z {QUIZ_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-[#E2E6EA] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#C9A962] to-[#7A9E8E] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-[#2D3640] mb-6 text-center">
          {question.question}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full p-4 bg-white border-2 border-[#E2E6EA] rounded-xl text-left 
                         hover:border-[#C9A962] hover:bg-[#FAF6ED] transition-all group"
            >
              <span className="text-[#2D3640] group-hover:text-[#C9A962]">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Výsledky
function SkinResults({ 
  scores, 
  onReset,
  onViewRoutine 
}: { 
  scores: Record<SkinInstant, number>;
  onReset: () => void;
  onViewRoutine: (skinInstant: SkinInstant) => void;
}) {
  // Najdi dominantní Skin Instant
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0] as SkinInstant;
  const secondary = sorted[1]?.[1] > 0 ? sorted[1][0] as SkinInstant : null;
  
  const primaryInfo = SKIN_INSTANTS.find(s => s.id === primary)!;
  const secondaryInfo = secondary ? SKIN_INSTANTS.find(s => s.id === secondary) : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-white">
      {/* Hero result */}
      <div 
        className="px-6 py-12 text-center text-white"
        style={{ background: primaryInfo.gradient }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
          <BRIcons.Check className="w-4 h-4" />
          <span className="text-sm font-medium">Analýza dokončena</span>
        </div>
        
        <h1 className="text-2xl font-light mb-2">Váš Skin Instant® je</h1>
        <h2 className="text-4xl font-bold mb-2">{primaryInfo.name}</h2>
        <p className="text-xl opacity-90">{primaryInfo.nameCZ}</p>
        
        {secondaryInfo && (
          <p className="mt-4 text-sm opacity-80">
            Se sekundárním stavem: <strong>{secondaryInfo.nameCZ}</strong>
          </p>
        )}
      </div>
      
      {/* Detail */}
      <div className="px-6 py-8 -mt-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-[#2D3640] mb-3">Co to znamená?</h3>
          <p className="text-[#6B7B8A] mb-4">{primaryInfo.description}</p>
          
          <h4 className="font-medium text-[#2D3640] mb-2">Typické projevy:</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {primaryInfo.characteristics.map((char, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: `${primaryInfo.color}15`, color: primaryInfo.color }}
              >
                {char}
              </span>
            ))}
          </div>
          
          <button
            onClick={() => onViewRoutine(primary)}
            className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#A68B4B] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            <BRIcons.Layers className="w-5 h-5" />
            Zobrazit doporučenou rutinu
          </button>
        </div>
      </div>
      
      {/* Graf */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <h3 className="font-semibold text-[#2D3640] mb-4">Váš profil</h3>
          <div className="space-y-3">
            {sorted.map(([id, score]) => {
              const info = SKIN_INSTANTS.find(s => s.id === id)!;
              const maxScore = Math.max(...Object.values(scores));
              const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
              
              return (
                <div key={id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#2D3640]">{info.nameCZ}</span>
                    <span className="text-[#6B7B8A]">{score} bodů</span>
                  </div>
                  <div className="h-2 bg-[#E2E6EA] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: info.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Reset */}
      <div className="px-6 py-8 text-center">
        <button
          onClick={onReset}
          className="text-[#6B7B8A] hover:text-[#2D3640] underline text-sm"
        >
          Opakovat test
        </button>
      </div>
    </div>
  );
}

// Routine/Produkty
function SkinRoutine({ 
  skinInstant,
  onBack 
}: { 
  skinInstant: SkinInstant;
  onBack: () => void;
}) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  const info = SKIN_INSTANTS.find(s => s.id === skinInstant)!;
  const products = BR_PRODUCTS.filter(p => p.skinInstants.includes(skinInstant))
    .sort((a, b) => a.layerOrder - b.layerOrder);
  
  const categories = [
    { id: 'cleansing', name: 'Čištění', icon: BRIcons.Droplet, order: 1 },
    { id: 'lotion', name: 'Lotion P50', icon: BRIcons.Flask, order: 2 },
    { id: 'serum', name: 'Séra', icon: BRIcons.Leaf, order: 3 },
    { id: 'cream', name: 'Krémy', icon: BRIcons.Sparkle, order: 4 },
    { id: 'eye', name: 'Oční péče', icon: BRIcons.Face, order: 4 },
    { id: 'mask', name: 'Masky', icon: BRIcons.Layers, order: 5 },
  ];
  
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-6 py-4"
        style={{ background: info.gradient }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <BRIcons.Back className="w-5 h-5 text-white" />
          </button>
          <div className="text-white">
            <p className="text-sm opacity-80">Rutina pro</p>
            <h1 className="text-xl font-semibold">{info.nameCZ}</h1>
          </div>
        </div>
      </div>
      
      {/* Layering info */}
      <div className="px-6 py-6 bg-white/80 border-b border-[#E2E6EA]">
        <div className="flex items-start gap-3">
          <BRIcons.Info className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-[#2D3640] mb-1">Layering metodologie</h3>
            <p className="text-sm text-[#6B7B8A]">
              Produkty nanášejte vždy od nejlehčích po nejtěžší. Mezi jednotlivými 
              kroky nechte produkt vstřebat (30-60 sekund).
            </p>
          </div>
        </div>
      </div>
      
      {/* Products by category */}
      <div className="px-6 py-6">
        {categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat.id);
          if (catProducts.length === 0) return null;
          
          return (
            <div key={cat.id} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6ED] flex items-center justify-center">
                  <cat.icon className="w-4 h-4 text-[#C9A962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D3640]">{cat.name}</h3>
                  <p className="text-xs text-[#6B7B8A]">Krok {cat.order}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {catProducts.map(product => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                      className="w-full p-4 text-left flex items-center gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[#2D3640]">{product.nameShort}</h4>
                          {product.isCult && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#FAF6ED] rounded-full">
                              <BRIcons.Star className="w-3 h-3 text-[#C9A962]" />
                              <span className="text-[10px] font-medium text-[#C9A962]">CULT</span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#6B7B8A]">{product.name}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full bg-[#F0F5F2] flex items-center justify-center transition-transform ${expandedProduct === product.id ? 'rotate-90' : ''}`}>
                        <BRIcons.Arrow className="w-3 h-3 text-[#6B7B8A]" />
                      </div>
                    </button>
                    
                    {expandedProduct === product.id && (
                      <div className="px-4 pb-4 border-t border-[#E2E6EA]">
                        <div className="pt-4">
                          <p className="text-sm text-[#4A5568] mb-3">{product.description}</p>
                          
                          <div className="mb-3">
                            <p className="text-xs font-medium text-[#6B7B8A] mb-2">Klíčové složky:</p>
                            <div className="flex flex-wrap gap-1">
                              {product.keyIngredients.map((ing, i) => (
                                <span key={i} className="px-2 py-0.5 bg-[#F0F5F2] text-[#5C7D6D] rounded text-xs">
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {product.tip && (
                            <div className="p-3 bg-[#FAF6ED] rounded-lg">
                              <div className="flex items-start gap-2">
                                <BRIcons.Info className="w-4 h-4 text-[#C9A962] flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-[#6B5B4F]">{product.tip}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-[#E2E6EA]">
        <p className="text-xs text-[#6B7B8A] text-center mb-2">
          Pro přesné doporučení navštivte BR specialistu
        </p>
        <button className="w-full py-3 bg-[#2D3640] text-white font-medium rounded-xl">
          Najít nejbližší salon
        </button>
      </div>
    </div>
  );
}

// === HLAVNÍ KOMPONENTA ===
export function BiologiqueRecherche() {
  const [view, setView] = useState<'intro' | 'quiz' | 'results' | 'routine'>('intro');
  const [scores, setScores] = useState<Record<SkinInstant, number> | null>(null);
  const [selectedSkinInstant, setSelectedSkinInstant] = useState<SkinInstant | null>(null);
  
  const handleQuizComplete = (results: Record<SkinInstant, number>) => {
    setScores(results);
    setView('results');
  };
  
  const handleViewRoutine = (skinInstant: SkinInstant) => {
    setSelectedSkinInstant(skinInstant);
    setView('routine');
  };
  
  const handleReset = () => {
    setScores(null);
    setSelectedSkinInstant(null);
    setView('intro');
  };
  
  return (
    <div className="pb-24 lg:pb-0">
      {view === 'intro' && <BRIntro onStart={() => setView('quiz')} />}
      {view === 'quiz' && <SkinQuiz onComplete={handleQuizComplete} />}
      {view === 'results' && scores && (
        <SkinResults 
          scores={scores} 
          onReset={handleReset}
          onViewRoutine={handleViewRoutine}
        />
      )}
      {view === 'routine' && selectedSkinInstant && (
        <SkinRoutine 
          skinInstant={selectedSkinInstant}
          onBack={() => setView('results')}
        />
      )}
    </div>
  );
}
