import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { submitQuoteRequest } from '../../lib/quoteRequests';

const SERVICES = [
  'Nettoyage cuisine professionnelle',
  'Hottes et ventilation',
  'Grand ménage hôtel / restaurant',
  'Chambres froides',
  'Nettoyage résidentiel',
  'Autre',
];

const info = [
  { icon: Phone, title: 'Téléphone', detail: '+221 XX XXX XX XX', link: 'tel:+221XXXXXXXXX', color: '#52337C' },
  { icon: Mail, title: 'Email', detail: 'contact@woodclean.sn', link: 'mailto:contact@woodclean.sn', color: '#EB8E8C' },
  { icon: MapPin, title: 'Adresse', detail: 'Plateau, Dakar, Sénégal', link: '#', color: '#785A8F' },
  { icon: Clock, title: 'Horaires', detail: 'Lun–Sam : 8h–18h\nUrgences 24/7', link: '#', color: '#3F275F' },
];

const whyUs = ['Intervention rapide dans tout Dakar', 'Équipe certifiée et expérimentée', 'Produits professionnels et écologiques', 'Devis gratuit sous 24h', 'Garantie satisfaction 100%', 'Service client réactif 24/7'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#0f172a',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border 0.2s',
};

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState('');
  useScrollToHash();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: submitError } = await submitQuoteRequest({
      fullName,
      phone,
      email,
      service,
      message,
    });

    setSubmitting(false);
    if (submitError) {
      setError(submitError);
      return;
    }
    setSent(true);
  };

  return (
    <>
      <PageHero
        bg="/assets/hero2.png"
        label="Contactez-Nous"
        title="Parlons de Votre Projet"
        subtitle="Devis gratuit sous 24h — Disponibles 24/7 pour les urgences"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]}
      />

      <section style={{ padding: '64px 0 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }} className="cinfo-grid">
            {info.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={i}
                  href={c.link}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    textDecoration: 'none',
                    transition: 'all 0.25s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = c.color;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${c.color}18`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${c.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color={c.color} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '4px',
                      }}
                    >
                      {c.title}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', whiteSpace: 'pre-line' }}>
                      {c.detail}
                    </div>
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

      <section id="devis" style={{ padding: '48px 0 80px', background: '#f8fafc', scrollMarginTop: '108px' }}>
        <div
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px' }}
          className="cform-grid"
        >
          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 28px' }}>
              Demande de Devis Gratuit
            </h2>
            {sent ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 20px',
                  gap: '16px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={60} color="#52337C" />
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Demande envoyée !</h3>
                <p style={{ color: '#475569', fontSize: '15px', margin: 0 }}>
                  Nous avons bien reçu votre demande. Notre équipe vous répondra sous 24h.
                </p>
              </div>
            ) : (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} onSubmit={handleSubmit}>
                {error && (
                  <p
                    role="alert"
                    style={{
                      padding: '12px 16px',
                      background: '#fef2f2',
                      color: '#b91c1c',
                      borderRadius: '10px',
                      fontSize: '14px',
                      margin: 0,
                    }}
                  >
                    {error}
                  </p>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                      Nom complet
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Votre nom"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#52337C')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                      Téléphone
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+221 XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#52337C')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#52337C')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Service souhaité
                  </label>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    style={{ ...inputStyle, background: '#fff' }}
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Décrivez votre besoin en détail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#52337C')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px',
                    background: submitting ? '#94a3b8' : '#52337C',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '15px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 20px rgba(82,51,124,0.35)',
                    transition: 'background 0.2s',
                  }}
                >
                  <Send size={16} /> {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 20px' }}>
                Pourquoi Nous Choisir ?
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {whyUs.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#52337C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg,#1E1228 0%,#52337C 100%)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '40px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>24h</div>
              <div style={{ fontSize: '14px', color: '#D4CCD9', marginTop: '8px', fontWeight: 600 }}>
                Délai de réponse garanti
              </div>
              <div style={{ marginTop: '20px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', lineHeight: 1, marginTop: '20px' }}>100%</div>
              <div style={{ fontSize: '14px', color: '#D4CCD9', marginTop: '8px', fontWeight: 600 }}>
                Satisfaction garantie
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .cform-grid { grid-template-columns:1fr!important } }`}</style>
      </section>
    </>
  );
}
