import { useState } from 'react';
import { partners } from '../data/partners';

function PartnerLogo({ name, logo, fallback }: { name: string; logo: string; fallback: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="partner-logo-card"
      title={name}
      style={{
        flexShrink: 0,
        width: '180px',
        height: '90px',
        background: '#fff',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 24px',
        boxShadow: '0 4px 20px rgba(82,51,124,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0',
      }}
    >
      {!imgError ? (
        <img
          src={logo}
          alt={name}
          onError={() => setImgError(true)}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      ) : (
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', textAlign: 'center' }}>
          {fallback}
        </span>
      )}
    </div>
  );
}

export function PartnerSlider() {
  const doubled = [...partners, ...partners];

  return (
    <section style={{ padding: '64px 0', background: '#fff', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Ils nous font confiance
        </p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Nos partenaires de confiance
        </h2>
      </div>

      <div className="partner-marquee-wrap" style={{ position: 'relative' }}>
        <div className="partner-marquee-fade partner-marquee-fade-left" />
        <div className="partner-marquee-track">
          {doubled.map((p, i) => (
            <PartnerLogo key={`${p.name}-${i}`} name={p.name} logo={p.logo} fallback={p.fallback} />
          ))}
        </div>
        <div className="partner-marquee-fade partner-marquee-fade-right" />
      </div>

      <style>{`
        .partner-marquee-wrap {
          width: 100%;
          overflow: hidden;
        }
        .partner-marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: partnerScroll 40s linear infinite;
        }
        .partner-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes partnerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .partner-marquee-fade-left {
          left: 0;
          background: linear-gradient(to right, #fff, transparent);
        }
        .partner-marquee-fade-right {
          right: 0;
          background: linear-gradient(to left, #fff, transparent);
        }
      `}</style>
    </section>
  );
}
