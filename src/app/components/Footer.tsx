import { Link } from 'react-router';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#fff', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', textDecoration: 'none' }}>
              <img src="/assets/logo.png" alt="Wood Clean Services Logo" style={{ height: '40px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />
            </Link>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8, margin: '0 0 20px', maxWidth: '260px' }}>Votre partenaire de confiance pour le nettoyage professionnel au Sénégal. N°1 des restaurants et hôtels propres.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#5a2a6d'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#5a2a6d'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#334155'; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px', letterSpacing: '0.5px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['Accueil', '/'], ['À Propos', '/a-propos'], ['Services', '/services'], ['Réalisations', '/realisations'], ['Contact', '/contact']].map(([label, to]) => (
                <li key={label}><Link to={to} style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e57b7f'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px' }}>Services</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Cuisines Pro', 'Hottes & Ventilation', 'Espaces Pro', 'Nettoyage Résidentiel', 'Chambres Froides', 'Maintenance'].map(s => (
                <li key={s} style={{ fontSize: '13px', color: '#64748b' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[{ Icon: Phone, text: '+221 XX XXX XX XX' }, { Icon: Mail, text: 'contact@woodclean.sn' }, { Icon: MapPin, text: 'Plateau, Dakar, Sénégal' }].map(({ Icon, text }, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                  <Icon size={14} color="#e57b7f" style={{ flexShrink: 0, marginTop: '2px' }} />{text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>© 2026 Wood Clean Services. Tous droits réservés.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontSize: '12px', color: '#475569', textDecoration: 'none' }}>Confidentialité</a>
            <a href="#" style={{ fontSize: '12px', color: '#475569', textDecoration: 'none' }}>Mentions Légales</a>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){ .footer-grid { grid-template-columns:1fr 1fr!important } }
        @media(max-width:640px){ .footer-grid { grid-template-columns:1fr!important } }
      `}</style>
    </footer>
  );
}
