import { Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Receipt,
  FileText,
  ClipboardList,
  ListTree,
  User,
  Settings,
  Inbox,
} from 'lucide-react';
import { AppShellLayout } from '../components/app/AppShellLayout';

const pageTitles: Record<string, string> = {
  '/admin': 'Tableau de bord',
  '/admin/demandes': 'Demandes',
  '/admin/devis': 'Gestion des devis',
  '/admin/devis/lignes': 'Lignes de devis',
  '/admin/clients': 'Clients',
  '/admin/factures': 'Factures',
  '/admin/profil': 'Mon profil',
  '/admin/parametres': 'Paramètres',
};

export function AdminLayout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Administration';

  return (
    <AppShellLayout
      areaLabel="Administration"
      title={title}
      dashboardLink={{
        label: 'Tableau de bord',
        to: '/admin',
        icon: LayoutDashboard,
        end: true,
      }}
      navLinks={[
        { label: 'Demandes', to: '/admin/demandes', icon: Inbox },
        { label: 'Clients', to: '/admin/clients', icon: Users },
        { label: 'Factures', to: '/admin/factures', icon: Receipt },
      ]}
      navDropdowns={[
        {
          label: 'Devis',
          icon: FileText,
          basePath: '/admin/devis',
          children: [
            { label: 'Gestion des devis', to: '/admin/devis', icon: ClipboardList },
            { label: 'Lignes de devis', to: '/admin/devis/lignes', icon: ListTree },
          ],
        },
      ]}
      footerLinks={[
        { label: 'Mon profil', to: '/admin/profil', icon: User },
        { label: 'Paramètres', to: '/admin/parametres', icon: Settings },
      ]}
    >
      <Outlet />
    </AppShellLayout>
  );
}
