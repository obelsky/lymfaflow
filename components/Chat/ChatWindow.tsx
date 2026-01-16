'use client';

// ============================================
// POLYMATH ACADEMY - Chat Components
// Chat UI pro konverzaci s profesory
// ============================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getProfessorById, PROFESSORS } from '@/lib/data/professors';
import { ProfessorAvatar, ProfessorMessage } from '@/components/Professor';
import type { Professor } from '@/types/professor';

// ============================================
// TYPES
// ============================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  professorId?: string;
  timestamp: Date;
  isHandoff?: boolean;
}

interface ChatContextType {
  lessonId?: string;
  lessonTitle?: string;
  lessonContent?: string;
}

// ============================================
// CHAT MESSAGE COMPONENT
// ============================================

interface ChatMessageItemProps {
  message: ChatMessage;
  professor: Professor;
}

export function ChatMessageItem({ message, professor }: ChatMessageItemProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] bg-[#7A9E8E] text-white px-4 py-3 rounded-2xl rounded-br-md">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }
  
  if (message.role === 'assistant') {
    return (
      <div className="flex gap-3 mb-4">
        <div className="flex-shrink-0">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${professor.accentColor}15` }}
          >
            <ProfessorAvatar 
              professorId={professor.id}
              className="w-8 h-8"
              color={professor.accentColor}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-1">{professor.shortName}</p>
          <div 
            className="px-4 py-3 rounded-2xl rounded-tl-md"
            style={{ backgroundColor: `${professor.accentColor}10` }}
          >
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // System message (handoff)
  if (message.isHandoff) {
    const toProfessor = message.professorId ? getProfessorById(message.professorId) : null;
    
    return (
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 flex items-center gap-2">
          <span>🔄</span>
          <span>{message.content}</span>
          {toProfessor && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: toProfessor.accentColor }}
            >
              <ProfessorAvatar 
                professorId={toProfessor.id}
                className="w-5 h-5"
                color="#fff"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
}

// ============================================
// CHAT INPUT COMPONENT
// ============================================

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder = 'Napiš zprávu...' }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);
  
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end p-4 border-t border-gray-200 bg-white">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl resize-none
                     focus:outline-none focus:ring-2 focus:ring-[#7A9E8E]/50 focus:border-[#7A9E8E]
                     disabled:bg-gray-50 disabled:text-gray-400
                     text-sm"
          style={{ maxHeight: '120px' }}
        />
      </div>
      
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="w-11 h-11 flex-shrink-0 bg-[#7A9E8E] text-white rounded-xl
                   flex items-center justify-center
                   hover:bg-[#6A8E7E] disabled:bg-gray-200 disabled:text-gray-400
                   transition-colors"
      >
        {isLoading ? (
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        )}
      </button>
    </form>
  );
}

// ============================================
// QUICK ACTIONS
// ============================================

interface QuickActionsProps {
  professor: Professor;
  onSelect: (action: string) => void;
  lessonTitle?: string;
}

export function QuickActions({ professor, onSelect, lessonTitle }: QuickActionsProps) {
  const actions = [
    lessonTitle ? `Vysvětli mi ${lessonTitle}` : null,
    'Můžeš to vysvětlit jednodušeji?',
    'Dej mi příklad z praxe',
    'Co je nejdůležitější zapamatovat si?',
    'Jak to můžu procvičit?',
  ].filter(Boolean) as string[];
  
  return (
    <div className="px-4 py-3 border-t border-gray-100">
      <p className="text-xs text-gray-500 mb-2">Rychlé otázky:</p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            onClick={() => onSelect(action)}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 
                       rounded-full text-gray-700 transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// PROFESSOR SELECTOR
// ============================================

interface ProfessorSelectorProps {
  currentProfessorId: string;
  onSelect: (professorId: string) => void;
  suggestedProfessorId?: string;
}

export function ProfessorSelector({ currentProfessorId, onSelect, suggestedProfessorId }: ProfessorSelectorProps) {
  return (
    <div className="flex gap-2 p-3 overflow-x-auto">
      {PROFESSORS.map((prof) => {
        const isActive = prof.id === currentProfessorId;
        const isSuggested = prof.id === suggestedProfessorId;
        
        return (
          <button
            key={prof.id}
            onClick={() => onSelect(prof.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl transition-all flex-shrink-0
              ${isActive 
                ? 'bg-[#7A9E8E] text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
              ${isSuggested && !isActive ? 'ring-2 ring-amber-400 ring-offset-1' : ''}
            `}
          >
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ 
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : `${prof.accentColor}15`
              }}
            >
              <ProfessorAvatar 
                professorId={prof.id}
                className="w-5 h-5"
                color={isActive ? '#fff' : prof.accentColor}
              />
            </div>
            <span className="text-sm font-medium">{prof.shortName}</span>
            {isSuggested && !isActive && (
              <span className="text-xs bg-amber-400 text-amber-900 px-1.5 py-0.5 rounded-full">
                doporučený
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// CHAT WINDOW COMPONENT
// ============================================

interface ChatWindowProps {
  initialProfessorId?: string;
  lessonContext?: ChatContextType;
  onClose?: () => void;
  className?: string;
}

export function ChatWindow({ 
  initialProfessorId = 'davinci', 
  lessonContext,
  onClose,
  className = '' 
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentProfessorId, setCurrentProfessorId] = useState(initialProfessorId);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedProfessorId, setSuggestedProfessorId] = useState<string | undefined>();
  const [showQuickActions, setShowQuickActions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const professor = getProfessorById(currentProfessorId)!;
  
  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  
  // Generate intro message
  useEffect(() => {
    if (messages.length === 0) {
      const intro = lessonContext?.lessonTitle
        ? `Vítám tě u lekce "${lessonContext.lessonTitle}"! ${professor.signaturePhrases[0] || ''} Co bys chtěl/a probrat?`
        : professor.introMessage || `${professor.signaturePhrases[0] || 'Ahoj!'} Jak ti můžu pomoct?`;
      
      setMessages([{
        id: '1',
        role: 'assistant',
        content: intro,
        professorId: currentProfessorId,
        timestamp: new Date(),
      }]);
    }
  }, []);
  
  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    setShowQuickActions(false);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          professorId: currentProfessorId,
          lessonContext,
          checkHandoff: true,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Chat API error');
      }
      
      const data = await response.json();
      
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        professorId: currentProfessorId,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Handle handoff suggestion
      if (data.handoff?.suggested) {
        setSuggestedProfessorId(data.handoff.toProfessorId);
      } else {
        setSuggestedProfessorId(undefined);
      }
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Omlouvám se, něco se pokazilo. Zkus to prosím znovu.',
        professorId: currentProfessorId,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle professor change
  const handleProfessorChange = (newProfessorId: string) => {
    if (newProfessorId === currentProfessorId) return;
    
    const newProfessor = getProfessorById(newProfessorId)!;
    const oldProfessor = professor;
    
    // Add handoff system message
    const handoffMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'system',
      content: `${oldProfessor.shortName} předal/a konverzaci ${newProfessor.shortName}`,
      professorId: newProfessorId,
      timestamp: new Date(),
      isHandoff: true,
    };
    
    // Add new professor intro
    const introMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `${newProfessor.signaturePhrases[0] || 'Ahoj!'} Převzal/a jsem štafetu. Jak ti můžu pomoct?`,
      professorId: newProfessorId,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, handoffMessage, introMessage]);
    setCurrentProfessorId(newProfessorId);
    setSuggestedProfessorId(undefined);
  };
  
  return (
    <div className={`flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div 
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: professor.accentColor }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ProfessorAvatar 
              professorId={professor.id}
              className="w-8 h-8"
              color="#fff"
            />
          </div>
          <div className="text-white">
            <h3 className="font-semibold">{professor.name}</h3>
            <p className="text-xs opacity-80">{professor.tagline}</p>
          </div>
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Professor selector */}
      <ProfessorSelector
        currentProfessorId={currentProfessorId}
        onSelect={handleProfessorChange}
        suggestedProfessorId={suggestedProfessorId}
      />
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessageItem 
            key={message.id} 
            message={message} 
            professor={message.professorId ? getProfessorById(message.professorId)! : professor}
          />
        ))}
        
        {isLoading && (
          <div className="flex gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${professor.accentColor}15` }}
            >
              <ProfessorAvatar 
                professorId={professor.id}
                className="w-8 h-8"
                color={professor.accentColor}
              />
            </div>
            <div 
              className="px-4 py-3 rounded-2xl rounded-tl-md"
              style={{ backgroundColor: `${professor.accentColor}10` }}
            >
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick actions */}
      {showQuickActions && messages.length <= 2 && (
        <QuickActions 
          professor={professor}
          onSelect={sendMessage}
          lessonTitle={lessonContext?.lessonTitle}
        />
      )}
      
      {/* Input */}
      <ChatInput 
        onSend={sendMessage} 
        isLoading={isLoading}
        placeholder={`Zeptej se ${professor.shortName}...`}
      />
    </div>
  );
}

// Export index
export { ChatMessageItem as ChatMessage };
