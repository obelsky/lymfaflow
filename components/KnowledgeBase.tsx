'use client';

import React, { useState, useMemo } from 'react';

// ============================================
// LYMFAFLOW ACADEMY - KNOWLEDGE BASE
// Anatomie • Typy masáží • Biologique Recherche
// ============================================

// === IKONY ===
const Icons = {
  Search: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Anatomy: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v4m-4 0h8m-6 0v6m4-6v6m-5 0h6" />
    </svg>
  ),
  Lymph: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2c0 0-6 8-6 12a6 6 0 1012 0c0-4-6-12-6-12z" />
      <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" opacity="0.3" />
      <path d="M9 18c1 1 2 1 3 1s2 0 3-1" />
    </svg>
  ),
  GuaSha: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M6 4c0 0 2 2 6 2s6-2 6-2" />
      <path d="M4 8c2 8 4 12 8 12s6-4 8-12" />
      <path d="M8 12c2 0 4 2 4 4" />
    </svg>
  ),
  Wood: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <ellipse cx="12" cy="12" rx="4" ry="8" />
      <path d="M8 12h8" />
      <path d="M6 8c-2 0-3 2-3 4s1 4 3 4" />
      <path d="M18 8c2 0 3 2 3 4s-1 4-3 4" />
    </svg>
  ),
  Ayurveda: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-2 3-2 6 0 9s2 6 0 9" />
      <path d="M3 12c3-2 6-2 9 0s6 2 9 0" />
    </svg>
  ),
  Light: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
      <path d="M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
    </svg>
  ),
  Cosmetic: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M9 3h6v4c0 1-1 2-3 2s-3-1-3-2V3z" />
      <rect x="7" y="9" width="10" height="12" rx="2" />
      <path d="M10 13h4m-2-2v4" />
    </svg>
  ),
  Star: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Back: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Info: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  Tip: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
    </svg>
  ),
  Warning: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  Heart: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
};

// === TYPY ===
interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Icons;
  color: string;
  gradient: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  latin?: string;
  description: string;
  details?: string;
  technique?: string;
  benefits?: string[];
  contraindications?: string[];
  brProducts?: BRProduct[];
  tip?: string;
  warning?: string;
  tags: string[];
  category: string;
}

interface BRProduct {
  name: string;
  use: string;
}

