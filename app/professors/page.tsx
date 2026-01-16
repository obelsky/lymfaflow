'use client';

// ============================================
// POLYMATH ACADEMY - Professors Demo Page
// Ukázka všech profesorů a jejich komponent
// ============================================

import React, { useState } from 'react';
import { PROFESSORS } from '@/lib/data/professors';
import { 
  ProfessorAvatar,
  ProfessorMessage, 
  ProfessorIntro, 
  ProfessorQuote,
  ProfessorCard,
  ProfessorGrid,
} from '@/components/Professor';
import type { Professor } from '@/types/professor';

export default function ProfessorsPage() {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor>(PROFESSORS[0]);
  const [showIntro, setShowIntro] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-[#2D3640] text-white py-6 px-5">
        <h1 className="text-2xl font-bold mb-1">🎓 Polymath Academy</h1>
        <p className="text-white/60 text-sm">Professor System Demo</p>
      </header>
      
      <main className="max-w-4xl mx-auto px-5 py-8 space-y-12">
        
        {/* SEKCE 1: Výběr profesora */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            1. Vyber si profesora
          </h2>
          <p className="text-gray-600 mb-6">
            Klikni na kartu pro výběr. Každý profesor má jiný styl výuky.
          </p>
          
          <ProfessorGrid
            professors={PROFESSORS}
            selectedId={selectedProfessor.id}
            onSelect={setSelectedProfessor}
            variant="selectable"
            columns={2}
          />
        </section>
        
        {/* SEKCE 2: Vybraný profesor - detail */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            2. Detail profesora: {selectedProfessor.shortName}
          </h2>
          
          <ProfessorCard 
            professor={selectedProfessor} 
            variant="default"
          />
        </section>
        
        {/* SEKCE 3: Professor Intro */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            3. Intro zpráva
          </h2>
          <p className="text-gray-600 mb-6">
            Takto se profesor představí studentovi na začátku kurzu.
          </p>
          
          <ProfessorIntro 
            professorId={selectedProfessor.id}
            onStart={() => setShowIntro(true)}
          />
          
          {showIntro && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              ✅ Student začal kurz s {selectedProfessor.shortName}!
            </div>
          )}
        </section>
        
        {/* SEKCE 4: Message varianty */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            4. Typy zpráv
          </h2>
          <p className="text-gray-600 mb-6">
            Různé varianty zpráv pro různé situace.
          </p>
          
          <div className="space-y-4">
            {/* Default */}
            <ProfessorMessage 
              professorId={selectedProfessor.id}
              variant="default"
            >
              {selectedProfessor.signaturePhrases[0]} Tohle je základní zpráva od profesora během lekce.
            </ProfessorMessage>
            
            {/* Tip */}
            <ProfessorMessage 
              professorId={selectedProfessor.id}
              variant="tip"
            >
              💡 <strong>Tip:</strong> Když si něco nedokážeš zapamatovat, zkus si to nakreslit. Vizuální paměť je silnější než textová.
            </ProfessorMessage>
            
            {/* Question (pro Sokrata) */}
            <ProfessorMessage 
              professorId="socrates"
              variant="question"
            >
              Zajímavá myšlenka. Ale řekni mi - pokud je to pravda, co by to znamenalo pro...?
            </ProfessorMessage>
            
            {/* Handoff */}
            <ProfessorMessage 
              professorId={selectedProfessor.id}
              variant="handoff"
            >
              Teď bych tě rád předal své kolegyni Marii. Ona ti lépe vysvětlí chemickou stránku věci...
            </ProfessorMessage>
            
            {/* S tlačítkem */}
            <ProfessorMessage 
              professorId={selectedProfessor.id}
              variant="default"
              onContinue={() => alert('Pokračujeme!')}
            >
              Výborně! Pochopil jsi základy. Jsi připraven pokračovat na další kapitolu?
            </ProfessorMessage>
          </div>
        </section>
        
        {/* SEKCE 5: Inline quote */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            5. Inline citace
          </h2>
          <p className="text-gray-600 mb-6">
            Kompaktní verze pro použití uvnitř textu lekce.
          </p>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#2D3640] mb-3">Anatomické roviny</h3>
            <p className="text-gray-700 mb-4">
              Anatomické roviny jsou imaginární plochy, které procházejí tělem a pomáhají nám přesně popsat polohu struktur.
            </p>
            
            <ProfessorQuote professorId="davinci">
              Představ si, že krájíš chleba. Můžeš krájet shora dolů, zleva doprava, nebo napříč. Každý řez ti ukáže jiný pohled.
            </ProfessorQuote>
            
            <p className="text-gray-700 mt-4">
              Existují tři základní roviny: sagitální, frontální a transverzální.
            </p>
            
            <ProfessorQuote professorId="feynman">
              Hele, je to jako když máš 3D model v počítači a točíš s ním. Každá rovina je jiný úhel pohledu!
            </ProfessorQuote>
          </div>
        </section>
        
        {/* SEKCE 6: Avatary */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            6. Avatary
          </h2>
          <p className="text-gray-600 mb-6">
            SVG avatary všech profesorů v různých velikostech.
          </p>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex flex-wrap gap-6 justify-center">
              {PROFESSORS.map(prof => (
                <div key={prof.id} className="text-center">
                  <div 
                    className="w-20 h-20 rounded-xl mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${prof.accentColor}15` }}
                  >
                    <ProfessorAvatar 
                      professorId={prof.id}
                      className="w-16 h-16"
                      color={prof.accentColor}
                    />
                  </div>
                  <p className="text-sm font-medium text-[#2D3640]">{prof.shortName}</p>
                  <p className="text-xs text-gray-500">{prof.teachingMethod}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* SEKCE 7: System Prompts */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            7. System Prompt (pro AI)
          </h2>
          <p className="text-gray-600 mb-6">
            Každý profesor má definovaný system prompt pro AI chat.
          </p>
          
          <div className="bg-gray-900 rounded-xl p-5 overflow-auto">
            <pre className="text-green-400 text-xs whitespace-pre-wrap font-mono">
              {selectedProfessor.systemPrompt}
            </pre>
          </div>
        </section>
        
        {/* SEKCE 8: Compact list */}
        <section>
          <h2 className="text-xl font-bold text-[#2D3640] mb-4">
            8. Kompaktní seznam
          </h2>
          
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
            {PROFESSORS.map(prof => (
              <ProfessorCard
                key={prof.id}
                professor={prof}
                variant="compact"
                selected={prof.id === selectedProfessor.id}
                onClick={() => setSelectedProfessor(prof)}
              />
            ))}
          </div>
        </section>
        
      </main>
      
      {/* Footer */}
      <footer className="bg-[#2D3640] text-white/60 text-center py-6 text-sm">
        Polymath Academy • FÁZE 1 Complete ✅
      </footer>
    </div>
  );
}
