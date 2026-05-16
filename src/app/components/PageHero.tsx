import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

interface Crumb { label: string; to?: string }

interface PageHeroProps {
  bg: string;
  label: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
  overlay?: string;
}

export function PageHero({ bg, label, title, subtitle, breadcrumbs, overlay }: PageHeroProps) {
  return (
    <section style={{
      position: 'relative',
      height: '380px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Background */}
      <img src={bg} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center',
        transform: 'scale(1.05)',
        filter: 'brightness(0.55)',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: overlay ?? 'linear-gradient(135deg, rgba(10,15,40,0.85) 0%, rgba(82,51,124,0.55) 100%)',
      }} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(229,123,127,0.15)', filter: 'blur(60px)', pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '80px 32px 0', width: '100%' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          {breadcrumbs.map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <ChevronRight size={14} color="rgba(255,255,255,0.5)" />}
              {c.to
                ? <Link to={c.to} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: 500 }}>{c.label}</Link>
                : <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{c.label}</span>
              }
            </span>
          ))}
        </div>

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: '50px', padding: '5px 16px',
          fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
          color: '#D4CCD9', textTransform: 'uppercase', marginBottom: '16px'
        }}>{label}</div>

        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 900, color: '#fff',
          margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-1px',
          textShadow: '0 2px 16px rgba(0,0,0,0.3)'
        }}>{title}</h1>

        {subtitle && (
          <p style={{ fontSize: '16px', color: '#D4CCD9', margin: 0, fontWeight: 500 }}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
