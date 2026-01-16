// ============================================
// LYMFAFLOW - Biolo Icons
// Line-art, organické ikony pro anatomii
// ============================================

import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BioloIcons = {
  // AI Chat - mozek/neurony
  aiChat: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="5" cy="12" r="2" />
      <path d="M12 9V7M15 12h2M12 15v2M9 12H7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  
  // Mapa těla
  bodyMap: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2c1.5 0 2.5 1 2.5 2.5S13.5 7 12 7s-2.5-1-2.5-2.5S10.5 2 12 2z" />
      <path d="M12 7v3" />
      <path d="M8 10h8" />
      <path d="M9 10v6l-2 6" />
      <path d="M15 10v6l2 6" />
      <path d="M12 13v4" />
      <circle cx="12" cy="4.5" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  
  // Denní trénink
  dailyTrain: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 22c0-4 2-6 2-10s-2-6-2-10" />
      <path d="M12 22c0-4-2-6-2-10s2-6 2-10" />
      <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="14" cy="16" r="1" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  
  // Profil
  profile: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  ),
  
  // Knowledge Base
  knowledge: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6" opacity="0.5" />
    </svg>
  ),
  
  // Témata
  planes: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16" opacity="0.5" />
      <path d="M4 12h16" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  
  directions: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  
  bones: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <ellipse cx="7" cy="5" rx="3" ry="2" />
      <ellipse cx="17" cy="5" rx="3" ry="2" />
      <path d="M7 7v10" />
      <path d="M17 7v10" />
      <ellipse cx="7" cy="19" rx="3" ry="2" />
      <ellipse cx="17" cy="19" rx="3" ry="2" />
      <rect x="9" y="8" width="6" height="8" rx="1" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  
  spine: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <ellipse cx="12" cy="4" rx="3" ry="1.5" />
      <ellipse cx="12" cy="8" rx="2.5" ry="1.5" />
      <ellipse cx="12" cy="12" rx="2.5" ry="1.5" />
      <ellipse cx="12" cy="16" rx="2.5" ry="1.5" />
      <ellipse cx="12" cy="20" rx="3" ry="1.5" />
      <path d="M12 2v20" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  
  joints: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.15" />
      <path d="M6 6L4 4M18 6l2-2M6 18l-2 2M18 18l2 2" strokeWidth="1" />
    </svg>
  ),
  
  muscles: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <path d="M6 12c0-4 2-8 6-8s6 4 6 8-2 8-6 8-6-4-6-8z" />
      <path d="M9 8c0 0 1 4 3 4s3-4 3-4" opacity="0.5" />
      <path d="M9 16c0 0 1-4 3-4s3 4 3 4" opacity="0.5" />
    </svg>
  ),
  
  // Stavy
  checkCircle: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  ),
  
  clock: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  
  sparkle: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.5" />
    </svg>
  ),
  
  chevronRight: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  
  arrowLeft: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  
  brain: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <path d="M12 4c-2 0-3.5 1-4 2.5-.5-.3-1.2-.5-2-.5-2 0-3 1.5-3 3s1 3 3 3c0 2 1 3.5 3 4v4" />
      <path d="M12 4c2 0 3.5 1 4 2.5.5-.3 1.2-.5 2-.5 2 0 3 1.5 3 3s-1 3-3 3c0 2-1 3.5-3 4v4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  
  trophy: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <path d="M6 4h12v6c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z" />
      <path d="M6 8H4c0 2 1 4 3 4" />
      <path d="M18 8h2c0 2-1 4-3 4" />
      <path d="M12 16v3" />
      <path d="M8 22h8" />
      <path d="M9 22v-3h6v3" />
    </svg>
  ),
  
  info: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  
  lock: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  ),
};

// Icon mapper pro témata
export const getTopicIcon = (iconName: string): React.FC<IconProps> => {
  const map: Record<string, React.FC<IconProps>> = {
    'Layers': BioloIcons.planes,
    'Compass': BioloIcons.directions,
    'Bone': BioloIcons.bones,
    'Spine': BioloIcons.spine,
    'Joint': BioloIcons.joints,
    'Muscle': BioloIcons.muscles,
  };
  return map[iconName] || BioloIcons.bodyMap;
};
