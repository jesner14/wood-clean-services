import { Link } from 'react-router';
import { ArrowRight, Utensils, Building2, Home, Sparkles } from 'lucide-react';
import { HeroHome } from '../components/HeroHome';
import { PartnerSlider } from '../components/PartnerSlider';
import { ServicePromo } from '../components/ServicePromo';

const cardShadow = '0 8px 32px rgba(82,51,124,0.12), 0 4px 16px rgba(0,0,0,0.06)';

const quickServices = [
  { icon: Utensils, title: 'Spécialiste hottes de cuisine', desc: 'Nettoyage professionnel des hottes, filtres et systèmes de ventilation', color: '#52337C', to: '/services#service-01' },
  { icon: Building2, title: 'Grand ménage pro', desc: 'Cuisines, restaurants, hôtels, appartements et immeubles', color: '#EB8E8C', to: '/services#service-02' },
  { icon: Home, title: 'Particuliers & Immeubles', desc: 'Solutions de nettoyage pour résidences et espaces communs', color: '#785A8F', to: '/services#service-03' },
];

const stats = [
  { value: '50+', label: 'Clients satisfaits' },
  { value: '10+', label: 'Années d\'expérience' },
  { value: '6', label: 'Types de services' },
  { value: '24/7', label: 'Disponibilité urgences' },
];

export function HomePage() {
  return (
    <>
      <HeroHome />

{/* ── MENTIONS SPÉCIALISTE ── */}
      <section style={{ background: 'linear-gradient(135deg, #52337C 0%, #3F275F 100%)', padding: '28px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
          {[
            'Spécialiste du nettoyage des hottes de cuisine',
            'Spécialiste du grand ménage des cuisines, appartements et immeubles',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
              <Sparkles size={20} color="#EB8E8C" />
              <span style={{ fontSize: 'clamp(14px, 2vw, 17px)', fontWeight: 700, letterSpacing: '0.3px' }}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK SERVICES ── */}
      <section className="bg-pattern" style={{ background: '#f8fafc', padding: '60px 0', borderBottom: '1px solid #e2e8f0', backgroundImage: 'radial-gradient(rgba(91,44,111,0.05) 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="qs-grid">
            {quickServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link key={i} to={s.to} className="card-elevated" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', transition: 'all 0.25s', boxShadow: cardShadow }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(82,51,124, 0.15)'; e.currentTarget.style.borderColor = s.color; }}
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
      <section style={{ background: 'linear-gradient(135deg, #1E1228 0%, #3F275F 60%, #52337C 100%)', padding: '56px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'center' }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(36px,4vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '14px', color: '#D4CCD9', marginTop: '8px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <style>{`.stats-grid { @media(max-width:640px){ grid-template-columns:repeat(2,1fr)!important } }`}</style>
      </section>

            <PartnerSlider />

      <ServicePromo />

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
              background: 'linear-gradient(90deg, #52337C 0%, #EB8E8C 50%, #785A8F 100%)', 
              zIndex: 0, borderRadius: '4px', opacity: 0.5 
            }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', position: 'relative', zIndex: 1 }}>
              {[
                { num: '1', title: 'NETTOYAGE\nPROFESSIONNEL', color: '#52337C', delay: '0s' },
                { num: '2', title: 'MAINTENANCE\nDES CUISINES', color: '#EB8E8C', delay: '0.2s' },
                { num: '3', title: 'ET\nBÂTIMENTS', color: '#785A8F', delay: '0.4s' }
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
                  background: linear-gradient(180deg, #52337C 0%, #EB8E8C 50%, #785A8F 100%) !important; 
                }
              }
            `}</style>
          </div>

          {/* Bottom 3 columns */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px', borderTop:'2px solid #f1f5f9', paddingTop:'48px' }} className="vision-cols">
            {[
              { num:'01', color:'#52337C', text:'En imposant de nouveaux standards de qualité, de rigueur et de professionnalisme dans le nettoyage professionnel' },
              { num:'02', color:'#EB8E8C', text:'En participant activement à l\'amélioration de la santé publique et de la sécurité au travail au Sénégal' },
              { num:'03', color:'#785A8F', text:'En devenant le partenaire incontournable des professionnels de la restauration et de l\'hôtellerie' },
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
      <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg, #1E1228 0%, #3F275F 100%)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.5px' }}>Prêt à démarrer votre projet ?</h2>
        <p style={{ fontSize: '16px', color: '#D4CCD9', margin: '0 0 36px' }}>Devis gratuit sous 24h — Intervention rapide dans tout Dakar</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact#devis" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 34px', background: '#52337C', color: '#fff', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(82,51,124, 0.4)' }}>Obtenir un Devis Gratuit <ArrowRight size={17} /></Link>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', border: '2px solid rgba(255,255,255,0.35)', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.08)' }}>Voir nos services</Link>
        </div>
      </section>
    </>
  );
}
