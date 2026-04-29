import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';

const info = [
  { icon: Phone, title: 'Téléphone', detail: '+221 XX XXX XX XX', link: 'tel:+221XXXXXXXXX', color: '#5a2a6d' },
  { icon: Mail, title: 'Email', detail: 'contact@woodclean.sn', link: 'mailto:contact@woodclean.sn', color: '#e57b7f' },
  { icon: MapPin, title: 'Adresse', detail: 'Plateau, Dakar, Sénégal', link: '#', color: '#8e5a9c' },
  { icon: Clock, title: 'Horaires', detail: 'Lun–Sam : 8h–18h\nUrgences 24/7', link: '#', color: '#411d51' },
];

const whyUs = ['Intervention rapide dans tout Dakar', 'Équipe certifiée et expérimentée', 'Produits professionnels et écologiques', 'Devis gratuit sous 24h', 'Garantie satisfaction 100%', 'Service client réactif 24/7'];

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        bg="/assets/hero2.png"
        label="Contactez-Nous"
        title="Parlons de Votre Projet"
        subtitle="Devis gratuit sous 24h — Disponibles 24/7 pour les urgences"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]}
      />

      {/* Info cards */}
      <section style={{ padding: '64px 0 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }} className="cinfo-grid">
            {info.map((c, i) => {
              const Icon = c.icon;
              return (
                <a key={i} href={c.link} style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 12px 32px ${c.color}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={22} color={c.color} /></div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{c.title}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', whiteSpace: 'pre-line' }}>{c.detail}</div>
                  </div>
                </a>
              );
            })}
          </div>
          <style>{`
            @media(max-width:1024px){ .cinfo-grid { grid-template-columns:repeat(2,1fr)!important } }
            @media(max-width:640px){ .cinfo-grid { grid-template-columns:1fr!important } }
          `}</style>
        </div>
      </section>

      {/* Form + Why */}
      <section style={{ padding: '48px 0 80px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px' }} className="cform-grid">
          {/* Form */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 28px' }}>Demande de Devis Gratuit</h2>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: '16px', textAlign: 'center' }}>
                <CheckCircle size={60} color="#5a2a6d" />
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Message envoyé !</h3>
                <p style={{ color: '#475569', fontSize: '15px', margin: 0 }}>Nous vous répondrons sous 24h. Merci de votre confiance.</p>
              </div>
            ) : (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} onSubmit={e => { e.preventDefault(); setSent(true); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[{ label: 'Nom complet', type: 'text', ph: 'Votre nom' }, { label: 'Téléphone', type: 'tel', ph: '+221 XX XXX XX XX' }].map((f, i) => (
                    <div key={i}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>{f.label}</label>
                      <input required type={f.type} placeholder={f.ph} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'} onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Email</label>
                  <input required type="email" placeholder="votre@email.com" style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'} onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Service souhaité</label>
                  <select style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
                    <option>Nettoyage cuisine professionnelle</option>
                    <option>Hottes et ventilation</option>
                    <option>Grand ménage hôtel / restaurant</option>
                    <option>Chambres froides</option>
                    <option>Nettoyage résidentiel</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Message</label>
                  <textarea required rows={5} placeholder="Décrivez votre besoin en détail..." style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border 0.2s' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#5a2a6d'} onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'} />
                </div>
                <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: '#5a2a6d', color: '#fff', fontWeight: 800, fontSize: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(90,42,109,0.35)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#411d51'} onMouseLeave={e => e.currentTarget.style.background = '#5a2a6d'}>
                  <Send size={16} /> Envoyer ma demande
                </button>
              </form>
            )}
          </div>

          {/* Why + Map placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 20px' }}>Pourquoi Nous Choisir ?</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {whyUs.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#5a2a6d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#1A0F2E 0%,#5a2a6d 100%)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>24h</div>
              <div style={{ fontSize: '14px', color: '#dcbadd', marginTop: '8px', fontWeight: 600 }}>Délai de réponse garanti</div>
              <div style={{ marginTop: '20px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', lineHeight: 1, marginTop: '20px' }}>100%</div>
              <div style={{ fontSize: '14px', color: '#dcbadd', marginTop: '8px', fontWeight: 600 }}>Satisfaction garantie</div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .cform-grid { grid-template-columns:1fr!important } }`}</style>
      </section>
    </>
  );
}
