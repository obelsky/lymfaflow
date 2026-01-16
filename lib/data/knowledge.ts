// ============================================
// LYMFAFLOW - KNOWLEDGE BASE DATA
// Masáže • Techniky • Biologique Recherche
// ============================================

import type { KnowledgeCategory, KnowledgeItem, BRProduct } from '@/types';

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  { 
    id: 'category-anatomy', 
    slug: 'anatomy',
    title: 'Anatomie', 
    subtitle: 'Základní pojmy a latina',
    icon: 'Anatomy', 
    color: '#9370DB',
    gradient: 'linear-gradient(135deg, #9370DB 0%, #7B68EE 100%)'
  },
  { 
    id: 'category-lymph', 
    slug: 'lymph',
    title: 'Lymfatický systém', 
    subtitle: 'Lymfomasáž a drenáž',
    icon: 'Lymph', 
    color: '#20B2AA',
    gradient: 'linear-gradient(135deg, #20B2AA 0%, #3CB371 100%)'
  },
  { 
    id: 'category-guasha', 
    slug: 'guasha',
    title: 'Gua Sha', 
    subtitle: 'Čínská technika',
    icon: 'GuaSha', 
    color: '#E8A0BF',
    gradient: 'linear-gradient(135deg, #E8A0BF 0%, #D4789C 100%)'
  },
  { 
    id: 'category-madero', 
    slug: 'madero',
    title: 'Maderoterapie', 
    subtitle: 'Dřevěné nástroje',
    icon: 'Wood', 
    color: '#CD853F',
    gradient: 'linear-gradient(135deg, #CD853F 0%, #A0522D 100%)'
  },
  { 
    id: 'category-ayurveda', 
    slug: 'ayurveda',
    title: 'Ajurvéda', 
    subtitle: 'Indická tradice',
    icon: 'Ayurveda', 
    color: '#DAA520',
    gradient: 'linear-gradient(135deg, #DAA520 0%, #B8860B 100%)'
  },
  { 
    id: 'category-light', 
    slug: 'light',
    title: 'Světelná terapie', 
    subtitle: 'LED a fototerapie',
    icon: 'Light', 
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
];

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  // ==========================================
  // ANATOMIE
  // ==========================================
  {
    id: 'knowledge-anat-1',
    category_id: 'category-anatomy',
    title: 'Kůže (Cutis)',
    latin: 'Cutis, Integumentum commune',
    description: 'Největší orgán lidského těla, tvoří bariéru mezi organismem a vnějším prostředím.',
    details: 'Tři vrstvy: epidermis (pokožka), dermis (škára), hypodermis (podkožní vazivo). Plocha 1,5-2 m², váha 3-4 kg.',
    tip: 'Při masáži vždy pracujeme s kůží - pochopení její struktury je základ.',
    tags: ['základy', 'důležité', 'kůže'],
  },
  {
    id: 'knowledge-anat-2',
    category_id: 'category-anatomy',
    title: 'Epidermis',
    latin: 'Epidermis',
    description: 'Svrchní vrstva kůže bez cév. Obsahuje keratinocyty a melanocyty.',
    details: 'Obnovuje se každých 28 dní. Tloušťka 0,05-1,5 mm podle lokalizace.',
    tip: 'Kosmetické přípravky působí primárně na epidermis.',
    tags: ['kůže', 'kosmetika'],
  },
  {
    id: 'knowledge-anat-3',
    category_id: 'category-anatomy',
    title: 'Dermis (Škára)',
    latin: 'Dermis, Corium',
    description: 'Střední vrstva kůže s cévami, nervy a kožními adnexy.',
    details: 'Obsahuje kolagen (70-80%), elastin a kyselinu hyaluronovou. Zde vznikají vrásky.',
    tip: 'Masážní techniky stimulují dermis a zlepšují prokrvení.',
    tags: ['kůže', 'masáž'],
  },
  {
    id: 'knowledge-anat-4',
    category_id: 'category-anatomy',
    title: 'Fascie',
    latin: 'Fascia',
    description: 'Vazivová tkáň obalující svaly, orgány a celé tělo jako 3D síť.',
    details: 'Přenáší napětí, podporuje pohyb, obsahuje receptory. Myofasciální uvolnění je klíčová technika.',
    tip: 'Gua Sha a maderoterapie cílí právě na fasciální systém.',
    tags: ['důležité', 'fascie', 'svaly'],
  },
  {
    id: 'knowledge-anat-5',
    category_id: 'category-anatomy',
    title: 'Lymfatické uzliny',
    latin: 'Nodi lymphatici',
    description: 'Filtrační stanice lymfatického systému, součást imunity.',
    details: 'V těle 600-700 uzlin. Hlavní skupiny: krční, podpažní, tříselné.',
    warning: 'Nikdy nemasírujeme přímo na uzliny! Vždy směrem K uzlinám.',
    tags: ['lymfa', 'důležité', 'kontraindikace'],
  },
  {
    id: 'knowledge-anat-6',
    category_id: 'category-anatomy',
    title: 'Kolagen',
    latin: 'Collagen',
    description: 'Strukturální bílkovina tvořící 30% všech bílkovin těla.',
    details: 'Typy I, II, III jsou nejčastější. Produkce klesá od 25 let (1% ročně).',
    tip: 'Masáž stimuluje fibroblasty k produkci kolagenu.',
    tags: ['kůže', 'anti-age'],
  },
  {
    id: 'knowledge-anat-7',
    category_id: 'category-anatomy',
    title: 'Kyselina hyaluronová',
    latin: 'Acidum hyaluronicum',
    description: 'Glykosaminoglykan vážící vodu v tkáních.',
    details: '1 g váže až 6 litrů vody. Přirozená hydratace kůže, kloubů, očí.',
    tip: 'Zevní aplikace zvlhčuje epidermis, injekční dermis.',
    tags: ['hydratace', 'anti-age'],
  },

  // ==========================================
  // LYMFATICKÝ SYSTÉM
  // ==========================================
  {
    id: 'knowledge-lymph-1',
    category_id: 'category-lymph',
    title: 'Manuální lymfodrenáž',
    latin: 'MLD - Manual Lymphatic Drainage',
    description: 'Speciální masážní technika podporující tok lymfy. Základ metody Vodder.',
    technique: 'Jemné, rytmické, krouživé pohyby ve směru toku lymfy. Tlak max. 30-40 mmHg.',
    benefits: ['Redukce otoků', 'Detoxikace', 'Posílení imunity', 'Relaxace', 'Zlepšení celulitidy'],
    contraindications: ['Akutní infekce', 'Srdeční selhání', 'Trombóza', 'Maligní tumory'],
    br_products: [
      { name: 'Lotion P50', use: 'Příprava pleti před ošetřením - exfoliace' },
      { name: 'Sérum Complexe Iribiol', use: 'Regulace mazových žláz, čištění pórů' },
    ],
    tip: 'Vždy začínáme od klíčních kostí (terminus) směrem dolů, pak se vracíme.',
    tags: ['lymfa', 'technika', 'důležité', 'vodder'],
  },
  {
    id: 'knowledge-lymph-2',
    category_id: 'category-lymph',
    title: 'Lymfatické cesty obličeje',
    description: 'Hlavní směry odvodu lymfy z obličejové oblasti.',
    details: 'Od středu obličeje → k uším → dolů ke klíčním kostem. Vždy jemně!',
    technique: '1. Čelo → spánky\n2. Oči → spánky\n3. Nos → tváře → uši\n4. Brada → čelist → uši\n5. Krk → klíční kosti',
    br_products: [
      { name: 'Masque VIP O2', use: 'Okysličení a rozjasnění po drenáži' },
      { name: 'Sérum Amniotique', use: 'Hydratace a zklidnění' }
    ],
    tip: 'Obličejová lymfodrenáž ráno redukuje ranní "opuchlost".',
    tags: ['obličej', 'technika', 'lymfa'],
  },
  {
    id: 'knowledge-lymph-3',
    category_id: 'category-lymph',
    title: 'Terminus (klíční oblast)',
    latin: 'Terminus, Angulus venosus',
    description: 'Místo kde se lymfa vlévá do žilního systému. Klíčový bod každé drenáže.',
    details: 'Nachází se nad klíčními kostmi (fossa supraclavicularis). Vždy otevíráme jako první!',
    technique: 'Jemné kroužky s minimálním tlakem, 5-10 opakování na každé straně.',
    warning: 'Bez otevření terminu je zbytek drenáže neúčinný!',
    tags: ['lymfa', 'důležité', 'technika'],
  },
  {
    id: 'knowledge-lymph-4',
    category_id: 'category-lymph',
    title: 'Kontraindikace lymfodrenáže',
    description: 'Stavy kdy je manuální lymfodrenáž zakázána nebo vyžaduje lékařský souhlas.',
    details: 'Absolutní: akutní infekce, horečka, trombóza, srdeční selhání, aktivní rakovina.\nRelativní: hypertenze, hypotenze, těhotenství (1. trimestr), menstruace.',
    warning: 'Při pochybnostech vždy konzultuj s lékařem!',
    tags: ['bezpečnost', 'důležité', 'kontraindikace'],
  },

  // ==========================================
  // GUA SHA
  // ==========================================
  {
    id: 'knowledge-guasha-1',
    category_id: 'category-guasha',
    title: 'Gua Sha - úvod',
    description: 'Tradiční čínská technika využívající škrábání kůže speciálním nástrojem.',
    details: 'Gua = škrábat, Sha = písek/vyrážka. Historie 2000+ let. Uvolňuje stagnující energii (chi).',
    technique: 'Jemné tahy pod úhlem 15-45° ve směru lymfy. Na obličej vždy s olejem/sérem.',
    benefits: ['Lymfodrenáž', 'Uvolnění svalů', 'Zvýšení prokrvení', 'Lifting efekt', 'Redukce vrásek'],
    br_products: [
      { name: 'Huile Relaxante', use: 'Výborný skluz pro Gua Sha tělové' },
      { name: 'Sérum Yall O2', use: 'Okysličující sérum pod Gua Sha obličej' },
    ],
    tip: 'Na obličej používej jadeit nebo růženín - chladí a zklidňuje.',
    tags: ['technika', 'čína', 'nástroje'],
  },
  {
    id: 'knowledge-guasha-2',
    category_id: 'category-guasha',
    title: 'Gua Sha nástroje',
    description: 'Typy nástrojů a jejich použití.',
    details: 'Materiály: jadeit (chlazení), růženín (uklidnění), obsidián (detox), nerezová ocel (hygiena).\nTvary: srdce (obličej), hřeben (vlasová pokožka), delfín (tělo).',
    tip: 'Jadeit lze chladit v lednici pro extra dekongestivní efekt.',
    tags: ['nástroje', 'materiály'],
  },
  {
    id: 'knowledge-guasha-3',
    category_id: 'category-guasha',
    title: 'Gua Sha obličej - technika',
    description: 'Správné provedení obličejové Gua Sha masáže.',
    technique: '1. Aplikuj sérum/olej\n2. Krk: od klíčních kostí nahoru\n3. Čelist: od brady k uchu\n4. Tváře: od nosu k uchu\n5. Oči: od vnitřního koutku ven\n6. Čelo: od středu ke spánkům',
    br_products: [
      { name: 'Sérum Colostrum', use: 'Regenerace a zklidnění po Gua Sha' },
    ],
    warning: 'V oblasti očí minimální tlak! Nikdy ne na víčka.',
    tags: ['obličej', 'technika', 'postup'],
  },

  // ==========================================
  // MADEROTERAPIE
  // ==========================================
  {
    id: 'knowledge-madero-1',
    category_id: 'category-madero',
    title: 'Maderoterapie - úvod',
    description: 'Masážní technika využívající dřevěné nástroje různých tvarů.',
    details: 'Původ v Kolumbii. "Madera" = dřevo (španělsky). Kombinuje lymfodrenáž, modelaci a uvolnění.',
    technique: 'Střední až silný tlak, rytmické pohyby. Vždy směrem k srdci.',
    benefits: ['Redukce celulitidy', 'Modelace postavy', 'Lymfodrenáž', 'Zpevnění kůže', 'Relaxace'],
    br_products: [
      { name: 'Huile Relaxante', use: 'Skluz pro maderoterapii' },
      { name: 'Gel ADN Silicium', use: 'Zpevnění kůže po proceduře' },
    ],
    tip: 'Dřevo musí být kvalitně opracované - bez třísek a hran.',
    tags: ['technika', 'tělo', 'modelace'],
  },
  {
    id: 'knowledge-madero-2',
    category_id: 'category-madero',
    title: 'Maderoterapie nástroje',
    description: 'Základní sada dřevěných nástrojů a jejich použití.',
    details: 'Váleček - lymfodrenáž, prokrvení\nHrnek - vakuový efekt, celulitida\nHouba - modelace\nKostka - hluboká práce\nDeska - vyhlazení',
    tip: 'Investuj do kvalitního dřeva (buk, javor) - vydrží roky.',
    tags: ['nástroje', 'vybavení'],
  },
  {
    id: 'knowledge-madero-3',
    category_id: 'category-madero',
    title: 'Anti-celulitidní protokol',
    description: 'Postup pro redukci celulitidy pomocí maderoterapie.',
    technique: '1. Suchý kartáč (příprava)\n2. Olej\n3. Váleček - prokrvení\n4. Hrnek - problémové zóny\n5. Houba - modelace\n6. Váleček - závěrečná drenáž',
    br_products: [
      { name: 'Gel d\'Algues', use: 'Řasový zábal po proceduře' }
    ],
    tip: 'Doporuč klientce pít hodně vody 24-48h po proceduře.',
    tags: ['celulitida', 'protokol', 'tělo'],
  },

  // ==========================================
  // AJURVÉDA
  // ==========================================
  {
    id: 'knowledge-ayur-1',
    category_id: 'category-ayurveda',
    title: 'Abhyanga',
    description: 'Tradiční ajurvédská celotělová olejová masáž.',
    details: '5000 let stará technika. "Abhyanga" = masáž s láskou. Teplý olej podle dóši.',
    technique: 'Dlouhé tahy na končetinách, krouživé na kloubech. Směr K srdci. Teplý olej!',
    benefits: ['Výživa tkání', 'Zklidnění Vata', 'Detoxikace', 'Lepší spánek', 'Zpomalení stárnutí'],
    br_products: [
      { name: 'Huile Relaxante', use: 'Základ - lze smíchat s ajurvédskými oleji' },
    ],
    tip: 'Sezamový olej = univerzální. Kokosový = Pitta. Mandlový = Vata.',
    tags: ['ajurvéda', 'oleje', 'tradice'],
  },
  {
    id: 'knowledge-ayur-2',
    category_id: 'category-ayurveda',
    title: 'Dóši (Vata, Pitta, Kapha)',
    description: 'Tři základní bio-energie v ajurvédě určující konstituci člověka.',
    details: 'VATA (vzduch+éter): pohyb, kreativita, suchá kůže\nPITTA (oheň+voda): metabolismus, inteligence, citlivá pleť\nKAPHA (země+voda): struktura, stabilita, mastná pleť',
    tip: 'Masážní technika a olej volíme podle převládající dóši klienta.',
    tags: ['dóše', 'teorie', 'diagnostika'],
  },
  {
    id: 'knowledge-ayur-3',
    category_id: 'category-ayurveda',
    title: 'Marma body',
    description: 'Vitální body na těle kde se koncentruje prána (životní energie).',
    details: '107 hlavních marma bodů. Podobné akupunkturním bodům. Stimulace harmonizuje energii.',
    tip: 'Hlavní obličejové marmy: Sthapani (třetí oko), Apanga (oční koutky), Phana (nosní křídla).',
    tags: ['marma', 'energie', 'body'],
  },

  // ==========================================
  // SVĚTELNÁ TERAPIE
  // ==========================================
  {
    id: 'knowledge-light-1',
    category_id: 'category-light',
    title: 'LED terapie - úvod',
    description: 'Využití světla různých vlnových délek pro ošetření pleti.',
    details: 'Neionizující záření. Různé barvy = různé vlnové délky = různé účinky. Bezbolestné, neinvazivní.',
    benefits: ['Stimulace kolagenu', 'Redukce akné', 'Hojení', 'Anti-aging', 'Redukce zánětu'],
    br_products: [
      { name: 'Sérum A-Glyca', use: 'Anti-glykační sérum - synergie s červeným LED' },
    ],
    tip: 'LED lze kombinovat s většinou ošetření BR pro zesílení účinku.',
    tags: ['LED', 'přístroje', 'technologie'],
  },
  {
    id: 'knowledge-light-2',
    category_id: 'category-light',
    title: 'Červené světlo (630-700nm)',
    description: 'Stimuluje produkci kolagenu, anti-aging efekt.',
    details: 'Proniká do dermis (3-5mm). Stimuluje fibroblasty, mitochondrie. Redukuje vrásky.',
    br_products: [
      { name: 'Sérum Colostrum', use: 'Regenerační sérum - synergie s červeným LED' },
    ],
    tip: 'Ideální po mikrojehličkování nebo chemickém peelingu.',
    tags: ['červená', 'anti-age', 'kolagen'],
  },
  {
    id: 'knowledge-light-3',
    category_id: 'category-light',
    title: 'Modré světlo (415-450nm)',
    description: 'Antibakteriální účinek, ideální na akné.',
    details: 'Ničí bakterie P. acnes. Proniká mělce (1-2mm). Reguluje mazové žlázy.',
    tip: 'Kombinace modrá + červená = nejúčinnější na akné.',
    tags: ['modrá', 'akné', 'bakterie'],
  },
];

