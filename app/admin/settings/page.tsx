'use client';

import { AdminLayout, Card, Input, Button, Badge } from '@/components/Admin';

export default function SettingsPage() {
  return (
    <AdminLayout 
      title="Nastavení" 
      subtitle="Konfigurace aplikace"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* General */}
        <Card title="Obecné nastavení">
          <div className="space-y-4">
            <Input
              label="Název aplikace"
              defaultValue="Polymath Academy"
            />
            <Input
              label="Tagline"
              defaultValue="Edukační platforma s AI profesory"
            />
            <Button>Uložit změny</Button>
          </div>
        </Card>
        
        {/* Database */}
        <Card title="Databáze">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Status</span>
              <Badge variant="warning">Lokální (TS soubory)</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Supabase</span>
              <Badge>Připraveno k migraci</Badge>
            </div>
            <p className="text-xs text-gray-500">
              Pro produkční nasazení je potřeba nakonfigurovat Supabase.
            </p>
          </div>
        </Card>
        
        {/* AI */}
        <Card title="AI Nastavení">
          <div className="space-y-4">
            <Input
              label="Claude API Key"
              type="password"
              placeholder="sk-ant-..."
              hint="Pro AI chat s profesory"
            />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Model</span>
              <Badge variant="info">claude-3-5-sonnet</Badge>
            </div>
            <Button variant="secondary">Testovat připojení</Button>
          </div>
        </Card>
        
        {/* Features */}
        <Card title="Funkce">
          <div className="space-y-3">
            {[
              { name: 'Professor System', status: 'active', label: 'Aktivní' },
              { name: 'AI Chat', status: 'pending', label: 'Připraveno' },
              { name: 'User Auth', status: 'pending', label: 'Připraveno' },
              { name: 'Progress Tracking', status: 'pending', label: 'Připraveno' },
              { name: 'Handoff System', status: 'pending', label: 'Plánováno' },
            ].map(feature => (
              <div 
                key={feature.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium">{feature.name}</span>
                <Badge variant={feature.status === 'active' ? 'success' : 'default'}>
                  {feature.label}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Danger zone */}
      <Card title="Danger Zone" className="mt-6 border-red-200">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Tyto akce jsou nevratné. Buďte opatrní.
          </p>
          <div className="flex gap-4">
            <Button variant="danger" disabled>
              Reset dat
            </Button>
            <Button variant="danger" disabled>
              Smazat cache
            </Button>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
}
