import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { DeleteAccountPage } from './pages/DeleteAccountPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SupportPage } from './pages/SupportPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="privacidade" element={<PrivacyPage />} />
        <Route path="excluir-conta" element={<DeleteAccountPage />} />
        <Route path="suporte" element={<SupportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