// Helper functions
export const getCategoryBySlug = (slug: string): KnowledgeCategory | undefined => {
  return KNOWLEDGE_CATEGORIES.find(c => c.slug === slug);
};

export const getCategoryById = (id: string): KnowledgeCategory | undefined => {
  return KNOWLEDGE_CATEGORIES.find(c => c.id === id);
};

export const getItemsByCategoryId = (categoryId: string): KnowledgeItem[] => {
  return KNOWLEDGE_ITEMS.filter(i => i.category_id === categoryId);
};

export const getItemsByCategorySlug = (slug: string): KnowledgeItem[] => {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return getItemsByCategoryId(category.id);
};

export const getItemById = (id: string): KnowledgeItem | undefined => {
  return KNOWLEDGE_ITEMS.find(i => i.id === id);
};

export const searchKnowledge = (query: string): KnowledgeItem[] => {
  const lowerQuery = query.toLowerCase();
  return KNOWLEDGE_ITEMS.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    (item.latin && item.latin.toLowerCase().includes(lowerQuery))
  );
};

export const getItemsWithBRProducts = (): KnowledgeItem[] => {
  return KNOWLEDGE_ITEMS.filter(i => i.br_products && i.br_products.length > 0);
};

export const getItemsCountByCategory = (categoryId: string): number => {
  return getItemsByCategoryId(categoryId).length;
};
