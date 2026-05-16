import { Link } from 'react-router';
import { ArrowRight, Briefcase } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { servicesContent } from '../data/servicesContent';
import { useScrollToHash } from '../hooks/useScrollToHash';

const cardShadow = '0 8px 32px rgba(82,51,124,0.12), 0 4px 16px rgba(0,0,0,0.06)';

export function ServicesPage() {
  useScrollToHash();

  return (
    <>
      <PageHero
        bg="/assets/hero1.png"
        label="Nos Services"
        title="Des Solutions de Propreté Professionnelles"
        subtitle="Nettoyage, entretien et maintenance pour tous vos espaces"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Services' }]}
      />

      {/* Bandeau recrutement */}
      <section style={{ padding: '32px', background: 'linear-gradient(135deg, #F4F1F6 0%, #fbe4e5 100%)' }}>
        <div
          className="card-elevated"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: '#fff',
            borderRadius: '16px',
            padding: '28px 36px',
            boxShadow: cardShadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#52337C15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Briefcase size={26} color="#52337C" />
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#52337C', margin: '0 0 4px', letterSpacing: '1px' }}>INSCRIPTION & RECRUTEMENT</p>
              <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Vous cherchez du travail ?</p>
            </div>
          </div>
          <Link
            to="/recrutement"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#52337C',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(82,51,124,0.35)',
            }}
          >
            Postuler maintenant <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Services détaillés */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          {servicesContent.map((service, idx) => {
            const Icon = service.icon;
            return (
              <article
                key={idx}
                id={`service-${service.number}`}
                className="card-elevated"
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '40px',
                  marginBottom: '32px',
                  boxShadow: cardShadow,
                  border: '1px solid #e2e8f0',
                  borderTop: `4px solid ${service.color}`,
                  scrollMarginTop: '108px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `${service.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={28} color={service.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: service.color }}>SERVICE {service.number}</span>
                    <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, color: '#0f172a', margin: '6px 0 8px', lineHeight: 1.3 }}>
                      {service.title}
                    </h2>
                    <p style={{ fontSize: '16px', color: '#64748b', margin: 0, fontStyle: 'italic' }}>{service.tagline}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '20px' }}>
                  {service.sections.map((section, si) => (
                    <div
                      key={si}
                      style={{
                        padding: '20px 24px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        borderLeft: `3px solid ${service.color}`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: service.color }}>✓</span> {section.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 8px', lineHeight: 1.7 }}>{section.description}</p>
                      {section.why && (
                        <p style={{ fontSize: '13px', color: service.color, margin: 0, fontWeight: 600, lineHeight: 1.6 }}>
                          {section.why.startsWith('Pourquoi') || section.why.startsWith('Impact') || section.why.startsWith('Résultat') || section.why.startsWith('Bénéfice') || section.why.startsWith('Avantage') || section.why.startsWith('Indispensable')
                            ? section.why
                            : `Pourquoi ? ${section.why}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg,#1E1228 0%,#3F275F 60%,#52337C 100%)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, color: '#fff', margin: '0 0 14px' }}>Besoin d'un service sur mesure ?</h2>
        <p style={{ fontSize: '16px', color: '#D4CCD9', margin: '0 0 32px' }}>Contactez-nous pour un devis gratuit et personnalisé sous 24h</p>
        <Link
          to="/contact#devis"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '15px 34px',
            background: '#fff',
            color: '#52337C',
            fontWeight: 800,
            fontSize: '15px',
            borderRadius: '12px',
            textDecoration: 'none',
          }}
        >
          Demander un Devis Gratuit <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
