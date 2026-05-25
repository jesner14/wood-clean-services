import { useCallback, useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Briefcase,
  Inbox,
  Archive,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  fetchQuoteRequests,
  updateQuoteRequestStatus,
} from '../../../lib/quoteRequests';
import type { QuoteRequest, QuoteRequestStatus } from '../../../lib/types';

const statusLabels: Record<QuoteRequestStatus, string> = {
  new: 'Nouvelle',
  read: 'Consultée',
  archived: 'Archivée',
};

const statusColors: Record<QuoteRequestStatus, { bg: string; color: string }> = {
  new: { bg: '#fef3c7', color: '#b45309' },
  read: { bg: '#dbeafe', color: '#1d4ed8' },
  archived: { bg: '#f1f5f9', color: '#64748b' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function AdminRequestsPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchQuoteRequests();
    if (fetchError) {
      setError(fetchError);
      setRequests([]);
    } else {
      setRequests(data);
      setSelectedId((prev) => {
        if (prev && data.some((r) => r.id === prev)) return prev;
        return data[0]?.id ?? null;
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selected = requests.find((r) => r.id === selectedId) ?? null;

  const handleSelect = async (req: QuoteRequest) => {
    setSelectedId(req.id);
    if (req.status === 'new') {
      setUpdating(true);
      const { error: updateError } = await updateQuoteRequestStatus(req.id, 'read');
      setUpdating(false);
      if (!updateError) {
        setRequests((prev) =>
          prev.map((r) => (r.id === req.id ? { ...r, status: 'read' as const } : r))
        );
      }
    }
  };

  const setStatus = async (id: string, status: QuoteRequestStatus) => {
    setUpdating(true);
    const { error: updateError } = await updateQuoteRequestStatus(id, status);
    setUpdating(false);
    if (!updateError) {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  };

  const newCount = requests.filter((r) => r.status === 'new').length;

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
            Formulaire « Obtenir un devis » du site public
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            {loading
              ? 'Chargement…'
              : `${requests.length} demande${requests.length !== 1 ? 's' : ''}${
                  newCount > 0 ? ` · ${newCount} nouvelle${newCount > 1 ? 's' : ''}` : ''
                }`}
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

      {!loading && !error && requests.length === 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
          }}
        >
          <Inbox size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#334155', margin: '0 0 8px' }}>
            Aucune demande pour le moment
          </p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Les demandes envoyées depuis la page Contact apparaîtront ici.
          </p>
        </div>
      )}

      {requests.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 360px) 1fr',
            gap: '20px',
            alignItems: 'start',
          }}
          className="requests-grid"
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
            {requests.map((req) => {
              const active = req.id === selectedId;
              const st = statusColors[req.status];
              return (
                <button
                  key={req.id}
                  type="button"
                  onClick={() => handleSelect(req)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px 18px',
                    border: 'none',
                    borderBottom: '1px solid #f1f5f9',
                    background: active ? '#F4F1F6' : '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{req.full_name}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: st.bg,
                        color: st.color,
                        flexShrink: 0,
                      }}
                    >
                      {statusLabels[req.status]}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px' }}>{req.service}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{formatDate(req.created_at)}</p>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {selected.full_name}
                </h2>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: statusColors[selected.status].bg,
                    color: statusColors[selected.status].color,
                  }}
                >
                  {statusLabels[selected.status]}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {[
                  { icon: Mail, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                  { icon: Phone, label: 'Téléphone', value: selected.phone || '—', href: selected.phone ? `tel:${selected.phone}` : undefined },
                  { icon: Briefcase, label: 'Service', value: selected.service },
                  { icon: Calendar, label: 'Reçue le', value: formatDate(selected.created_at) },
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
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', margin: '0 0 2px' }}>{label}</p>
                      {href && value !== '—' ? (
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

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <MessageSquare size={18} color="#52337C" />
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#475569', margin: 0 }}>Message</p>
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#334155',
                    lineHeight: 1.7,
                    margin: 0,
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {selected.message}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {selected.status !== 'read' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => setStatus(selected.id, 'read')}
                    style={actionBtnStyle}
                  >
                    <Check size={16} /> Marquer consultée
                  </button>
                )}
                {selected.status !== 'archived' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => setStatus(selected.id, 'archived')}
                    style={{ ...actionBtnStyle, color: '#64748b', borderColor: '#e2e8f0' }}
                  >
                    <Archive size={16} /> Archiver
                  </button>
                )}
                {selected.status === 'archived' && (
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => setStatus(selected.id, 'new')}
                    style={actionBtnStyle}
                  >
                    <Inbox size={16} /> Remettre en nouvelle
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .requests-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const actionBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  background: '#fff',
  border: '1px solid #52337C',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#52337C',
  cursor: 'pointer',
  fontFamily: 'inherit',
};
