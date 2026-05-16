import { useState, useEffect } from 'react';
import { promoSlides } from '../data/servicesContent';

export function ServicePromo() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % promoSlides.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = promoSlides[current];

  return (
    <section style={{ padding: '48px 32px', background: 'linear-gradient(135deg, #f8fafc 0%, #F4F1F6 100%)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div
          className="card-elevated"
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 48px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(82,51,124,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: slide.color,
            }}
          />
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: slide.color, textTransform: 'uppercase', margin: '0 0 12px' }}>
            Wood Clean Services
          </p>
          <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.3 }}>
            {slide.title}
          </h3>
          <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>{slide.subtitle}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {promoSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Publicité ${i + 1}`}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setCurrent(i);
                    setVisible(true);
                  }, 300);
                }}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? slide.color : '#e2e8f0',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
