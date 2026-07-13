import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Megaphone } from 'lucide-react';
import { flyerBanners, FLYER_BANNER_SPECS } from '../data/flyers';
import { brand } from '../brand/colors';

const AUTOPLAY_MS = 5500;

export function FlyerBanner() {
  const slides = flyerBanners;
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const goTo = useCallback((index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setVisible(true);
    }, 350);
  }, [slides.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const hasImage = slide.image && !imgErrors[slide.id];

  const flyerContent = (
    <div
      className="flyer-banner-frame"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(1.02)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      {hasImage ? (
        <img
          src={slide.image}
          alt={slide.alt}
          className="flyer-banner-image"
          onError={() => setImgErrors((prev) => ({ ...prev, [slide.id]: true }))}
        />
      ) : (
        <FlyerPlaceholder label={slide.label} alt={slide.alt} />
      )}

      <div className="flyer-banner-vignette" aria-hidden style={{ opacity: slide.id.startsWith('promo-') ? 0.2 : 1 }} />
      <div className="flyer-banner-shine" aria-hidden />

      {slide.label && (
        <span className="flyer-banner-badge">
          <Megaphone size={14} />
          {slide.label}
        </span>
      )}
    </div>
  );

  return (
    <section className="flyer-banner-section" aria-label="Espace publicitaire">
      <div className="flyer-banner-accent flyer-banner-accent-top" />
      <div className="flyer-banner-accent flyer-banner-accent-bottom" />

      <div className="flyer-banner-header">
        <p className="flyer-banner-eyebrow">
          Espace publicitaire <span className="flyer-banner-hint">(votre publicité ici)</span>
        </p>
      </div>

      <div className="flyer-banner-viewport">
        {slide.link ? (
          <Link to={slide.link} className="flyer-banner-link">
            {flyerContent}
          </Link>
        ) : (
          flyerContent
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="flyer-banner-nav flyer-banner-nav-prev"
              onClick={prev}
              aria-label="Flyer précédent"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="flyer-banner-nav flyer-banner-nav-next"
              onClick={next}
              aria-label="Flyer suivant"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flyer-banner-dots" role="tablist" aria-label="Choisir un flyer">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Flyer ${i + 1}`}
              onClick={() => goTo(i)}
              className={`flyer-banner-dot${i === current ? ' is-active' : ''}`}
            />
          ))}
        </div>
      )}

      <style>{`
        .flyer-banner-section {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0;
          background: linear-gradient(180deg, #F4F1F6 0%, #eef2f7 50%, #F4F1F6 100%);
          padding: 0 0 28px;
          overflow: hidden;
        }

        .flyer-banner-accent {
          height: 4px;
          background: linear-gradient(90deg, ${brand.primaryDark} 0%, ${brand.primary} 40%, ${brand.accent} 70%, ${brand.primaryMedium} 100%);
        }

        .flyer-banner-header {
          max-width: var(--content-max, 1280px);
          margin: 0 auto;
          padding: 28px var(--page-pad, 32px) 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .flyer-banner-eyebrow {
          margin: 0;
          font-size: clamp(18px, 2.8vw, 28px);
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${brand.primary};
          animation: flyerTitlePulse 2.4s ease-in-out infinite;
        }

        .flyer-banner-hint {
          display: inline-block;
          margin-left: 8px;
          font-size: 0.55em;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: none;
          color: ${brand.accent};
          animation: flyerHintBlink 1.8s ease-in-out infinite;
        }

        @keyframes flyerTitlePulse {
          0%, 100% {
            transform: scale(1);
            letter-spacing: 3px;
            text-shadow: 0 0 0 transparent;
          }
          50% {
            transform: scale(1.04);
            letter-spacing: 4px;
            text-shadow: 0 0 18px rgba(82, 51, 124, 0.28);
          }
        }

        @keyframes flyerHintBlink {
          0%, 100% {
            opacity: 0.55;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
            color: ${brand.primary};
          }
        }

        .flyer-banner-viewport {
          position: relative;
          width: 100%;
          max-width: min(var(--content-max, 1280px), 100%);
          margin: 0 auto;
          padding: 0 var(--page-pad, 32px);
          box-sizing: border-box;
        }

        .flyer-banner-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .flyer-banner-frame {
          position: relative;
          width: 100%;
          aspect-ratio: ${FLYER_BANNER_SPECS.ratio};
          max-height: none;
          min-height: 220px;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(135deg, ${brand.dark} 0%, ${brand.primaryDark} 45%, ${brand.primary} 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.08),
            0 20px 60px rgba(30, 18, 40, 0.22);
        }

        @media (min-width: 1536px) {
          .flyer-banner-viewport {
            max-width: min(var(--content-max, 1440px), 100%);
          }
        }

        @media (max-width: 768px) {
          .flyer-banner-viewport {
            padding: 0;
            max-width: 100%;
          }
          .flyer-banner-frame {
            min-height: 180px;
            aspect-ratio: 16 / 9;
            border-radius: 0;
          }
        }

        .flyer-banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .flyer-banner-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, rgba(30,18,40,0.2) 0%, transparent 18%, transparent 82%, rgba(30,18,40,0.2) 100%),
            linear-gradient(to top, rgba(30,18,40,0.15) 0%, transparent 35%);
          pointer-events: none;
        }

        .flyer-banner-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          pointer-events: none;
        }

        .flyer-banner-badge {
          position: absolute;
          top: 20px;
          left: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.95);
          color: ${brand.primary};
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          border-radius: 999px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          backdrop-filter: blur(8px);
        }

        .flyer-banner-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          color: ${brand.primary};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18);
          opacity: 0;
          transition: opacity 0.25s, transform 0.2s, background 0.2s;
          z-index: 3;
        }

        .flyer-banner-viewport:hover .flyer-banner-nav {
          opacity: 1;
        }

        .flyer-banner-nav:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.06);
        }

        .flyer-banner-nav-prev { left: 20px; }
        .flyer-banner-nav-next { right: 20px; }

        .flyer-banner-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }

        .flyer-banner-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 999px;
          background: ${brand.primaryBorder};
          cursor: pointer;
          transition: width 0.3s, background 0.3s;
        }

        .flyer-banner-dot.is-active {
          width: 28px;
          background: ${brand.primary};
        }

        .flyer-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 24px;
          padding: clamp(20px, 4vw, 48px) clamp(24px, 5vw, 64px);
          background:
            radial-gradient(circle at 15% 20%, rgba(34, 197, 94, 0.55) 0%, transparent 42%),
            radial-gradient(circle at 85% 80%, rgba(239, 68, 68, 0.55) 0%, transparent 45%),
            linear-gradient(120deg, #14532d 0%, #166534 25%, #7f1d1d 70%, #dc2626 100%);
          position: relative;
          overflow: hidden;
        }

        .flyer-placeholder::before {
          content: '';
          position: absolute;
          inset: -20%;
          background: repeating-linear-gradient(
            -18deg,
            transparent,
            transparent 18px,
            rgba(255,255,255,0.04) 18px,
            rgba(255,255,255,0.04) 36px
          );
          animation: flyerStripes 18s linear infinite;
          pointer-events: none;
        }

        .flyer-placeholder-copy {
          position: relative;
          z-index: 1;
          text-align: left;
        }

        .flyer-placeholder-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.95);
          color: #b91c1c;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .flyer-placeholder-title {
          margin: 0 0 12px;
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -1px;
          line-height: 1.05;
          text-shadow: 0 4px 24px rgba(0,0,0,0.35);
          text-transform: uppercase;
        }

        .flyer-placeholder-title span {
          color: #fef08a;
        }

        .flyer-placeholder-hint {
          margin: 0 0 20px;
          font-size: clamp(15px, 2vw, 20px);
          color: rgba(255,255,255,0.92);
          max-width: 520px;
          line-height: 1.5;
          font-weight: 600;
        }

        .flyer-placeholder-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 12px;
          background: #fff;
          color: #14532d;
          font-weight: 800;
          font-size: 14px;
        }

        .flyer-placeholder-hero {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(72px, 14vw, 140px);
          line-height: 1;
          filter: drop-shadow(0 12px 30px rgba(0,0,0,0.35));
          animation: flyerCheer 1.4s ease-in-out infinite;
        }

        .flyer-placeholder-burst {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(254,240,138,0.55) 0%, transparent 70%);
          animation: flyerBurst 2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes flyerCheer {
          0%, 100% { transform: translateY(0) rotate(-4deg) scale(1); }
          50% { transform: translateY(-10px) rotate(4deg) scale(1.06); }
        }

        @keyframes flyerBurst {
          0%, 100% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        @keyframes flyerStripes {
          0% { transform: translateX(0); }
          100% { transform: translateX(60px); }
        }

        @media (max-width: 768px) {
          .flyer-banner-header {
            padding: 20px 20px 14px;
          }

          .flyer-banner-eyebrow {
            letter-spacing: 2px;
          }

          .flyer-banner-badge {
            top: 12px;
            left: 12px;
            font-size: 10px;
            padding: 6px 12px;
          }

          .flyer-banner-nav {
            opacity: 1;
            width: 36px;
            height: 36px;
          }

          .flyer-banner-nav-prev { left: 10px; }
          .flyer-banner-nav-next { right: 10px; }

          .flyer-placeholder {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 28px 20px;
          }
          .flyer-placeholder-copy { text-align: center; }
          .flyer-placeholder-hint { margin-left: auto; margin-right: auto; }
          .flyer-placeholder-hero { font-size: 72px; order: -1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flyer-banner-frame {
            transition: none;
          }
          .flyer-banner-eyebrow,
          .flyer-banner-hint,
          .flyer-placeholder::before,
          .flyer-placeholder-hero,
          .flyer-placeholder-burst {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function FlyerPlaceholder({ label }: { label?: string; alt: string }) {
  return (
    <div className="flyer-placeholder">
      <div className="flyer-placeholder-copy">
        <span className="flyer-placeholder-kicker">
          <Megaphone size={14} /> {label || 'Promo'}
        </span>
        <h3 className="flyer-placeholder-title">
          On a gagné ! <span>Devis gratuit</span>
        </h3>
        <p className="flyer-placeholder-hint">
          Offre spéciale Wood Clean Services — intervention rapide à Dakar, devis sous 24h.
        </p>
        <span className="flyer-placeholder-cta">Demander mon devis →</span>
      </div>
      <div className="flyer-placeholder-hero" aria-hidden>
        <span className="flyer-placeholder-burst" />
        <Megaphone size={96} color="#fef08a" strokeWidth={1.75} />
      </div>
    </div>
  );
}
