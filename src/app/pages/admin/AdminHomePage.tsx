import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ClipboardList, Users, Receipt, Inbox } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchAdminDashboardCounts } from '../../../lib/adminStats';
import type { AdminDashboardCounts } from '../../../lib/adminStats';

type DashboardCard = {
  key: keyof AdminDashboardCounts;
  label: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  to: string;
  color: string;
  iconBg: string;
};

const cards: DashboardCard[] = [
  {
    key: 'demandes',
    label: 'Demandes',
    desc: 'Formulaire « Obtenir un devis »',
    icon: Inbox,
    to: '/admin/demandes',
    color: '#d97706',
    iconBg: '#fff7ed',
  },
  {
    key: 'devis',
    label: 'Devis',
    desc: 'Propositions partenaires',
    icon: ClipboardList,
    to: '/admin/devis',
    color: '#52337C',
    iconBg: '#F4F1F6',
  },
  {
    key: 'factures',
    label: 'Factures',
    desc: 'Émission et suivi',
    icon: Receipt,
    to: '/admin/factures',
    color: '#dc2626',
    iconBg: '#fef2f2',
  },
  {
    key: 'clients',
    label: 'Clients',
    desc: 'Comptes partenaires',
    icon: Users,
    to: '/admin/clients',
    color: '#2563eb',
    iconBg: '#eff6ff',
  },
];

export function AdminHomePage() {
  const { profile } = useAuth();
  const displayName = profile?.full_name || profile?.email?.split('@')[0] || 'Administrateur';
  const [counts, setCounts] = useState<AdminDashboardCounts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboardCounts().then(({ counts: c, error }) => {
      if (!error && c) setCounts(c);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
          Bonjour, {displayName} 👋
        </h2>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
          Vue d&apos;ensemble de l&apos;activité Wood Clean Services.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
        className="admin-home-grid"
      >
        {cards.map(({ key, label, desc, icon: Icon, to, color, iconBg }) => {
          const value = loading ? '—' : String(counts?.[key] ?? 0);
          return (
            <Link
              key={key}
              to={to}
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '22px 24px',
                border: '1px solid #e8ecf1',
                boxShadow: '0 2px 12px rgba(30, 18, 40, 0.05)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color={color} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                    {label}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              </div>
              <span
                style={{
                  fontSize: '42px',
                  fontWeight: 900,
                  color,
                  lineHeight: 1,
                  flexShrink: 0,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {value}
              </span>
            </Link>
          );
        })}
      </div>

      <style>{`@media(max-width:640px){ .admin-home-grid { grid-template-columns:1fr!important } }`}</style>
    </div>
  );
}
