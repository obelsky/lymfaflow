'use client';

// ============================================
// POLYMATH ACADEMY - Professor List
// Seznam všech profesorů s možností editace
// ============================================

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminLayout, Card, Button, Badge, DataTable, Input } from '@/components/Admin';
import { PROFESSORS } from '@/lib/data/professors';
import { ProfessorAvatar } from '@/components/Professor';
import type { Professor } from '@/types/professor';

// Teaching method labels
const methodLabels: Record<string, { label: string; color: string }> = {
  visual: { label: 'Vizuální', color: 'bg-[#7A9E8E]' },
  storytelling: { label: 'Příběhy', color: 'bg-[#5B8AF7]' },
  socratic: { label: 'Sokratovská', color: 'bg-[#9B7ED9]' },
  debugging: { label: 'Debugging', color: 'bg-[#E85D75]' },
  experimental: { label: 'Experimenty', color: 'bg-[#F5A623]' },
};

export default function ProfessorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Filtrovat profesory
  const filteredProfessors = PROFESSORS.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.primaryField.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Tabulkové sloupce
  const columns = [
    {
      key: 'avatar',
      label: '',
      width: '60px',
      render: (prof: Professor) => (
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${prof.accentColor}15` }}
        >
          <ProfessorAvatar 
            professorId={prof.id}
            className="w-8 h-8"
            color={prof.accentColor}
          />
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Jméno',
      render: (prof: Professor) => (
        <div>
          <p className="font-medium text-gray-900">{prof.name}</p>
          <p className="text-xs text-gray-500">{prof.era}</p>
        </div>
      ),
    },
    {
      key: 'primaryField',
      label: 'Obor',
      render: (prof: Professor) => (
        <Badge>{prof.primaryField}</Badge>
      ),
    },
    {
      key: 'teachingMethod',
      label: 'Metoda',
      render: (prof: Professor) => {
        const method = methodLabels[prof.teachingMethod];
        return (
          <span 
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: prof.accentColor }}
          >
            {method?.label || prof.teachingMethod}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: '',
      width: '100px',
      render: (prof: Professor) => (
        <div className="flex gap-2">
          <Link href={`/admin/professors/${prof.id}`}>
            <Button variant="ghost" size="sm">Upravit</Button>
          </Link>
        </div>
      ),
    },
  ];
  
  return (
    <AdminLayout
      title="Profesoři"
      subtitle={`${PROFESSORS.length} AI profesorů`}
      actions={
        <Link href="/admin/professors/new">
          <Button>+ Nový profesor</Button>
        </Link>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Hledat profesory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('grid')}
            size="sm"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('table')}
            size="sm"
          >
            Tabulka
          </Button>
        </div>
      </div>
      
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProfessors.map((prof) => (
            <Link
              key={prof.id}
              href={`/admin/professors/${prof.id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${prof.accentColor}15` }}
                  >
                    <ProfessorAvatar 
                      professorId={prof.id}
                      className="w-12 h-12"
                      color={prof.accentColor}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{prof.name}</h3>
                    <p className="text-sm text-gray-500">{prof.era}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>{prof.primaryField}</Badge>
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: prof.accentColor }}
                      >
                        {methodLabels[prof.teachingMethod]?.label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 italic line-clamp-2">
                    "{prof.tagline}"
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Obory: {[prof.primaryField, ...prof.secondaryFields].length}</span>
                  <span>{prof.signaturePhrases.length} frází</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {/* Table View */}
      {viewMode === 'table' && (
        <DataTable
          columns={columns}
          data={filteredProfessors}
          keyExtractor={(prof) => prof.id}
          onRowClick={(prof) => {
            window.location.href = `/admin/professors/${prof.id}`;
          }}
          emptyMessage="Žádní profesoři nenalezeni"
        />
      )}
      
      {/* Empty state */}
      {filteredProfessors.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-500">Žádní profesoři odpovídající "{searchQuery}"</p>
          <Button 
            variant="ghost" 
            className="mt-2"
            onClick={() => setSearchQuery('')}
          >
            Vymazat filtr
          </Button>
        </div>
      )}
    </AdminLayout>
  );
}
