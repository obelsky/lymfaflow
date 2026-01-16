// ============================================
// LYMFAFLOW - LESSONS DATA
// Source: Diplomová práce "Základy anatomie pohybového ústrojí"
// ============================================

import type { Lesson, LessonPoint } from '@/types';

// Helper to generate IDs
const lessonId = (topic: string, num: number) => `lesson-${topic}-${num}`;
const pointId = (lesson: string, num: number) => `point-${lesson}-${num}`;

export const LESSONS: Record<string, Lesson[]> = {
  'topic-roviny': [
    {
      id: lessonId('roviny', 1),
      topic_id: 'topic-roviny',
      slug: 'co-jsou-roviny',
      title: 'Co jsou roviny těla?',
      why: 'Bez rovin se nedá popsat poloha ani pohyb – v testech je to časté.',
      human_explanation: 'Představ si, že tělo protneš obřím listem papíru. Podle toho, jak ho otočíš, vzniknou různé roviny.',
      tip: 'Záměna: Frontální a sagitální se často pletou. Frontální = čelní (jako když stojíš čelem k někomu).',
      practice: 'Kde to použiješ: Při popisu pohybu v kloubu – „flexe probíhá v sagitální rovině".',
      sort_order: 1,
      xp_reward: 20,
      points: [
        { id: pointId('roviny-1', 1), lesson_id: lessonId('roviny', 1), term: 'Mediánní rovina', definition: 'Dělí tělo přesně na pravou a levou polovinu', latin: 'Planum medianum', sort_order: 1 },
        { id: pointId('roviny-1', 2), lesson_id: lessonId('roviny', 1), term: 'Sagitální roviny', definition: 'Rovnoběžné s mediánní (jako plátky chleba)', latin: 'Plana sagittalia', sort_order: 2 },
        { id: pointId('roviny-1', 3), lesson_id: lessonId('roviny', 1), term: 'Frontální rovina', definition: 'Dělí tělo na přední a zadní část', latin: 'Planum frontale', synonym: 'čelní', sort_order: 3 },
        { id: pointId('roviny-1', 4), lesson_id: lessonId('roviny', 1), term: 'Transverzální rovina', definition: 'Dělí tělo na horní a dolní část', latin: 'Planum transversale', synonym: 'příčná', sort_order: 4 },
      ],
    },
    {
      id: lessonId('roviny', 2),
      topic_id: 'topic-roviny',
      slug: 'roviny-v-praxi',
      title: 'Roviny v praxi',
      why: 'Potřebuješ vědět, jak popsat pohyb klienta.',
      human_explanation: 'Když říkáš „ohni koleno", pohyb probíhá v sagitální rovině. Když dáš ruce od těla do T, je to frontální.',
      tip: 'Na zkoušce: Často se ptají „V jaké rovině probíhá abdukce?" – Odpověď: frontální.',
      practice: 'Zkus si: Postav se a udělej pohyb. V jaké rovině jsi?',
      sort_order: 2,
      xp_reward: 20,
      points: [
        { id: pointId('roviny-2', 1), lesson_id: lessonId('roviny', 2), term: 'Flexe/extenze', definition: 'Ohnutí/natažení – sagitální rovina', sort_order: 1 },
        { id: pointId('roviny-2', 2), lesson_id: lessonId('roviny', 2), term: 'Abdukce/addukce', definition: 'Od těla/k tělu – frontální rovina', sort_order: 2 },
        { id: pointId('roviny-2', 3), lesson_id: lessonId('roviny', 2), term: 'Rotace', definition: 'Otáčení – transverzální rovina', sort_order: 3 },
      ],
    },
  ],
  'topic-smery': [
    {
      id: lessonId('smery', 1),
      topic_id: 'topic-smery',
      slug: 'zakladni-smery',
      title: 'Základní směry',
      why: 'Při popisu bolesti a palpaci potřebuješ přesné směry.',
      human_explanation: 'Místo „nahoře" a „dole" používáme přesnější termíny, které platí vždy stejně.',
      tip: 'Záměna: Ventrální a dorzální – Ventrální = Vepředu (obě na V).',
      practice: 'Při masáži zad: pracuješ na dorzální straně trupu.',
      sort_order: 1,
      xp_reward: 20,
      points: [
        { id: pointId('smery-1', 1), lesson_id: lessonId('smery', 1), term: 'Cranialis', definition: 'Směrem k hlavě (lebce)', latin: 'Cranialis', tip: 'Cranium = lebka', sort_order: 1 },
        { id: pointId('smery-1', 2), lesson_id: lessonId('smery', 1), term: 'Kaudalis', definition: 'Směrem k nohám (k ocasu)', latin: 'Caudalis', tip: 'Cauda = ocas', sort_order: 2 },
        { id: pointId('smery-1', 3), lesson_id: lessonId('smery', 1), term: 'Ventralis', definition: 'Směrem dopředu (k břichu)', latin: 'Ventralis', tip: 'Venter = břicho', sort_order: 3 },
        { id: pointId('smery-1', 4), lesson_id: lessonId('smery', 1), term: 'Dorsalis', definition: 'Směrem dozadu (k zádům)', latin: 'Dorsalis', tip: 'Dorsum = záda', sort_order: 4 },
      ],
    },
    {
      id: lessonId('smery', 2),
      topic_id: 'topic-smery',
      slug: 'medialni-lateralni',
      title: 'Mediální a laterální',
      why: 'Určuje polohu vůči ose těla – kritické pro orientaci.',
      human_explanation: 'Mediální = blíž ke středu (jako MEDIÁN na dálnici). Laterální = na stranu.',
      tip: 'Příklad: Palec je na laterální straně ruky, malíček na mediální.',
      practice: 'Vnitřní kotník je mediální, vnější je laterální.',
      sort_order: 2,
      xp_reward: 20,
      points: [
        { id: pointId('smery-2', 1), lesson_id: lessonId('smery', 2), term: 'Medialis', definition: 'Blíže ke střední čáře těla', latin: 'Medialis', sort_order: 1 },
        { id: pointId('smery-2', 2), lesson_id: lessonId('smery', 2), term: 'Lateralis', definition: 'Dále od střední čáry (na stranu)', latin: 'Lateralis', sort_order: 2 },
      ],
    },
    {
      id: lessonId('smery', 3),
      topic_id: 'topic-smery',
      slug: 'proximalni-distalni',
      title: 'Proximální a distální',
      why: 'Na končetinách se neříká „nahoře/dole", ale proximální/distální.',
      human_explanation: 'Proximální = blíž k trupu (centrum). Distální = dál od trupu (na periferii).',
      tip: 'Loket je proximální vůči zápěstí, ale distální vůči rameni.',
      practice: 'Na ruce: rameno = proximální, prsty = distální.',
      sort_order: 3,
      xp_reward: 20,
      points: [
        { id: pointId('smery-3', 1), lesson_id: lessonId('smery', 3), term: 'Proximalis', definition: 'Blíže k trupu (připojení končetiny)', latin: 'Proximalis', sort_order: 1 },
        { id: pointId('smery-3', 2), lesson_id: lessonId('smery', 3), term: 'Distalis', definition: 'Dále od trupu (konec končetiny)', latin: 'Distalis', sort_order: 2 },
      ],
    },
  ],
  'topic-kosti': [
    {
      id: lessonId('kosti', 1),
      topic_id: 'topic-kosti',
      slug: 'co-je-kostni-tkan',
      title: 'Co je kostní tkáň?',
      why: 'Základ pro pochopení celé kostry.',
      human_explanation: 'Kost není mrtvá hmota – je to živá tkáň, která se neustále přestavuje.',
      tip: 'Okostice je citlivá na bolest – proto údery do kostí tolik bolí!',
      practice: 'Masér: při práci u kosti cítíš pevnou strukturu pod svaly.',
      sort_order: 1,
      xp_reward: 25,
      points: [
        { id: pointId('kosti-1', 1), lesson_id: lessonId('kosti', 1), term: 'Kompaktní kost', definition: 'Tvrdá vnější vrstva', latin: 'Substantia compacta', sort_order: 1 },
        { id: pointId('kosti-1', 2), lesson_id: lessonId('kosti', 1), term: 'Spongiózní kost', definition: 'Houbovitá vnitřní struktura', latin: 'Substantia spongiosa', sort_order: 2 },
        { id: pointId('kosti-1', 3), lesson_id: lessonId('kosti', 1), term: 'Kostní dřeň', definition: 'Vyplňuje dutiny, tvoří krev', latin: 'Medulla ossium', sort_order: 3 },
        { id: pointId('kosti-1', 4), lesson_id: lessonId('kosti', 1), term: 'Okostice', definition: 'Vazivový obal kosti, bohatý na cévy a nervy', latin: 'Periosteum', sort_order: 4 },
      ],
    },
    {
      id: lessonId('kosti', 2),
      topic_id: 'topic-kosti',
      slug: 'typy-kosti-podle-tvaru',
      title: 'Typy kostí podle tvaru',
      why: 'V testech často: „Uveďte příklad ploché kosti."',
      human_explanation: 'Kosti dělíme podle tvaru – každý typ má svou funkci.',
      tip: 'Stehenní kost = nejdelší a nejsilnější kost v těle.',
      practice: 'Lopatka je plochá kost – cítíš ji na zádech.',
      sort_order: 2,
      xp_reward: 25,
      points: [
        { id: pointId('kosti-2', 1), lesson_id: lessonId('kosti', 2), term: 'Dlouhé kosti', definition: 'Páky pro pohyb (stehenní, pažní)', latin: 'Ossa longa', sort_order: 1 },
        { id: pointId('kosti-2', 2), lesson_id: lessonId('kosti', 2), term: 'Krátké kosti', definition: 'Malé, kompaktní (zápěstí, nárt)', latin: 'Ossa brevia', sort_order: 2 },
        { id: pointId('kosti-2', 3), lesson_id: lessonId('kosti', 2), term: 'Ploché kosti', definition: 'Ochrana orgánů (lebka, lopatka)', latin: 'Ossa plana', sort_order: 3 },
        { id: pointId('kosti-2', 4), lesson_id: lessonId('kosti', 2), term: 'Nepravidelné kosti', definition: 'Různé tvary (obratle)', latin: 'Ossa irregularia', sort_order: 4 },
      ],
    },
    {
      id: lessonId('kosti', 3),
      topic_id: 'topic-kosti',
      slug: 'stavba-dlouhe-kosti',
      title: 'Stavba dlouhé kosti',
      why: 'Klasická zkušební otázka.',
      human_explanation: 'Dlouhá kost má tři části: hlavice na koncích a tělo uprostřed.',
      tip: 'EPI = na/nad, DIA = skrz/mezi, META = za/vedle.',
      practice: 'U dětí je v metafýze růstová chrupavka.',
      sort_order: 3,
      xp_reward: 25,
      points: [
        { id: pointId('kosti-3', 1), lesson_id: lessonId('kosti', 3), term: 'Epifýza', definition: 'Kloubní konec kosti (hlavice)', latin: 'Epiphysis', sort_order: 1 },
        { id: pointId('kosti-3', 2), lesson_id: lessonId('kosti', 3), term: 'Diafýza', definition: 'Tělo (střední část) kosti', latin: 'Diaphysis', sort_order: 2 },
        { id: pointId('kosti-3', 3), lesson_id: lessonId('kosti', 3), term: 'Metafýza', definition: 'Přechod mezi epifýzou a diafýzou', latin: 'Metaphysis', sort_order: 3 },
      ],
    },
    {
      id: lessonId('kosti', 4),
      topic_id: 'topic-kosti',
      slug: 'povrch-kosti',
      title: 'Povrch kostí',
      why: 'Výběžky a prohlubně – místa úponů a průchodů.',
      human_explanation: 'Kosti nejsou hladké – mají hrbolky (úpony svalů) a otvory (průchod cév a nervů).',
      tip: 'Foramen magnum = velký otvor v lebce pro míchu.',
      practice: 'Drsnatiny cítíš jako hrbolky při palpaci.',
      sort_order: 4,
      xp_reward: 25,
      points: [
        { id: pointId('kosti-4', 1), lesson_id: lessonId('kosti', 4), term: 'Processus', definition: 'Výběžek (pro úpon svalů/vazů)', latin: 'Processus', sort_order: 1 },
        { id: pointId('kosti-4', 2), lesson_id: lessonId('kosti', 4), term: 'Tuberositas', definition: 'Drsnatina (svalový úpon)', latin: 'Tuberositas', sort_order: 2 },
        { id: pointId('kosti-4', 3), lesson_id: lessonId('kosti', 4), term: 'Foramen', definition: 'Otvor (průchod cév/nervů)', latin: 'Foramen', sort_order: 3 },
        { id: pointId('kosti-4', 4), lesson_id: lessonId('kosti', 4), term: 'Fossa', definition: 'Prohlubeň/jáma', latin: 'Fossa', sort_order: 4 },
      ],
    },
  ],
  'topic-pater': [
    {
      id: lessonId('pater', 1),
      topic_id: 'topic-pater',
      slug: 'useky-patere',
      title: 'Úseky páteře',
      why: 'Základní orientace – musíš vědět, kolik je obratlů kde.',
      human_explanation: 'Páteř má 5 úseků. Shora: krk, hrudník, bedra, kříž, kostrč.',
      tip: 'Celkem 33-34 obratlů, ale pohyblivých jen 24.',
      practice: 'Řazení: 7-12-5-5-4 (jako telefonní číslo).',
      sort_order: 1,
      xp_reward: 30,
      points: [
        { id: pointId('pater-1', 1), lesson_id: lessonId('pater', 1), term: 'Krční (C)', definition: '7 obratlů (C1-C7)', latin: 'Vertebrae cervicales', tip: 'C jako Cervix (krk)', sort_order: 1 },
        { id: pointId('pater-1', 2), lesson_id: lessonId('pater', 1), term: 'Hrudní (Th)', definition: '12 obratlů (Th1-Th12)', latin: 'Vertebrae thoracicae', tip: 'Th jako Thorax (hrudník)', sort_order: 2 },
        { id: pointId('pater-1', 3), lesson_id: lessonId('pater', 1), term: 'Bederní (L)', definition: '5 obratlů (L1-L5)', latin: 'Vertebrae lumbales', tip: 'L jako Lumbus (bedra)', sort_order: 3 },
        { id: pointId('pater-1', 4), lesson_id: lessonId('pater', 1), term: 'Křížová (S)', definition: '5 srostlých obratlů', latin: 'Os sacrum', tip: 'S jako Sacrum', sort_order: 4 },
        { id: pointId('pater-1', 5), lesson_id: lessonId('pater', 1), term: 'Kostrč (Co)', definition: '3-5 zakrnělých obratlů', latin: 'Os coccygis', sort_order: 5 },
      ],
    },
    {
      id: lessonId('pater', 2),
      topic_id: 'topic-pater',
      slug: 'stavba-obratle',
      title: 'Stavba obratle',
      why: 'Pochopíš, proč bolí záda a jak vzniká výhřez.',
      human_explanation: 'Obratel má tělo (nosné), oblouk (chrání míchu) a výběžky (úpony).',
      tip: 'Trny hrudních obratlů směřují dolů, krčních rovně.',
      practice: 'Trny cítíš při předklonu jako „korálky" na zádech.',
      sort_order: 2,
      xp_reward: 30,
      points: [
        { id: pointId('pater-2', 1), lesson_id: lessonId('pater', 2), term: 'Tělo obratle', definition: 'Nosná část, vpředu', latin: 'Corpus vertebrae', sort_order: 1 },
        { id: pointId('pater-2', 2), lesson_id: lessonId('pater', 2), term: 'Oblouk obratle', definition: 'Chrání míchu, vzadu', latin: 'Arcus vertebrae', sort_order: 2 },
        { id: pointId('pater-2', 3), lesson_id: lessonId('pater', 2), term: 'Obratlový otvor', definition: 'Prostor pro míchu', latin: 'Foramen vertebrale', sort_order: 3 },
        { id: pointId('pater-2', 4), lesson_id: lessonId('pater', 2), term: 'Trnový výběžek', definition: 'Hmatný vzadu (trny)', latin: 'Processus spinosus', sort_order: 4 },
      ],
    },
    {
      id: lessonId('pater', 3),
      topic_id: 'topic-pater',
      slug: 'meziobratova-plotenka',
      title: 'Meziobratlová ploténka',
      why: 'Výhřez ploténky = nejčastější problém zad.',
      human_explanation: 'Mezi obratli je „polštářek" – ploténka. Uvnitř gel, venku pevný prstenec.',
      tip: 'Výhřez = jádro pronikne přes prstenec a tlačí na nerv.',
      practice: 'Proto je zvedání s kulatými zády nebezpečné!',
      sort_order: 3,
      xp_reward: 30,
      points: [
        { id: pointId('pater-3', 1), lesson_id: lessonId('pater', 3), term: 'Anulus fibrosus', definition: 'Vnější vazivový prstenec (pevný)', sort_order: 1 },
        { id: pointId('pater-3', 2), lesson_id: lessonId('pater', 3), term: 'Nucleus pulposus', definition: 'Vnitřní rosolovité jádro (pružné)', sort_order: 2 },
        { id: pointId('pater-3', 3), lesson_id: lessonId('pater', 3), term: 'Funkce', definition: 'Tlumí nárazy, umožňuje pohyb', sort_order: 3 },
      ],
    },
  ],
  'topic-klouby': [
    {
      id: lessonId('klouby', 1),
      topic_id: 'topic-klouby',
      slug: 'co-je-kloub',
      title: 'Co je kloub?',
      why: 'Masér musí rozumět pohybu a jeho omezením.',
      human_explanation: 'Kloub = spojení dvou a více kostí, které umožňuje pohyb.',
      tip: 'Synoviální tekutina = „olej" v kloubu.',
      practice: 'Při masáži nikdy netlač přímo na kloub!',
      sort_order: 1,
      xp_reward: 25,
      points: [
        { id: pointId('klouby-1', 1), lesson_id: lessonId('klouby', 1), term: 'Kloubní plochy', definition: 'Kontaktní povrchy kostí', latin: 'Facies articulares', sort_order: 1 },
        { id: pointId('klouby-1', 2), lesson_id: lessonId('klouby', 1), term: 'Kloubní chrupavka', definition: 'Hladký povlak, snižuje tření', latin: 'Cartilago articularis', sort_order: 2 },
        { id: pointId('klouby-1', 3), lesson_id: lessonId('klouby', 1), term: 'Kloubní pouzdro', definition: 'Obal kolem kloubu', latin: 'Capsula articularis', sort_order: 3 },
        { id: pointId('klouby-1', 4), lesson_id: lessonId('klouby', 1), term: 'Kloubní dutina', definition: 'Prostor s tekutinou', latin: 'Cavitas articularis', sort_order: 4 },
      ],
    },
    {
      id: lessonId('klouby', 2),
      topic_id: 'topic-klouby',
      slug: 'typy-kloubu-podle-pohybu',
      title: 'Typy kloubů podle pohybu',
      why: 'V testech: „Jaký je ramenní kloub?"',
      human_explanation: 'Klouby se dělí podle toho, kolik směrů pohybu umožňují.',
      tip: 'Ramenní = kulovitý, loket = kladkový.',
      practice: 'Kulovitý = nejvíc volnosti, ale nejméně stability.',
      sort_order: 2,
      xp_reward: 25,
      points: [
        { id: pointId('klouby-2', 1), lesson_id: lessonId('klouby', 2), term: 'Kulovitý', definition: 'Pohyb všemi směry (rameno, kyčel)', latin: 'Articulatio spheroidea', sort_order: 1 },
        { id: pointId('klouby-2', 2), lesson_id: lessonId('klouby', 2), term: 'Kladkový', definition: 'Jen flexe/extenze (loket, prsty)', latin: 'Ginglymus', sort_order: 2 },
        { id: pointId('klouby-2', 3), lesson_id: lessonId('klouby', 2), term: 'Kolový', definition: 'Jen rotace (vřeteno/loketní)', latin: 'Articulatio trochoidea', sort_order: 3 },
        { id: pointId('klouby-2', 4), lesson_id: lessonId('klouby', 2), term: 'Sedlový', definition: 'Dva směry (palec ruky)', latin: 'Articulatio sellaris', sort_order: 4 },
      ],
    },
    {
      id: lessonId('klouby', 3),
      topic_id: 'topic-klouby',
      slug: 'pohyby-v-kloubech',
      title: 'Pohyby v kloubech',
      why: 'Musíš umět pojmenovat, co klient dělá.',
      human_explanation: 'Každý pohyb má svůj název – to, co děláš intuitivně, má latinské jméno.',
      tip: 'ABdukce = ABsence (pryč od těla), ADdukce = ADice (k tělu).',
      practice: 'Flex = flexe bicepsu = ohnutí v lokti.',
      sort_order: 3,
      xp_reward: 25,
      points: [
        { id: pointId('klouby-3', 1), lesson_id: lessonId('klouby', 3), term: 'Flexe', definition: 'Ohnutí (zmenšení úhlu)', latin: 'Flexio', sort_order: 1 },
        { id: pointId('klouby-3', 2), lesson_id: lessonId('klouby', 3), term: 'Extenze', definition: 'Natažení (zvětšení úhlu)', latin: 'Extensio', sort_order: 2 },
        { id: pointId('klouby-3', 3), lesson_id: lessonId('klouby', 3), term: 'Abdukce', definition: 'Odtažení od osy těla', latin: 'Abductio', sort_order: 3 },
        { id: pointId('klouby-3', 4), lesson_id: lessonId('klouby', 3), term: 'Addukce', definition: 'Přitažení k ose těla', latin: 'Adductio', sort_order: 4 },
        { id: pointId('klouby-3', 5), lesson_id: lessonId('klouby', 3), term: 'Rotace', definition: 'Otáčení kolem osy', latin: 'Rotatio', sort_order: 5 },
      ],
    },
    {
      id: lessonId('klouby', 4),
      topic_id: 'topic-klouby',
      slug: 'stabilizace-kloubu',
      title: 'Stabilizace kloubu',
      why: 'Co drží kloub pohromadě?',
      human_explanation: 'Kloub drží vazy (pasivně) a svaly (aktivně).',
      tip: 'Vazy po natržení špatně hojí – málo cév.',
      practice: 'Při masáži: svaly uvolníš, vazy ne.',
      sort_order: 4,
      xp_reward: 25,
      points: [
        { id: pointId('klouby-4', 1), lesson_id: lessonId('klouby', 4), term: 'Vazy (ligamenta)', definition: 'Pasivní stabilizátory, spojují kosti', latin: 'Ligamenta', sort_order: 1 },
        { id: pointId('klouby-4', 2), lesson_id: lessonId('klouby', 4), term: 'Svaly', definition: 'Aktivní stabilizátory', sort_order: 2 },
        { id: pointId('klouby-4', 3), lesson_id: lessonId('klouby', 4), term: 'Kloubní pouzdro', definition: 'Zesílené vazy', sort_order: 3 },
        { id: pointId('klouby-4', 4), lesson_id: lessonId('klouby', 4), term: 'Menisky', definition: 'Chrupavčité vložky (koleno)', sort_order: 4 },
      ],
    },
  ],
  
  // ============================================
  // HORNÍ KONČETINA
  // ============================================
  'topic-hk': [
    {
      id: lessonId('hk', 1),
      topic_id: 'topic-hk',
      slug: 'pletenec-rameni',
      title: 'Pletenec ramenní',
      why: 'Rameno = nejpohyblivější kloub, ale nejméně stabilní.',
      human_explanation: 'Rameno připojuje paži k trupu. Tvoří ho klíční kost a lopatka.',
      tip: 'Lopatka „plave" na zádech – drží ji jen svaly!',
      practice: 'Při masáži: lopatku můžeš odtáhnout od hrudníku.',
      sort_order: 1,
      xp_reward: 25,
      points: [
        { id: pointId('hk-1', 1), lesson_id: lessonId('hk', 1), term: 'Klíční kost', definition: 'Spojuje hrudník s lopatkou', latin: 'Clavicula', tip: 'Jediná kost spojující HK s trupem', sort_order: 1 },
        { id: pointId('hk-1', 2), lesson_id: lessonId('hk', 1), term: 'Lopatka', definition: 'Plochá kost na zádech', latin: 'Scapula', tip: 'Hřeben lopatky snadno nahmatáš', sort_order: 2 },
        { id: pointId('hk-1', 3), lesson_id: lessonId('hk', 1), term: 'Nadpažek', definition: 'Výběžek lopatky nad ramenem', latin: 'Acromion', sort_order: 3 },
        { id: pointId('hk-1', 4), lesson_id: lessonId('hk', 1), term: 'Kloubní jamka', definition: 'Mělká jamka pro hlavici pažní', latin: 'Cavitas glenoidalis', sort_order: 4 },
      ],
    },
    {
      id: lessonId('hk', 2),
      topic_id: 'topic-hk',
      slug: 'pazni-kost',
      title: 'Pažní kost',
      why: 'Dlouhá kost paže – základ pro loketní kloub.',
      human_explanation: 'Pažní kost spojuje rameno s loktem. Nahoře kulatá hlavice, dole kladka.',
      tip: 'Hlavice = do ramene (kulovitý), kladka = do lokte (kladkový).',
      practice: 'Hrboly nad loktem (epikondyly) jsou místa úponů svalů.',
      sort_order: 2,
      xp_reward: 25,
      points: [
        { id: pointId('hk-2', 1), lesson_id: lessonId('hk', 2), term: 'Hlavice pažní kosti', definition: 'Kulovitá část do ramene', latin: 'Caput humeri', sort_order: 1 },
        { id: pointId('hk-2', 2), lesson_id: lessonId('hk', 2), term: 'Velký hrbol', definition: 'Úpon rotátorové manžety', latin: 'Tuberculum majus', sort_order: 2 },
        { id: pointId('hk-2', 3), lesson_id: lessonId('hk', 2), term: 'Kladka', definition: 'Pro kloub s loketní kostí', latin: 'Trochlea humeri', sort_order: 3 },
        { id: pointId('hk-2', 4), lesson_id: lessonId('hk', 2), term: 'Epikondyly', definition: 'Hrboly nad loktem (úpony svalů)', latin: 'Epicondyli', tip: 'Tenisový loket = zánět laterálního', sort_order: 4 },
      ],
    },
    {
      id: lessonId('hk', 3),
      topic_id: 'topic-hk',
      slug: 'predlokti',
      title: 'Kosti předloktí',
      why: 'Dvě kosti umožňují rotaci – supinaci a pronaci.',
      human_explanation: 'Vřetenní (radius) a loketní (ulna) kost se kolem sebe otáčejí.',
      tip: 'Radius = na straně palce, Ulna = na straně malíčku.',
      practice: 'Supinace = dlaň nahoru (jako držíš talíř polévky).',
      sort_order: 3,
      xp_reward: 25,
      points: [
        { id: pointId('hk-3', 1), lesson_id: lessonId('hk', 3), term: 'Vřetenní kost', definition: 'Laterální kost předloktí (u palce)', latin: 'Radius', sort_order: 1 },
        { id: pointId('hk-3', 2), lesson_id: lessonId('hk', 3), term: 'Loketní kost', definition: 'Mediální kost předloktí (u malíčku)', latin: 'Ulna', sort_order: 2 },
        { id: pointId('hk-3', 3), lesson_id: lessonId('hk', 3), term: 'Olecranon', definition: 'Výběžek loketní kosti (loket)', tip: 'To, oč se opřeš', sort_order: 3 },
        { id: pointId('hk-3', 4), lesson_id: lessonId('hk', 3), term: 'Supinace/pronace', definition: 'Otáčení předloktí (dlaň nahoru/dolů)', sort_order: 4 },
      ],
    },
    {
      id: lessonId('hk', 4),
      topic_id: 'topic-hk',
      slug: 'ruka-zapesti',
      title: 'Zápěstí a ruka',
      why: 'Složitá anatomie – 27 kostí v ruce!',
      human_explanation: '8 zápěstních + 5 záprstních + 14 prstních = 27 kostí.',
      tip: 'Zápěstí: 2 řady po 4 kůstkách.',
      practice: 'Karpální tunel = průchod pro šlachy a nerv.',
      sort_order: 4,
      xp_reward: 25,
      points: [
        { id: pointId('hk-4', 1), lesson_id: lessonId('hk', 4), term: 'Zápěstní kosti', definition: '8 krátkých kostí ve 2 řadách', latin: 'Ossa carpi', sort_order: 1 },
        { id: pointId('hk-4', 2), lesson_id: lessonId('hk', 4), term: 'Záprstní kosti', definition: '5 kostí dlaně', latin: 'Ossa metacarpi', sort_order: 2 },
        { id: pointId('hk-4', 3), lesson_id: lessonId('hk', 4), term: 'Články prstů', definition: '14 kostí (palec 2, ostatní 3)', latin: 'Phalanges', sort_order: 3 },
        { id: pointId('hk-4', 4), lesson_id: lessonId('hk', 4), term: 'Karpální tunel', definition: 'Průchod pro šlachy a n. medianus', sort_order: 4 },
      ],
    },
  ],
  
  // ============================================
  // DOLNÍ KONČETINA
  // ============================================
  'topic-dk': [
    {
      id: lessonId('dk', 1),
      topic_id: 'topic-dk',
      slug: 'panevni-kost',
      title: 'Pánevní kost',
      why: 'Pánev spojuje páteř s dolními končetinami.',
      human_explanation: 'Pánev = 2 pánevní kosti + křížová kost. Jako miska, která nese orgány.',
      tip: 'Hřeben kyčelní snadno nahmatáš – horní okraj „boků".',
      practice: 'Při masáži: orientuj se podle hřebene kyčelního.',
      sort_order: 1,
      xp_reward: 25,
      points: [
        { id: pointId('dk-1', 1), lesson_id: lessonId('dk', 1), term: 'Kyčelní kost', definition: 'Horní část – lopata', latin: 'Os ilium', sort_order: 1 },
        { id: pointId('dk-1', 2), lesson_id: lessonId('dk', 1), term: 'Sedací kost', definition: 'Dolní část – sedíš na ní', latin: 'Os ischii', sort_order: 2 },
        { id: pointId('dk-1', 3), lesson_id: lessonId('dk', 1), term: 'Stydká kost', definition: 'Přední část', latin: 'Os pubis', sort_order: 3 },
        { id: pointId('dk-1', 4), lesson_id: lessonId('dk', 1), term: 'Acetabulum', definition: 'Kloubní jamka pro stehenní kost', tip: 'Hluboká jamka = stabilní kyčel', sort_order: 4 },
      ],
    },
    {
      id: lessonId('dk', 2),
      topic_id: 'topic-dk',
      slug: 'stehenni-kost',
      title: 'Stehenní kost',
      why: 'Nejdelší a nejsilnější kost v těle.',
      human_explanation: 'Stehenní kost nese váhu těla. Nahoře hlavice + krček, dole kondyly.',
      tip: 'Zlomenina krčku = častý úraz u seniorů.',
      practice: 'Velký trochanter hmatný na boku stehna.',
      sort_order: 2,
      xp_reward: 25,
      points: [
        { id: pointId('dk-2', 1), lesson_id: lessonId('dk', 1), term: 'Hlavice stehenní', definition: 'Kulovitá, do kyčle', latin: 'Caput femoris', sort_order: 1 },
        { id: pointId('dk-2', 2), lesson_id: lessonId('dk', 2), term: 'Krček stehenní', definition: 'Spojuje hlavici s tělem', latin: 'Collum femoris', tip: 'Úhel 125° – mění se s věkem', sort_order: 2 },
        { id: pointId('dk-2', 3), lesson_id: lessonId('dk', 2), term: 'Velký trochanter', definition: 'Hrbol na boku (úpon svalů)', latin: 'Trochanter major', sort_order: 3 },
        { id: pointId('dk-2', 4), lesson_id: lessonId('dk', 2), term: 'Kondyly', definition: 'Kloubní hrboly pro koleno', latin: 'Condyli femoris', sort_order: 4 },
      ],
    },
    {
      id: lessonId('dk', 3),
      topic_id: 'topic-dk',
      slug: 'koleno',
      title: 'Kolenní kloub',
      why: 'Největší a nejsložitější kloub těla.',
      human_explanation: 'Koleno = stehenní + holenní + čéška. Menisky a vazy drží stabilitu.',
      tip: 'Přední zkřížený vaz = nejčastější sportovní zranění.',
      practice: 'Čéška chrání koleno a zlepšuje páku čtyřhlavého.',
      sort_order: 3,
      xp_reward: 30,
      points: [
        { id: pointId('dk-3', 1), lesson_id: lessonId('dk', 3), term: 'Čéška', definition: 'Sezamská kost v šlaše', latin: 'Patella', sort_order: 1 },
        { id: pointId('dk-3', 2), lesson_id: lessonId('dk', 3), term: 'Menisky', definition: 'Chrupavčité vložky (vnitřní + zevní)', latin: 'Menisci', sort_order: 2 },
        { id: pointId('dk-3', 3), lesson_id: lessonId('dk', 3), term: 'Přední zkřížený vaz', definition: 'Brání posunu bérce dopředu', latin: 'Lig. cruciatum anterius', sort_order: 3 },
        { id: pointId('dk-3', 4), lesson_id: lessonId('dk', 3), term: 'Postranní vazy', definition: 'Stabilizují do stran', latin: 'Lig. collaterale', sort_order: 4 },
      ],
    },
    {
      id: lessonId('dk', 4),
      topic_id: 'topic-dk',
      slug: 'berec',
      title: 'Kosti bérce',
      why: 'Holenní nese váhu, lýtková stabilizuje kotník.',
      human_explanation: 'Holeň (tibia) = silná, nese váhu. Lýtko (fibula) = tenká, stabilizuje.',
      tip: 'Hrana holenní kosti hned pod kůží – proto kopanec bolí.',
      practice: 'Kotníky = výběžky obou kostí.',
      sort_order: 4,
      xp_reward: 25,
      points: [
        { id: pointId('dk-4', 1), lesson_id: lessonId('dk', 4), term: 'Holenní kost', definition: 'Mediální, nosná', latin: 'Tibia', sort_order: 1 },
        { id: pointId('dk-4', 2), lesson_id: lessonId('dk', 4), term: 'Lýtková kost', definition: 'Laterální, štíhlá', latin: 'Fibula', sort_order: 2 },
        { id: pointId('dk-4', 3), lesson_id: lessonId('dk', 4), term: 'Vnitřní kotník', definition: 'Výběžek holenní kosti', latin: 'Malleolus medialis', sort_order: 3 },
        { id: pointId('dk-4', 4), lesson_id: lessonId('dk', 4), term: 'Zevní kotník', definition: 'Výběžek lýtkové kosti', latin: 'Malleolus lateralis', sort_order: 4 },
      ],
    },
    {
      id: lessonId('dk', 5),
      topic_id: 'topic-dk',
      slug: 'noha',
      title: 'Noha a klenba',
      why: 'Klenba nožní tlumí nárazy – její poruchy = problémy.',
      human_explanation: 'Noha má 26 kostí. Klenba funguje jako pružina při chůzi.',
      tip: 'Plochonoží = propadlá klenba = bolesti.',
      practice: 'Achillova šlacha – nejsilnější šlacha v těle.',
      sort_order: 5,
      xp_reward: 25,
      points: [
        { id: pointId('dk-5', 1), lesson_id: lessonId('dk', 5), term: 'Zánártní kosti', definition: '7 kostí (hlezenní, patní...)', latin: 'Ossa tarsi', sort_order: 1 },
        { id: pointId('dk-5', 2), lesson_id: lessonId('dk', 5), term: 'Patní kost', definition: 'Největší, tvoří patu', latin: 'Calcaneus', sort_order: 2 },
        { id: pointId('dk-5', 3), lesson_id: lessonId('dk', 5), term: 'Podélná klenba', definition: 'Od paty k prstům', sort_order: 3 },
        { id: pointId('dk-5', 4), lesson_id: lessonId('dk', 5), term: 'Příčná klenba', definition: 'Napříč přes nárt', sort_order: 4 },
      ],
    },
  ],
  
  // ============================================
  // SVALOVÁ SOUSTAVA
  // ============================================
  'topic-svaly': [
    {
      id: lessonId('svaly', 1),
      topic_id: 'topic-svaly',
      slug: 'zaklady-svalu',
      title: 'Základy svalové tkáně',
      why: 'Musíš rozumět, jak sval funguje, abys ho mohl/a správně masírovat.',
      human_explanation: 'Sval se skládá ze svalových vláken, které se smršťují = pohyb.',
      tip: 'Červená vlákna = vytrvalost, bílá = síla.',
      practice: 'Sval vždy táhne, nikdy netlačí!',
      sort_order: 1,
      xp_reward: 25,
      points: [
        { id: pointId('svaly-1', 1), lesson_id: lessonId('svaly', 1), term: 'Svalové vlákno', definition: 'Základní jednotka svalu', latin: 'Fibra muscularis', sort_order: 1 },
        { id: pointId('svaly-1', 2), lesson_id: lessonId('svaly', 1), term: 'Začátek svalu', definition: 'Fixní úpon (blíž k trupu)', latin: 'Origo', sort_order: 2 },
        { id: pointId('svaly-1', 3), lesson_id: lessonId('svaly', 1), term: 'Úpon svalu', definition: 'Pohyblivý úpon (dál od trupu)', latin: 'Insertio', sort_order: 3 },
        { id: pointId('svaly-1', 4), lesson_id: lessonId('svaly', 1), term: 'Bříško svalu', definition: 'Střední masitá část', latin: 'Venter', sort_order: 4 },
      ],
    },
    {
      id: lessonId('svaly', 2),
      topic_id: 'topic-svaly',
      slug: 'svaly-hlavy-krku',
      title: 'Svaly hlavy a krku',
      why: 'Důležité pro masáž obličeje a šíje.',
      human_explanation: 'Mimické svaly hýbou kůží, žvýkací svaly čelistí.',
      tip: 'Trapéz = nejčastěji přetížený sval u sedavého zaměstnání.',
      practice: 'Kývače hlavy (SCM) nahmatáš při otočení hlavy.',
      sort_order: 2,
      xp_reward: 30,
      points: [
        { id: pointId('svaly-2', 1), lesson_id: lessonId('svaly', 2), term: 'Mimické svaly', definition: 'Hýbou kůží obličeje (výrazy)', sort_order: 1 },
        { id: pointId('svaly-2', 2), lesson_id: lessonId('svaly', 2), term: 'Žvýkací svaly', definition: 'Pohyb čelisti (masseter, temporalis)', sort_order: 2 },
        { id: pointId('svaly-2', 3), lesson_id: lessonId('svaly', 2), term: 'Kývač hlavy', definition: 'Otáčí a uklání hlavu', latin: 'M. sternocleidomastoideus', tip: 'SCM = od hrudní kosti ke spánkové', sort_order: 3 },
        { id: pointId('svaly-2', 4), lesson_id: lessonId('svaly', 2), term: 'Trapézový sval', definition: 'Zvedá ramena, stahuje lopatky', latin: 'M. trapezius', sort_order: 4 },
      ],
    },
    {
      id: lessonId('svaly', 3),
      topic_id: 'topic-svaly',
      slug: 'svaly-trupu-zada',
      title: 'Svaly zad',
      why: 'Nejčastější oblast masáže – bolesti zad.',
      human_explanation: 'Povrchové svaly hýbou rameny, hluboké drží páteř.',
      tip: 'Vzpřimovače = hluboké svaly podél páteře.',
      practice: 'Latissimus = široký sval, od pasu k podpaží.',
      sort_order: 3,
      xp_reward: 30,
      points: [
        { id: pointId('svaly-3', 1), lesson_id: lessonId('svaly', 3), term: 'Trapézový sval', definition: 'Povrchový, pohyb lopatek', latin: 'M. trapezius', sort_order: 1 },
        { id: pointId('svaly-3', 2), lesson_id: lessonId('svaly', 3), term: 'Široký sval zádový', definition: 'Táhne paži dolů a dozadu', latin: 'M. latissimus dorsi', sort_order: 2 },
        { id: pointId('svaly-3', 3), lesson_id: lessonId('svaly', 3), term: 'Vzpřimovače páteře', definition: 'Hluboké, drží vzpřímené držení', latin: 'M. erector spinae', sort_order: 3 },
        { id: pointId('svaly-3', 4), lesson_id: lessonId('svaly', 3), term: 'Rombické svaly', definition: 'Stahují lopatky k sobě', latin: 'Mm. rhomboidei', sort_order: 4 },
      ],
    },
    {
      id: lessonId('svaly', 4),
      topic_id: 'topic-svaly',
      slug: 'svaly-hrudniku-bricha',
      title: 'Svaly hrudníku a břicha',
      why: 'Důležité pro dýchání a stabilitu trupu.',
      human_explanation: 'Prsní svaly hýbou ramenem, břišní chrání orgány a drží páteř.',
      tip: 'Bránice = hlavní dýchací sval!',
      practice: 'Přímý břišní = „six pack" – ohýbá trup.',
      sort_order: 4,
      xp_reward: 30,
      points: [
        { id: pointId('svaly-4', 1), lesson_id: lessonId('svaly', 4), term: 'Velký prsní sval', definition: 'Přitahuje paži k trupu', latin: 'M. pectoralis major', sort_order: 1 },
        { id: pointId('svaly-4', 2), lesson_id: lessonId('svaly', 4), term: 'Bránice', definition: 'Hlavní nádechový sval', latin: 'Diaphragma', sort_order: 2 },
        { id: pointId('svaly-4', 3), lesson_id: lessonId('svaly', 4), term: 'Přímý břišní sval', definition: 'Ohýbá trup dopředu', latin: 'M. rectus abdominis', sort_order: 3 },
        { id: pointId('svaly-4', 4), lesson_id: lessonId('svaly', 4), term: 'Šikmé břišní svaly', definition: 'Rotace a úklony trupu', latin: 'Mm. obliqui', sort_order: 4 },
      ],
    },
    {
      id: lessonId('svaly', 5),
      topic_id: 'topic-svaly',
      slug: 'svaly-horni-koncetiny',
      title: 'Svaly horní končetiny',
      why: 'Biceps a triceps – základ pohybu paže.',
      human_explanation: 'Flexory ohýbají, extenzory natahují. Fungují jako protiklady.',
      tip: 'Rotátorová manžeta = 4 svaly stabilizující rameno.',
      practice: 'Biceps = supinace + flexe lokte.',
      sort_order: 5,
      xp_reward: 30,
      points: [
        { id: pointId('svaly-5', 1), lesson_id: lessonId('svaly', 5), term: 'Deltový sval', definition: 'Zvedá paži (abdukce)', latin: 'M. deltoideus', sort_order: 1 },
        { id: pointId('svaly-5', 2), lesson_id: lessonId('svaly', 5), term: 'Dvojhlavý sval pažní', definition: 'Ohýbá loket, supinuje', latin: 'M. biceps brachii', sort_order: 2 },
        { id: pointId('svaly-5', 3), lesson_id: lessonId('svaly', 5), term: 'Trojhlavý sval pažní', definition: 'Natahuje loket', latin: 'M. triceps brachii', sort_order: 3 },
        { id: pointId('svaly-5', 4), lesson_id: lessonId('svaly', 5), term: 'Rotátorová manžeta', definition: '4 svaly stabilizující rameno', tip: 'Supraspinatus, infraspinatus, teres minor, subscapularis', sort_order: 4 },
      ],
    },
    {
      id: lessonId('svaly', 6),
      topic_id: 'topic-svaly',
      slug: 'svaly-dolni-koncetiny',
      title: 'Svaly dolní končetiny',
      why: 'Nesou váhu těla a umožňují chůzi.',
      human_explanation: 'Hýžďové stabilizují pánev, stehenní pohyb kolena, lýtkové plantární flexi.',
      tip: 'Achillova šlacha spojuje lýtkové svaly s patou.',
      practice: 'Čtyřhlavý stehenní = nejsilnější sval v těle.',
      sort_order: 6,
      xp_reward: 30,
      points: [
        { id: pointId('svaly-6', 1), lesson_id: lessonId('svaly', 6), term: 'Velký hýžďový sval', definition: 'Extenze kyčle (vstávání)', latin: 'M. gluteus maximus', sort_order: 1 },
        { id: pointId('svaly-6', 2), lesson_id: lessonId('svaly', 6), term: 'Čtyřhlavý stehenní', definition: 'Natahuje koleno', latin: 'M. quadriceps femoris', sort_order: 2 },
        { id: pointId('svaly-6', 3), lesson_id: lessonId('svaly', 6), term: 'Zadní svaly stehna', definition: 'Ohýbají koleno (hamstringy)', latin: 'Mm. ischiocrurales', sort_order: 3 },
        { id: pointId('svaly-6', 4), lesson_id: lessonId('svaly', 6), term: 'Trojhlavý lýtkový', definition: 'Plantární flexe (stoj na špičkách)', latin: 'M. triceps surae', sort_order: 4 },
      ],
    },
  ],
};

// Helper functions
export const getLessonsByTopicId = (topicId: string): Lesson[] => {
  return LESSONS[topicId] || [];
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const lessons of Object.values(LESSONS)) {
    const found = lessons.find(l => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
};

export const getLessonBySlug = (topicId: string, slug: string): Lesson | undefined => {
  const lessons = LESSONS[topicId];
  if (!lessons) return undefined;
  return lessons.find(l => l.slug === slug);
};

export const getAllLessons = (): Lesson[] => {
  return Object.values(LESSONS).flat();
};

export const getTotalLessonsCount = (): number => {
  return getAllLessons().length;
};

export const getLessonsCountByTopic = (topicId: string): number => {
  return (LESSONS[topicId] || []).length;
};
