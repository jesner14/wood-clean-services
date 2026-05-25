import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Header } from './components/Header';
import { SupabaseConfigBanner } from './components/SupabaseConfigBanner';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { AProposPage } from './pages/AProposPage';
import { ContactPage } from './pages/ContactPage';
import { EtablissementsPage } from './pages/EtablissementsPage';
import { RecrutementPage } from './pages/RecrutementPage';
import { ConnexionPage } from './pages/ConnexionPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { RegisterPage } from './pages/RegisterPage';
import { ClientLayout } from './layouts/ClientLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ClientHomePage } from './pages/client/ClientHomePage';
import { ClientQuotesPage } from './pages/client/ClientQuotesPage';
import { ClientInvoicesPage } from './pages/client/ClientInvoicesPage';
import { AdminHomePage } from './pages/admin/AdminHomePage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage';
import { AdminQuoteItemsPage } from './pages/admin/AdminQuoteItemsPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage';
import { AppProfilePage } from './pages/shared/AppProfilePage';
import { AppSettingsPage } from './pages/shared/AppSettingsPage';

function isAppAreaPath(pathname: string) {
  return pathname.startsWith('/espace-client') || pathname.startsWith('/admin');
}

function AppShell() {
  const { configured } = useAuth();
  const { pathname } = useLocation();
  const isAppArea = isAppAreaPath(pathname);

  return (
    <>
      {!configured && <SupabaseConfigBanner />}
      {!isAppArea && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/realisations" element={<RealisationsPage />} />
          <Route path="/a-propos" element={<AProposPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/etablissements/:type" element={<EtablissementsPage />} />
          <Route path="/recrutement" element={<RecrutementPage />} />
          <Route path="/connexion" element={<ConnexionPage />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
          <Route path="/reinitialiser-mot-de-passe" element={<ResetPasswordPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route
            path="/espace-client"
            element={
              <ProtectedRoute requiredRole="client">
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientHomePage />} />
            <Route path="devis" element={<ClientQuotesPage />} />
            <Route path="factures" element={<ClientInvoicesPage />} />
            <Route path="profil" element={<AppProfilePage />} />
            <Route path="parametres" element={<AppSettingsPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="demandes" element={<AdminRequestsPage />} />
            <Route path="devis" element={<AdminQuotesPage />} />
            <Route path="devis/lignes" element={<AdminQuoteItemsPage />} />
            <Route path="clients" element={<AdminClientsPage />} />
            <Route path="factures" element={<AdminInvoicesPage />} />
            <Route path="profil" element={<AppProfilePage />} />
            <Route path="parametres" element={<AppSettingsPage />} />
          </Route>
        </Routes>
      </main>
      {!isAppArea && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}
