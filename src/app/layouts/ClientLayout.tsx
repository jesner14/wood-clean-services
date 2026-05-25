import { Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard,
  FileText,
  Receipt,
  User,
  Settings,
} from 'lucide-react';
import { AppShellLayout } from '../components/app/AppShellLayout';

const pageTitles: Record<string, string> = {
  '/espace-client': 'Tableau de bord',
  '/espace-client/devis': 'Mes devis',
  '/espace-client/factures': 'Mes factures',
  '/espace-client/profil': 'Mon profil',
  '/espace-client/parametres': 'Paramètres',
};

export function ClientLayout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Espace partenaire';

  return (
    <AppShellLayout
      areaLabel="Espace partenaire"
      title={title}
      dashboardLink={{
        label: 'Tableau de bord',
        to: '/espace-client',
        icon: LayoutDashboard,
        end: true,
      }}
      navLinks={[
        { label: 'Mes devis', to: '/espace-client/devis', icon: FileText },
        { label: 'Mes factures', to: '/espace-client/factures', icon: Receipt },
      ]}
      footerLinks={[
        { label: 'Mon profil', to: '/espace-client/profil', icon: User },
        { label: 'Paramètres', to: '/espace-client/parametres', icon: Settings },
      ]}
    >
      <Outlet />
    </AppShellLayout>
  );
}
