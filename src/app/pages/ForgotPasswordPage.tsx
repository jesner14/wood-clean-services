import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Mail, KeyRound, Lock, HelpCircle } from 'lucide-react';
import {
  SECURITY_QUESTIONS,
  validateSecurityAnswers,
} from '../../lib/securityQuestions';
import { resetPasswordWithSecurityAnswers } from '../../lib/securityApi';
import { mapAuthError } from '../../lib/authErrors';

export function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState(['', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Indiquez votre adresse email.');
      return;
    }
    setStep(2);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateSecurityAnswers(answers);
    if (validation) {
      setError(validation);
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setSubmitting(true);
    const { error: resetError } = await resetPasswordWithSecurityAnswers(
      email.trim(),
      answers,
      password
    );
    setSubmitting(false);

    if (resetError) {
      setError(mapAuthError(resetError));
      return;
    }

    navigate('/connexion', {
      replace: true,
      state: { message: 'Mot de passe mis à jour. Connectez-vous avec votre nouveau mot de passe.' },
    });
  };

  return (
    <>
      <PageHero
        bg="/assets/hero4.png"
        label="Espace Client"
        title="Mot de passe oublié"
        subtitle="Répondez à vos questions de sécurité"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Connexion', to: '/connexion' },
          { label: 'Mot de passe oublié' },
        ]}
      />

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 32px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <KeyRound size={26} color="#52337C" />
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {step === 1 ? 'Votre email' : 'Questions de sécurité'}
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
                  {step === 1
                    ? 'Étape 1 sur 2'
                    : 'Répondez exactement comme à l\'inscription'}
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

            {step === 1 ? (
              <form onSubmit={handleEmailStep}>
                <label style={labelStyle}>
                  <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Adresse email du compte
                  <input
                    type="email"
                    required
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button type="submit" style={primaryBtn}>
                  Continuer
                </button>
              </form>
            ) : (
              <form onSubmit={handleReset}>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748b',
                    marginBottom: '20px',
                    lineHeight: 1.5,
                  }}
                >
                  Compte : <strong>{email}</strong>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      marginLeft: '8px',
                      background: 'none',
                      border: 'none',
                      color: '#52337C',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'inherit',
                    }}
                  >
                    Modifier
                  </button>
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
                      value={answers[i]}
                      onChange={(e) => {
                        const next = [...answers];
                        next[i] = e.target.value;
                        setAnswers(next);
                      }}
                    />
                  </label>
                ))}

                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#52337C',
                    margin: '8px 0 12px',
                  }}
                >
                  Nouveau mot de passe
                </p>
                <label style={labelStyle}>
                  <Lock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Mot de passe
                  <input
                    type="password"
                    required
                    minLength={6}
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label style={labelStyle}>
                  <Lock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Confirmer
                  <input
                    type="password"
                    required
                    minLength={6}
                    style={inputStyle}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
                <button type="submit" disabled={submitting} style={primaryBtn}>
                  {submitting ? 'Vérification…' : 'Réinitialiser le mot de passe'}
                </button>
              </form>
            )}

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
              <Link to="/connexion" style={{ color: '#52337C', fontWeight: 700 }}>
                ← Retour à la connexion
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

const primaryBtn: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  background: '#52337C',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: '16px',
  cursor: 'pointer',
};
