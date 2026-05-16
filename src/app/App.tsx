import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { AProposPage } from './pages/AProposPage';
import { ContactPage } from './pages/ContactPage';
import { EtablissementsPage } from './pages/EtablissementsPage';
import { RecrutementPage } from './pages/RecrutementPage';
import { ConnexionPage } from './pages/ConnexionPage';
import { EspaceClientPage } from './pages/EspaceClientPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
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
          <Route path="/espace-client" element={<EspaceClientPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
