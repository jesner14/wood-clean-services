import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Users, Utensils, Building2, Home } from 'lucide-react';

const slides = [
  { img: '/assets/hero1.png', label: 'Cuisine Professionnelle', title: "L'Excellence\nde la Propreté", subtitle: 'Au service de votre réussite', desc: 'Spécialistes du nettoyage et de l\'entretien pour Restaurants, Hôtels et Espaces Professionnels partout au Sénégal' },
  { img: '/assets/hero2.png', label: 'Équipe Qualifiée', title: 'Des Experts\nà Votre Service', subtitle: 'Personnel certifié & expérimenté', desc: 'Notre équipe de professionnels formés intervient rapidement pour garantir des standards d\'hygiène irréprochables.' },
  { img: '/assets/hero3.png', label: 'Nettoyage Industriel', title: 'Hygiène & Sécurité\nGaranties', subtitle: 'Conformité aux normes les plus strictes', desc: 'Hottes, chambres froides, cuisines industrielles : nous intervenons sur tous types d\'équipements professionnels.' },
  { img: '/assets/hero4.png', label: 'Hôtels & Restaurants', title: 'N°1 des Restaurants\net Hôtels Propres', subtitle: 'La référence au Sénégal 🇸🇳', desc: 'Lamantin Beach, King Fahd Palace, Noom Hotel, Pullman, Radisson Blu, Terrou-Bi… nous font confiance.' },
];

const quickServices = [
  { icon: Utensils, title: 'Hottes & Cuisines', desc: 'Nettoyage professionnel des hottes, filtres et systèmes de ventilation', color: '#5a2a6d', to: '/services' },
  { icon: Building2, title: 'Restaurants & Hôtels', desc: 'Grand ménage complet pour établissements de restauration et hôtellerie', color: '#e57b7f', to: '/services' },
  { icon: Home, title: 'Particuliers & Immeubles', desc: 'Solutions de nettoyage pour résidences et espaces communs', color: '#8e5a9c', to: '/services' },
];

const partners = ['LAMANTIN BEACH', 'KING FAHD PALACE', 'NOOM HOTEL', 'PULLMAN DAKAR', 'RADISSON BLU', 'TERROU-BI'];

const stats = [
  { value: '50+', label: 'Clients satisfaits' },
  { value: '10+', label: 'Années d\'expérience' },
  { value: '6', label: 'Types de services' },
  { value: '24/7', label: 'Disponibilité urgences' },
];

