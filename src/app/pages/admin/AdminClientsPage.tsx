import { useCallback, useEffect, useState } from 'react';
import { Mail, User, Calendar, RefreshCw, Users, UserX, UserCheck } from 'lucide-react';
import { fetchClientProfiles, setClientActive } from '../../../lib/clients';
import { isProfileActive } from '../../../lib/authMessages';
import type { Profile } from '../../../lib/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function initials(profile: Profile) {
  const name = profile.full_name?.trim() || profile.email;
  return name
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function AdminClientsPage() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchClientProfiles();
    if (fetchError) {
      setError(fetchError);
      setClients([]);
      setSelectedId(null);
    } else {
      setClients(data);
      setSelectedId((prev) => {
        if (prev && data.some((c) => c.id === prev)) return prev;
        return data[0]?.id ?? null;
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selected = clients.find((c) => c.id === selectedId) ?? null;
  const selectedActive = selected ? isProfileActive(selected) : true;

  const handleToggleActive = async () => {
    if (!selected) return;
    const nextActive = !isProfileActive(selected);
    const action = nextActive ? 'réactiver' : 'désactiver';
    if (!window.confirm(`Voulez-vous ${action} le compte de ${selected.full_name || selected.email} ?`)) {
      return;
    }
    setToggling(true);
    const { error: toggleError } = await setClientActive(selected.id, nextActive);
    setToggling(false);
    if (toggleError) {
      setError(toggleError);
      return;
    }
    setClients((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, is_active: nextActive } : c))
    );
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 4px' }}>
            Comptes partenaires (rôle client)
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            {loading
              ? 'Chargement…'
              : `${clients.length} client${clients.length !== 1 ? 's' : ''} enregistré${clients.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => load()}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#52337C',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <RefreshCw size={16} />
          Actualiser
        </button>
      </div>

      {error && (
        <p
          role="alert"
          style={{
            padding: '14px 18px',
            background: '#fef2f2',
            color: '#b91c1c',
            borderRadius: '12px',
            fontSize: '14px',
            marginBottom: '20px',
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && clients.length === 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
          }}
        >
          <Users size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#334155', margin: '0 0 8px' }}>
            Aucun compte client
          </p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Les comptes créés via l&apos;inscription apparaîtront ici (hors administrateurs).
          </p>
        </div>
      )}

      {clients.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 380px) 1fr',
            gap: '20px',
            alignItems: 'start',
          }}
          className="clients-grid"
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {clients.map((client) => {
              const active = client.id === selectedId;
              const label = client.full_name?.trim() || client.email;
              const clientActive = isProfileActive(client);
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => setSelectedId(client.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 16px',
                    border: 'none',
                    borderBottom: '1px solid #f1f5f9',
                    background: active ? '#F4F1F6' : '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e1829 0%, #52337C 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {initials(client)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0f172a',
                        margin: '0 0 2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#64748b',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {client.email}
                    </p>
                    {!clientActive && (
                      <span
                        style={{
                          display: 'inline-block',
                          marginTop: '6px',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: '#fef2f2',
                          color: '#b91c1c',
                        }}
                      >
                        Désactivé
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selected && (
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e1829 0%, #52337C 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 800,
                  }}
                >
                  {initials(selected)}
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                    {selected.full_name?.trim() || 'Sans nom'}
                  </h2>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      background: selectedActive ? '#F4F1F6' : '#fef2f2',
                      color: selectedActive ? '#52337C' : '#b91c1c',
                    }}
                  >
                    {selectedActive ? 'Compte actif' : 'Compte désactivé'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: Mail, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                  {
                    icon: User,
                    label: 'Nom complet',
                    value: selected.full_name?.trim() || '—',
                  },
                  {
                    icon: Calendar,
                    label: 'Inscrit le',
                    value: formatDate(selected.created_at),
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: '#F4F1F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color="#52337C" />
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', margin: '0 0 2px' }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} style={{ fontSize: '14px', color: '#52337C', fontWeight: 600 }}>
                          {value}
                        </a>
                      ) : (
                        <p style={{ fontSize: '14px', color: '#334155', margin: 0 }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '24px',
                  padding: '18px',
                  background: selectedActive ? '#f8fafc' : '#fef2f2',
                  borderRadius: '12px',
                  border: `1px solid ${selectedActive ? '#e2e8f0' : '#fecaca'}`,
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#334155', margin: '0 0 8px' }}>
                  Gestion du compte
                </p>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px', lineHeight: 1.6 }}>
                  {selectedActive
                    ? 'Ce client peut se connecter à l\'espace partenaire.'
                    : 'Ce client ne peut plus se connecter tant que le compte reste désactivé.'}
                </p>
                <button
                  type="button"
                  disabled={toggling}
                  onClick={handleToggleActive}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: toggling ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    background: selectedActive ? '#fef2f2' : '#52337C',
                    color: selectedActive ? '#b91c1c' : '#fff',
                    opacity: toggling ? 0.7 : 1,
                  }}
                >
                  {selectedActive ? (
                    <>
                      <UserX size={18} /> Désactiver le compte
                    </>
                  ) : (
                    <>
                      <UserCheck size={18} /> Réactiver le compte
                    </>
                  )}
                </button>
              </div>

              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '20px', lineHeight: 1.6 }}>
                Devis et factures liés à ce client restent consultables depuis les modules Devis et Factures.
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .clients-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
