import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const contactInfo = [
  { icon: Phone, title: 'Téléphone', detail: '+221 XX XXX XX XX', link: 'tel:+221XXXXXXXXX', color: '#5a2a6d' },
  { icon: Mail, title: 'Email', detail: 'contact@woodclean.sn', link: 'mailto:contact@woodclean.sn', color: '#e57b7f' },
  { icon: MapPin, title: 'Adresse', detail: 'Plateau, Dakar, Sénégal', link: '#', color: '#8e5a9c' },
  { icon: Clock, title: 'Horaires', detail: 'Lun-Sam: 8h-18h | Urgences 24/7', link: '#', color: '#10b981' },
];

export function Contact() {
  return (
    <section id="contact" className="section section-light">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label">Contactez-Nous</span>
          <div className="section-divider">
            <h2 className="section-title">Prêt à Démarrer Votre Projet ?</h2>
          </div>
          <p className="section-subtitle">
            Parlons-en ! <strong style={{ color: '#5a2a6d' }}>Devis gratuit sous 24h.</strong>
          </p>
        </div>

        {/* Contact info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }} className="contact-info-grid">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <a key={i} href={info.link} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', textDecoration: 'none' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: `${info.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={info.color} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{info.title}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{info.detail}</div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Form + Why us */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: '#f8fafc', borderRadius: '20px', padding: '40px', border: '1px solid #e2e8f0' }} className="contact-grid">
          {/* Form */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 24px' }}>Demande de Devis</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Nom complet</label>
                <input type="text" placeholder="Votre nom" style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
                  outline: 'none', transition: 'border 0.2s', background: '#fff',
                  boxSizing: 'border-box'
                }}
                  onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Email</label>
                <input type="email" placeholder="votre@email.com" style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
                  outline: 'none', transition: 'border 0.2s', background: '#fff',
                  boxSizing: 'border-box'
                }}
                  onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Téléphone</label>
                <input type="tel" placeholder="+221 XX XXX XX XX" style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
                  outline: 'none', transition: 'border 0.2s', background: '#fff',
                  boxSizing: 'border-box'
                }}
                  onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Service souhaité</label>
                <select style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
                  outline: 'none', background: '#fff', boxSizing: 'border-box'
                }}>
                  <option>Cuisine professionnelle</option>
                  <option>Hottes et ventilation</option>
                  <option>Espace professionnel</option>
                  <option>Résidentiel</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Message</label>
                <textarea rows={4} placeholder="Décrivez votre besoin..." style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
                  outline: 'none', resize: 'none', background: '#fff',
                  fontFamily: 'inherit', boxSizing: 'border-box'
                }}
                  onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'}
                  onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
                <Send size={16} />
                Envoyer la demande
              </button>
            </form>
          </div>

          {/* Why us */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 24px' }}>Pourquoi Nous Choisir ?</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Intervention rapide dans tout Dakar',
                'Équipe certifiée et expérimentée',
                'Produits professionnels et écologiques',
                'Devis gratuit sous 24h',
                'Garantie satisfaction 100%',
                'Service client réactif 24/7',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: '#5a2a6d', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px'
                  }}>
                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .contact-info-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .contact-info-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
