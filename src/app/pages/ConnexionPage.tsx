import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PageHero } from '../components/PageHero';
import { LogIn, Mail, Lock, Shield, FileText, Calendar, MessageSquare, Bell, Download, Phone } from 'lucide-react';

export function ConnexionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) navigate('/espace-client');
  };

  return (
    <>
      <PageHero
        bg="/assets/hero4.png"
        label="Espace Client"
        title="Plateforme Digitale"
        subtitle="Espace Client et Recrutement"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Connexion' }]}
      />

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="login-grid">
            {/* Formulaire connexion */}
            <div
              className="card-elevated"
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '48px',
                boxShadow: '0 12px 48px rgba(82,51,124,0.14)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#52337C15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LogIn size={26} color="#52337C" />
                </div>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Connexion</h2>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>Connectez-vous avec votre email</p>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <label style={labelStyle}>
                  <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Adresse email
                  <input
                    type="email"
                    required
                    style={inputStyle}
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label style={labelStyle}>
                  <Lock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Mot de passe
                  <input
                    type="password"
                    required
                    style={inputStyle}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#52337C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(82,51,124,0.35)',
                  }}
                >
                  Se connecter
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
                Vous cherchez du travail ?{' '}
                <Link to="/recrutement" style={{ color: '#52337C', fontWeight: 700 }}>
                  Inscrivez-vous ici
                </Link>
              </p>
            </div>

            {/* Présentation espace partenaire */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Shield size={28} color="#52337C" />
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Espace partenaire sécurisé</h2>
              </div>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
                Accès réservé aux restaurants, hôtels et entreprises sous contrat avec Wood Clean Services.
                Cet espace permet un échange structuré de documents et de communication professionnelle.
              </p>

              <p style={{ fontSize: '14px', fontWeight: 700, color: '#52337C', marginBottom: '16px' }}>Fonctionnalités principales</p>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '28px' }}>
                {[
                  { icon: Download, text: 'Téléchargement de devis & factures' },
                  { icon: Shield, text: 'Accès aux certificats de nettoyage' },
                  { icon: FileText, text: 'Historique des interventions' },
                  { icon: Calendar, text: 'Planning des prochaines interventions' },
                  { icon: MessageSquare, text: 'Messagerie directe avec l\'équipe Wood Clean' },
                  { icon: Bell, text: 'Notifications en temps réel' },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="card-elevated"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 18px',
                      background: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(82,51,124,0.08)',
                    }}
                  >
                    <Icon size={18} color="#52337C" />
                    <span style={{ fontSize: '14px', color: '#334155', fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '14px', fontWeight: 700, color: '#52337C', marginBottom: '12px' }}>Actions rapides</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Demander une intervention', 'Télécharger un document', 'Contacter le support'].map((action) => (
                  <span
                    key={action}
                    style={{
                      padding: '10px 16px',
                      background: '#F4F1F6',
                      color: '#52337C',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {action}
                  </span>
                ))}
              </div>

              <div
                className="card-elevated"
                style={{
                  marginTop: '28px',
                  padding: '24px',
                  background: 'linear-gradient(135deg, #52337C 0%, #3F275F 100%)',
                  borderRadius: '16px',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(82,51,124,0.25)',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 8px', opacity: 0.9 }}>Innovation proposée</p>
                <p style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px' }}>Score de conformité hygiène</p>
                <p style={{ fontSize: '32px', fontWeight: 900, margin: '8px 0' }}>95% conforme</p>
                <p style={{ fontSize: '13px', margin: 0, opacity: 0.85 }}>
                  Positionnez Wood Clean comme expert en sécurité et hygiène au Sénégal.
                </p>
              </div>

              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '24px',
                  color: '#52337C',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                <Phone size={16} /> Pas encore partenaire ? Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){ .login-grid { grid-template-columns:1fr!important } }`}</style>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '16px',
};

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: '6px',
  padding: '12px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '15px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};
