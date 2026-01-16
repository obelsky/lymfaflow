# LymfaFlow | Anatomy Explorer

> Soft Biotech Design pro výuku anatomie určenou masérům a beauty oborům.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Struktura projektu (Vibekodex)

```
/app
  /(app)           ← App routes (připraveno)
  /api             ← API routes (připraveno)
  /professors      ← Professor demo stránka
  /admin           ← 🆕 Admin Panel
    /page.tsx      ← Dashboard
    /professors    ← Professor CRUD
    /courses       ← Správa kurzů
    /lessons       ← Správa lekcí
    /questions     ← Správa otázek
    /knowledge     ← Knowledge Base
    /students      ← Uživatelé (placeholder)
    /analytics     ← Statistiky
    /settings      ← Nastavení
  /layout.tsx      ← Root layout
  /page.tsx        ← Hlavní stránka
  /globals.css     ← Globální styly

/components
  /Professor       ← Polymath Academy komponenty
    /ProfessorAvatar.tsx
    /ProfessorMessage.tsx
    /ProfessorCard.tsx
    /index.ts
  /Admin           ← 🆕 Admin UI komponenty
    /AdminLayout.tsx  ← Sidebar + Header
    /index.ts         ← StatCard, DataTable, Button, Input...
  /DaliIcons.tsx
  /KnowledgeBase.tsx

/hooks             ← Custom React hooks
  /useUser.ts
  /useQuiz.ts

/lib
  /data            ← Statická data
    /topics.ts
    /lessons.ts
    /questions.ts
    /knowledge.ts
    /professors.ts ← 5 AI profesorů
  /supabase        ← Supabase client (připraveno)

/types             ← TypeScript definice
  /index.ts
  /professor.ts    ← Professor typy

/public            ← Statické assety
```

## 🎨 Design System (BIOLO-AI)

### Barvy
| Název | Hex | Použití |
|-------|-----|---------|
| Pozadí | `#FAF8F5` | Warm ivory |
| Struktura | `#6B7B8A` | Šedomodrá |
| Accent | `#7A9E8E` | Zelenošedá (hlavní) |
| Signal | `#C9A962` | Champagne (akce) |

### Navigace
1. **Mapa těla** - Anatomické regiony
2. **Vzdělávání** - Knowledge Base
3. **Trénink** - Denní kvíz
4. **Profil** - Statistiky

## 📊 Data

| Typ | Počet | Umístění |
|-----|-------|----------|
| Témata | 8 | `/lib/data/topics.ts` |
| Lekce | ~17 | `/lib/data/lessons.ts` |
| Otázky | ~40 | `/lib/data/questions.ts` |
| Knowledge | ~25 | `/lib/data/knowledge.ts` |

## 🔄 Migrační plán

### FÁZE 1 ✅ (Dokončeno)
- [x] Struktura složek podle Vibekodex
- [x] Centralizované typy v `/types`
- [x] Data oddělena od komponent
- [x] Custom hooks

### FÁZE 1.5 ✅ Professor System (Dokončeno)
- [x] 5 AI profesorů s unikátními styly
- [x] Professor typy a data
- [x] Professor komponenty (Avatar, Message, Card, Grid)
- [x] Demo stránka `/professors`

### FÁZE 2 ✅ Admin UI (Dokončeno)
- [x] Admin Layout (sidebar, header)
- [x] Dashboard se statistikami
- [x] Professor List + Editor
- [x] Test Interface pro AI prompty
- [x] Placeholder stránky pro další sekce
- [x] Reusable Admin komponenty (StatCard, DataTable, Button, Input...)

### FÁZE 3 ✅ Content Management (Dokončeno)
- [x] Supabase SQL schéma (`/supabase/migrations/`)
- [x] Database typy (`/types/database.ts`)
- [x] Supabase client s CRUD helpers
- [x] Course Editor (drag & drop lekce)
- [x] Lesson Editor (block-based editor)
- [x] Quiz Question Editor (live preview)

### FÁZE 4 ✅ AI Integration (Dokončeno)
- [x] Claude API route (`/api/chat`)
- [x] Professor system prompts (`/lib/ai/config.ts`)
- [x] Chat komponenty (ChatWindow, ChatInput, ChatModal)
- [x] Handoff systém mezi profesory
- [x] AI Test Console v admin panelu
- [x] Mock režim pro development

### FÁZE 5 (Plánováno)
- [ ] Supabase Auth
- [ ] User progress tracking
- [ ] Personalizace

## 🎓 Polymath Academy - Professor System