// === KATEGORIE ===
const CATEGORIES: Category[] = [
  { 
    id: 'anatomy', 
    title: 'Anatomie', 
    subtitle: 'Základní pojmy a latina',
    icon: 'Anatomy', 
    color: '#9370DB',
    gradient: 'linear-gradient(135deg, #9370DB 0%, #7B68EE 100%)'
  },
  { 
    id: 'lymph', 
    title: 'Lymfatický systém', 
    subtitle: 'Lymfomasáž a drenáž',
    icon: 'Lymph', 
    color: '#20B2AA',
    gradient: 'linear-gradient(135deg, #20B2AA 0%, #3CB371 100%)'
  },
  { 
    id: 'guasha', 
    title: 'Gua Sha', 
    subtitle: 'Čínská technika',
    icon: 'GuaSha', 
    color: '#E8A0BF',
    gradient: 'linear-gradient(135deg, #E8A0BF 0%, #D4789C 100%)'
  },
  { 
    id: 'madero', 
    title: 'Maderoterapie', 
    subtitle: 'Dřevěné nástroje',
    icon: 'Wood', 
    color: '#CD853F',
    gradient: 'linear-gradient(135deg, #CD853F 0%, #A0522D 100%)'
  },
  { 
    id: 'ayurveda', 
    title: 'Ajurvéda', 
    subtitle: 'Indická tradice',
    icon: 'Ayurveda', 
    color: '#DAA520',
    gradient: 'linear-gradient(135deg, #DAA520 0%, #B8860B 100%)'
  },
  { 
    id: 'light', 
    title: 'Světelná terapie', 
    subtitle: 'LED a fototerapie',
    icon: 'Light', 
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
];

// === KNOWLEDGE DATA ===
const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  // ==========================================
  // ANATOMIE
  // ==========================================
  {
    id: 'anat-1',
    title: 'Kůže (Cutis)',
    latin: 'Cutis, Integumentum commune',
    description: 'Největší orgán lidského těla, tvoří bariéru mezi organismem a vnějším prostředím.',
    details: 'Tři vrstvy: epidermis (pokožka), dermis (škára), hypodermis (podkožní vazivo). Plocha 1,5-2 m², váha 3-4 kg.',
    tip: 'Při masáži vždy pracujeme s kůží - pochopení její struktury je základ.',
    tags: ['základy', 'důležité', 'kůže'],
    category: 'anatomy'
  },
  {
    id: 'anat-2',
    title: 'Epidermis',
    latin: 'Epidermis',
    description: 'Svrchní vrstva kůže bez cév. Obsahuje keratinocyty a melanocyty.',
    details: 'Obnovuje se každých 28 dní. Tloušťka 0,05-1,5 mm podle lokalizace.',
    tip: 'Kosmetické přípravky působí primárně na epidermis.',
    tags: ['kůže', 'kosmetika'],
    category: 'anatomy'
  },
  {
    id: 'anat-3',
    title: 'Dermis (Škára)',
    latin: 'Dermis, Corium',
    description: 'Střední vrstva kůže s cévami, nervy a kožními adnexy.',
    details: 'Obsahuje kolagen (70-80%), elastin a kyselinu hyaluronovou. Zde vznikají vrásky.',
    tip: 'Masážní techniky stimulují dermis a zlepšují prokrvení.',
    tags: ['kůže', 'masáž'],
    category: 'anatomy'
  },
  {
    id: 'anat-4',
    title: 'Fascie',
    latin: 'Fascia',
    description: 'Vazivová tkáň obalující svaly, orgány a celé tělo jako 3D síť.',
    details: 'Přenáší napětí, podporuje pohyb, obsahuje receptory. Myofasciální uvolnění je klíčová technika.',
    tip: 'Gua Sha a maderoterapie cílí právě na fasciální systém.',
    tags: ['důležité', 'fascie', 'svaly'],
    category: 'anatomy'
  },
  {
    id: 'anat-5',
    title: 'Lymfatické uzliny',
    latin: 'Nodi lymphatici',
    description: 'Filtrační stanice lymfatického systému, součást imunity.',
    details: 'V těle 600-700 uzlin. Hlavní skupiny: krční, podpažní, tříselné.',
    warning: 'Nikdy nemasírujeme přímo na uzliny! Vždy směrem K uzlinám.',
    tags: ['lymfa', 'důležité', 'kontraindikace'],
    category: 'anatomy'
  },
  {
    id: 'anat-6',
    title: 'Kolagen',
    latin: 'Collagen',
    description: 'Strukturální bílkovina tvořící 30% všech bílkovin těla.',
    details: 'Typy I, II, III jsou nejčastější. Produkce klesá od 25 let (1% ročně).',
    tip: 'Masáž stimuluje fibroblasty k produkci kolagenu.',
    tags: ['kůže', 'anti-age'],
    category: 'anatomy'
  },
  {
    id: 'anat-7',
    title: 'Elastin',
    latin: 'Elastinum',
    description: 'Bílkovina zajišťující pružnost kůže a cév.',
    details: 'Na rozdíl od kolagenu se v dospělosti téměř netvoří - chráníme co máme.',
    warning: 'UV záření a kouření ničí elastin nevratně.',
    tags: ['kůže', 'anti-age'],
    category: 'anatomy'
  },
  {
    id: 'anat-8',
    title: 'Kyselina hyaluronová',
    latin: 'Acidum hyaluronicum',
    description: 'Glykosaminoglykan vážící vodu v tkáních.',
    details: '1 g váže až 6 litrů vody. Přirozená hydratace kůže, kloubů, očí.',
    tip: 'Zevní aplikace zvlhčuje epidermis, injekční dermis.',
    tags: ['hydratace', 'anti-age'],
    category: 'anatomy'
  },
  {
    id: 'anat-9',
    title: 'Mimické svaly',
    latin: 'Musculi faciei',
    description: 'Svaly obličeje umožňující mimiku, upínají se do kůže.',
    details: 'Cca 40 svalů. Hlavní: m. frontalis, m. orbicularis oculi, m. zygomaticus.',
    tip: 'Face yoga a masáž obličeje pracují s těmito svaly.',
    tags: ['obličej', 'svaly'],
    category: 'anatomy'
  },
  {
    id: 'anat-10',
    title: 'Drenáž',
    latin: 'Drainage',
    description: 'Odvod nahromaděné tekutiny z tkání lymfatickým systémem.',
    details: 'Lymfa proudí 10-20× pomaleji než krev. Směr vždy k srdci.',
    tip: 'Jemný tlak (30-40 mmHg) je účinnější než silný.',
    tags: ['lymfa', 'technika', 'důležité'],
    category: 'anatomy'
  },

  // ==========================================
  // LYMFATICKÝ SYSTÉM & LYMFOMASÁŽ
  // ==========================================
  {
    id: 'lymph-1',
    title: 'Manuální lymfodrenáž',
    latin: 'MLD - Manual Lymphatic Drainage',
    description: 'Speciální masážní technika podporující tok lymfy. Základ metody Vodder.',
    technique: 'Jemné, rytmické, krouživé pohyby ve směru toku lymfy. Tlak max. 30-40 mmHg.',
    benefits: ['Redukce otoků', 'Detoxikace', 'Posílení imunity', 'Relaxace', 'Zlepšení celulitidy'],
    contraindications: ['Akutní infekce', 'Srdeční selhání', 'Trombóza', 'Maligní tumory'],
    brProducts: [
      { name: 'Lotion P50', use: 'Příprava pleti před ošetřením - exfoliace' },
      { name: 'Sérum Complexe Iribiol', use: 'Regulace mazových žláz, čištění pórů' },
      { name: 'Crème Dermopurifiante', use: 'Závěrečná péče - hloubkové čištění' }
    ],
    tip: 'Vždy začínáme od klíčových kostí (terminus) směrem dolů, pak se vracíme.',
    tags: ['lymfa', 'technika', 'důležité', 'vodder'],
    category: 'lymph'
  },
  {
    id: 'lymph-2',
    title: 'Lymfatické cesty obličeje',
    description: 'Hlavní směry odvodu lymfy z obličejové oblasti.',
    details: 'Od středu obličeje → k uším → dolů ke klíčním kostem. Vždy jemně!',
    technique: '1. Čelo → spánky\n2. Oči → spánky\n3. Nos → tváře → uši\n4. Brada → čelist → uši\n5. Krk → klíční kosti',
    brProducts: [
      { name: 'Masque VIP O2', use: 'Okysličení a rozjasnění po drenáži' },
      { name: 'Sérum Amniotique', use: 'Hydratace a zklidnění' }
    ],
    tip: 'Obličejová lymfodrenáž ráno redukuje ranní "opuchlost".',
    tags: ['obličej', 'technika', 'lymfa'],
    category: 'lymph'
  },
  {
    id: 'lymph-3',
    title: 'Terminus (klíční oblast)',
    latin: 'Terminus, Angulus venosus',
    description: 'Místo kde se lymfa vlévá do žilního systému. Klíčový bod každé drenáže.',
    details: 'Nachází se nad klíčními kostmi (fossa supraclavicularis). Vždy otevíráme jako první!',
    technique: 'Jemné kroužky s minimálním tlakem, 5-10 opakování na každé straně.',
    warning: 'Bez otevření terminu je zbytek drenáže neúčinný!',
    tags: ['lymfa', 'důležité', 'technika'],
    category: 'lymph'
  },
  {
    id: 'lymph-4',
    title: 'Vodderova metoda',
    description: 'Originální technika manuální lymfodrenáže vyvinutá Dr. Emilem Vodderem.',
    details: 'Vznikla v 1930s. Čtyři základní hmaty: stojící kruhy, pumpování, rotace, nabírání.',
    technique: 'Pomalé tempo (1 pohyb/sec), nulový až minimální tlak, rytmické opakování.',
    tip: 'Certifikace Vodder vyžaduje 160+ hodin výuky.',
    tags: ['metoda', 'certifikace', 'vodder'],
    category: 'lymph'
  },
  {
    id: 'lymph-5',
    title: 'Kontraindikace lymfodrenáže',
    description: 'Stavy kdy je manuální lymfodrenáž zakázána nebo vyžaduje lékařský souhlas.',
    details: 'Absolutní: akutní infekce, horečka, trombóza, srdeční selhání, aktivní rakovina.\nRelativní: hypertenze, hypotenze, těhotenství (1. trimestr), menstruace.',
    warning: 'Při pochybnostech vždy konzultuj s lékařem!',
    tags: ['bezpečnost', 'důležité', 'kontraindikace'],
    category: 'lymph'
  },

  // ==========================================
  // GUA SHA
  // ==========================================
  {
    id: 'guasha-1',
    title: 'Gua Sha - úvod',
    description: 'Tradiční čínská technika využívající škrábání kůže speciálním nástrojem.',
    details: 'Gua = škrábat, Sha = písek/vyrážka. Historie 2000+ let. Uvolňuje stagnující energii (chi).',
    technique: 'Jemné tahy pod úhlem 15-45° ve směru lymfy. Na obličej vždy s olejem/sérem.',
    benefits: ['Lymfodrenáž', 'Uvolnění svalů', 'Zvýšení prokrvení', 'Lifting efekt', 'Redukce vrásek'],
    brProducts: [
      { name: 'Huile Relaxante', use: 'Výborný skluz pro Gua Sha tělové' },
      { name: 'Sérum Yall O2', use: 'Okysličující sérum pod Gua Sha obličej' },
      { name: 'Biologique Recherche Quintessential Serum', use: 'Luxusní báze pro facial Gua Sha' }
    ],
    tip: 'Na obličej používej jadeit nebo růženín - chladí a zklidňuje.',
    tags: ['technika', 'čína', 'nástroje'],
    category: 'guasha'
  },
  {
    id: 'guasha-2',
    title: 'Gua Sha nástroje',
    description: 'Typy nástrojů a jejich použití.',
    details: 'Materiály: jadeit (chlazení), růženín (uklidnění), obsidián (detox), nerezová ocel (hygiena).\nTvary: srdce (obličej), hřeben (vlasová pokožka), delfín (tělo).',
    tip: 'Jadeit lze chladit v lednici pro extra dekongestivní efekt.',
    tags: ['nástroje', 'materiály'],
    category: 'guasha'
  },
  {
    id: 'guasha-3',
    title: 'Gua Sha obličej - technika',
    description: 'Správné provedení obličejové Gua Sha masáže.',
    technique: '1. Aplikuj sérum/olej\n2. Krk: od klíčních kostí nahoru\n3. Čelist: od brady k uchu\n4. Tváře: od nosu k uchu\n5. Oči: od vnitřního koutku ven (jemně!)\n6. Čelo: od středu ke spánkům\n7. Obočí: zespoda nahoru',
    brProducts: [
      { name: 'Sérum Colostrum', use: 'Regenerace a zklidnění po Gua Sha' },
      { name: 'Crème Masque Vernix', use: 'Závěrečná maska pro hydrataci' }
    ],
    warning: 'V oblasti očí minimální tlak! Nikdy ne na víčka.',
    tags: ['obličej', 'technika', 'postup'],
    category: 'guasha'
  },
  {
    id: 'guasha-4',
    title: 'Gua Sha tělo',
    description: 'Aplikace Gua Sha na tělo pro uvolnění fascií a svalů.',
    technique: 'Silnější tlak než na obličej. Směr: od periferie k srdci. Můžou vzniknout petechie (sha) - je to normální.',
    benefits: ['Uvolnění fascií', 'Redukce bolesti', 'Zlepšení celulitidy', 'Podpora regenerace'],
    brProducts: [
      { name: 'Huile Spa', use: 'Tělový olej pro skluz' },
      { name: 'Emulsion Originelle Régénérante', use: 'Po tělové Gua Sha - regenerace' }
    ],
    warning: 'Petechie (červené tečky) mohou vydržet 2-5 dní - upozorni klienta!',
    tags: ['tělo', 'fascie', 'technika'],
    category: 'guasha'
  },

  // ==========================================
  // MADEROTERAPIE
  // ==========================================
  {
    id: 'madero-1',
    title: 'Maderoterapie - úvod',
    description: 'Masážní technika využívající dřevěné nástroje různých tvarů.',
    details: 'Původ v Kolumbii. "Madera" = dřevo (španělsky). Kombinuje lymfodrenáž, modelaci a uvolnění.',
    technique: 'Střední až silný tlak, rytmické pohyby. Vždy směrem k srdci.',
    benefits: ['Redukce celulitidy', 'Modelace postavy', 'Lymfodrenáž', 'Zpevnění kůže', 'Relaxace'],
    brProducts: [
      { name: 'Huile Relaxante', use: 'Skluz pro maderoterapii' },
      { name: 'Gel ADN Silicium', use: 'Zpevnění kůže po proceduře' },
      { name: 'Crème Capital Corps', use: 'Závěrečná péče - regenerace těla' }
    ],
    tip: 'Dřevo musí být kvalitně opracované - bez třísek a hran.',
    tags: ['technika', 'tělo', 'modelace'],
    category: 'madero'
  },
  {
    id: 'madero-2',
    title: 'Maderoterapie nástroje',
    description: 'Základní sada dřevěných nástrojů a jejich použití.',
    details: 'Váleček (rolling) - lymfodrenáž, prokrvení\nHrnek (cupping) - vakuový efekt, celulitida\nHouba (mushroom) - modelace\nKostka (cube) - hluboká práce\nDeska (board) - vyhlazení',
    tip: 'Investuj do kvalitního dřeva (buk, javor) - vydrží roky.',
    tags: ['nástroje', 'vybavení'],
    category: 'madero'
  },
  {
    id: 'madero-3',
    title: 'Maderoterapie - Anti-celulitidní protokol',
    description: 'Postup pro redukci celulitidy pomocí maderoterapie.',
    technique: '1. Suchý kartáč (příprava)\n2. Olej BR\n3. Váleček - prokrvení celé oblasti\n4. Hrnek - práce na problémových zónách\n5. Houba - modelace\n6. Váleček - závěrečná drenáž',
    brProducts: [
      { name: 'Complexe Iribiol (tělo)', use: 'Sérum na celulitidu' },
      { name: 'Gel d\'ALgues', use: 'Řasový zábal po proceduře' }
    ],
    tip: 'Doporuč klientce pít hodně vody 24-48h po proceduře.',
    tags: ['celulitida', 'protokol', 'tělo'],
    category: 'madero'
  },
  {
    id: 'madero-4',
    title: 'Maderoterapie obličej',
    description: 'Jemná verze maderoterapie pro obličej s menšími nástroji.',
    technique: 'Mini váleček a hříbek. Velmi jemný tlak. Vhodné pro lifting a drenáž.',
    brProducts: [
      { name: 'Sérum Amniotique', use: 'Hydratace a skluz' },
      { name: 'Crème Contour des Yeux et Lévres Biofixine', use: 'Péče o oční okolí po proceduře' }
    ],
    warning: 'Na obličej pouze certifikované nástroje pro faciální maderoterapii!',
    tags: ['obličej', 'lifting'],
    category: 'madero'
  },

  // ==========================================
  // AJURVÉDA
  // ==========================================
  {
    id: 'ayur-1',
    title: 'Abhyanga',
    description: 'Tradiční ajurvédská celotělová olejová masáž.',
    details: '5000 let stará technika. "Abhyanga" = masáž s láskou. Teplý olej podle dóši.',
    technique: 'Dlouhé tahy na končetinách, krouživé na kloubech. Směr K srdci. Teplý olej!',
    benefits: ['Výživa tkání', 'Zklidnění Vata', 'Detoxikace', 'Lepší spánek', 'Zpomalení stárnutí'],
    brProducts: [
      { name: 'Huile Relaxante', use: 'Základ - lze smíchat s ajurvédskými oleji' },
      { name: 'Lait VIP O2', use: 'Závěrečné ošetření - okysličení' }
    ],
    tip: 'Sezamový olej = univerzální. Kokosový = Pitta. Mandlový = Vata.',
    tags: ['ajurvéda', 'oleje', 'tradice'],
    category: 'ayurveda'
  },
  {
    id: 'ayur-2',
    title: 'Dóši (Vata, Pitta, Kapha)',
    description: 'Tři základní bio-energie v ajurvédě určující konstituci člověka.',
    details: 'VATA (vzduch+éter): pohyb, kreativita, suchá kůže\nPITTA (oheň+voda): metabolismus, inteligence, citlivá pleť\nKAPHA (země+voda): struktura, stabilita, mastná pleť',
    tip: 'Masážní technika a olej volíme podle převládající dóši klienta.',
    tags: ['dóše', 'teorie', 'diagnostika'],
    category: 'ayurveda'
  },
  {
    id: 'ayur-3',
    title: 'Mukha Abhyanga (obličej)',
    description: 'Ajurvédská masáž obličeje s marmovými body.',
    technique: 'Jemné tahy s olejem, stimulace marmových bodů (vitální body), práce s čelem třetím okem.',
    brProducts: [
      { name: 'Huile Fondamentale', use: 'Vyživující olej na obličej' },
      { name: 'Masque Biofixine', use: 'Regenerační maska po masáži' }
    ],
    tip: 'Teplý olej na čelo (Shirodhara) má hluboce relaxační efekt.',
    tags: ['obličej', 'marma', 'relaxace'],
    category: 'ayurveda'
  },
  {
    id: 'ayur-4',
    title: 'Marma body',
    description: 'Vitální body na těle kde se koncentruje prána (životní energie).',
    details: '107 hlavních marma bodů. Podobné akupunkturním bodům. Stimulace harmonizuje energii.',
    tip: 'Hlavní obličejové marmy: Sthapani (třetí oko), Apanga (oční koutky), Phana (nosní křídla).',
    tags: ['marma', 'energie', 'body'],
    category: 'ayurveda'
  },

  // ==========================================
  // SVĚTELNÁ TERAPIE
  // ==========================================
  {
    id: 'light-1',
    title: 'LED terapie - úvod',
    description: 'Využití světla různých vlnových délek pro ošetření pleti.',
    details: 'Neionizující záření. Různé barvy = různé vlnové délky = různé účinky. Bezbolestné, neinvazivní.',
    benefits: ['Stimulace kolagenu', 'Redukce akné', 'Hojení', 'Anti-aging', 'Redukce zánětu'],
    brProducts: [
      { name: 'Sérum A-Glyca', use: 'Anti-glykační sérum - synergie s červeným LED' },
      { name: 'Masque VIP O2', use: 'Okysličení před LED terapií' }
    ],
    tip: 'LED lze kombinovat s většinou ošetření BR pro zesílení účinku.',
    tags: ['LED', 'přístroje', 'technologie'],
    category: 'light'
  },
  {
    id: 'light-2',
    title: 'Červené světlo (630-700nm)',
    description: 'Stimuluje produkci kolagenu, anti-aging efekt.',
    details: 'Proniká do dermis (3-5mm). Stimuluje fibroblasty, mitochondrie. Redukuje vrásky.',
    brProducts: [
      { name: 'Sérum Colostrum', use: 'Regenerační sérum - synergie s červeným LED' },
      { name: 'Crème Elastine Marine', use: 'Podpora elasticity po LED' }
    ],
    tip: 'Ideální po mikrojehličkování nebo chemickém peelingu.',
    tags: ['červená', 'anti-age', 'kolagen'],
    category: 'light'
  },
  {
    id: 'light-3',
    title: 'Modré světlo (415-450nm)',
    description: 'Antibakteriální účinek, ideální na akné.',
    details: 'Ničí bakterie P. acnes produkující porfyriny. Povrchové působení.',
    brProducts: [
      { name: 'Sérum Complexe Iribiol', use: 'Seboregulační sérum před/po LED' },
      { name: 'Masque Vivant', use: 'Čisticí maska - synergie s modrým LED' }
    ],
    warning: 'Může vysušovat - vždy kombinuj s hydratací.',
    tags: ['modrá', 'akné', 'antibakteriální'],
    category: 'light'
  },
  {
    id: 'light-4',
    title: 'Infračervené světlo (700nm+)',
    description: 'Nejhlubší průnik, hojení a regenerace tkání.',
    details: 'Proniká až 5-10mm. Stimuluje buněčnou regeneraci, snižuje zánět, bolest.',
    brProducts: [
      { name: 'Crème Réparatrice', use: 'Reparační krém po IR terapii' },
      { name: 'Sérum Dermopurifiante', use: 'Čištění a regenerace' }
    ],
    tip: 'Skvělé po invazivních zákrocích pro rychlejší hojení.',
    tags: ['infračervená', 'hojení', 'regenerace'],
    category: 'light'
  },
  {
    id: 'light-5',
    title: 'Kombinované LED protokoly',
    description: 'Jak kombinovat různé barvy světla pro maximální efekt.',
    technique: 'Anti-age: červená + infra (15+10 min)\nAkné: modrá + červená (10+10 min)\nReparace: infra + červená (10+10 min)',
    brProducts: [
      { name: 'Lotion P50', use: 'Příprava pleti před jakýmkoli LED protokolem' },
      { name: 'Finishing Serum', use: 'Závěrečné sérum podle potřeby pleti' }
    ],
    tip: 'LED vždy na očištěnou pleť bez make-upu.',
    tags: ['protokol', 'kombinace', 'advanced'],
    category: 'light'
  },
];

