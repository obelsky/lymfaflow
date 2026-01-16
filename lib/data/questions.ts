// ============================================
// LYMFAFLOW - QUIZ QUESTIONS DATA
// ============================================

import type { QuizQuestion } from '@/types';

// Helper to generate IDs
const questionId = (topic: string, num: number) => `question-${topic}-${num}`;

export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  'topic-roviny': [
    {
      id: questionId('roviny', 1),
      topic_id: 'topic-roviny',
      question: 'Která rovina dělí tělo na přední a zadní část?',
      options: ['Předozadní (šipová)', 'Čelní', 'Příčná (vodorovná)', 'Středová'],
      correct_index: 1,
      explanation: 'Čelní rovina prochází tělem zleva doprava a dělí ho na přední a zadní polovinu. Představ si skleněnou tabuli, která ti stojí před obličejem.',
      difficulty: 1,
    },
    {
      id: questionId('roviny', 2),
      topic_id: 'topic-roviny',
      question: 'Předozadní (šipové) roviny probíhají:',
      options: ['Kolmo na středovou rovinu', 'Rovnoběžně se středovou rovinou', 'Vodorovně', 'Šikmo'],
      correct_index: 1,
      explanation: 'Šipové roviny jsou rovnoběžné se středovou rovinou - všechny probíhají zepředu dozadu jako šíp.',
      difficulty: 2,
    },
    {
      id: questionId('roviny', 3),
      topic_id: 'topic-roviny',
      question: 'Vodorovná (příčná) rovina dělí tělo na:',
      options: ['Pravou a levou část', 'Přední a zadní část', 'Horní a dolní část', 'Vnitřní a vnější část'],
      correct_index: 2,
      explanation: 'Vodorovná rovina prochází tělem horizontálně jako patro v budově - dělí tělo na to, co je nahoře a co dole.',
      difficulty: 1,
    },
    {
      id: questionId('roviny', 4),
      topic_id: 'topic-roviny',
      question: 'Středová rovina:',
      options: ['Je pouze jedna a dělí tělo na dvě zrcadlové poloviny', 'Je jich více a jsou rovnoběžné', 'Dělí tělo na přední a zadní část', 'Prochází tělem vodorovně'],
      correct_index: 0,
      explanation: 'Středová rovina je jediná svého druhu - prochází přesně středem těla od hlavy k nohám a dělí nás na pravou a levou polovinu.',
      difficulty: 1,
    },
    {
      id: questionId('roviny', 5),
      topic_id: 'topic-roviny',
      question: 'Ohýbání a natahování (např. v lokti) probíhá v rovině:',
      options: ['Čelní', 'Vodorovné', 'Předozadní (šipové)', 'Šikmé'],
      correct_index: 2,
      explanation: 'Když ohýbáš loket nebo koleno, pohybuješ se v předozadní rovině - paže nebo noha jde dopředu a dozadu.',
      difficulty: 2,
    },
    {
      id: questionId('roviny', 6),
      topic_id: 'topic-roviny',
      question: 'V jaké rovině probíhá abdukce (odtažení) paže?',
      options: ['Čelní (frontální)', 'Předozadní (sagitální)', 'Příčné', 'Středové'],
      correct_index: 0,
      explanation: 'Abdukce probíhá v čelní rovině - paže jde od těla do strany, jako když děláš "T".',
      difficulty: 2,
    },
    {
      id: questionId('roviny', 7),
      topic_id: 'topic-roviny',
      question: 'Kolik středových rovin může procházet tělem?',
      options: ['Nekonečně mnoho', 'Právě jedna', 'Tři', 'Žádná'],
      correct_index: 1,
      explanation: 'Středová rovina je jedinečná - prochází přesně středem těla a vytváří jeho zrcadlovou symetrii.',
      difficulty: 1,
    },
  ],
  'topic-smery': [
    {
      id: questionId('smery', 1),
      topic_id: 'topic-smery',
      question: 'Co znamená "kraniální směr"?',
      options: ['K nohám', 'K hlavě', 'Dopředu', 'Dozadu'],
      correct_index: 1,
      explanation: 'Kraniální = směrem k hlavě (lebce). Cranium je latinsky lebka.',
      difficulty: 1,
    },
    {
      id: questionId('smery', 2),
      topic_id: 'topic-smery',
      question: 'Ventrální směr znamená:',
      options: ['Dozadu', 'K hlavě', 'Dopředu (k břichu)', 'K nohám'],
      correct_index: 2,
      explanation: 'Ventrální = dopředu, k břichu. Venter je latinsky břicho. Tip: Ventrální a Vpředu - obě na V.',
      difficulty: 1,
    },
    {
      id: questionId('smery', 3),
      topic_id: 'topic-smery',
      question: 'Palec ruky je vzhledem k malíčku:',
      options: ['Mediální', 'Laterální', 'Proximální', 'Distální'],
      correct_index: 1,
      explanation: 'Palec je laterální (na vnější straně) vzhledem k malíčku, který je mediální (blíž ke středu těla).',
      difficulty: 2,
    },
    {
      id: questionId('smery', 4),
      topic_id: 'topic-smery',
      question: 'Zápěstí je vůči lokti:',
      options: ['Proximální', 'Distální', 'Mediální', 'Laterální'],
      correct_index: 1,
      explanation: 'Zápěstí je distální vůči lokti - je dále od trupu. Loket je naopak proximální vůči zápěstí.',
      difficulty: 2,
    },
    {
      id: questionId('smery', 5),
      topic_id: 'topic-smery',
      question: 'Dorzální strana ruky je:',
      options: ['Dlaň', 'Hřbet ruky', 'Palcová strana', 'Malíčková strana'],
      correct_index: 1,
      explanation: 'Dorzální = zadní strana, u ruky je to hřbet. Dorsum je latinsky záda/hřbet.',
      difficulty: 1,
    },
    {
      id: questionId('smery', 6),
      topic_id: 'topic-smery',
      question: 'Kaudální směr znamená:',
      options: ['K hlavě', 'K nohám (dolů)', 'Dopředu', 'Do strany'],
      correct_index: 1,
      explanation: 'Kaudální = směrem k nohám, dolů. Cauda je latinsky ocas - směr, kam by směřoval ocas.',
      difficulty: 1,
    },
    {
      id: questionId('smery', 7),
      topic_id: 'topic-smery',
      question: 'Vnitřní kotník je:',
      options: ['Laterální', 'Mediální', 'Proximální', 'Distální'],
      correct_index: 1,
      explanation: 'Vnitřní kotník je mediální - je blíže ke středové čáře těla. Vnější kotník je laterální.',
      difficulty: 2,
    },
  ],
  'topic-kosti': [
    {
      id: questionId('kosti', 1),
      topic_id: 'topic-kosti',
      question: 'Kompaktní kostní tkáň tvoří:',
      options: ['Vnitřní houbovitou strukturu', 'Tvrdou vnější vrstvu kosti', 'Kostní dřeň', 'Kloubní chrupavku'],
      correct_index: 1,
      explanation: 'Kompaktní (hutná) kost tvoří tvrdou vnější vrstvu - je pevná a odolná.',
      difficulty: 1,
    },
    {
      id: questionId('kosti', 2),
      topic_id: 'topic-kosti',
      question: 'Spongiózní kost:',
      options: ['Je tvrdá vnější vrstva', 'Má houbovitou strukturu s trámečky', 'Produkuje hormony', 'Je jen v lebce'],
      correct_index: 1,
      explanation: 'Spongiózní (houbovitá) kost má strukturu jako houba s trámečky - je lehká, ale pevná.',
      difficulty: 1,
    },
    {
      id: questionId('kosti', 3),
      topic_id: 'topic-kosti',
      question: 'Stehenní kost je příkladem:',
      options: ['Ploché kosti', 'Krátké kosti', 'Dlouhé kosti', 'Nepravidelné kosti'],
      correct_index: 2,
      explanation: 'Stehenní kost je nejdelší a nejsilnější kost v těle - typická dlouhá kost.',
      difficulty: 1,
    },
    {
      id: questionId('kosti', 4),
      topic_id: 'topic-kosti',
      question: 'Lopatka je příkladem:',
      options: ['Dlouhé kosti', 'Krátké kosti', 'Ploché kosti', 'Sezamské kosti'],
      correct_index: 2,
      explanation: 'Lopatka je plochá kost - chrání orgány a poskytuje plochu pro úpony svalů.',
      difficulty: 1,
    },
    {
      id: questionId('kosti', 5),
      topic_id: 'topic-kosti',
      question: 'Epifýza je:',
      options: ['Tělo dlouhé kosti', 'Koncová část dlouhé kosti', 'Kostní dřeň', 'Okostice'],
      correct_index: 1,
      explanation: 'Epifýza je koncová část (hlavice) dlouhé kosti - místo, kde se tvoří kloub.',
      difficulty: 2,
    },
    {
      id: questionId('kosti', 6),
      topic_id: 'topic-kosti',
      question: 'Diafýza je:',
      options: ['Koncová část kosti', 'Střední část (tělo) dlouhé kosti', 'Kloubní chrupavka', 'Růstová ploténka'],
      correct_index: 1,
      explanation: 'Diafýza je tělo (střední část) dlouhé kosti - dutá trubice s kostní dření uvnitř.',
      difficulty: 2,
    },
    {
      id: questionId('kosti', 7),
      topic_id: 'topic-kosti',
      question: 'Okostice (periosteum):',
      options: ['Je uvnitř kosti', 'Je vazivový obal kosti, bohatý na cévy a nervy', 'Tvoří krev', 'Je jen u plochých kostí'],
      correct_index: 1,
      explanation: 'Okostice je vazivový obal pokrývající kost - je bohatá na cévy a nervy, proto údery do kostí bolí.',
      difficulty: 2,
    },
    {
      id: questionId('kosti', 8),
      topic_id: 'topic-kosti',
      question: 'Foramen je:',
      options: ['Výběžek kosti', 'Otvor v kosti', 'Prohlubeň', 'Drsnatina'],
      correct_index: 1,
      explanation: 'Foramen = otvor v kosti, kterým procházejí cévy a nervy. Foramen magnum je velký otvor v lebce.',
      difficulty: 2,
    },
  ],
  'topic-pater': [
    {
      id: questionId('pater', 1),
      topic_id: 'topic-pater',
      question: 'Kolik krčních obratlů má člověk?',
      options: ['5', '7', '12', '8'],
      correct_index: 1,
      explanation: 'Krčních obratlů je 7 (C1-C7). Zajímavost: stejný počet má i žirafa!',
      difficulty: 1,
    },
    {
      id: questionId('pater', 2),
      topic_id: 'topic-pater',
      question: 'Hrudních obratlů je:',
      options: ['7', '5', '12', '10'],
      correct_index: 2,
      explanation: 'Hrudních obratlů je 12 (Th1-Th12) - ke každému se připojuje pár žeber.',
      difficulty: 1,
    },
    {
      id: questionId('pater', 3),
      topic_id: 'topic-pater',
      question: 'Bederních obratlů je:',
      options: ['7', '5', '12', '3'],
      correct_index: 1,
      explanation: 'Bederních obratlů je 5 (L1-L5) - jsou největší a nesou největší zátěž.',
      difficulty: 1,
    },
    {
      id: questionId('pater', 4),
      topic_id: 'topic-pater',
      question: 'Křížová kost vznikla srůstem:',
      options: ['3 obratlů', '5 obratlů', '7 obratlů', '12 obratlů'],
      correct_index: 1,
      explanation: 'Křížová kost (os sacrum) vznikla srůstem 5 křížových obratlů.',
      difficulty: 2,
    },
    {
      id: questionId('pater', 5),
      topic_id: 'topic-pater',
      question: 'Trnový výběžek obratle:',
      options: ['Je uložen vpředu', 'Je hmatný na zádech', 'Obsahuje míchu', 'Spojuje obratle'],
      correct_index: 1,
      explanation: 'Trnové výběžky jsou hmatné na zádech jako "korálky" při předklonu.',
      difficulty: 1,
    },
    {
      id: questionId('pater', 6),
      topic_id: 'topic-pater',
      question: 'Meziobratlová ploténka se skládá z:',
      options: ['Jen z chrupavky', 'Z vazivového prstence a rosolovitého jádra', 'Jen z kosti', 'Z nervové tkáně'],
      correct_index: 1,
      explanation: 'Ploténka má vnější vazivový prstenec (anulus fibrosus) a vnitřní rosolovité jádro (nucleus pulposus).',
      difficulty: 2,
    },
    {
      id: questionId('pater', 7),
      topic_id: 'topic-pater',
      question: 'Celkový počet obratlů v páteři je přibližně:',
      options: ['24', '26', '33-34', '40'],
      correct_index: 2,
      explanation: 'Celkem 33-34 obratlů (7+12+5+5+4-5). Pohyblivých je pouze 24 (krční + hrudní + bederní).',
      difficulty: 1,
    },
  ],
  'topic-klouby': [
    {
      id: questionId('klouby', 1),
      topic_id: 'topic-klouby',
      question: 'Synoviální tekutina:',
      options: ['Vyživuje a maže kloub', 'Je jen v páteři', 'Tvoří kosti', 'Je součástí svalů'],
      correct_index: 0,
      explanation: 'Synoviální tekutina je "olej" v kloubu - maže kloubní plochy a vyživuje chrupavku.',
      difficulty: 1,
    },
    {
      id: questionId('klouby', 2),
      topic_id: 'topic-klouby',
      question: 'Ramenní kloub je příkladem:',
      options: ['Kladkového kloubu', 'Kulovitého kloubu', 'Sedlového kloubu', 'Kolového kloubu'],
      correct_index: 1,
      explanation: 'Ramenní kloub je kulovitý - umožňuje pohyb ve všech směrech (největší rozsah pohybu).',
      difficulty: 1,
    },
    {
      id: questionId('klouby', 3),
      topic_id: 'topic-klouby',
      question: 'Loketní kloub je:',
      options: ['Kulovitý', 'Kladkový', 'Sedlový', 'Plochý'],
      correct_index: 1,
      explanation: 'Loketní kloub je kladkový - umožňuje hlavně flexi a extenzi (ohýbání a natahování).',
      difficulty: 1,
    },
    {
      id: questionId('klouby', 4),
      topic_id: 'topic-klouby',
      question: 'Flexe znamená:',
      options: ['Natažení', 'Ohnutí', 'Otočení', 'Odtažení'],
      correct_index: 1,
      explanation: 'Flexe = ohnutí, zmenšení úhlu v kloubu. Např. flexe v lokti = ohnutí paže.',
      difficulty: 1,
    },
    {
      id: questionId('klouby', 5),
      topic_id: 'topic-klouby',
      question: 'Abdukce je:',
      options: ['Přitažení k tělu', 'Odtažení od těla', 'Ohnutí', 'Otočení'],
      correct_index: 1,
      explanation: 'Abdukce = odtažení od osy těla. Tip: ABdukce = ABsence (pryč od těla).',
      difficulty: 1,
    },
    {
      id: questionId('klouby', 6),
      topic_id: 'topic-klouby',
      question: 'Vazy (ligamenta) jsou:',
      options: ['Aktivní stabilizátory kloubu', 'Pasivní stabilizátory, spojují kosti', 'Součást svalu', 'Typ chrupavky'],
      correct_index: 1,
      explanation: 'Vazy jsou pasivní stabilizátory - pevné vazivové pruhy spojující kosti. Svaly jsou aktivní stabilizátory.',
      difficulty: 2,
    },
    {
      id: questionId('klouby', 7),
      topic_id: 'topic-klouby',
      question: 'Menisky najdeme:',
      options: ['V ramenním kloubu', 'V kolenním kloubu', 'V lokti', 'Ve všech kloubech'],
      correct_index: 1,
      explanation: 'Menisky jsou chrupavčité vložky v kolenním kloubu - tlumí nárazy a zlepšují stabilitu.',
      difficulty: 2,
    },
    {
      id: questionId('klouby', 8),
      topic_id: 'topic-klouby',
      question: 'Extenze je:',
      options: ['Ohnutí', 'Natažení', 'Rotace', 'Abdukce'],
      correct_index: 1,
      explanation: 'Extenze = natažení, zvětšení úhlu v kloubu. Opak flexe.',
      difficulty: 1,
    },
  ],
  
  // ============================================
  // HORNÍ KONČETINA
  // ============================================
  'topic-hk': [
    {
      id: questionId('hk', 1),
      topic_id: 'topic-hk',
      question: 'Která kost jediná přímo spojuje horní končetinu s trupem?',
      options: ['Lopatka', 'Klíční kost', 'Pažní kost', 'Žebra'],
      correct_index: 1,
      explanation: 'Klíční kost je jediná kostní spojení HK s trupem (hrudní kostí). Lopatka "plave" na svalech.',
      difficulty: 2,
    },
    {
      id: questionId('hk', 2),
      topic_id: 'topic-hk',
      question: 'Lopatka je:',
      options: ['Dlouhá kost', 'Plochá kost', 'Krátká kost', 'Nepravidelná kost'],
      correct_index: 1,
      explanation: 'Lopatka je plochá kost – poskytuje plochu pro úpony svalů a tvoří zadní část pletence ramenního.',
      difficulty: 1,
    },
    {
      id: questionId('hk', 3),
      topic_id: 'topic-hk',
      question: 'Acromion je:',
      options: ['Část pažní kosti', 'Výběžek lopatky nad ramenem', 'Kloubní jamka', 'Část klíční kosti'],
      correct_index: 1,
      explanation: 'Acromion (nadpažek) je výběžek lopatky, který tvoří "střechu" ramenního kloubu.',
      difficulty: 2,
    },
    {
      id: questionId('hk', 4),
      topic_id: 'topic-hk',
      question: 'Vřetenní kost (radius) je na předloktí:',
      options: ['Na straně malíčku', 'Na straně palce', 'Uprostřed', 'Na zadní straně'],
      correct_index: 1,
      explanation: 'Radius je na laterální (palcové) straně předloktí. Ulna je na mediální (malíčkové) straně.',
      difficulty: 1,
    },
    {
      id: questionId('hk', 5),
      topic_id: 'topic-hk',
      question: 'Olecranon je:',
      options: ['Hlavice pažní kosti', 'Výběžek loketní kosti (tvoří loket)', 'Část zápěstí', 'Sval paže'],
      correct_index: 1,
      explanation: 'Olecranon je výběžek loketní kosti – to, oč se opíráš, když položíš loket na stůl.',
      difficulty: 2,
    },
    {
      id: questionId('hk', 6),
      topic_id: 'topic-hk',
      question: 'Kolik kostí má lidská ruka celkem?',
      options: ['15', '21', '27', '33'],
      correct_index: 2,
      explanation: '27 kostí: 8 zápěstních + 5 záprstních + 14 článků prstů.',
      difficulty: 2,
    },
    {
      id: questionId('hk', 7),
      topic_id: 'topic-hk',
      question: 'Supinace předloktí znamená:',
      options: ['Dlaň směřuje dolů', 'Dlaň směřuje nahoru', 'Ohnutí v lokti', 'Natažení v lokti'],
      correct_index: 1,
      explanation: 'Supinace = dlaň směřuje nahoru (jako když držíš talíř polévky). Pronace = dlaň dolů.',
      difficulty: 2,
    },
    {
      id: questionId('hk', 8),
      topic_id: 'topic-hk',
      question: 'Tenisový loket je zánět:',
      options: ['Mediálního epikondylu', 'Laterálního epikondylu', 'Olecranonu', 'Hlavice radia'],
      correct_index: 1,
      explanation: 'Tenisový loket = zánět úponů na laterálním epikondylu (vnější strana lokte).',
      difficulty: 3,
    },
  ],
  
  // ============================================
  // DOLNÍ KONČETINA
  // ============================================
  'topic-dk': [
    {
      id: questionId('dk', 1),
      topic_id: 'topic-dk',
      question: 'Acetabulum je:',
      options: ['Výběžek stehenní kosti', 'Kloubní jamka kyčle', 'Část kolenního kloubu', 'Kost nohy'],
      correct_index: 1,
      explanation: 'Acetabulum je hluboká kloubní jamka pánevní kosti, do které zapadá hlavice stehenní kosti.',
      difficulty: 2,
    },
    {
      id: questionId('dk', 2),
      topic_id: 'topic-dk',
      question: 'Stehenní kost je:',
      options: ['Nejkratší kost těla', 'Nejdelší a nejsilnější kost těla', 'Plochá kost', 'Krátká kost'],
      correct_index: 1,
      explanation: 'Stehenní kost (femur) je nejdelší a nejsilnější kost v lidském těle.',
      difficulty: 1,
    },
    {
      id: questionId('dk', 3),
      topic_id: 'topic-dk',
      question: 'Velký trochanter stehenní kosti:',
      options: ['Je na vnitřní straně', 'Je hmatný na boku stehna', 'Tvoří kolenní kloub', 'Je v kyčelní jamce'],
      correct_index: 1,
      explanation: 'Velký trochanter je hrbol na boku stehenní kosti – snadno ho nahmatáš na boku stehna.',
      difficulty: 2,
    },
    {
      id: questionId('dk', 4),
      topic_id: 'topic-dk',
      question: 'Čéška (patella) je:',
      options: ['Součást stehenní kosti', 'Sezamská kost v šlaše čtyřhlavého svalu', 'Část holenní kosti', 'Vazivová struktura'],
      correct_index: 1,
      explanation: 'Čéška je sezamská kost (kost ve šlaše) – chrání kolenní kloub a zlepšuje páku čtyřhlavého svalu.',
      difficulty: 2,
    },
    {
      id: questionId('dk', 5),
      topic_id: 'topic-dk',
      question: 'Vnitřní kotník je výběžek:',
      options: ['Lýtkové kosti', 'Holenní kosti', 'Hlezenní kosti', 'Patní kosti'],
      correct_index: 1,
      explanation: 'Vnitřní (mediální) kotník je výběžek holenní kosti. Vnější (laterální) kotník je výběžek lýtkové kosti.',
      difficulty: 2,
    },
    {
      id: questionId('dk', 6),
      topic_id: 'topic-dk',
      question: 'Přední zkřížený vaz v koleni:',
      options: ['Stabilizuje koleno do stran', 'Brání posunu bérce dopředu', 'Spojuje čéšku se stehenní kostí', 'Je součástí menisku'],
      correct_index: 1,
      explanation: 'Přední zkřížený vaz (ACL) brání posunu holenní kosti dopředu – nejčastěji zraněný vaz u sportovců.',
      difficulty: 2,
    },
    {
      id: questionId('dk', 7),
      topic_id: 'topic-dk',
      question: 'Patní kost (calcaneus):',
      options: ['Je nejmenší kost nohy', 'Je největší zánártní kost', 'Tvoří kotník', 'Je v přední části nohy'],
      correct_index: 1,
      explanation: 'Patní kost je největší kost nohy – tvoří patu a slouží jako úpon Achillovy šlachy.',
      difficulty: 1,
    },
    {
      id: questionId('dk', 8),
      topic_id: 'topic-dk',
      question: 'Plochonoží je:',
      options: ['Vysoká klenba', 'Propadlá podélná klenba nohy', 'Deformace prstů', 'Zánět kotníku'],
      correct_index: 1,
      explanation: 'Plochonoží = propadlá podélná klenba nohy – může způsobovat bolesti a problémy při chůzi.',
      difficulty: 1,
    },
  ],
  
  // ============================================
  // SVALOVÁ SOUSTAVA
  // ============================================
  'topic-svaly': [
    {
      id: questionId('svaly', 1),
      topic_id: 'topic-svaly',
      question: 'Origo svalu je:',
      options: ['Pohyblivý úpon', 'Fixní (nepohyblivý) začátek svalu', 'Bříško svalu', 'Šlacha'],
      correct_index: 1,
      explanation: 'Origo = začátek svalu, fixní úpon, obvykle blíže k trupu. Insertio = úpon, pohyblivý.',
      difficulty: 2,
    },
    {
      id: questionId('svaly', 2),
      topic_id: 'topic-svaly',
      question: 'Trapézový sval:',
      options: ['Je jen na paži', 'Je povrchový sval zad a krku', 'Je hluboký sval', 'Je břišní sval'],
      correct_index: 1,
      explanation: 'Trapéz je velký povrchový sval zad a krku – zdvihá ramena a stahuje lopatky.',
      difficulty: 1,
    },
    {
      id: questionId('svaly', 3),
      topic_id: 'topic-svaly',
      question: 'Dvojhlavý sval pažní (biceps):',
      options: ['Natahuje loket', 'Ohýbá loket a supinuje předloktí', 'Zvedá rameno', 'Otáčí hlavu'],
      correct_index: 1,
      explanation: 'Biceps ohýbá loket (flexe) a otáčí předloktí dlaní nahoru (supinace).',
      difficulty: 1,
    },
    {
      id: questionId('svaly', 4),
      topic_id: 'topic-svaly',
      question: 'Hlavní nádechový sval je:',
      options: ['Mezižeberní svaly', 'Bránice (diaphragma)', 'Břišní svaly', 'Prsní svaly'],
      correct_index: 1,
      explanation: 'Bránice je hlavní dýchací sval – při nádechu se stahuje a klesá dolů.',
      difficulty: 1,
    },
    {
      id: questionId('svaly', 5),
      topic_id: 'topic-svaly',
      question: 'Čtyřhlavý sval stehenní:',
      options: ['Ohýbá koleno', 'Natahuje koleno', 'Ohýbá kyčel', 'Rotuje stehno'],
      correct_index: 1,
      explanation: 'Quadriceps natahuje koleno – je to nejsilnější sval v těle.',
      difficulty: 1,
    },
    {
      id: questionId('svaly', 6),
      topic_id: 'topic-svaly',
      question: 'Rotátorová manžeta obsahuje:',
      options: ['2 svaly', '4 svaly', '6 svalů', '8 svalů'],
      correct_index: 1,
      explanation: 'Rotátorová manžeta = 4 svaly stabilizující rameno (supraspinatus, infraspinatus, teres minor, subscapularis).',
      difficulty: 3,
    },
    {
      id: questionId('svaly', 7),
      topic_id: 'topic-svaly',
      question: 'Achillova šlacha spojuje:',
      options: ['Stehenní sval s holenní kostí', 'Lýtkové svaly s patní kostí', 'Čéšku s holenní kostí', 'Kyčelní sval s pánevní kostí'],
      correct_index: 1,
      explanation: 'Achillova šlacha je nejsilnější šlacha v těle – spojuje trojhlavý lýtkový sval s patní kostí.',
      difficulty: 2,
    },
    {
      id: questionId('svaly', 8),
      topic_id: 'topic-svaly',
      question: 'Velký hýžďový sval (gluteus maximus):',
      options: ['Ohýbá koleno', 'Natahuje (extenduje) kyčel', 'Zvedá nohu do strany', 'Ohýbá kyčel'],
      correct_index: 1,
      explanation: 'Gluteus maximus je hlavní extenzor kyčle – zapojuje se při vstávání, chůzi do schodů.',
      difficulty: 2,
    },
    {
      id: questionId('svaly', 9),
      topic_id: 'topic-svaly',
      question: 'Hamstringy jsou:',
      options: ['Přední svaly stehna', 'Zadní svaly stehna', 'Lýtkové svaly', 'Hýžďové svaly'],
      correct_index: 1,
      explanation: 'Hamstringy = zadní svaly stehna (biceps femoris, semitendinosus, semimembranosus) – ohýbají koleno.',
      difficulty: 2,
    },
    {
      id: questionId('svaly', 10),
      topic_id: 'topic-svaly',
      question: 'Široký sval zádový (latissimus dorsi):',
      options: ['Zvedá paži', 'Táhne paži dolů a dozadu', 'Otáčí hlavu', 'Zdvihá ramena'],
      correct_index: 1,
      explanation: 'Latissimus dorsi je největší sval zad – táhne paži dolů, dozadu a k tělu (např. při shybech).',
      difficulty: 2,
    },
  ],
};

// Helper functions
export const getQuestionsByTopicId = (topicId: string): QuizQuestion[] => {
  return QUIZ_QUESTIONS[topicId] || [];
};

export const getQuestionById = (questionId: string): QuizQuestion | undefined => {
  for (const questions of Object.values(QUIZ_QUESTIONS)) {
    const found = questions.find(q => q.id === questionId);
    if (found) return found;
  }
  return undefined;
};

export const getAllQuestions = (): QuizQuestion[] => {
  return Object.values(QUIZ_QUESTIONS).flat();
};

export const getRandomQuestions = (count: number, topicId?: string): QuizQuestion[] => {
  const pool = topicId ? (QUIZ_QUESTIONS[topicId] || []) : getAllQuestions();
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getQuestionsByDifficulty = (difficulty: number): QuizQuestion[] => {
  return getAllQuestions().filter(q => q.difficulty === difficulty);
};

export const getTotalQuestionsCount = (): number => {
  return getAllQuestions().length;
};

export const getQuestionsCountByTopic = (topicId: string): number => {
  return (QUIZ_QUESTIONS[topicId] || []).length;
};
