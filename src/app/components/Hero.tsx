import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Users } from 'lucide-react';

const slides = [
  {
    img: '/assets/hero1.png',
    label: 'Cuisine Professionnelle',
    title: "L'Excellence\nde la Propreté",
    subtitle: 'Au service de votre réussite',
    desc: 'Spécialistes du nettoyage et de l\'entretien pour Restaurants, Hôtels et Espaces Professionnels partout au Sénégal',
  },
  {
    img: '/assets/hero2.png',
    label: 'Équipe Qualifiée',
    title: 'Des Experts\nà Votre Service',
    subtitle: 'Personnel certifié & expérimenté',
    desc: 'Notre équipe de professionnels formés intervient rapidement pour garantir des standards d\'hygiène irréprochables.',
  },
  {
    img: '/assets/hero3.png',
    label: 'Nettoyage Industriel',
    title: 'Hygiène & Sécurité\nGaranties',
    subtitle: 'Conformité aux normes les plus strictes',
    desc: 'Hottes, chambres froides, cuisines industrielles : nous intervenons sur tous types d\'équipements professionnels.',
  },
  {
    img: '/assets/hero4.png',
    label: 'Hôtels & Restaurants',
    title: 'N°1 des Restaurants\net Hôtels Propres',
    subtitle: 'La référence au Sénégal 🇸🇳',
    desc: 'Lamantin Beach, King Fahd Palace, Noom Hotel, Pullman, Radisson Blu, Terrou-Bi… nous font confiance.',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 700);
  }, [animating]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        paddingTop: '72px',
        boxSizing: 'border-box',
      }}
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'opacity 0.8s ease, transform 1.2s ease',
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1.03)' : 'scale(1)',
            zIndex: 0,
          }}
        >
          <img
            src={s.img}
            alt={s.label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(7,15,35,0.88) 0%, rgba(7,15,35,0.60) 55%, rgba(7,15,35,0.25) 100%)',
          zIndex: 1,
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to top, rgba(7,15,35,0.5), transparent)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px',
          maxWidth: '780px',
        }}
      >
        {/* Label badge */}
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50px',
            padding: '6px 18px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#dcbadd',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            width: 'fit-content',
            transition: 'opacity 0.4s',
          }}
        >
          {slide.label}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.08,
            margin: '0 0 20px',
            letterSpacing: '-1.5px',
            whiteSpace: 'pre-line',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            transition: 'opacity 0.4s',
          }}
        >
          {slide.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#dcbadd',
            margin: '0 0 12px',
            transition: 'opacity 0.4s',
          }}
        >
          {slide.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '520px',
            lineHeight: 1.8,
            margin: '0 0 40px',
            transition: 'opacity 0.4s',
          }}
        >
          {slide.desc}
        </p>

        {/* Trust badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
          {[
            { icon: Shield, label: 'Qualité garantie', sub: 'Propreté impeccable' },
            { icon: Users, label: 'Équipe professionnelle', sub: 'Formée & certifiée' },
          ].map(({ icon: Icon, label, sub }, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '10px 16px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  background: 'rgba(90, 42, 109, 0.4)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dcbadd',
                }}
              >
                <Icon size={16} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{label}</div>
                <div style={{ fontSize: '11px', color: '#dcbadd' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="#services"
            className="btn-primary"
            style={{ fontSize: '15px', padding: '14px 32px', display: 'inline-flex', gap: '8px', alignItems: 'center' }}
          >
            Découvrez nos services
            <ArrowRight size={17} />
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              border: '2px solid rgba(255,255,255,0.35)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
              backdropFilter: 'blur(6px)',
              background: 'rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
          >
            Demander un Devis
          </a>
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(90, 42, 109, 0.8)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(90, 42, 109, 0.8)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide counter + dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '80px',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '1px' }}>
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? '#e57b7f' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.4s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: '#e57b7f',
          zIndex: 3,
          animation: 'progress 5s linear infinite',
          animationKey: current,
        }}
      />

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (max-width: 768px) {
          #hero > div:nth-child(3) { padding: 0 24px !important; }
          #hero > button { width: 40px !important; height: 40px !important; }
          #hero > div:last-of-type { left: 24px !important; }
        }
      `}</style>
    </section>
  );
}
