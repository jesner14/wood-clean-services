import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Lock, KeyRound } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { mapAuthError } from '../../lib/authErrors';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setReady(true);
      setChecking(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setReady(true);
        setChecking(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
    if (!supabase) {
      setError('Supabase non configuré.');
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(mapAuthError(updateError.message));
      return;
    }

    navigate('/connexion', {
      replace: true,
      state: { message: 'Mot de passe mis à jour. Vous pouvez vous connecter.' },
    });
  };

  return (
    <>
      <PageHero
        bg="/assets/hero4.png"
        label="Espace Client"
        title="Nouveau mot de passe"
        subtitle="Choisissez un mot de passe sécurisé"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Connexion', to: '/connexion' },
          { label: 'Réinitialisation' },
        ]}
      />

      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 32px' }}>
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
            {checking ? (
              <p style={{ color: '#64748b', textAlign: 'center' }}>Vérification du lien…</p>
            ) : !ready ? (
              <>
                <p style={{ color: '#b91c1c', marginBottom: '16px', lineHeight: 1.6 }}>
                  Lien invalide ou expiré. Demandez un nouveau lien depuis la page mot de passe oublié.
                </p>
                <Link to="/mot-de-passe-oublie" style={{ color: '#52337C', fontWeight: 700 }}>
                  Mot de passe oublié →
                </Link>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <KeyRound size={26} color="#52337C" />
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Nouveau mot de passe
                  </h2>
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

                <form onSubmit={handleSubmit}>
                  <label style={labelStyle}>
                    <Lock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Nouveau mot de passe
                    <input
                      type="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
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
                      autoComplete="new-password"
                      style={inputStyle}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
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
                    }}
                  >
                    {submitting ? 'Enregistrement…' : 'Enregistrer le mot de passe'}
                  </button>
                </form>
              </>
            )}
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
