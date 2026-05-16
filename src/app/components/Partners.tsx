import { Utensils, Building2, Home } from 'lucide-react';

const quickServices = [
  {
    icon: Utensils,
    title: 'Nettoyage Hottes & Cuisines',
    desc: 'Nettoyage professionnel des hottes, filtres et systèmes de ventilation',
    color: '#52337C'
  },
  {
    icon: Building2,
    title: 'Restaurants & Hôtels',
    desc: 'Grand ménage complet pour établissements de restauration et hôtellerie',
    color: '#EB8E8C'
  },
  {
    icon: Home,
    title: 'Particuliers & Immeubles',
    desc: 'Solutions de nettoyage pour résidences, immeubles et espaces communs',
    color: '#785A8F'
  },
];

export function Partners() {
  return (
    <section style={{ background: '#f8fafc', padding: '56px 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="quick-services-grid">
          {quickServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} color={s.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partners logos strip */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '24px' }}>
            Ils nous font confiance
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {['LAMANTIN BEACH', 'KING FAHD PALACE', 'NOOM HOTEL', 'PULLMAN DAKAR', 'RADISSON BLU', 'TERROU-BI'].map((name, i) => (
              <div key={i} style={{
                padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: '8px',
                fontSize: '12px', fontWeight: 700, color: '#64748b',
                background: '#fff', letterSpacing: '0.5px',
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#52337C'; e.currentTarget.style.color = '#52337C'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .quick-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
