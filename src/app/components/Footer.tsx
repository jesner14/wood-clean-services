import { Link } from 'react-router';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CONTACT } from '../data/contact';
import { servicesContent } from '../data/servicesContent';

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: CONTACT.social.facebook, Icon: Facebook },
  { label: 'Instagram', href: CONTACT.social.instagram, Icon: Instagram },
  { label: 'WhatsApp', href: CONTACT.whatsapp.href, Icon: WhatsAppIcon },
] as const;

export function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#fff', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: 'var(--content-max, 1280px)', margin: '0 auto', padding: '56px var(--page-pad, 32px) 0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <BrandLogo variant="accent" height={44} />
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8, margin: '0 0 20px', maxWidth: '260px' }}>Votre partenaire de confiance pour le nettoyage professionnel au Sénégal. N°1 des restaurants et hôtels propres.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#52337C'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#52337C'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#334155'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px', letterSpacing: '0.5px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['Accueil', '/'], ['À Propos', '/a-propos'], ['Services', '/services'], ['Réalisations', '/realisations'], ['Recrutement', '/recrutement'], ['Connexion', '/connexion'], ['Contact', '/contact']].map(([label, to]) => (
                <li key={label}><Link to={to} style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EB8E8C'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px' }}>Services</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {servicesContent.map((s) => (
                <li key={s.number}>
                  <Link
                    to={`/services#service-${s.number}`}
                    style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', lineHeight: 1.35 }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#EB8E8C'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CONTACT.phones.map((phone) => (
                <li key={phone.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                  <Phone size={14} color="#EB8E8C" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <a href={phone.href} style={{ color: 'inherit', textDecoration: 'none' }}>{phone.display}</a>
                </li>
              ))}
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                <Mail size={14} color="#EB8E8C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <a href={CONTACT.emailHref} style={{ color: 'inherit', textDecoration: 'none' }}>{CONTACT.email}</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                <MapPin size={14} color="#EB8E8C" style={{ flexShrink: 0, marginTop: '2px' }} />
                {CONTACT.location}
              </li>
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
        @media(max-width:1024px){ .footer-grid { grid-template-columns:1fr 1fr!important; gap: 28px !important; } }
        @media(max-width:640px){ .footer-grid { grid-template-columns:1fr!important } }
      `}</style>
    </footer>
  );
}
