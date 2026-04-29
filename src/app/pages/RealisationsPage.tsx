import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';

const projects = [
  { title: 'Grand Ménage Restaurant Plateau', category: 'Restauration', desc: 'Nettoyage complet d\'une cuisine professionnelle de 400m² au cœur de Dakar.', img: '/assets/hero3.png', color: '#5a2a6d' },
  { title: 'Entretien Hôtel 5 Étoiles', category: 'Hôtellerie', desc: 'Maintenance mensuelle des hottes et systèmes de ventilation d\'un grand hôtel.', img: '/assets/hero4.png', color: '#e57b7f' },
  { title: 'Cuisine Industrielle Agroalimentaire', category: 'Industrie', desc: 'Dégraissage complet et remise aux normes HACCP d\'une unité de production.', img: '/assets/hero1.png', color: '#8e5a9c' },
  { title: 'Résidence Les Almadies', category: 'Résidentiel', desc: 'Grand ménage et nettoyage des espaces communs d\'une résidence de standing.', img: '/assets/hero2.png', color: '#411d51' },
  { title: 'Chambres Froides Supermarché', category: 'Réfrigération', desc: 'Nettoyage et dégivrage complet de 12 chambres froides d\'un supermarché.', img: '/assets/hero4.png', color: '#5a2a6d' },
  { title: 'Installation Système de Ventilation', category: 'Maintenance', desc: 'Conception et installation d\'un système de ventilation pour un restaurant.', img: '/assets/hero3.png', color: '#e57b7f' },
];

export function RealisationsPage() {
  return (
    <>
      <PageHero
        bg="/assets/hero3.png"
        label="Nos Réalisations"
        title="Nos Derniers Projets"
        subtitle="Découvrez nos interventions récentes et nos clients de référence"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Réalisations' }]}
      />

      {/* Projects grid */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="real-grid">
            {projects.map((p, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '50px', letterSpacing: '1px', textTransform: 'uppercase' }}>{p.category}</div>
                </div>
                <div style={{ padding: '22px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px', lineHeight: 1.7 }}>{p.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: p.color }}>Voir détail <ArrowRight size={13} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){ .real-grid { grid-template-columns:repeat(2,1fr)!important } }
          @media(max-width:640px){ .real-grid { grid-template-columns:1fr!important } }
        `}</style>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="story-grid">
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#5a2a6d', textTransform: 'uppercase', marginBottom: '12px' }}>Notre Histoire</p>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: '#0f172a', margin: '0 0 20px', letterSpacing: '-0.5px' }}>D'où Nous Venons</h2>
            <p style={{ color: '#475569', lineHeight: 1.9, marginBottom: '16px', fontSize: '15px' }}>Wood Clean Services est née d'un constat réel, vécu sur le terrain, au cœur même du secteur de la restauration. Son fondateur, alors étudiant en droit des affaires, travaillait comme serveur dans un restaurant situé au Plateau, à Dakar.</p>
            <p style={{ color: '#475569', lineHeight: 1.9, marginBottom: '28px', fontSize: '15px' }}>Animés par le sérieux, la rigueur et le sens du travail bien fait, ils ont rapidement su se démarquer par la qualité de leurs prestations, gagnant la confiance de la clientèle et du top management.</p>
            <div style={{ background: '#f3ebf6', border: '1px solid #dcbadd', borderRadius: '14px', padding: '22px 26px', marginBottom: '28px' }}>
              <p style={{ fontSize: '14px', fontWeight: 800, color: '#5a2a6d', margin: '0 0 6px' }}>Notre Vision</p>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: 1.7 }}>Devenir la référence en nettoyage professionnel au Sénégal et en Afrique de l'Ouest.</p>
            </div>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: '#5a2a6d', color: '#fff', fontWeight: 700, fontSize: '14px', borderRadius: '12px', textDecoration: 'none' }}>
              Travailler avec nous <ArrowRight size={15} />
            </Link>
          </div>
          <div style={{ display: 'grid', gap: '14px' }}>
            <img src="/assets/hero2.png" alt="Équipe" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e2e8f0' }} />
            <img src="/assets/hero1.png" alt="Cuisine" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e2e8f0' }} />
          </div>
        </div>
        <style>{`@media(max-width:768px){ .story-grid { grid-template-columns:1fr!important } }`}</style>
      </section>
    </>
  );
}