| Profesor | Obor | Metoda | Barva |
|----------|------|--------|-------|
| 🎨 Da Vinci | Obecný, Anatomie | Visual | `#7A9E8E` |
| 🔬 Feynman | Fyzika | Storytelling | `#5B8AF7` |
| 🏛️ Sokrates | Právo, Filozofie | Socratic | `#9B7ED9` |
| 💻 Ada | Programování | Debugging | `#E85D75` |
| ⚗️ Marie | Chemie | Experimental | `#F5A623` |

## 🤖 AI Chat Systém

### Architektura

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   ChatUI    │────▶│  /api/chat   │────▶│ Claude API  │
│ (Component) │     │   (Route)    │     │  (Sonnet)   │
└─────────────┘     └──────────────┘     └─────────────┘
      │                    │
      │                    ▼
      │             ┌──────────────┐
      └────────────▶│ Handoff      │
                    │ Detection    │
                    └──────────────┘
```

### Použití

```tsx
import { ChatWindow, ChatModal } from '@/components/Chat';

// Samostatné okno
<ChatWindow
  initialProfessorId="davinci"
  lessonContext={{
    lessonId: 'zakladni-roviny',
    lessonTitle: 'Základní roviny',
  }}
/>

// Floating modal pro lekce
<ChatModal
  lessonId="zakladni-roviny"
  lessonTitle="Základní roviny"
  defaultProfessorId="davinci"
/>
```

### Handoff systém

Systém automaticky detekuje, kdy by jiný profesor mohl lépe odpovědět:

```tsx
// Uživatel se ptá na programování, ale mluví s Da Vincim
// → Systém navrhne přepnutí na Adu Lovelace

// Keywords → Professor mapping:
// programování, kód, python → Ada (programming)
// fyzika, síla, energie → Feynman (physics)
// chemie, reakce, molekula → Marie (chemistry)
// právo, etika, filozofie → Sokrates (philosophy)
```

### Environment Variables

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...  # Pro produkci
# Bez API klíče běží v mock režimu
```

### Použití

```tsx
import { 
  ProfessorMessage,
  ProfessorIntro,
  ProfessorCard,
} from '@/components/Professor';

<ProfessorMessage professorId="davinci" variant="tip">
  Představ si to jako mapu...
</ProfessorMessage>
```

## 🔧 Admin Panel

Admin rozhraní dostupné na `/admin`:

| Stránka | URL | Stav |
|---------|-----|------|
| Dashboard | `/admin` | ✅ Funkční |
| Profesoři | `/admin/professors` | ✅ List + Editor |
| Kurzy | `/admin/courses` | ⏳ Placeholder |
| Lekce | `/admin/lessons` | ⏳ Placeholder |
| Otázky | `/admin/questions` | ⏳ Placeholder |
| Knowledge | `/admin/knowledge` | ⏳ Placeholder |
| Studenti | `/admin/students` | ⏳ Vyžaduje Auth |
| Analytika | `/admin/analytics` | ⏳ Vyžaduje DB |
| Nastavení | `/admin/settings` | ⏳ Placeholder |

### Admin komponenty

```tsx
import { 
  AdminLayout,
  StatCard,
  DataTable,
  Card,
  Button,
  Input,
  Select,
  Badge,
} from '@/components/Admin';
```

## 🛠️ Technologie

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Jazyk:** TypeScript (strict)
- **Databáze:** Supabase (připraveno)
- **Deployment:** Vercel (plánováno)

## 🗄️ Supabase Setup

### 1. Vytvořit Supabase projekt
Jdi na [supabase.com](https://supabase.com) a vytvoř nový projekt.

### 2. Spustit migraci
```sql
-- Zkopíruj obsah /supabase/migrations/001_initial_schema.sql
-- do SQL editoru v Supabase Dashboard
```

### 3. Nastavit environment variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # pouze pro server-side
```

### 4. Migrovat data
```bash
# TODO: npx ts-node scripts/migrate-data.ts
```

### Tabulky

| Tabulka | Popis |
|---------|-------|
| `professors` | AI profesoři |
| `topics` | Kurzy/témata |
| `lessons` | Lekce s block-based obsahem |
| `lesson_points` | Klíčové termíny |
| `quiz_questions` | Quiz otázky |
| `knowledge_categories` | Kategorie KB |
| `knowledge_items` | Položky KB |
| `user_profiles` | Uživatelské profily |
| `user_lesson_progress` | Progress uživatelů |
| `quiz_results` | Výsledky kvízů |

## 📝 Konvence

- `'use client'` pouze kde nutné
- Server components jako default
- Komponenty max 300 řádků (TODO: refaktoring page.tsx)
- Žádné inline styles - pouze Tailwind
