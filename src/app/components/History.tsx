export function History() {
  const projects = [
    {
      title: 'Nettoyage Cuisine',
      category: 'Restaurant',
      img: '/assets/hero1.png',
      link: '#',
    },
    {
      title: 'Équipe en action',
      category: 'Intervention',
      img: '/assets/hero2.png',
      link: '#',
    },
    {
      title: 'Hotte Industrielle',
      category: 'Maintenance',
      img: '/assets/hero3.png',
      link: '#',
    },
  ];

  return (
    <section id="history" className="section section-soft">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-label">Nos Réalisations</span>
          <div className="section-divider">
            <h2 className="section-title">Nos Derniers Projets</h2>
          </div>
          <p className="section-subtitle">Découvrez quelques-unes de nos interventions récentes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }} className="history-grid">
          {projects.map((r, i) => (
            <div key={i} style={{
              borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'transform 0.25s, box-shadow 0.25s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
            >
              <img src={r.img} alt={r.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '16px 20px', background: '#fff' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a2a6d', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {r.category}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{r.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Story section below */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginTop: '60px', paddingTop: '60px', borderTop: '1px solid #e2e8f0' }} className="story-grid">
          <div>
            <span className="section-label">Notre Histoire</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: '8px 0 20px', lineHeight: 1.2 }}>
              D'où Nous Venons
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '16px', fontSize: '15px' }}>
              Wood Clean Services est née d'un constat réel, vécu sur le terrain, au cœur même
              du secteur de la restauration. Son fondateur, alors étudiant en droit des affaires,
              travaillait comme serveur dans un restaurant situé au Plateau, à Dakar.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '24px', fontSize: '15px' }}>
              Animés par le sérieux, la rigueur et le sens du travail bien fait, ils ont rapidement
              su se démarquer par la qualité de leurs prestations, gagnant la confiance de la clientèle
              et du top management.
            </p>
            <div style={{
              background: '#f3ebf6', border: '1px solid #dcbadd', borderRadius: '12px', padding: '20px 24px'
            }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#5a2a6d', margin: '0 0 6px' }}>Notre Vision</p>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: 1.7 }}>
                Devenir la référence en nettoyage professionnel au Sénégal et en Afrique de l'Ouest,
                en garantissant des standards de qualité et de sécurité exceptionnels.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <img
              src="/assets/hero4.png"
              alt="Hôtel propre"
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e2e8f0' }}
            />
            <img
              src="/assets/hero1.png"
              alt="Cuisine professionnelle"
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e2e8f0' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .history-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .story-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
