import { Link } from 'react-router';

interface BrandLogoProps {
  /** Sur hero / footer sombre : logo PDF p.9 — monochrome #EB8E8C */
  variant?: 'default' | 'accent';
  height?: number;
  className?: string;
}

export function BrandLogo({ variant = 'default', height = 60, className }: BrandLogoProps) {
  const src = variant === 'accent' ? '/assets/logo-accent.png' : '/assets/logo.png';

  return (
    <Link
      to="/"
      className={className}
      style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', border: 'none', outline: 'none', background: 'transparent' }}
    >
      <img
        src={src}
        alt="Wood Clean Services"
        width={height * 2.8}
        height={height}
        style={{
          height,
          width: 'auto',
          maxWidth: 'min(280px, 42vw)',
          objectFit: 'contain',
          transition: 'opacity 0.35s ease',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          background: 'transparent',
        }}
      />
    </Link>
  );
}
