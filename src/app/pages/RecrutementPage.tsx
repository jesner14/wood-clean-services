import { useState } from 'react';
import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Briefcase, Send, CheckCircle } from 'lucide-react';

export function RecrutementPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    poste: '',
    experience: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageHero
          bg="/assets/hero2.png"
          label="Recrutement"
          title="Candidature envoyée"
          subtitle="Merci pour votre intérêt"
          breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Recrutement' }]}
        />
        <section style={{ padding: '80px 32px', textAlign: 'center' }}>
          <CheckCircle size={64} color="#52337C" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Votre candidature a bien été reçue</h2>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>Notre équipe RH vous contactera sous 48h ouvrées.</p>
          <Link to="/" style={{ color: '#52337C', fontWeight: 700 }}>Retour à l'accueil</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        bg="/assets/hero2.png"
        label="Inscription & Recrutement"
        title="Vous cherchez du travail ?"
        subtitle="Rejoignez l'équipe Wood Clean Services"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Recrutement' }]}
      />

      <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #F4F1F6 100%)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 32px' }}>
          <div
            className="card-elevated"
            style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 12px 48px rgba(82,51,124,0.14), 0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
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
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Inscription pour ceux qui cherchent du travail</h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>Remplissez le formulaire ci-dessous</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row">
                <label style={labelStyle}>
                  Nom *
                  <input required style={inputStyle} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                </label>
                <label style={labelStyle}>
                  Prénom *
                  <input required style={inputStyle} value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                </label>
              </div>
              <label style={labelStyle}>
                Email *
                <input type="email" required style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label style={labelStyle}>
                Téléphone *
                <input type="tel" required style={inputStyle} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
              </label>
              <label style={labelStyle}>
                Adresse
                <input style={inputStyle} value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })} />
              </label>
              <label style={labelStyle}>
                Poste souhaité *
                <select required style={inputStyle} value={form.poste} onChange={(e) => setForm({ ...form, poste: e.target.value })}>
                  <option value="">Sélectionnez un poste</option>
                  <option value="agent-nettoyage">Agent de nettoyage</option>
                  <option value="technicien-hotte">Technicien hottes</option>
                  <option value="superviseur">Superviseur d'équipe</option>
                  <option value="commercial">Commercial</option>
                  <option value="autre">Autre</option>
                </select>
              </label>
              <label style={labelStyle}>
                Expérience professionnelle
                <textarea
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="Décrivez brièvement votre parcours..."
                />
              </label>
              <label style={labelStyle}>
                Message / Motivation
                <textarea
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              <button
                type="submit"
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '16px',
                  background: '#52337C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(82,51,124,0.35)',
                }}
              >
                <Send size={18} /> Envoyer ma candidature
              </button>
            </form>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:640px){ .form-row { grid-template-columns:1fr!important } }`}</style>
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
