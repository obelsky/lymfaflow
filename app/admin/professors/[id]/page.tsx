'use client';

// ============================================
// POLYMATH ACADEMY - Professor Editor
// Editace profesora + Test interface
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  AdminLayout, 
  Card, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Badge,
  AdminIcons 
} from '@/components/Admin';
import { getProfessorById, PROFESSORS } from '@/lib/data/professors';
import { ProfessorAvatar, ProfessorMessage } from '@/components/Professor';
import type { Professor, TeachingMethod, Field } from '@/types/professor';

// Možnosti pro selecty
const teachingMethods: { value: TeachingMethod; label: string }[] = [
  { value: 'visual', label: 'Vizuální - kreslí, diagramy' },
  { value: 'storytelling', label: 'Storytelling - příběhy, analogie' },
  { value: 'socratic', label: 'Sokratovská - otázky vedou k odpovědím' },
  { value: 'debugging', label: 'Debugging - krok za krokem' },
  { value: 'experimental', label: 'Experimenty - hands-on' },
];

const fields: { value: Field; label: string }[] = [
  { value: 'general', label: 'Obecný' },
  { value: 'anatomy', label: 'Anatomie' },
  { value: 'physics', label: 'Fyzika' },
  { value: 'chemistry', label: 'Chemie' },
  { value: 'biology', label: 'Biologie' },
  { value: 'programming', label: 'Programování' },
  { value: 'logic', label: 'Logika' },
  { value: 'law', label: 'Právo' },
  { value: 'philosophy', label: 'Filozofie' },
  { value: 'ethics', label: 'Etika' },
];

// Test prompty
const testPrompts = [
  'Vysvětli gravitaci',
  'Co je DNA?',
  'Proč je nebe modré?',
  'Jak funguje for cyklus?',
  'Co je spravedlnost?',
  'Vysvětli anatomické roviny',
];

