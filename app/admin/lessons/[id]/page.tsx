'use client';

// ============================================
// POLYMATH ACADEMY - Lesson Editor
// Block-based editor pro obsah lekcí
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  AdminLayout, 
  Card, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Badge,
} from '@/components/Admin';
import { TOPICS } from '@/lib/data/topics';
import { getLessonById, LESSONS } from '@/lib/data/lessons';
import { PROFESSORS } from '@/lib/data/professors';
import { ProfessorMessage } from '@/components/Professor';

// Block types
type BlockType = 'text' | 'heading' | 'term' | 'professor' | 'tip' | 'practice' | 'image';

interface ContentBlock {
  id: string;
  type: BlockType;
  data: Record<string, any>;
}

// Block icons
const blockIcons: Record<BlockType, string> = {
  text: '📝',
  heading: '📌',
  term: '📖',
  professor: '🎓',
  tip: '💡',
  practice: '🎯',
  image: '🖼️',
};

// Block labels
const blockLabels: Record<BlockType, string> = {
  text: 'Text',
  heading: 'Nadpis',
  term: 'Termín',
  professor: 'Profesor',
  tip: 'Tip',
  practice: 'Cvičení',
  image: 'Obrázek',
};

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function LessonEditor() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = params.id as string;
  const topicIdFromQuery = searchParams.get('topic');
  
  // State
  const [lesson, setLesson] = useState<{
    id: string;
    topic_id: string;
    slug: string;
    title: string;
    why: string;
    human_explanation: string;
    tip: string;
    practice: string;
    xp_reward: number;
    estimated_minutes: number;
    is_published: boolean;
  } | null>(null);
  
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [terms, setTerms] = useState<Array<{
    id: string;
    term: string;
    definition: string;
    latin: string;
    tip: string;
  }>>([]);
  
  const [activeTab, setActiveTab] = useState<'content' | 'terms' | 'settings'>('content');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // Načíst data
  useEffect(() => {
    if (lessonId === 'new') {
      setLesson({
        id: '',
        topic_id: topicIdFromQuery || '',
        slug: '',
        title: '',
        why: '',
        human_explanation: '',
        tip: '',
        practice: '',
        xp_reward: 20,
        estimated_minutes: 5,
        is_published: false,
      });
      setBlocks([]);
      setTerms([]);
    } else {
      // Najít lekci v datech
      let foundLesson = null;
      let foundTopicId = '';
      
      for (const [topicId, topicLessons] of Object.entries(LESSONS)) {
        const found = topicLessons.find(l => l.id === lessonId);
        if (found) {
          foundLesson = found;
          foundTopicId = topicId;
          break;
        }
      }
      
      if (foundLesson) {
        setLesson({
          id: foundLesson.id,
          topic_id: foundTopicId,
          slug: foundLesson.id,
          title: foundLesson.title,
          why: foundLesson.why,
          human_explanation: foundLesson.human_explanation,
          tip: foundLesson.tip || '',
          practice: foundLesson.practice || '',
          xp_reward: foundLesson.xp_reward,
          estimated_minutes: 5,
          is_published: true,
        });
        
        // Convert existing content to blocks
        const initialBlocks: ContentBlock[] = [];
        
        if (foundLesson.why) {
          initialBlocks.push({
            id: generateId(),
            type: 'heading',
            data: { text: 'Proč se to učit?' },
          });
          initialBlocks.push({
            id: generateId(),
            type: 'text',
            data: { text: foundLesson.why },
          });
        }
        
        if (foundLesson.human_explanation) {
          initialBlocks.push({
            id: generateId(),
            type: 'professor',
            data: { 
              professorId: 'davinci',
              text: foundLesson.human_explanation,
            },
          });
        }
        
        if (foundLesson.tip) {
          initialBlocks.push({
            id: generateId(),
            type: 'tip',
            data: { text: foundLesson.tip },
          });
        }
        
        setBlocks(initialBlocks);
        
        // Convert points to terms
        if (foundLesson.points) {
          setTerms(foundLesson.points.map(p => ({
            id: generateId(),
            term: p.term,
            definition: p.definition,
            latin: p.latin || '',
            tip: p.tip || '',
          })));
        }
      } else {
        router.push('/admin/lessons');
      }
    }
  }, [lessonId, topicIdFromQuery, router]);
  
  // Block handlers
  const addBlock = (type: BlockType) => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      data: getDefaultBlockData(type),
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };
  
  const getDefaultBlockData = (type: BlockType): Record<string, any> => {
    switch (type) {
      case 'text': return { text: '' };
      case 'heading': return { text: '', level: 2 };
      case 'term': return { term: '', definition: '', latin: '' };
      case 'professor': return { professorId: 'davinci', text: '', variant: 'default' };
      case 'tip': return { text: '' };
      case 'practice': return { text: '' };
      case 'image': return { url: '', alt: '', caption: '' };
      default: return {};
    }
  };
  
  const updateBlock = (id: string, data: Record<string, any>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, ...data } } : b));
  };
  
  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };
  
  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };
  
  // Term handlers
  const addTerm = () => {
    setTerms([...terms, {
      id: generateId(),
      term: '',
      definition: '',
      latin: '',
      tip: '',
    }]);
  };
  
  const updateTerm = (id: string, field: string, value: string) => {
    setTerms(terms.map(t => t.id === id ? { ...t, [field]: value } : t));
  };
  
  const deleteTerm = (id: string) => {
    setTerms(terms.filter(t => t.id !== id));
  };
  
  if (!lesson) {
    return (
      <AdminLayout title="Načítání...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[#7A9E8E] border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }
  
  const selectedTopic = TOPICS.find(t => t.id === lesson.topic_id);
  
  return (
    <AdminLayout
      title={lessonId === 'new' ? 'Nová lekce' : `Upravit: ${lesson.title}`}
      subtitle={selectedTopic ? `Kurz: ${selectedTopic.title}` : 'Nová lekce'}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/admin/lessons')}>
            Zrušit
          </Button>
          <Button variant="secondary" onClick={() => alert('Náhled v novém okně')}>
            Náhled
          </Button>
          <Button onClick={() => alert('V produkci by se uložilo do Supabase')}>
            Uložit
          </Button>
        </div>
      }
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['content', 'terms', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === tab
                ? 'bg-[#7A9E8E] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            {tab === 'content' && `Obsah (${blocks.length})`}
            {tab === 'terms' && `Termíny (${terms.length})`}
            {tab === 'settings' && 'Nastavení'}
          </button>
        ))}
      </div>
      
      {/* Tab: Content - Block Editor */}
      {activeTab === 'content' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Block list */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic info */}
            <Card title="Základní informace">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Název lekce"
                    value={lesson.title}
                    onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                    placeholder="Základní roviny"
                  />
                  <Select
                    label="Kurz"
                    value={lesson.topic_id}
                    onChange={(e) => setLesson({ ...lesson, topic_id: e.target.value })}
                    options={[
                      { value: '', label: '-- Vyberte kurz --' },
                      ...TOPICS.map(t => ({ value: t.id, label: t.title })),
                    ]}
                  />
                </div>
                
                <Textarea
                  label="Proč se to učit?"
                  value={lesson.why}
                  onChange={(e) => setLesson({ ...lesson, why: e.target.value })}
                  rows={2}
                  placeholder="Motivace pro studenta..."
                />
              </div>
            </Card>
            
            {/* Blocks */}
            <Card 
              title="Bloky obsahu" 
              subtitle="Klikněte pro editaci, přetáhněte pro změnu pořadí"
            >
              {blocks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">Zatím žádné bloky</p>
                  <p className="text-sm">Přidejte bloky pomocí panelu vpravo</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`
                        p-4 rounded-lg border cursor-pointer transition-all
                        ${selectedBlockId === block.id 
                          ? 'border-[#7A9E8E] ring-2 ring-[#7A9E8E]/20' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      {/* Block header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{blockIcons[block.type]}</span>
                          <span className="text-sm font-medium text-gray-600">
                            {blockLabels[block.type]}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }}
                            disabled={index === blocks.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            ↓
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                            className="p-1 text-red-400 hover:text-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      
                      {/* Block preview */}
                      <div className="text-sm text-gray-700">
                        {block.type === 'text' && (
                          <p className="line-clamp-2">{block.data.text || 'Prázdný text...'}</p>
                        )}
                        {block.type === 'heading' && (
                          <p className="font-bold">{block.data.text || 'Nadpis...'}</p>
                        )}
                        {block.type === 'professor' && (
                          <div className="flex items-center gap-2">
                            <Badge variant="info">{block.data.professorId}</Badge>
                            <span className="truncate">{block.data.text || 'Zpráva profesora...'}</span>
                          </div>
                        )}
                        {block.type === 'tip' && (
                          <p className="text-amber-700">💡 {block.data.text || 'Tip...'}</p>
                        )}
                        {block.type === 'practice' && (
                          <p className="text-green-700">🎯 {block.data.text || 'Cvičení...'}</p>
                        )}
                        {block.type === 'term' && (
                          <p><strong>{block.data.term || 'Termín'}</strong>: {block.data.definition || 'Definice...'}</p>
                        )}
                        {block.type === 'image' && (
                          <p className="text-gray-500">🖼️ {block.data.alt || 'Obrázek'}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
          
          {/* Sidebar: Add blocks & Edit selected */}
          <div className="lg:col-span-1 space-y-4">
            {/* Add block */}
            <Card title="Přidat blok">
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(blockLabels) as BlockType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl">{blockIcons[type]}</span>
                    <span className="text-xs text-gray-600">{blockLabels[type]}</span>
                  </button>
                ))}
              </div>
            </Card>
            
            {/* Edit selected block */}
            {selectedBlockId && (
              <Card title="Upravit blok">
                {(() => {
                  const block = blocks.find(b => b.id === selectedBlockId);
                  if (!block) return null;
                  
                  return (
                    <div className="space-y-3">
                      {(block.type === 'text' || block.type === 'tip' || block.type === 'practice') && (
                        <Textarea
                          label="Text"
                          value={block.data.text}
                          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                          rows={4}
                        />
                      )}
                      
                      {block.type === 'heading' && (
                        <>
                          <Input
                            label="Text nadpisu"
                            value={block.data.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                          />
                          <Select
                            label="Úroveň"
                            value={String(block.data.level || 2)}
                            onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) })}
                            options={[
                              { value: '2', label: 'H2 - Hlavní' },
                              { value: '3', label: 'H3 - Podnadpis' },
                              { value: '4', label: 'H4 - Menší' },
                            ]}
                          />
                        </>
                      )}
                      
                      {block.type === 'professor' && (
                        <>
                          <Select
                            label="Profesor"
                            value={block.data.professorId}
                            onChange={(e) => updateBlock(block.id, { professorId: e.target.value })}
                            options={PROFESSORS.map(p => ({
                              value: p.id,
                              label: p.name,
                            }))}
                          />
                          <Textarea
                            label="Zpráva"
                            value={block.data.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            rows={4}
                          />
                          <Select
                            label="Varianta"
                            value={block.data.variant || 'default'}
                            onChange={(e) => updateBlock(block.id, { variant: e.target.value })}
                            options={[
                              { value: 'default', label: 'Výchozí' },
                              { value: 'tip', label: 'Tip' },
                              { value: 'question', label: 'Otázka' },
                            ]}
                          />
                        </>
                      )}
                      
                      {block.type === 'term' && (
                        <>
                          <Input
                            label="Termín"
                            value={block.data.term}
                            onChange={(e) => updateBlock(block.id, { term: e.target.value })}
                          />
                          <Input
                            label="Latinsky"
                            value={block.data.latin || ''}
                            onChange={(e) => updateBlock(block.id, { latin: e.target.value })}
                          />
                          <Textarea
                            label="Definice"
                            value={block.data.definition}
                            onChange={(e) => updateBlock(block.id, { definition: e.target.value })}
                            rows={3}
                          />
                        </>
                      )}
                      
                      {block.type === 'image' && (
                        <>
                          <Input
                            label="URL obrázku"
                            value={block.data.url}
                            onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                            placeholder="https://..."
                          />
                          <Input
                            label="Alt text"
                            value={block.data.alt}
                            onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                          />
                          <Input
                            label="Popisek"
                            value={block.data.caption || ''}
                            onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                          />
                        </>
                      )}
                    </div>
                  );
                })()}
              </Card>
            )}
            
            {/* Preview */}
            {selectedBlockId && (
              <Card title="Náhled">
                {(() => {
                  const block = blocks.find(b => b.id === selectedBlockId);
                  if (!block) return null;
                  
                  if (block.type === 'professor' && block.data.text) {
                    return (
                      <ProfessorMessage
                        professorId={block.data.professorId}
                        variant={block.data.variant || 'default'}
                      >
                        {block.data.text}
                      </ProfessorMessage>
                    );
                  }
                  
                  return (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      {block.data.text || block.data.term || 'Prázdný blok'}
                    </div>
                  );
                })()}
              </Card>
            )}
          </div>
        </div>
      )}
      
      {/* Tab: Terms */}
      {activeTab === 'terms' && (
        <Card 
          title="Klíčové termíny" 
          subtitle="Termíny zobrazené na konci lekce"
          actions={
            <Button size="sm" onClick={addTerm}>+ Přidat termín</Button>
          }
        >
          {terms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">Zatím žádné termíny</p>
              <Button onClick={addTerm}>Přidat první termín</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {terms.map((term, index) => (
                <div key={term.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <button
                      onClick={() => deleteTerm(term.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      label="Termín"
                      value={term.term}
                      onChange={(e) => updateTerm(term.id, 'term', e.target.value)}
                      placeholder="Sagitální rovina"
                    />
                    <Input
                      label="Latinsky"
                      value={term.latin}
                      onChange={(e) => updateTerm(term.id, 'latin', e.target.value)}
                      placeholder="Planum sagittale"
                    />
                  </div>
                  <div className="mt-3">
                    <Textarea
                      label="Definice"
                      value={term.definition}
                      onChange={(e) => updateTerm(term.id, 'definition', e.target.value)}
                      rows={2}
                      placeholder="Rovina procházející tělem zepředu dozadu..."
                    />
                  </div>
                  <div className="mt-3">
                    <Input
                      label="Tip (volitelné)"
                      value={term.tip}
                      onChange={(e) => updateTerm(term.id, 'tip', e.target.value)}
                      placeholder="Pamatuj si: sagitální = jako šíp..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
      
      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <Card title="Nastavení lekce">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="XP odměna"
                type="number"
                value={lesson.xp_reward}
                onChange={(e) => setLesson({ ...lesson, xp_reward: parseInt(e.target.value) || 0 })}
              />
              <Input
                label="Odhadovaný čas (min)"
                type="number"
                value={lesson.estimated_minutes}
                onChange={(e) => setLesson({ ...lesson, estimated_minutes: parseInt(e.target.value) || 0 })}
              />
            </div>
            
            <Textarea
              label="Praktické cvičení"
              value={lesson.practice}
              onChange={(e) => setLesson({ ...lesson, practice: e.target.value })}
              rows={3}
              placeholder="Úkol pro studenta..."
            />
            
            <Textarea
              label="Tip na závěr"
              value={lesson.tip}
              onChange={(e) => setLesson({ ...lesson, tip: e.target.value })}
              rows={2}
              placeholder="Užitečný tip..."
            />
            
            <div className="pt-4 border-t">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">Publikovat lekci</p>
                  <p className="text-sm text-gray-500">Lekce bude viditelná pro studenty</p>
                </div>
                <input
                  type="checkbox"
                  checked={lesson.is_published}
                  onChange={(e) => setLesson({ ...lesson, is_published: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[#7A9E8E] focus:ring-[#7A9E8E]"
                />
              </label>
            </div>
          </div>
        </Card>
      )}
    </AdminLayout>
  );
}
