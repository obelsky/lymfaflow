// ============================================
// LYMFAFLOW v5.0 - DALÍ ICONS
// Surrealistické ikony inspirované Salvadorem Dalím
// ============================================

import React from 'react';

interface IconProps {
  className?: string;
}

// Roztékající se hodiny (čas/opakování)
export const ClockIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="14" rx="9" ry="7" />
    <path d="M12 10v4l2 2" />
    <path d="M6 8c-2-1-3-3-2-5" />
    <path d="M18 8c2-1 3-3 2-5" />
    <path d="M9 21c0 1 1.5 2 3 2s3-1 3-2" style={{opacity: 0.5}} />
  </svg>
);

// Organická kapka (lymfa)
export const DropIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M12 2c0 0-8 9-8 14a8 8 0 1016 0c0-5-8-14-8-14z" />
    <path d="M9 13c-1 2 0 4 2 5" style={{opacity: 0.5}} />
  </svg>
);

// Slon na dlouhých nohách (progres)
export const ProgressIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <ellipse cx="12" cy="8" rx="6" ry="4" />
    <path d="M6 8v12" />
    <path d="M10 8v12" />
    <path d="M14 8v12" />
    <path d="M18 8v12" />
    <path d="M6 6c-2-1-3-2-4-1" />
    <circle cx="8" cy="6" r="0.5" fill="currentColor" />
  </svg>
);

// Mravenec (detail/přesnost)
export const DetailIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <ellipse cx="12" cy="16" rx="4" ry="3" />
    <ellipse cx="12" cy="10" rx="3" ry="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M8 16l-3 4" />
    <path d="M16 16l3 4" />
    <path d="M9 10l-4 2" />
    <path d="M15 10l4 2" />
    <path d="M10 5l-2-3" />
    <path d="M14 5l2-3" />
  </svg>
);

// Tělo/mapa
export const BodyIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="4" r="2.5" />
    <path d="M12 6.5v5" />
    <path d="M8 8c-2 0.5-3 2-3 4" />
    <path d="M16 8c2 0.5 3 2 3 4" />
    <path d="M12 11.5c-1 0-2 3-2 6s1 4 2 4 2-1 2-4-1-6-2-6z" />
    <ellipse cx="9" cy="19" rx="1" ry="2" style={{opacity: 0.5}} />
    <ellipse cx="15" cy="19" rx="1" ry="2" style={{opacity: 0.5}} />
  </svg>
);

// Trénink/cvičení
export const TrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M4 12h16" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="12" r="3" />
    <path d="M9 12c0-3 1.5-6 3-6s3 3 3 6" />
    <path d="M9 12c0 3 1.5 6 3 6s3-3 3-6" style={{opacity: 0.5}} />
  </svg>
);

// Profil/uživatel
export const ProfileIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20c0-4 2.5-6 6-6s6 2 6 6" />
    <path d="M12 4c0-2 2-2 3-1" style={{opacity: 0.5}} />
  </svg>
);

// Kost
export const BoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M5 5c-1-1-1-3 1-4s3 1 3 2c0 2 0 3-1 4l8 8c1-1 2-1 4-1 1 0 3 1 2 3s-3 2-4 1c-1-1-1-2-2-1l-8-8c1-1 1-1 1-2 0-1-1-3-2-3s-2 0-2 1z" />
  </svg>
);

// Kloub
export const JointIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 8V3" />
    <path d="M12 16v5" />
    <ellipse cx="12" cy="2" rx="2" ry="1" />
    <ellipse cx="12" cy="22" rx="2" ry="1" />
  </svg>
);

// Páteř
export const SpineIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <ellipse cx="12" cy="3" rx="3" ry="1.5" />
    <ellipse cx="12" cy="7" rx="3.5" ry="1.5" />
    <ellipse cx="12" cy="11" rx="4" ry="1.5" />
    <ellipse cx="12" cy="15" rx="3.5" ry="1.5" />
    <ellipse cx="12" cy="19" rx="3" ry="1.5" />
    <path d="M12 4.5v14" style={{opacity: 0.3}} />
  </svg>
);

// Směry
export const DirectionsIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v6" />
    <path d="M12 16v6" />
    <path d="M2 12h6" />
    <path d="M16 12h6" />
    <path d="M12 2l-2 3h4l-2-3" fill="currentColor" />
    <path d="M22 12l-3-2v4l3-2" fill="currentColor" />
  </svg>
);

// Roviny
export const PlanesIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" style={{opacity: 0.3}} />
    <path d="M12 4v16" />
    <path d="M4 12h16" />
    <ellipse cx="12" cy="12" rx="6" ry="3" transform="rotate(45 12 12)" style={{opacity: 0.5}} />
  </svg>
);

// Check/správně
export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M4 12l6 6L20 6" />
  </svg>
);

// X/špatně
export const CrossIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

// Hvězda/XP
export const StarIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
  </svg>
);

// Oheň/streak
export const FireIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M12 22c-4 0-7-3-7-7 0-3 2-5 3-7 0 2 1 3 2 3 0-3 2-7 4-9 0 3 1 5 2 6 1-1 2-2 2-4 2 3 3 5 3 8 0 5-4 10-9 10z" />
    <path d="M12 22c-2 0-3-2-3-4s1-3 3-5c2 2 3 3 3 5s-1 4-3 4z" style={{opacity: 0.5}} />
  </svg>
);