export default function ProfessorEditor() {
  const params = useParams();
  const router = useRouter();
  const professorId = params.id as string;
  
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'personality' | 'ai' | 'test'>('general');
  const [testPrompt, setTestPrompt] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Načíst profesora
  useEffect(() => {
    if (professorId === 'new') {
      // Nový profesor
      setProfessor({
        id: '',
        name: '',
        shortName: '',
        title: '',
        era: '',
        avatar: 'davinci',
        accentColor: '#7A9E8E',
        gradientFrom: '#7A9E8E',
        gradientTo: '#5B7A6A',
        primaryField: 'general',
        secondaryFields: [],
        personality: {
          formality: 3,
          complexity: 3,
          humor: false,
          useAnalogies: true,
          useEtymology: false,
          useStories: true,
          askQuestions: false,
          useVisuals: true,
          useExperiments: false,
        },
        teachingMethod: 'visual',
        tagline: '',
        quote: '',
        systemPrompt: '',
        signaturePhrases: [],
        introMessage: '',
      });
    } else {
      const prof = getProfessorById(professorId);
      if (prof) {
        setProfessor(prof);
      } else {
        router.push('/admin/professors');
      }
    }
  }, [professorId, router]);
  
  if (!professor) {
    return (
      <AdminLayout title="Načítání...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[#7A9E8E] border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }
  
  // Simulace AI odpovědi (v produkci by se volalo Claude API)
  const generateTestResponse = () => {
    if (!testPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulace - v produkci by se použilo Claude API
    setTimeout(() => {
      const responses: Record<string, string> = {
        davinci: `${professor.signaturePhrases[0] || 'Pojď, nakreslím ti to...'}\n\n${testPrompt}? Výborná otázka! Nech mě ti to vysvětlit pomocí obrázku.\n\nPředstav si to takto: [zde by byla vizuální analogie].\n\nZajímavé je, že slovo "${testPrompt.split(' ')[1] || 'toto'}" pochází z latiny a původně znamenalo...`,
        feynman: `Hele, ${testPrompt.toLowerCase()}? To je super otázka!\n\nVíš co, zkus si to představit takhle: [jednoduchá analogie z běžného života].\n\nA teď ta cool část - ${professor.signaturePhrases[1] || 'to mi připomíná historku...'}\n\nNení to úžasný?`,
        socrates: `${testPrompt}? Zajímavá otázka. Ale řekni mi nejdřív - proč se na to ptáš?\n\nA co kdyby to bylo jinak? Jak bys to vysvětlil, kdybys musel...\n\nVýborně se ptáš. Ale zamysli se - co z toho vyplývá?`,
        ada: `${professor.signaturePhrases[0] || 'Pojďme to rozložit na kroky...'}\n\nKrok 1: Nejdřív si ujasníme, co přesně chceme.\nKrok 2: Pak identifikujeme vstupy a výstupy.\nKrok 3: A nakonec popíšeme transformaci.\n\nElegantní řešení je jednoduché řešení.`,
        marie: `${testPrompt}? Pojďme to vyzkoušet!\n\nExperiment: [popis jednoduchého pokusu]\n\nCo pozoruješ? Proč myslíš, že se to stalo?\n\nNeúspěch je taky výsledek - co nám říká?`,
      };
      
      setTestResponse(responses[professor.id] || responses.davinci);
      setIsGenerating(false);
    }, 1500);
  };
  
  // Tabs
  const tabs = [
    { id: 'general', label: 'Obecné', icon: AdminIcons.Professors },
    { id: 'personality', label: 'Osobnost', icon: AdminIcons.Settings },
    { id: 'ai', label: 'AI Prompt', icon: AdminIcons.Questions },
    { id: 'test', label: 'Test', icon: AdminIcons.Analytics },
  ];
  
  return (
    <AdminLayout
      title={professorId === 'new' ? 'Nový profesor' : professor.name}
      subtitle={professorId === 'new' ? 'Vytvořit nového AI profesora' : `Upravit profesora`}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/admin/professors')}>
            Zrušit
          </Button>
          <Button onClick={() => alert('V produkci by se uložilo do Supabase')}>
            Uložit změny
          </Button>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left: Preview */}
        <div className="lg:col-span-1">
          <Card title="Náhled" className="sticky top-20">
            {/* Avatar preview */}
            <div className="flex flex-col items-center mb-6">
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${professor.accentColor}15` }}
              >
                <ProfessorAvatar 
                  professorId={professor.id || 'davinci'}
                  className="w-20 h-20"
                  color={professor.accentColor}
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{professor.name || 'Jméno profesora'}</h3>
              <p className="text-sm text-gray-500">{professor.era || 'Období'}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{professor.primaryField}</Badge>
                <span 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: professor.accentColor }}
                >
                  {teachingMethods.find(m => m.value === professor.teachingMethod)?.label.split(' - ')[0]}
                </span>
              </div>
            </div>
            
            {/* Quote */}
            {professor.quote && (
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-sm italic text-gray-600">"{professor.quote}"</p>
              </div>
            )}
            
            {/* Tagline */}
            {professor.tagline && (
              <p 
                className="text-sm font-medium text-center"
                style={{ color: professor.accentColor }}
              >
                {professor.tagline}
              </p>
            )}
            
            {/* Color preview */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-gray-500 mb-2">Barevné schéma</p>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: professor.accentColor }}
                  title="Accent"
                />
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: professor.gradientFrom }}
                  title="Gradient From"
                />
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: professor.gradientTo }}
                  title="Gradient To"
                />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Right: Editor */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  whitespace-nowrap transition-colors
                  ${activeTab === tab.id
                    ? 'bg-[#7A9E8E] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab: General */}
          {activeTab === 'general' && (
            <Card title="Základní informace">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Celé jméno"
                    value={professor.name}
                    onChange={(e) => setProfessor({ ...professor, name: e.target.value })}
                    placeholder="Leonardo da Vinci"
                  />
                  <Input
                    label="Krátké jméno"
                    value={professor.shortName}
                    onChange={(e) => setProfessor({ ...professor, shortName: e.target.value })}
                    placeholder="Da Vinci"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Titul"
                    value={professor.title}
                    onChange={(e) => setProfessor({ ...professor, title: e.target.value })}
                    placeholder="Maestro, Dr., Prof."
                  />
                  <Input
                    label="Období"
                    value={professor.era}
                    onChange={(e) => setProfessor({ ...professor, era: e.target.value })}
                    placeholder="1452–1519"
                  />
                </div>
                
                <Select
                  label="Primární obor"
                  value={professor.primaryField}
                  onChange={(e) => setProfessor({ ...professor, primaryField: e.target.value as Field })}
                  options={fields}
                />
                
                <Select
                  label="Metoda výuky"
                  value={professor.teachingMethod}
                  onChange={(e) => setProfessor({ ...professor, teachingMethod: e.target.value as TeachingMethod })}
                  options={teachingMethods}
                />
                
                <Input
                  label="Tagline"
                  value={professor.tagline}
                  onChange={(e) => setProfessor({ ...professor, tagline: e.target.value })}
                  placeholder="Krátký popis filozofie..."
                  hint="Krátká věta charakterizující profesora"
                />
                
                <Input
                  label="Slavný citát"
                  value={professor.quote}
                  onChange={(e) => setProfessor({ ...professor, quote: e.target.value })}
                  placeholder="Učení nikdy nevyčerpá mysl."
                />
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    label="Barva (accent)"
                    type="color"
                    value={professor.accentColor}
                    onChange={(e) => setProfessor({ ...professor, accentColor: e.target.value })}
                  />
                  <Input
                    label="Gradient od"
                    type="color"
                    value={professor.gradientFrom}
                    onChange={(e) => setProfessor({ ...professor, gradientFrom: e.target.value })}
                  />
                  <Input
                    label="Gradient do"
                    type="color"
                    value={professor.gradientTo}
                    onChange={(e) => setProfessor({ ...professor, gradientTo: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          )}
          
          {/* Tab: Personality */}
          {activeTab === 'personality' && (
            <Card title="Osobnost">
              <div className="space-y-6">
                {/* Sliders */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Formalita: {professor.personality.formality}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={professor.personality.formality}
                    onChange={(e) => setProfessor({
                      ...professor,
                      personality: { ...professor.personality, formality: parseInt(e.target.value) as any }
                    })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Neformální</span>
                    <span>Formální</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komplexita: {professor.personality.complexity}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={professor.personality.complexity}
                    onChange={(e) => setProfessor({
                      ...professor,
                      personality: { ...professor.personality, complexity: parseInt(e.target.value) as any }
                    })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Jednoduché</span>
                    <span>Expertní</span>
                  </div>
                </div>
                
                {/* Checkboxes */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: 'humor', label: 'Používá humor' },
                    { key: 'useAnalogies', label: 'Používá analogie' },
                    { key: 'useEtymology', label: 'Vysvětluje etymologii' },
                    { key: 'useStories', label: 'Vypráví příběhy' },
                    { key: 'askQuestions', label: 'Ptá se (sokratovská)' },
                    { key: 'useVisuals', label: 'Používá vizuály' },
                    { key: 'useExperiments', label: 'Navrhuje experimenty' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(professor.personality as any)[item.key]}
                        onChange={(e) => setProfessor({
                          ...professor,
                          personality: { ...professor.personality, [item.key]: e.target.checked }
                        })}
                        className="w-4 h-4 rounded border-gray-300 text-[#7A9E8E] focus:ring-[#7A9E8E]"
                      />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
                
                {/* Signature phrases */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typické fráze
                  </label>
                  <div className="space-y-2">
                    {professor.signaturePhrases.map((phrase, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={phrase}
                          onChange={(e) => {
                            const newPhrases = [...professor.signaturePhrases];
                            newPhrases[idx] = e.target.value;
                            setProfessor({ ...professor, signaturePhrases: newPhrases });
                          }}
                          placeholder="Typická fráze..."
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newPhrases = professor.signaturePhrases.filter((_, i) => i !== idx);
                            setProfessor({ ...professor, signaturePhrases: newPhrases });
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setProfessor({
                        ...professor,
                        signaturePhrases: [...professor.signaturePhrases, '']
                      })}
                    >
                      + Přidat frázi
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Tab: AI */}
          {activeTab === 'ai' && (
            <Card title="AI System Prompt">
              <div className="space-y-4">
                <Textarea
                  label="System Prompt"
                  value={professor.systemPrompt}
                  onChange={(e) => setProfessor({ ...professor, systemPrompt: e.target.value })}
                  rows={15}
                  hint="Instrukce pro AI model. Definuje osobnost, styl a pravidla profesora."
                  className="font-mono text-sm"
                />
                
                <Textarea
                  label="Intro zpráva"
                  value={professor.introMessage}
                  onChange={(e) => setProfessor({ ...professor, introMessage: e.target.value })}
                  rows={6}
                  hint="Zpráva, kterou profesor řekne při prvním setkání se studentem."
                />
              </div>
            </Card>
          )}
          
          {/* Tab: Test */}
          {activeTab === 'test' && (
            <div className="space-y-6">
              <Card title="Test AI profesora">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rychlé prompty
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {testPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => setTestPrompt(prompt)}
                          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={testPrompt}
                      onChange={(e) => setTestPrompt(e.target.value)}
                      placeholder="Zadej otázku pro profesora..."
                      className="flex-1"
                    />
                    <Button
                      onClick={generateTestResponse}
                      disabled={!testPrompt.trim() || isGenerating}
                    >
                      {isGenerating ? 'Generuji...' : 'Testovat'}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    ⚠️ Toto je simulace. V produkci by se použilo Claude API s reálným system promptem.
                  </p>
                </div>
              </Card>
              
              {/* Response */}
              {testResponse && (
                <ProfessorMessage
                  professorId={professor.id || 'davinci'}
                  variant="default"
                >
                  {testResponse}
                </ProfessorMessage>
              )}
              
              {/* System prompt preview */}
              <Card title="Aktuální System Prompt" subtitle="Bude použit při generování odpovědi">
                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-lg max-h-64 overflow-auto">
                  {professor.systemPrompt || 'System prompt není definován'}
                </pre>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
