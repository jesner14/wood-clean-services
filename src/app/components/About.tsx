import { Shield, Award, Users, Target } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Conformité & Sécurité',
    description: 'Respect strict des normes d\'hygiène et de sécurité en vigueur',
    color: '#5a2a6d'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Service de qualité supérieure et résultats garantis à chaque intervention',
    color: '#e57b7f'
  },
  {
    icon: Users,
    title: 'Équipe Qualifiée',
    description: 'Personnel formé, expérimenté et régulièrement certifié',
    color: '#8e5a9c'
  },
  {
    icon: Target,
    title: 'Sur Mesure',
    description: 'Solutions personnalisées adaptées à vos besoins spécifiques',
    color: '#411d51'
  },
];

export function About() {
  return (
    <section id="about" className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-label">À Propos de Nous</span>
          <div className="section-divider">
            <h2 className="section-title">Votre Partenaire de Confiance</h2>
          </div>
          <p style={{ fontSize: '16px', color: '#475569', maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}>
            Wood Clean Services est une entreprise sénégalaise spécialisée dans le nettoyage,
            l'entretien et la maintenance des cuisines professionnelles, des hottes aspirantes,
            des systèmes de ventilation et des espaces professionnels et résidentiels.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="about-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: `${f.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.7 }}>{f.description}</p>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '40px', background: '#f3ebf6', border: '1px solid #dcbadd',
          borderRadius: '16px', padding: '36px 40px', textAlign: 'center'
        }}>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
            Forte d'une approche orientée conformité, sécurité et durabilité, nous accompagnons{' '}
            <strong style={{ color: '#5a2a6d' }}>restaurants, hôtels, industries agroalimentaires, immeubles et particuliers</strong>{' '}
            dans l'amélioration de leurs conditions d'hygiène et de sécurité.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .about-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
