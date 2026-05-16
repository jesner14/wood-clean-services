import { Link } from 'react-router';
import { Download, FileText, Shield, Calendar, MessageSquare, Bell, Plus, LogOut } from 'lucide-react';

const quickActions = [
  { icon: Plus, label: 'Demander une intervention', color: '#52337C' },
  { icon: Download, label: 'Télécharger un document', color: '#EB8E8C' },
  { icon: MessageSquare, label: 'Contacter le support', color: '#785A8F' },
];

export function EspaceClientPage() {
  return (
    <div style={{ paddingTop: '96px', minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: 'linear-gradient(135deg, #1E1228 0%, #52337C 100%)', padding: '40px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#D4CCD9', margin: '0 0 4px', fontWeight: 600, letterSpacing: '1px' }}>ESPACE PARTENAIRE</p>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: 0 }}>Bienvenue, Partenaire Wood Clean</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: '#D4CCD9', margin: '0 0 4px' }}>Score conformité hygiène</p>
              <p style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: 0 }}>95%</p>
            </div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', opacity: 0.85 }}>
              <LogOut size={16} /> Déconnexion
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }} className="actions-grid">
          {quickActions.map(({ icon: Icon, label, color }, i) => (
            <button
              key={i}
              type="button"
              className="card-elevated"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 24px',
                background: '#fff',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(82,51,124,0.10)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#334155',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="dashboard-grid">
          {[
            { icon: FileText, title: 'Devis & Factures', desc: '3 documents récents disponibles', color: '#52337C' },
            { icon: Shield, title: 'Certificats de nettoyage', desc: 'Dernier certificat : 12/04/2026', color: '#EB8E8C' },
            { icon: Calendar, title: 'Planning interventions', desc: 'Prochaine intervention : 20/05/2026', color: '#785A8F' },
            { icon: Bell, title: 'Notifications', desc: '2 nouvelles notifications', color: '#3F275F' },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={i}
              className="card-elevated"
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 6px 24px rgba(82,51,124,0.10)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Icon size={22} color={color} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px' }}>{desc}</p>
              <button type="button" style={{ fontSize: '13px', fontWeight: 700, color, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                Voir détails →
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .actions-grid { grid-template-columns:1fr!important }
          .dashboard-grid { grid-template-columns:1fr!important }
        }
      `}</style>
    </div>
  );
}
