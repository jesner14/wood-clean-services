import { Link } from 'react-router';
import { ArrowRight, Utensils, Building2, Wind, Home, Wrench, Users } from 'lucide-react';
import { PageHero } from '../components/PageHero';

const services = [
  { icon: Utensils, number: '01', title: 'Nettoyage et entretien des hottes de cuisine', features: ['Nettoyage des hottes plafond', 'Nettoyage et évacuation', 'Nettoyage des filtres et conduits', 'Dégraissage cuisine et ventilation'], color: '#5a2a6d' },
  { icon: Building2, number: '02', title: 'Grand ménage des restaurants et hôtels', features: ['Nettoyage complet de cuisine', 'Dégraissage complet des surfaces', 'Nettoyage murs et plafonds', 'Nettoyage façades et vitres'], color: '#e57b7f' },
  { icon: Home, number: '03', title: 'Nettoyage pour particuliers et immeubles', features: ['Grand ménage résidentiel', 'Nettoyage immeubles et résidences', 'Nettoyage espaces communs', 'Nettoyage vitrerie et escaliers'], color: '#8e5a9c' },
  { icon: Wrench, number: '04', title: 'Conception, installation et maintenance', features: ['Conception sur mesure', 'Systèmes de ventilation aux normes', 'Maintenance préventive', 'Nettoyage extincteurs'], color: '#411d51' },
  { icon: Wind, number: '05', title: 'Nettoyage chambres froides', features: ['Nettoyage complet frigorifique', 'Chambres froides professionnelles', 'Systèmes de réfrigération spécialisés', 'Dégivrage'], color: '#5a2a6d' },
  { icon: Users, number: '06', title: 'Services complémentaires', features: ['Jardinage et aménagement paysager', 'Fourniture d\'équipements professionnels', 'Travaux d\'entretien et rénovation', 'Désinfection, désinsectisation, dératisation'], color: '#e57b7f' },
];

export function ServicesPage() {
  return (
    <>
      <PageHero
        bg="/assets/hero1.png"
        label="Nos Services"
        title="Des Solutions de Propreté Professionnelles"
        subtitle="Nettoyage, entretien et maintenance pour tous vos espaces"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Services' }]}
      />

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="srv-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}18`; e.currentTarget.style.borderColor = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: s.color, borderRadius: '18px 18px 0 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingTop: '8px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={24} color={s.color} /></div>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 800 }}>{s.number}</div>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.4, minHeight: '48px' }}>{s.title}</h3>
                  <ul style={{ margin: '0 0 22px', padding: 0, listStyle: 'none' }}>
                    {s.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#475569', marginBottom: '8px' }}>
                        <span style={{ color: s.color, fontWeight: 700, marginTop: '1px' }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: s.color, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    En savoir plus <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`
          .srv-grid { }
          @media(max-width:1024px){ .srv-grid { grid-template-columns:repeat(2,1fr)!important } }
          @media(max-width:640px){ .srv-grid { grid-template-columns:1fr!important } }
        `}</style>
      </section>

      <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg,#1A0F2E 0%,#411d51 60%,#5a2a6d 100%)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>Besoin d'un service sur mesure ?</h2>
        <p style={{ fontSize: '16px', color: '#dcbadd', margin: '0 0 32px' }}>Contactez-nous pour un devis gratuit et personnalisé sous 24h</p>
        <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 34px', background: '#fff', color: '#5a2a6d', fontWeight: 800, fontSize: '15px', borderRadius: '12px', textDecoration: 'none' }}>
          Demander un Devis Gratuit <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