// Trofej/odznak
export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M8 2h8v8c0 3-2 5-4 5s-4-2-4-5V2z" />
    <path d="M8 4H5c0 3 1 5 3 5" />
    <path d="M16 4h3c0 3-1 5-3 5" />
    <path d="M12 15v4" />
    <path d="M8 22h8" />
    <path d="M9 19h6" />
  </svg>
);

// Šipka zpět
export const BackIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

// Šipka další
export const NextIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

// Zvuk
export const SoundIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15 9c1 1 1 5 0 6" />
    <path d="M18 7c2 2 2 8 0 10" style={{opacity: 0.5}} />
  </svg>
);

// Info
export const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <circle cx="12" cy="8" r="0.5" fill="currentColor" />
  </svg>
);

// Nastavení
export const SettingsIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    <path d="M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1" style={{opacity: 0.6}} />
  </svg>
);

// Ruka (masáž)
export const HandIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M6 12V8c0-1 1-2 2-2s2 1 2 2" />
    <path d="M10 10V6c0-1 1-2 2-2s2 1 2 2v4" />
    <path d="M14 10V7c0-1 1-2 2-2s2 1 2 2v7" />
    <path d="M18 14c0 4-2 7-6 7H9c-3 0-5-3-5-6v-3c0-1 1-2 2-2s2 1 2 2" />
  </svg>
);

// Hlava
export const HeadIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <ellipse cx="12" cy="10" rx="7" ry="8" />
    <path d="M8 21c1 1 3 1 4 1s3 0 4-1" />
    <path d="M12 18v3" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
    <path d="M10 13c1 1 3 1 4 0" />
  </svg>
);

// Trup
export const TorsoIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M8 2c-2 1-4 3-4 6v8c0 2 1 4 3 5" />
    <path d="M16 2c2 1 4 3 4 6v8c0 2-1 4-3 5" />
    <path d="M8 2h8" />
    <path d="M7 21h10" />
    <ellipse cx="12" cy="8" rx="2" ry="1" style={{opacity: 0.5}} />
  </svg>
);

// Horní končetina
export const ArmIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="6" cy="5" r="3" />
    <path d="M6 8v5" />
    <path d="M6 13c0 2 1 4 3 5" />
    <path d="M9 18l3 3" />
    <path d="M9 18l1 4" />
    <path d="M9 18l4 2" />
  </svg>
);

// Dolní končetina
export const LegIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <ellipse cx="12" cy="4" rx="5" ry="3" />
    <path d="M9 7v7" />
    <path d="M15 7v7" />
    <path d="M9 14c0 3-1 6-2 8" />
    <path d="M15 14c0 3 1 6 2 8" />
    <ellipse cx="6" cy="22" rx="2" ry="1" />
    <ellipse cx="18" cy="22" rx="2" ry="1" />
  </svg>
);

// Zámek (locked)
export const LockIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7c0-2.2 1.8-4 4-4s4 1.8 4 4v4" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

// Play
export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Kniha
export const BookIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M4 4h6c2 0 2 1 2 2v14c0-1-1-2-2-2H4V4z" />
    <path d="M20 4h-6c-2 0-2 1-2 2v14c0-1 1-2 2-2h6V4z" />
  </svg>
);

// Otázka
export const QuestionIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 9c0-2 1.5-3 3-3s3 1 3 3c0 1.5-1.5 2-2 3v1" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

// Export all icons as object
// Mapa těla (hlavní navigace)
export const BodyMapIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="5" r="3" />
    <path d="M12 8v3" />
    <path d="M8 11h8" />
    <path d="M12 11v5" />
    <path d="M9 16l-1 5" />
    <path d="M15 16l1 5" />
    <path d="M8 11l-3 4" />
    <path d="M16 11l3 4" />
  </svg>
);

// Mozek (trénink/quiz)
export const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M12 4c-4 0-7 3-7 6 0 2 1 4 3 5v4c0 1 1 2 2 2h4c1 0 2-1 2-2v-4c2-1 3-3 3-5 0-3-3-6-7-6z" />
    <path d="M9 9c0-1.5 1.5-2 3-2s3 .5 3 2" />
    <path d="M9 12c0 1.5 1.5 2 3 2s3-.5 3-2" />
    <path d="M12 4v2" style={{opacity: 0.5}} />
  </svg>
);

// Uživatel (profil)
export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

// Šipka vpravo
export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// Check v kruhu
export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-6" />
  </svg>
);

export const DaliIcons = {
  Clock: ClockIcon,
  Drop: DropIcon,
  Progress: ProgressIcon,
  Detail: DetailIcon,
  Body: BodyIcon,
  BodyMap: BodyMapIcon,
  Train: TrainIcon,
  Profile: ProfileIcon,
  Bone: BoneIcon,
  Joint: JointIcon,
  Spine: SpineIcon,
  Directions: DirectionsIcon,
  Planes: PlanesIcon,
  Check: CheckIcon,
  CheckCircle: CheckCircleIcon,
  Cross: CrossIcon,
  Star: StarIcon,
  Fire: FireIcon,
  Trophy: TrophyIcon,
  Back: BackIcon,
  Next: NextIcon,
  ChevronRight: ChevronRightIcon,
  Sound: SoundIcon,
  Info: InfoIcon,
  Settings: SettingsIcon,
  Hand: HandIcon,
  Head: HeadIcon,
  Torso: TorsoIcon,
  Arm: ArmIcon,
  Leg: LegIcon,
  Lock: LockIcon,
  Play: PlayIcon,
  Book: BookIcon,
  Brain: BrainIcon,
  User: UserIcon,
  Question: QuestionIcon,
};

export default DaliIcons;
