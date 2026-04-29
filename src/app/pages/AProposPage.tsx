import { Link } from 'react-router';
import { Shield, Award, Users, Target, Heart, Zap, Leaf, Lock, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';

const features = [
  { icon: Shield, title: 'Conformité & Sécurité', desc: 'Respect strict des normes d\'hygiène et de sécurité en vigueur', color: '#5a2a6d' },
  { icon: Award, title: 'Excellence', desc: 'Service de qualité supérieure et résultats garantis à chaque intervention', color: '#e57b7f' },
  { icon: Users, title: 'Équipe Qualifiée', desc: 'Personnel formé, expérimenté et régulièrement certifié', color: '#8e5a9c' },
  { icon: Target, title: 'Sur Mesure', desc: 'Solutions personnalisées adaptées à vos besoins spécifiques', color: '#411d51' },
];

const values = [
  { icon: Heart, title: 'Excellence', desc: 'Engagement total envers la qualité et la satisfaction client', color: '#5a2a6d' },
  { icon: Zap, title: 'Réactivité', desc: 'Interventions rapides, disponibles 24/7 pour les urgences', color: '#e57b7f' },
  { icon: Leaf, title: 'Durabilité', desc: 'Produits écologiques et méthodes responsables', color: '#8e5a9c' },
  { icon: Lock, title: 'Sécurité', desc: 'Respect strict des normes et protocoles de sécurité', color: '#411d51' },
];

const stats = [
  { value: '50+', label: 'Employés Qualifiés' },
  { value: '15+', label: 'Certifications' },
  { value: '200h', label: 'Formation Annuelle' },
  { value: '10+', label: 'Années d\'Expérience' },
];

export function AProposPage() {
  return (
    <>
      <PageHero
        bg="/assets/hero4.png"
        label="À Propos"
        title="Votre Partenaire de Confiance"
        subtitle="Une entreprise sénégalaise née de la passion du travail bien fait"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'À Propos' }]}
      />

      {/* Who we are */}
      <section className="bg-pattern" style={{ padding: '80px 0', background: '#fff', backgroundImage: 'radial-gradient(rgba(91,44,111,0.05) 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="about-intro-grid">
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#5a2a6d', textTransform: 'uppercase', marginBottom: '12px' }}>Qui sommes-nous</p>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-0.5px' }}>Wood Clean Services</h2>
            <p style={{ color: '#475569', lineHeight: 1.9, marginBottom: '16px', fontSize: '15px' }}>
              Wood Clean Services est une entreprise sénégalaise spécialisée dans le nettoyage, l'entretien et la maintenance des cuisines professionnelles, des hottes aspirantes, des systèmes de ventilation et des espaces professionnels et résidentiels.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.9, marginBottom: '28px', fontSize: '15px' }}>
              Forte d'une approche orientée conformité, sécurité et durabilité, nous accompagnons <strong style={{ color: '#5a2a6d' }}>restaurants, hôtels, industries agroalimentaires, immeubles et particuliers</strong> dans l'amélioration de leurs conditions d'hygiène et de sécurité.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: '#5a2a6d', color: '#fff', fontWeight: 700, fontSize: '14px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(74,50,114,0.3)' }}>
              Nous Contacter <ArrowRight size={15} />
            </Link>
          </div>
          <div>
            <img src="/assets/hero2.png" alt="Équipe Wood Clean" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }} />
          </div>
        </div>
        <style>{`@media(max-width:768px){ .about-intro-grid { grid-template-columns:1fr!important } }`}</style>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#5a2a6d', textTransform: 'uppercase', marginBottom: '12px' }}>Nos Atouts</p>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: '#0f172a', margin: 0 }}>Pourquoi nous choisir ?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }} className="feat-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = f.color; e.currentTarget.style.boxShadow = `0 12px 32px ${f.color}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Icon size={24} color={f.color} /></div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
          <style>{`
            @media(max-width:1024px){ .feat-grid { grid-template-columns:repeat(2,1fr)!important } }
            @media(max-width:640px){ .feat-grid { grid-template-columns:1fr!important } }
          `}</style>
        </div>
      </section>

      {/* Values + Stats */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#5a2a6d', textTransform: 'uppercase', marginBottom: '12px' }}>Nos Valeurs</p>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: '#0f172a', margin: 0 }}>Les Principes Qui Nous Guident</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '60px' }} className="val-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${v.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><Icon size={22} color={v.color} /></div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{v.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
          <style>{`
            @media(max-width:1024px){ .val-grid { grid-template-columns:repeat(2,1fr)!important } }
            @media(max-width:640px){ .val-grid { grid-template-columns:1fr!important } }
          `}</style>

          {/* Mission banner */}
          <div style={{ background: 'linear-gradient(135deg,#1A0F2E 0%,#411d51 60%,#5a2a6d 100%)', borderRadius: '20px', padding: '48px 40px', textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>Notre Mission</h3>
            <p style={{ fontSize: '15px', color: '#dcbadd', maxWidth: '680px', margin: '0 auto 20px', lineHeight: 1.8 }}>
              Garantir un environnement sain, sûr et conforme aux normes les plus strictes pour tous nos clients, en alliant expertise technique, technologies innovantes et engagement humain.
            </p>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '12px 24px' }}>
              <p style={{ fontWeight: 700, color: '#e57b7f', margin: 0, fontSize: '15px' }}>"Votre sécurité et votre tranquillité, notre priorité absolue"</p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }} className="stats2-grid">
            {stats.map((s, i) => (
              <div key={i} style={{ background: '#f3ebf6', border: '1px solid #dcbadd', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', fontWeight: 900, color: '#5a2a6d', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <style>{`
            @media(max-width:640px){ .stats2-grid { grid-template-columns:repeat(2,1fr)!important } }
          `}</style>
        </div>
      </section>
    </>
  );
}
