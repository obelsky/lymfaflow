// ============================================
// POLYMATH ACADEMY - Professor Avatars
// Stylizované SVG portréty v BIOLO-AI stylu
// ============================================

import React from 'react';

interface AvatarProps {
  className?: string;
  color?: string;
}

// Leonardo da Vinci - dlouhé vlasy, plnovous, renesanční čepice
export const DaVinciAvatar: React.FC<AvatarProps> = ({ className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Pozadí - kruh */}
    <circle cx="32" cy="32" r="30" fill={color} opacity="0.1" />
    
    {/* Vlasy - dlouhé, vlnité */}
    <path 
      d="M16 28c0-12 7-18 16-18s16 6 16 18c0 4-1 8-2 12-1 4-2 8-4 10h-20c-2-2-3-6-4-10-1-4-2-8-2-12z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M18 24c2-6 6-10 14-10s12 4 14 10" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    
    {/* Obličej - ovál */}
    <ellipse cx="32" cy="34" rx="10" ry="12" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Oči */}
    <circle cx="28" cy="32" r="1.5" fill={color} />
    <circle cx="36" cy="32" r="1.5" fill={color} />
    
    {/* Nos */}
    <path d="M32 34v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Vous */}
    <path 
      d="M24 42c2 4 4 6 8 6s6-2 8-6" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M26 44c0 4 3 8 6 8s6-4 6-8" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    
    {/* Čepice */}
    <path 
      d="M20 20c4-4 8-6 12-6s8 2 12 6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <ellipse cx="32" cy="14" rx="8" ry="3" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);

// Richard Feynman - krátké vlasy, úsměv, uvolněný
export const FeynmanAvatar: React.FC<AvatarProps> = ({ className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Pozadí */}
    <circle cx="32" cy="32" r="30" fill={color} opacity="0.1" />
    
    {/* Vlasy - krátké, trochu rozcuchané */}
    <path 
      d="M22 24c0-8 4-12 10-12s10 4 10 12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <path d="M24 16c2-2 4-3 8-3s6 1 8 3" stroke={color} strokeWidth="1.5" opacity="0.5" />
    <path d="M26 14c1-1 3-2 6-2s5 1 6 2" stroke={color} strokeWidth="1" opacity="0.3" />
    
    {/* Obličej */}
    <ellipse cx="32" cy="34" rx="12" ry="14" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Oči - přimhouřené od úsměvu */}
    <path d="M26 32c1-1 2-1 3 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M35 32c1-1 2-1 3 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Nos */}
    <path d="M32 34v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Úsměv - široký */}
    <path 
      d="M26 42c2 3 4 4 6 4s4-1 6-4" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Uši */}
    <ellipse cx="20" cy="34" rx="2" ry="3" stroke={color} strokeWidth="1.5" fill="none" />
    <ellipse cx="44" cy="34" rx="2" ry="3" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);

// Sokrates - plešatý, plnovous, vážný výraz
export const SocratesAvatar: React.FC<AvatarProps> = ({ className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Pozadí */}
    <circle cx="32" cy="32" r="30" fill={color} opacity="0.1" />
    
    {/* Hlava - holá, velká */}
    <ellipse cx="32" cy="30" rx="14" ry="16" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Obočí - husté, zamyšlené */}
    <path d="M24 28c2-1 4-1 6 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M34 28c2-1 4-1 6 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Oči - hluboké, moudrý pohled */}
    <circle cx="27" cy="32" r="2" fill={color} />
    <circle cx="37" cy="32" r="2" fill={color} />
    
    {/* Nos - výrazný */}
    <path d="M32 32v5M30 37h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Vous - plnovous */}
    <path 
      d="M22 40c0 2 2 8 10 8s10-6 10-8" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M24 42c0 2 2 6 8 6s8-4 8-6" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    <path 
      d="M26 44c0 2 2 4 6 4s6-2 6-4" 
      stroke={color} 
      strokeWidth="1" 
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
    />
    
    {/* Vrásky moudrosti */}
    <path d="M22 26c1-1 2-1 3 0" stroke={color} strokeWidth="1" opacity="0.4" />
    <path d="M39 26c1-1 2-1 3 0" stroke={color} strokeWidth="1" opacity="0.4" />
  </svg>
);

