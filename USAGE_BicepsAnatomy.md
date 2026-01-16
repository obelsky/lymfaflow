# Jak použít BicepsAnatomy komponent

## 1. Komponent je hotový v:
`/components/BicepsAnatomy.tsx`

## 2. Použití v lekci:

Otevři jakoukoliv lekci, např. `/app/lekce/[id]/page.tsx`

A přidej import + komponent:

```tsx
import BicepsAnatomy from '@/components/BicepsAnatomy';

// V HTML content lekce:
content: `
  <h2>Biceps brachii</h2>
  <p>Dvojhlavý sval pažní...</p>
  
  <!-- Tady vložíš komponent -->
  <div id="biceps-anatomy"></div>
  
  <p>Další text...</p>
`

// A pak v page.tsx:
<div dangerouslySetInnerHTML={{ __html: lesson.content }} />
<BicepsAnatomy />
```

## 3. NEBO jednodušeji - přidej do lesson content:

```typescript
// V lib/lessons.ts
content: `
  <h2>Biceps brachii - anatomie</h2>
  <p>Dvojhlavý sval pažní je hlavním flexorem loketního kloubu.</p>
  
  <!-- Tady bude interactive diagram -->
  <BicepsAnatomy />
  
  <h3>Funkce svalu</h3>
  <p>...</p>
`
```

## Funkce komponenty:

✅ **Interaktivní** - kliknutelné části  
✅ **Hover efekty** - animace při přejetí myší  
✅ **Responzivní** - škáluje se  
✅ **Info panel** - zobrazí detail části  
✅ **Legenda** - vysvětluje barvy  
✅ **Animace** - plynulé přechody  

## Co umí:

- **Kliknutí** na část → zobrazí detail
- **Hover** nad částí → zvětší a zvýrazní
- **Popisky** - všechny části popsané česky + latinsky
- **Vektorové** - nerozmazaná grafika
- **Mobile** - funguje na telefonu

## Můžeš vytvořit další podobné:

- Kostra celého těla
- Páteř s obratli
- Svalová soustava
- Kosti ruky
- atd.

Stačí zkopírovat tento pattern!
