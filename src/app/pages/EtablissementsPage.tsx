import { Link, useParams } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Utensils, Hotel, Building, ArrowRight, ShieldCheck } from 'lucide-react';

const types = {
  restaurant: {
    icon: Utensils,
    label: 'Restaurant',
    title: 'Restaurants certifiés Wood Clean',
    desc: 'Nos partenaires restaurateurs bénéficient d\'un entretien régulier des hottes, cuisines et espaces de service conforme aux normes sanitaires les plus strictes.',
    benefits: ['Nettoyage hottes & ventilation', 'Grand ménage cuisine', 'Certificats de conformité', 'Interventions planifiées'],
    color: '#52337C',
    bg: '/assets/hero1.png',
  },
  hotel: {
    icon: Hotel,
    label: 'Hôtel',
    title: 'Hôtels partenaires certifiés',
    desc: 'Les établissements hôteliers de prestige nous font confiance pour maintenir des standards d\'hygiène irréprochables dans leurs cuisines et espaces communs.',
    benefits: ['Maintenance hottes industrielles', 'Nettoyage chambres froides', 'Espace partenaire sécurisé', 'Score conformité hygiène'],
    color: '#EB8E8C',
    bg: '/assets/hero4.png',
  },
  autres: {
    icon: Building,
    label: 'Autres établissements',
    title: 'Entreprises & établissements divers',
    desc: 'Supermarchés, industries agroalimentaires, cliniques, écoles : nous adaptons nos services à chaque secteur d\'activité.',
    benefits: ['Solutions sur mesure', 'Conformité HACCP', 'Maintenance préventive', 'Devis personnalisés'],
    color: '#785A8F',
    bg: '/assets/hero3.png',
  },
};

export function EtablissementsPage() {
  const { type } = useParams<{ type: string }>();
  const data = types[type as keyof typeof types] ?? types.restaurant;
  const Icon = data.icon;

  return (
    <>
      <PageHero
        bg={data.bg}
        label="Établissements certifiés"
        title={data.title}
        subtitle={data.label}
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Établissements certifiés', to: '/etablissements/restaurant' },
          { label: data.label },
        ]}
      />

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="etab-grid">
            <div className="card-elevated" style={{ background: '#fff', borderRadius: '20px', padding: '40px', boxShadow: '0 8px 32px rgba(82,51,124,0.12)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `${data.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Icon size={32} color={data.color} />
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.9, margin: '0 0 28px' }}>{data.desc}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {data.benefits.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '15px', color: '#0f172a', fontWeight: 500 }}>
                    <ShieldCheck size={18} color={data.color} /> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Espace partenaire sécurisé</h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>
                Accès réservé aux établissements sous contrat avec Wood Clean Services. Échange structuré de documents et communication professionnelle.
              </p>
              <div className="card-elevated" style={{ background: '#fff', borderRadius: '16px', padding: '28px', marginBottom: '16px', boxShadow: '0 6px 24px rgba(82,51,124,0.10)' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: data.color, margin: '0 0 12px' }}>Fonctionnalités</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '14px', color: '#475569', lineHeight: 2 }}>
                  {['Téléchargement de devis & factures', 'Certificats de nettoyage', 'Historique des interventions', 'Planning des prochaines interventions', 'Messagerie directe', 'Notifications en temps réel'].map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>
              <Link
                to="/connexion"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: data.color,
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: `0 4px 16px ${data.color}40`,
                }}
              >
                Accéder à l'espace partenaire <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.entries(types).map(([key, t]) => (
              <Link
                key={key}
                to={`/etablissements/${key}`}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: type === key ? t.color : '#fff',
                  color: type === key ? '#fff' : '#475569',
                  border: `1.5px solid ${type === key ? t.color : '#e2e8f0'}`,
                  boxShadow: type === key ? `0 4px 12px ${t.color}30` : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){ .etab-grid { grid-template-columns:1fr!important } }`}</style>
    </>
  );
}
