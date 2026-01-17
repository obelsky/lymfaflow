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
  
  // Profesor Da Vinci - renesanční učenec s knihou
  daVinci: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {/* Hlava s baretem */}
      <circle cx="12" cy="7" r="4" />
      <path d="M8 5c0-1.5 1.5-3 4-3s4 1.5 4 3" />
      {/* Vousy */}
      <path d="M9 9c0 2 1.5 3 3 3s3-1 3-3" opacity="0.5" />
      {/* Tělo */}
      <path d="M8 11v6c0 1 1 2 4 2s4-1 4-2v-6" />
      {/* Kniha v rukách */}
      <rect x="7" y="14" width="10" height="6" rx="1" />
      <path d="M12 14v6" />
      <path d="M9 16h2M13 16h2" opacity="0.5" />
      {/* Hvězdičky kolem (inspirace) */}
      <circle cx="4" cy="6" r="0.5" fill="currentColor" opacity="0.3" />
      <circle cx="20" cy="8" r="0.5" fill="currentColor" opacity="0.3" />
      <circle cx="19" cy="4" r="0.3" fill="currentColor" opacity="0.2" />
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
  
  // Horní končetina
  arm: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      {/* Rameno */}
      <circle cx="6" cy="6" r="3" />
      {/* Paže */}
      <path d="M8 8l4 6" />
      {/* Loket */}
      <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.2" />
      {/* Předloktí */}
      <path d="M13 15.5l4 5" />
      {/* Ruka */}
      <path d="M17 20.5l1.5.5M17 20.5l1-1M17 20.5l.5-1.5" />
    </svg>
  ),
  
  // Dolní končetina
  leg: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      {/* Kyčel */}
      <ellipse cx="8" cy="4" rx="4" ry="2" />
      {/* Stehno */}
      <path d="M8 6v6" strokeWidth="3" />
      {/* Koleno */}
      <circle cx="8" cy="12" r="2" />
      <circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.3" />
      {/* Bérec */}
      <path d="M8 14v6" strokeWidth="2" />
      {/* Noha */}
      <path d="M6 20h6" />
    </svg>
  ),
  
  // Tip/žárovka
  lightbulb: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
      <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  
  // Terč/cíl
  target: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" opacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
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
  
  close: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  
  // BR - Biologique Recherche lahvička
  brFlask: ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {/* Lahvička */}
      <path d="M9 2h6v4l3 3v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9l3-3V2z" />
      {/* Víčko */}
      <path d="M9 2h6" strokeWidth="2" />
      {/* Etiketa */}
      <rect x="8" y="12" width="8" height="5" rx="0.5" fill="currentColor" opacity="0.1" />
      {/* Kapka uvnitř */}
      <path d="M12 14l-1 2a1 1 0 102 0l-1-2z" fill="currentColor" opacity="0.3" />
    </svg>
  ),
};

// Icon mapper pro témata
export const getTopicIcon = (iconName: string): React.FC<IconProps> => {
  const map: Record<string, React.FC<IconProps>> = {
    'Planes': BioloIcons.planes,
    'Directions': BioloIcons.directions,
    'Bone': BioloIcons.bones,
    'Spine': BioloIcons.spine,
    'Joint': BioloIcons.joints,
    'Muscle': BioloIcons.muscles,
    'Arm': BioloIcons.arm,
    'Leg': BioloIcons.leg,
    // Fallbacks
    'Layers': BioloIcons.planes,
    'Compass': BioloIcons.directions,
  };
  return map[iconName] || BioloIcons.bodyMap;
};