export function HomePage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 700);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);

  const slide = slides[current];

  return (
    <>
      {/* ── HERO CAROUSEL ── */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, transition: 'opacity 0.9s ease', opacity: i === current ? 1 : 0, zIndex: 0 }}>
            <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: i === current ? 'scale(1.06)' : 'scale(1)', transition: 'transform 6s ease' }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,15,40,0.90) 0%, rgba(7,15,40,0.55) 55%, rgba(7,15,40,0.20) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to top, rgba(7,15,40,0.6), transparent)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', maxWidth: '760px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50px', padding: '5px 18px', fontSize: '11px', fontWeight: 700, color: '#dcbadd', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '22px', width: 'fit-content' }}>{slide.label}</div>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 18px', letterSpacing: '-1.5px', whiteSpace: 'pre-line', textShadow: '0 2px 20px rgba(0,0,0,0.4)', background: 'linear-gradient(to right, #fff, #fbe4e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
          <p style={{ fontSize: '18px', fontWeight: 600, color: '#dcbadd', margin: '0 0 12px' }}>{slide.subtitle}</p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', maxWidth: '520px', lineHeight: 1.8, margin: '0 0 36px' }}>{slide.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
            {[{ icon: Shield, label: 'Qualité garantie', sub: 'Propreté impeccable' }, { icon: Users, label: 'Équipe pro', sub: 'Formée & certifiée' }].map(({ icon: Icon, label, sub }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '10px 16px' }}>
                <div style={{ width: '34px', height: '34px', background: 'rgba(90, 42, 109, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dcbadd' }}><Icon size={16} /></div>
                <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{label}</div><div style={{ fontSize: '11px', color: '#dcbadd' }}>{sub}</div></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', background: '#5a2a6d', color: '#fff', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(90, 42, 109, 0.4)' }}>
              Découvrez nos services <ArrowRight size={17} />
            </Link>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', border: '2px solid rgba(255,255,255,0.35)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)' }}>
              Demander un Devis
            </Link>
          </div>
        </div>

        <button onClick={prev} aria-label="Précédent" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} /></button>
        <button onClick={next} aria-label="Suivant" style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={24} /></button>

        <div style={{ position: 'absolute', bottom: '36px', left: '80px', zIndex: 3, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '1px' }}>{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '32px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? '#e57b7f' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s ease' }} />
            ))}
          </div>
        </div>
        <div key={current} style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: '#e57b7f', zIndex: 3, animation: 'heroProgress 5s linear forwards' }} />
        <style>{`@keyframes heroProgress { from { width:0 } to { width:100% } }`}</style>
      </section>

      {/* ── QUICK SERVICES ── */}
      <section className="bg-pattern" style={{ background: '#f8fafc', padding: '60px 0', borderBottom: '1px solid #e2e8f0', backgroundImage: 'radial-gradient(rgba(91,44,111,0.05) 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="qs-grid">
            {quickServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link key={i} to={s.to} className="glow-shadow" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(90, 42, 109, 0.15)'; e.currentTarget.style.borderColor = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={22} color={s.color} /></div>
                  <div><h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{s.title}</h3><p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>{s.desc}</p></div>
                </Link>
              );
            })}
          </div>
        </div>
        <style>{`.qs-grid { @media(max-width:768px){ grid-template-columns:1fr!important } }`}</style>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg, #1A0F2E 0%, #411d51 60%, #5a2a6d 100%)', padding: '56px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'center' }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(36px,4vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '14px', color: '#dcbadd', marginTop: '8px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <style>{`.stats-grid { @media(max-width:640px){ grid-template-columns:repeat(2,1fr)!important } }`}</style>
      </section>

      {/* ── PARTNERS ── */}
      <section className="bg-pattern" style={{ padding: '56px 0', background: '#fff', backgroundImage: 'radial-gradient(rgba(229,123,127,0.05) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '28px' }}>Ils nous font confiance</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {partners.map((name, i) => (
              <div key={i} style={{ padding: '12px 22px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '12px', fontWeight: 700, color: '#64748b', background: '#f8fafc', letterSpacing: '0.5px', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#5a2a6d'; e.currentTarget.style.color = '#5a2a6d'; e.currentTarget.style.background = '#f3ebf6'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = '#f8fafc'; }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION SCHEMA ── */}
      <section style={{ padding: '96px 0 80px', background: '#fff', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 className="text-gradient" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, margin: '0 0 6px', letterSpacing: '-1.5px', lineHeight: 1 }}>NOTRE VISION</h2>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '4px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>L'AVENIR EN PERSPECTIVE</p>
            </div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#e2e8f0', letterSpacing: '-2px' }}>WCS</div>
          </div>

          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, margin: '0 0 56px', maxWidth: '500px' }}>
            Devenir une référence <strong style={{ color: '#0f172a' }}>nationale et sous-régionale</strong> en matière de :
          </p>

          {/* Modern Steps Schema */}
          <div style={{ position: 'relative', marginBottom: '80px', marginTop: '40px' }} className="vision-schema-container">
            {/* Connecting line */}
            <div className="vision-connect-line" style={{ 
              position: 'absolute', top: '40px', left: '16%', right: '16%', height: '4px', 
              background: 'linear-gradient(90deg, #5a2a6d 0%, #e57b7f 50%, #8e5a9c 100%)', 
              zIndex: 0, borderRadius: '4px', opacity: 0.5 
            }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', position: 'relative', zIndex: 1 }}>
              {[
                { num: '1', title: 'NETTOYAGE\nPROFESSIONNEL', color: '#5a2a6d', delay: '0s' },
                { num: '2', title: 'MAINTENANCE\nDES CUISINES', color: '#e57b7f', delay: '0.2s' },
                { num: '3', title: 'ET\nBÂTIMENTS', color: '#8e5a9c', delay: '0.4s' }
              ].map((step, i) => (
                <div key={i} style={{ textAlign: 'center', animation: `fadeUp 0.6s ease forwards ${step.delay}`, opacity: 0 }}>
                  <div className="animate-float" style={{ 
                    width: '80px', height: '80px', margin: '0 auto 24px', 
                    background: '#fff', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 0 10px ${step.color}15, 0 12px 30px rgba(0,0,0,0.08)`,
                    border: `3px solid ${step.color}`,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'default',
                    animationDelay: step.delay
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = `0 0 0 15px ${step.color}25, 0 15px 40px rgba(0,0,0,0.12)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 0 10px ${step.color}15, 0 12px 30px rgba(0,0,0,0.08)`; }}>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: step.color }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px', margin: 0, lineHeight: 1.5 }}>
                    {step.title.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
                  </h3>
                </div>
              ))}
            </div>
            <style>{`
              @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
              @media (max-width: 768px) {
                .vision-schema-container > div:nth-child(2) { grid-template-columns: 1fr !important; gap: 48px !important; }
                .vision-connect-line { 
                  width: 4px !important; height: 100% !important; 
                  left: 50% !important; top: 0 !important; right: auto !important; 
                  transform: translateX(-50%) !important; 
                  background: linear-gradient(180deg, #5a2a6d 0%, #e57b7f 50%, #8e5a9c 100%) !important; 
                }
              }
            `}</style>
          </div>

          {/* Bottom 3 columns */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px', borderTop:'2px solid #f1f5f9', paddingTop:'48px' }} className="vision-cols">
            {[
              { num:'01', color:'#5a2a6d', text:'En imposant de nouveaux standards de qualité, de rigueur et de professionnalisme dans le nettoyage professionnel' },
              { num:'02', color:'#e57b7f', text:'En participant activement à l\'amélioration de la santé publique et de la sécurité au travail au Sénégal' },
              { num:'03', color:'#8e5a9c', text:'En devenant le partenaire incontournable des professionnels de la restauration et de l\'hôtellerie' },
            ].map((item,i) => (
              <div key={i} style={{ display:'flex', gap:'16px', alignItems:'flex-start' }}>
                <div style={{ fontSize:'32px', fontWeight:900, color: item.color, lineHeight:1, flexShrink:0, opacity:0.25 }}>{item.num}</div>
                <p style={{ fontSize:'14px', color:'#475569', margin:0, lineHeight:1.9, fontWeight:500 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .vision-cols { grid-template-columns:1fr!important } }`}</style>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg, #1A0F2E 0%, #411d51 100%)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.5px' }}>Prêt à démarrer votre projet ?</h2>
        <p style={{ fontSize: '16px', color: '#dcbadd', margin: '0 0 36px' }}>Devis gratuit sous 24h — Intervention rapide dans tout Dakar</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 34px', background: '#5a2a6d', color: '#fff', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(90, 42, 109, 0.4)' }}>Obtenir un Devis Gratuit <ArrowRight size={17} /></Link>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', border: '2px solid rgba(255,255,255,0.35)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.08)' }}>Voir nos services</Link>
        </div>
      </section>
    </>
  );
}
