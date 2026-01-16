'use client';

// ============================================
// POLYMATH ACADEMY - Admin Layout
// Sidebar + Header + Content area
// ============================================

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Admin ikony
const AdminIcons = {
  Dashboard: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Professors: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
      <path d="M15 4c1 0 2 1 2 2s-1 2-2 2" opacity="0.5" />
      <path d="M17 20c2-1 3-3 3-5" opacity="0.5" />
    </svg>
  ),
  Courses: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h8M8 15h4" opacity="0.5" />
    </svg>
  ),
  Lessons: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" opacity="0.5" />
    </svg>
  ),
  Questions: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9c0-1.5 1.5-3 3-3s3 1.5 3 3c0 1.5-1.5 2-3 3v1" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  ),
  Knowledge: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Students: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 18c0-3 2.5-5 6-5s6 2 6 5" />
      <circle cx="17" cy="7" r="2" opacity="0.5" />
      <path d="M15 18c1.5-1 2.5-2 2.5-4" opacity="0.5" />
    </svg>
  ),
  Analytics: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  Menu: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  Close: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  Home: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  Logout: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  AI: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 2a4 4 0 014 4v1a3 3 0 013 3v1a2 2 0 012 2v2a2 2 0 01-2 2v1a3 3 0 01-3 3v1a4 4 0 01-8 0v-1a3 3 0 01-3-3v-1a2 2 0 01-2-2v-2a2 2 0 012-2v-1a3 3 0 013-3V6a4 4 0 014-4z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M9 15c.83 1 2.17 2 3 2s2.17-1 3-2" />
    </svg>
  ),
};

// Menu položky
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: AdminIcons.Dashboard, href: '/admin' },
  { id: 'professors', label: 'Profesoři', icon: AdminIcons.Professors, href: '/admin/professors' },
  { id: 'courses', label: 'Kurzy', icon: AdminIcons.Courses, href: '/admin/courses' },
  { id: 'lessons', label: 'Lekce', icon: AdminIcons.Lessons, href: '/admin/lessons' },
  { id: 'questions', label: 'Otázky', icon: AdminIcons.Questions, href: '/admin/questions' },
  { id: 'knowledge', label: 'Knowledge Base', icon: AdminIcons.Knowledge, href: '/admin/knowledge' },
  { id: 'divider', label: '', icon: null, href: '' },
  { id: 'ai-test', label: 'AI Test Console', icon: AdminIcons.AI, href: '/admin/ai-test' },
  { id: 'students', label: 'Studenti', icon: AdminIcons.Students, href: '/admin/students' },
  { id: 'analytics', label: 'Analytika', icon: AdminIcons.Analytics, href: '/admin/analytics' },
  { id: 'settings', label: 'Nastavení', icon: AdminIcons.Settings, href: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, actions }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // Zjistit aktivní položku
  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#1a1f2e] text-white
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A9E8E] to-[#5B7A6A] flex items-center justify-center text-sm font-bold">
              PA
            </div>
            <div>
              <h1 className="font-bold text-sm">Polymath Academy</h1>
              <p className="text-[10px] text-white/50">Admin Panel</p>
            </div>
          </Link>
          <button 
            className="lg:hidden p-1 hover:bg-white/10 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            <AdminIcons.Close className="w-5 h-5" />
          </button>
        </div>
        
        {/* Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            if (item.id === 'divider') {
              return <div key="divider" className="my-3 border-t border-white/10" />;
            }
            
            const Icon = item.icon!;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-all
                  ${active 
                    ? 'bg-[#7A9E8E] text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <AdminIcons.Home className="w-5 h-5" />
            <span>Zpět do aplikace</span>
          </Link>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <AdminIcons.Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Breadcrumb / Title */}
            <div>
              {title && (
                <h1 className="font-semibold text-gray-900">{title}</h1>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {actions}
            
            {/* User menu */}
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#7A9E8E] flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <span className="text-sm text-gray-700 hidden sm:inline">Admin</span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Stat Card komponenta pro dashboard
interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
}

export function StatCard({ label, value, change, changeType = 'neutral', icon: Icon }: StatCardProps) {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-[#7A9E8E]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#7A9E8E]" />
          </div>
        )}
      </div>
    </div>
  );
}

// Data Table komponenta
interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, onRowClick, keyExtractor, emptyMessage = 'Žádná data' }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th 
                  key={String(col.key)} 
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr 
                key={keyExtractor(item)}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  transition-colors
                `}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-700">
                    {col.render 
                      ? col.render(item) 
                      : String((item as any)[col.key] ?? '')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Button komponenta
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '',
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-[#7A9E8E] text-white hover:bg-[#6A8E7E] border-transparent',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        border transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

// Input komponenta
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 border rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-[#7A9E8E]/50 focus:border-[#7A9E8E]
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

// Textarea komponenta
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-3 py-2 border rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-[#7A9E8E]/50 focus:border-[#7A9E8E]
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

// Select komponenta
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export function Select({ label, options, error, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-3 py-2 border rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-[#7A9E8E]/50 focus:border-[#7A9E8E]
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Card komponenta
interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, title, subtitle, actions, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {(title || actions) && (
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={padding ? 'p-5' : ''}>
        {children}
      </div>
    </div>
  );
}

// Badge komponenta
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export { AdminIcons };
