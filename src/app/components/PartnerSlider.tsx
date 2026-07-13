import { partners } from '../data/partners';
import { brand } from '../brand/colors';

const sectionBg = `linear-gradient(180deg, #eef0f3 0%, #F4F1F6 50%, #e8eaed 100%)`;
const cardBg = '#eef0f3';

export function PartnerSlider() {
  const doubled = [...partners, ...partners];

  return (
    <section className="partner-section" style={{ padding: '64px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--content-max, 1280px)', margin: '0 auto', padding: '0 var(--page-pad, 32px)', textAlign: 'center', marginBottom: '40px', width: '100%', boxSizing: 'border-box' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: brand.primaryMedium, textTransform: 'uppercase', margin: '0 0 8px' }}>
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
            <div key={`${p.logo}-${i}`} className="partner-logo-slot">
              <div className="partner-logo-frame" title={p.name}>
                <div className="partner-logo-card">
                  <div className="partner-logo-badge">
                    <img src={p.logo} alt="" loading="eager" decoding="async" />
                  </div>
                  <p className="partner-logo-name">{p.name}</p>
                </div>
              </div>
              <span className="partner-gap" aria-hidden />
            </div>
          ))}
        </div>
        <div className="partner-marquee-fade partner-marquee-fade-right" />
      </div>

      <style>{`
        .partner-section {
          background: ${sectionBg};
        }

        .partner-marquee-wrap {
          width: 100%;
          overflow: hidden;
        }

        .partner-marquee-track {
          display: flex;
          width: max-content;
          animation: partnerScroll 35s linear infinite;
          align-items: center;
        }

        .partner-logo-slot {
          display: flex;
          align-items: stretch;
          flex-shrink: 0;
        }

        .partner-logo-frame {
          flex-shrink: 0;
          padding: 2px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            ${brand.primary} 0%,
            ${brand.primaryMedium} 40%,
            ${brand.accent} 100%
          );
          box-shadow: 0 8px 24px rgba(82, 51, 124, 0.12);
        }

        .partner-logo-card {
          width: 200px;
          background: ${cardBg};
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 16px 14px 14px;
          box-sizing: border-box;
        }

        /* Zone fixe : tous les logos ont le même poids visuel */
        .partner-logo-badge {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          box-shadow:
            0 4px 14px rgba(0, 0, 0, 0.08),
            inset 0 0 0 1px rgba(82, 51, 124, 0.08);
          padding: 10px;
          box-sizing: border-box;
        }

        .partner-logo-badge img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .partner-logo-name {
          margin: 12px 0 0;
          padding: 0;
          width: 100%;
          font-size: 11px;
          font-weight: 700;
          color: ${brand.primary};
          text-align: center;
          line-height: 1.3;
          min-height: 2.6em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .partner-gap {
          width: 12px;
          margin: 14px 0;
          border-radius: 999px;
          flex-shrink: 0;
          background: linear-gradient(
            180deg,
            ${brand.primary} 0%,
            ${brand.primaryMedium} 45%,
            ${brand.accent} 100%
          );
          opacity: 0.7;
          box-shadow: 0 0 14px rgba(82, 51, 124, 0.2);
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
          width: 140px;
          z-index: 2;
          pointer-events: none;
        }
        .partner-marquee-fade-left {
          left: 0;
          background: linear-gradient(to right, rgba(238,240,243,0.95), transparent);
        }
        .partner-marquee-fade-right {
          right: 0;
          background: linear-gradient(to left, rgba(232,234,237,0.95), transparent);
        }

        @media (min-width: 1536px) {
          .partner-logo-card {
            width: 230px;
            padding: 18px 16px 16px;
          }
          .partner-logo-badge {
            width: 92px;
            height: 92px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
