import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  FileText,
  Receipt,
  Shield,
  Calendar,
  Download,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '14px',
  padding: '22px 24px',
  border: '1px solid #e8ecf1',
  boxShadow: '0 2px 12px rgba(30, 18, 40, 0.05)',
};

export function ClientHomePage() {
  const { user, profile } = useAuth();
  const [quoteCount, setQuoteCount] = useState<number | null>(null);
  const [invoiceCount, setInvoiceCount] = useState<number | null>(null);

  const displayName = profile?.full_name || profile?.email?.split('@')[0] || 'Partenaire';

  useEffect(() => {
    if (!supabase || !user) return;

    const loadCounts = async () => {
      const [quotesRes, invoicesRes] = await Promise.all([
        supabase
          .from('quotes')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', user.id),
        supabase
          .from('invoices')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', user.id),
      ]);
      setQuoteCount(quotesRes.count ?? 0);
      setInvoiceCount(invoicesRes.count ?? 0);
    };

    loadCounts();
  }, [user]);

  const stats = [
    {
      label: 'Devis',
      value: quoteCount === null ? '—' : String(quoteCount),
      sub: quoteCount === 0 ? 'Aucun en attente' : 'Voir la liste',
      icon: FileText,
      color: '#52337C',
      bg: '#F4F1F6',
      to: '/espace-client/devis',
    },
    {
      label: 'Factures',
      value: invoiceCount === null ? '—' : String(invoiceCount),
      sub: invoiceCount === 0 ? 'Aucune facture' : 'Consulter',
      icon: Receipt,
      color: '#b45309',
      bg: '#fff7ed',
      to: '/espace-client/factures',
    },
    {
      label: 'Certificats',
      value: '—',
      sub: 'Bientôt disponible',
      icon: Shield,
      color: '#15803d',
      bg: '#f0fdf4',
      to: '#',
    },
    {
      label: 'Interventions',
      value: '—',
      sub: 'Planning à venir',
      icon: Calendar,
      color: '#1d4ed8',
      bg: '#eff6ff',
      to: '#',
    },
  ];

  const quickActions = [
    { label: 'Demander un devis', icon: FileText, to: '/contact' },
    { label: 'Mes factures', icon: Download, to: '/espace-client/factures' },
    { label: 'Nous contacter', icon: Phone, to: '/contact' },
    { label: 'Messagerie', icon: MessageSquare, to: '/contact' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
          Bienvenue, {displayName} 👋
        </h2>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
          Voici un aperçu de votre espace partenaire Wood Clean Services.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '28px',
        }}
        className="stats-grid"
      >
        {stats.map(({ label, value, sub, icon: Icon, color, bg, to }) => (
          <Link
            key={label}
            to={to}
            style={{ ...cardStyle, textDecoration: 'none', cursor: to === '#' ? 'default' : 'pointer' }}
            onClick={(e) => to === '#' && e.preventDefault()}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              <Icon size={22} color={color} />
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px', fontWeight: 600 }}>{label}</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>{value}</p>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{sub}</p>
          </Link>
        ))}
      </div>

      <p style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '14px' }}>Actions rapides</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}
        className="actions-grid"
      >
        {quickActions.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              ...cardStyle,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: '#334155',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            <Icon size={20} color="#52337C" />
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .actions-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .stats-grid, .actions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
