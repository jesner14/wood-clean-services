import { Link } from 'react-router';

interface BrandLogoProps {
  /** Sur hero / footer sombre : logo PDF p.9 — monochrome #EB8E8C */
  variant?: 'default' | 'accent';
  height?: number;
  className?: string;
  /** Rebond + salto périodique (défaut: true) */
  animated?: boolean;
}

export function BrandLogo({
  variant = 'default',
  height = 60,
  className,
  animated = true,
}: BrandLogoProps) {
  const src = variant === 'accent' ? '/assets/logo-accent.png' : '/assets/logo.png';

  return (
    <Link
      to="/"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        border: 'none',
        outline: 'none',
        background: 'transparent',
      }}
    >
      <span
        className={animated ? 'brand-logo-bounce' : undefined}
        style={{ display: 'inline-flex', alignItems: 'center', perspective: '600px' }}
      >
        <img
          className={animated ? 'brand-logo-flip' : undefined}
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
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible',
          }}
        />
      </span>

      {animated && (
        <style>{`
          .brand-logo-bounce {
            animation: brandLogoBounce 1.6s ease-in-out infinite;
          }

          .brand-logo-flip {
            animation: brandLogoSalto 10s ease-in-out infinite;
            transform-origin: center center;
          }

          @keyframes brandLogoBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-7px); }
          }

          /* Rebond la plupart du temps, salto entre 90% et 100% (~chaque 10s) */
          @keyframes brandLogoSalto {
            0%, 88% {
              transform: rotateY(0deg) scale(1);
            }
            94% {
              transform: rotateY(180deg) scale(1.04);
            }
            100% {
              transform: rotateY(360deg) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .brand-logo-bounce,
            .brand-logo-flip {
              animation: none !important;
            }
          }
        `}</style>
      )}
    </Link>
  );
}