// Ada Lovelace - viktoriánský účes, elegantní
export const AdaAvatar: React.FC<AvatarProps> = ({ className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Pozadí */}
    <circle cx="32" cy="32" r="30" fill={color} opacity="0.1" />
    
    {/* Vlasy - viktoriánský styl, upnuté */}
    <path 
      d="M18 30c0-10 6-16 14-16s14 6 14 16" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M20 28c0-8 5-12 12-12s12 4 12 12" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    {/* Drdol nahoře */}
    <ellipse cx="32" cy="12" rx="6" ry="4" stroke={color} strokeWidth="2" fill="none" />
    <ellipse cx="32" cy="12" rx="3" ry="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    
    {/* Obličej - jemný ovál */}
    <ellipse cx="32" cy="36" rx="10" ry="12" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Oči - elegantní */}
    <ellipse cx="28" cy="34" rx="2" ry="1.5" fill={color} />
    <ellipse cx="36" cy="34" rx="2" ry="1.5" fill={color} />
    
    {/* Řasy */}
    <path d="M26 32c0-1 1-2 2-2M38 32c0-1-1-2-2-2" stroke={color} strokeWidth="1" opacity="0.5" />
    
    {/* Nos - jemný */}
    <path d="M32 36v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Ústa - jemný úsměv */}
    <path 
      d="M29 44c1 1 2 1 3 1s2 0 3-1" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Náušnice */}
    <circle cx="20" cy="38" r="2" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="44" cy="38" r="2" stroke={color} strokeWidth="1" fill="none" />
  </svg>
);

// Marie Curie - upnuté vlasy, odhodlaný výraz
export const MarieAvatar: React.FC<AvatarProps> = ({ className = '', color = 'currentColor' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Pozadí */}
    <circle cx="32" cy="32" r="30" fill={color} opacity="0.1" />
    
    {/* Vlasy - upnuté dozadu */}
    <path 
      d="M18 32c0-12 6-18 14-18s14 6 14 18" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M20 30c0-10 5-14 12-14s12 4 12 14" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    {/* Drdol vzadu */}
    <ellipse cx="32" cy="50" rx="8" ry="4" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Obličej */}
    <ellipse cx="32" cy="36" rx="11" ry="13" stroke={color} strokeWidth="2" fill="none" />
    
    {/* Oči - odhodlané */}
    <circle cx="28" cy="34" r="2" fill={color} />
    <circle cx="36" cy="34" r="2" fill={color} />
    
    {/* Obočí - soustředěné */}
    <path d="M25 30c1-1 3-1 5 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M34 30c1-1 3-1 5 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Nos */}
    <path d="M32 36v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Ústa - odhodlaná, ale přívětivá */}
    <path 
      d="M28 44c1.5 1 2.5 1.5 4 1.5s2.5-.5 4-1.5" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Límec - vědecký kabát */}
    <path d="M22 52c2-2 4-3 10-3s8 1 10 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Export všech avatarů jako objekt
export const ProfessorAvatars = {
  davinci: DaVinciAvatar,
  feynman: FeynmanAvatar,
  socrates: SocratesAvatar,
  ada: AdaAvatar,
  marie: MarieAvatar,
};

// Komponenta pro dynamické načítání avataru podle ID
interface ProfessorAvatarProps {
  professorId: string;
  className?: string;
  color?: string;
}

export const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ 
  professorId, 
  className = 'w-12 h-12',
  color 
}) => {
  const Avatar = ProfessorAvatars[professorId as keyof typeof ProfessorAvatars];
  
  if (!Avatar) {
    // Fallback - generic avatar
    return (
      <svg viewBox="0 0 64 64" fill="none" className={className}>
        <circle cx="32" cy="32" r="30" fill={color || 'currentColor'} opacity="0.1" />
        <circle cx="32" cy="26" r="10" stroke={color || 'currentColor'} strokeWidth="2" fill="none" />
        <path d="M16 52c0-10 7-16 16-16s16 6 16 16" stroke={color || 'currentColor'} strokeWidth="2" fill="none" />
      </svg>
    );
  }
  
  return <Avatar className={className} color={color} />;
};

export default ProfessorAvatar;
