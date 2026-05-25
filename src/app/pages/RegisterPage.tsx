import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PageHero } from '../components/PageHero';
import { UserPlus, Mail, Lock, User, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SECURITY_QUESTIONS, validateSecurityAnswers } from '../../lib/securityQuestions';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityAnswers, setSecurityAnswers] = useState(['', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    const securityValidation = validateSecurityAnswers(securityAnswers);
    if (securityValidation) {
      setError(securityValidation);
      return;
    }

    setSubmitting(true);
    const { error: signUpError } = await signUp(
      email.trim(),
      password,
      fullName.trim(),
      securityAnswers
    );
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError);
      return;
    }

    navigate('/espace-client', { replace: true });
  };

  return (
    <>
      <PageHero
        bg="/assets/hero4.png"
        label="Espace Client"
        title="Créer un compte"
        subtitle="Inscription partenaire — connexion immédiate, sans email de confirmation"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Connexion', to: '/connexion' },
          { label: 'Inscription' },
        ]}
      />

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 32px' }}>
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
                <UserPlus size={26} color="#52337C" />
              </div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Inscription
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
                  3 questions de sécurité pour récupérer votre mot de passe
                </p>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                style={{
                  padding: '12px 16px',
                  background: '#fef2f2',
                  color: '#b91c1c',
                  borderRadius: '10px',
                  fontSize: '14px',
                  marginBottom: '20px',
                }}
              >
                {error}
              </p>
            )}

            <form onSubmit={handleRegister}>
              <label style={labelStyle}>
                <User size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Nom complet
                <input
                  type="text"
                  required
                  style={inputStyle}
                  placeholder="Votre établissement ou nom"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
              <label style={labelStyle}>
                <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Adresse email
                <input
                  type="email"
                  required
                  autoComplete="email"
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
                  minLength={6}
                  autoComplete="new-password"
                  style={inputStyle}
                  placeholder="6 caractères minimum"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label style={labelStyle}>
                <Lock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Confirmer le mot de passe
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  style={{
                    ...inputStyle,
                    borderColor:
                      confirmPassword && password !== confirmPassword ? '#fca5a5' : '#e2e8f0',
                  }}
                  placeholder="Retapez le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              {confirmPassword && password !== confirmPassword && (
                <p style={{ fontSize: '13px', color: '#b91c1c', margin: '-8px 0 16px' }}>
                  Les mots de passe ne correspondent pas.
                </p>
              )}

              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#52337C',
                  margin: '24px 0 16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #e2e8f0',
                }}
              >
                Questions de sécurité
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>
                Notez vos réponses : elles seront demandées en cas de mot de passe oublié (mêmes
                mots, minuscules/majuscules ignorées).
              </p>
              {SECURITY_QUESTIONS.map((q, i) => (
                <label key={i} style={labelStyle}>
                  <HelpCircle
                    size={14}
                    style={{ marginRight: '6px', verticalAlign: 'middle' }}
                  />
                  {q}
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    style={inputStyle}
                    value={securityAnswers[i]}
                    onChange={(e) => {
                      const next = [...securityAnswers];
                      next[i] = e.target.value;
                      setSecurityAnswers(next);
                    }}
                  />
                </label>
              ))}

              <button
                type="submit"
                disabled={submitting || (!!confirmPassword && password !== confirmPassword)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: submitting ? '#94a3b8' : '#52337C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 20px rgba(82,51,124,0.35)',
                }}
              >
                {submitting ? 'Création…' : 'Créer mon compte'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
              Déjà inscrit ?{' '}
              <Link to="/connexion" style={{ color: '#52337C', fontWeight: 700 }}>
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </section>
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
