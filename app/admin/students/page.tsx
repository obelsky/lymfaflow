'use client';

import { AdminLayout, Card } from '@/components/Admin';

export default function StudentsPage() {
  return (
    <AdminLayout 
      title="Studenti" 
      subtitle="Správa uživatelů"
    >
      <Card>
        <div className="text-center py-12">
          <p className="text-4xl mb-4">👥</p>
          <h3 className="font-semibold text-gray-900 mb-2">Správa studentů</h3>
          <p className="text-gray-500 mb-4">
            Tato sekce vyžaduje Supabase Auth.
          </p>
          <p className="text-sm text-gray-400">
            Bude implementováno ve FÁZI 5 (Student Experience).
          </p>
        </div>
      </Card>
    </AdminLayout>
  );
}
