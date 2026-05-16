import { Utensils, Building2, Wind, Home, Wrench, Users, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Utensils,
    number: '01',
    title: 'Nettoyage et entretien des hottes de cuisine',
    features: ['Nettoyage des hottes plafond', 'Nettoyage et évacuation', 'Nettoyage des filtres et conduits', 'Dégraissage cuisine et ventilation'],
    color: '#52337C'
  },
  {
    icon: Building2,
    number: '02',
    title: 'Grand ménage des restaurants et hôtels',
    features: ['Nettoyage complet de cuisine', 'Dégraissage complet des surfaces', 'Nettoyage murs et plafonds', 'Nettoyage façades, vitres extérieures'],
    color: '#EB8E8C'
  },
  {
    icon: Home,
    number: '03',
    title: 'Nettoyage pour particuliers et immeubles',
    features: ['Grand ménage résidentiel', 'Nettoyage d\'immeubles et résidences', 'Nettoyage espaces communs', 'Nettoyage vitrerie et escaliers'],
    color: '#785A8F'
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Conception, installation et maintenance',
    features: ['Conception sur mesure', 'Systèmes de ventilation conformes aux normes', 'Maintenance préventive', 'Nettoyage extincteurs'],
    color: '#3F275F'
  },
  {
    icon: Wind,
    number: '05',
    title: 'Nettoyage chambres froides',
    features: ['Nettoyage complet frigorifique', 'Chambres froides professionnelles', 'Systèmes de réfrigération spécialisés', 'Dégivrage'],
    color: '#52337C'
  },
  {
    icon: Users,
    number: '06',
    title: 'Services complémentaires',
    features: ['Jardinage et aménagement paysager', 'Fourniture d\'équipements professionnels', 'Travaux d\'entretien et rénovation', 'Désinfection, désinsectisation, dératisation'],
    color: '#EB8E8C'
  },
];

export function Services() {
  return (
    <section id="services" className="section section-light bg-pattern" style={{ backgroundImage: 'radial-gradient(rgba(91,44,111,0.05) 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-label">Nos Services</span>
          <div className="section-divider">
            <h2 className="section-title text-gradient">Des Solutions de Propreté<br />Professionnelles et Durables</h2>
          </div>
          <p className="section-subtitle">Nous intervenons dans tous les secteurs pour garantir hygiène et sécurité</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="services-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="card glow-shadow" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Accent line on top */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: service.color,
                  borderRadius: '16px 16px 0 0'
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingTop: '8px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: `${service.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} color={service.color} />
                  </div>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '12px', fontWeight: 800, flexShrink: 0
                  }}>
                    {service.number}
                  </div>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px', lineHeight: 1.4, minHeight: '44px' }}>
                  {service.title}
                </h3>

                <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none' }}>
                  {service.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>
                      <span style={{ color: service.color, marginTop: '2px', fontWeight: 700 }}>•</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button style={{
                  display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px',
                  fontWeight: 600, color: service.color, background: 'none', border: 'none', cursor: 'pointer', padding: 0
                }}>
                  En savoir plus <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#contact" className="btn-primary">
            Demander un Devis Gratuit
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
