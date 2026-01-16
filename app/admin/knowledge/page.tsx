'use client';

import { AdminLayout, Card, Badge } from '@/components/Admin';
import { KNOWLEDGE_ITEMS, KNOWLEDGE_CATEGORIES } from '@/lib/data/knowledge';

export default function KnowledgePage() {
  return (
    <AdminLayout 
      title="Knowledge Base" 
      subtitle={`${KNOWLEDGE_ITEMS.length} položek`}
    >
      <Card title="Kategorie">
        <div className="space-y-3">
          {KNOWLEDGE_CATEGORIES.map(cat => {
            const items = KNOWLEDGE_ITEMS.filter(i => i.category_id === cat.id);
            return (
              <div 
                key={cat.id} 
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: cat.gradient }}
              >
                <span className="font-medium text-white">{cat.title}</span>
                <Badge variant="default">{items.length} položek</Badge>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card className="mt-6">
        <div className="text-center py-8">
          <p className="text-gray-500">
            Plný editor Knowledge Base bude implementován ve FÁZI 3.
          </p>
        </div>
      </Card>
    </AdminLayout>
  );
}
