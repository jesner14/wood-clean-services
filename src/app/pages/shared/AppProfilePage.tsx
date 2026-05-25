import { useAuth } from '../../../contexts/AuthContext';
import { PlaceholderPanel } from '../../components/app/PlaceholderPanel';

export function AppProfilePage() {
  const { profile } = useAuth();

  return (
    <div style={{ maxWidth: '640px' }}>
      <div
        className="card-elevated"
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(30,18,40,0.06)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1e1829 0%, #52337C 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 800,
            marginBottom: '16px',
          }}
        >
          {(profile?.full_name || profile?.email || '?')
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
          {profile?.full_name || '—'}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{profile?.email}</p>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '12px 0 0' }}>
          Rôle : {profile?.role === 'admin' ? 'Administrateur' : 'Partenaire'}
        </p>
      </div>
      <PlaceholderPanel
        heading="Modification du profil"
        description="La mise à jour du nom et des coordonnées sera disponible prochainement."
      />
    </div>
  );
}
