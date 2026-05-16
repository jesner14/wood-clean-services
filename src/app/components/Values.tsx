import { Heart, Zap, Leaf, Lock, Users, Award, BookOpen, Briefcase } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Excellence',
    description: 'Engagement total envers la qualité et la satisfaction client',
    color: '#52337C'
  },
  {
    icon: Zap,
    title: 'Réactivité',
    description: 'Interventions rapides et efficaces, disponibles 24/7',
    color: '#EB8E8C'
  },
  {
    icon: Leaf,
    title: 'Durabilité',
    description: 'Utilisation de produits écologiques et méthodes responsables',
    color: '#785A8F'
  },
  {
    icon: Lock,
    title: 'Sécurité',
    description: 'Respect strict des normes et protocoles de sécurité',
    color: '#3F275F'
  },
];

const stats = [
  { icon: Users, value: '50+', label: 'Employés Qualifiés' },
  { icon: Award, value: '15+', label: 'Certifications' },
  { icon: BookOpen, value: '200h', label: 'Formation Annuelle' },
  { icon: Briefcase, value: '10+', label: 'Années d\'Expérience' },
];

export function Values() {
  return (
    <section id="values" className="section section-soft">
      <div className="container">
        {/* Values */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label">Nos Valeurs</span>
          <div className="section-divider">
            <h2 className="section-title">Pourquoi Choisir Wood Clean ?</h2>
          </div>
          <p className="section-subtitle">Les principes qui guident chacune de nos interventions</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '60px' }} className="values-grid">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: `${v.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Icon size={24} color={v.color} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{v.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.7 }}>{v.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1228 0%, #3F275F 60%, #52337C 100%)',
          borderRadius: '20px', padding: '48px 40px', textAlign: 'center', marginBottom: '60px'
        }}>
          <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>Notre Mission</h3>
          <p style={{ fontSize: '15px', color: '#D4CCD9', maxWidth: '700px', margin: '0 auto 20px', lineHeight: 1.8 }}>
            Garantir un environnement sain, sûr et conforme aux normes les plus strictes pour tous nos clients,
            en alliant expertise technique, technologies innovantes et engagement humain.
          </p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px', padding: '12px 24px'
          }}>
            <p style={{ fontWeight: 700, color: '#EB8E8C', margin: 0, fontSize: '15px' }}>
              "Votre sécurité et votre tranquillité, notre priorité absolue"
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="stats-grid">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: '#F4F1F6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <Icon size={20} color="#52337C" />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#52337C', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