// === KOMPONENTA ===
export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [showBROnly, setShowBROnly] = useState(false);

  // Filtrace
  const filteredItems = useMemo(() => {
    let items = KNOWLEDGE_ITEMS;
    
    if (activeCategory) {
      items = items.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.latin?.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (showBROnly) {
      items = items.filter(item => item.brProducts && item.brProducts.length > 0);
    }
    
    return items;
  }, [activeCategory, searchQuery, showBROnly]);

  // Pomocné funkce
  const getCategoryColor = (categoryId: string) => 
    CATEGORIES.find(c => c.id === categoryId)?.color || '#888';
  
  const getCategoryGradient = (categoryId: string) => 
    CATEGORIES.find(c => c.id === categoryId)?.gradient || 'linear-gradient(135deg, #888, #666)';

  // === DETAIL POLOŽKY ===
  const renderDetail = () => {
    if (!selectedItem) return null;
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        onClick={() => setSelectedItem(null)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div 
          className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Header */}
          <div 
            className="p-5 text-white relative"
            style={{ background: getCategoryGradient(selectedItem.category) }}
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="flex items-center gap-2 mb-3 text-white/80 hover:text-white"
            >
              <Icons.Back className="w-5 h-5" />
              <span className="text-sm">Zpět</span>
            </button>
            <h2 className="text-xl font-bold mb-1">{selectedItem.title}</h2>
            {selectedItem.latin && (
              <p className="text-white/70 text-sm italic">{selectedItem.latin}</p>
            )}
          </div>
          
          {/* Content */}
          <div className="p-5 overflow-y-auto max-h-[65vh] space-y-4">
            {/* Popis */}
            <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
            
            {/* Detaily */}
            {selectedItem.details && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-slate-700 font-semibold text-sm">
                  <Icons.Info className="w-4 h-4" />
                  Podrobnosti
                </div>
                <p className="text-sm text-slate-600 whitespace-pre-line">{selectedItem.details}</p>
              </div>
            )}
            
            {/* Technika */}
            {selectedItem.technique && (
              <div className="p-4 bg-violet-50 rounded-xl border-l-4 border-violet-400">
                <div className="flex items-center gap-2 mb-2 text-violet-800 font-semibold text-sm">
                  ✋ Technika
                </div>
                <p className="text-sm text-violet-700 whitespace-pre-line">{selectedItem.technique}</p>
              </div>
            )}
            
            {/* Benefits */}
            {selectedItem.benefits && (
              <div className="p-4 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-800 font-semibold text-sm">
                  <Icons.Heart className="w-4 h-4" />
                  Přínosy
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.benefits.map((b, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Kontraindikace */}
            {selectedItem.contraindications && (
              <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
                <div className="flex items-center gap-2 mb-2 text-red-800 font-semibold text-sm">
                  <Icons.Warning className="w-4 h-4" />
                  Kontraindikace
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.contraindications.map((c, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* BR Products */}
            {selectedItem.brProducts && selectedItem.brProducts.length > 0 && (
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Icons.Cosmetic className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-900">Biologique Recherche</span>
                </div>
                <div className="space-y-2">
                  {selectedItem.brProducts.map((product, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-white/60 rounded-lg">
                      <Icons.Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-amber-900 text-sm">{product.name}</span>
                        <p className="text-xs text-amber-700">{product.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tip */}
            {selectedItem.tip && (
              <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold text-sm">
                  <Icons.Tip className="w-4 h-4" />
                  Pro tip
                </div>
                <p className="text-sm text-blue-700">{selectedItem.tip}</p>
              </div>
            )}
            
            {/* Warning */}
            {selectedItem.warning && (
              <div className="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                <div className="flex items-center gap-2 mb-2 text-amber-800 font-semibold text-sm">
                  <Icons.Warning className="w-4 h-4" />
                  Pozor
                </div>
                <p className="text-sm text-amber-700">{selectedItem.warning}</p>
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedItem.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === HLAVNÍ RENDER ===
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#2D3640] text-white shadow-lg">
        <div className="px-5 py-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#7A9E8E] flex items-center justify-center">
              <Icons.Anatomy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Vzdělávání</h1>
              <p className="text-[#A8C4B8] text-sm">Masáže • Techniky • Biologique Recherche</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Hledat pojmy, techniky..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#7A9E8E]/50"
            />
          </div>
          
          {/* BR Filter */}
          <button
            onClick={() => setShowBROnly(!showBROnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              showBROnly 
                ? 'bg-[#C9A962] text-[#2D3640]' 
                : 'bg-white/10 text-white/80'
            }`}
          >
            <Icons.Cosmetic className="w-4 h-4" />
            <span>S doporučením BR</span>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-5 py-6 pb-24">
        {/* Categories */}
        {!activeCategory && !searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#2D3640] mb-4">Kategorie</h2>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = Icons[cat.icon];
                const count = KNOWLEDGE_ITEMS.filter(i => i.category === cat.id).length;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                    style={{ background: cat.gradient }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-[15px] mb-0.5">{cat.title}</h3>
                    <p className="text-white/70 text-xs mb-2">{cat.subtitle}</p>
                    <span className="text-white/90 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {count} položek
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Category Header */}
        {activeCategory && (
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setActiveCategory(null)}
              className="p-2.5 rounded-xl bg-white shadow-md hover:bg-gray-50 active:scale-95"
            >
              <Icons.Back className="w-5 h-5 text-[#2C1810]" />
            </button>
            <div>
              <h2 className="font-bold text-[#2C1810] text-lg">
                {CATEGORIES.find(c => c.id === activeCategory)?.title}
              </h2>
              <p className="text-sm text-[#8B7355]">{filteredItems.length} položek</p>
            </div>
          </div>
        )}
        
        {/* Search results */}
        {searchQuery && (
          <p className="text-sm text-[#8B7355] mb-4">
            Výsledky pro "{searchQuery}" ({filteredItems.length})
          </p>
        )}
        
        {/* Items */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="w-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-1.5 self-stretch rounded-full flex-shrink-0"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#2C1810] group-hover:text-amber-700">
                      {item.title}
                    </h3>
                    {item.brProducts && item.brProducts.length > 0 && (
                      <Icons.Star className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  {item.latin && (
                    <p className="text-xs text-purple-600 italic mb-1">{item.latin}</p>
                  )}
                  <p className="text-sm text-[#6B5B4F] line-clamp-2">{item.description}</p>
                </div>
                <Icons.ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Empty */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Icons.Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-[#2C1810] mb-2">Nic nenalezeno</h3>
            <p className="text-sm text-[#8B7355]">Zkus jiný výraz</p>
          </div>
        )}
        
        {/* Stats */}
        {!activeCategory && !searchQuery && (
          <div className="mt-8 p-5 bg-[#FAF6ED] rounded-2xl border border-[#C9A962]/30">
            <div className="flex items-center gap-3 mb-4">
              <Icons.Cosmetic className="w-6 h-6 text-[#A68B4B]" />
              <h3 className="font-bold text-[#2D3640]">Biologique Recherche</h3>
            </div>
            <p className="text-sm text-[#6B7B8A] mb-4">
              U vybraných technik najdeš doporučení produktů BR pro maximální synergie s ošetřením.
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <span className="block text-2xl font-bold text-[#2D3640]">{KNOWLEDGE_ITEMS.length}</span>
                <span className="text-xs text-[#6B7B8A]">položek</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-[#2D3640]">{CATEGORIES.length}</span>
                <span className="text-xs text-[#6B7B8A]">kategorií</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-[#2D3640]">
                  {KNOWLEDGE_ITEMS.filter(i => i.brProducts?.length).length}
                </span>
                <span className="text-xs text-[#6B7B8A]">s BR</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Detail Modal */}
      {selectedItem && renderDetail()}
    </div>
  );
}
