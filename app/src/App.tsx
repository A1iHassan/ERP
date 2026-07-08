import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/protected";
import AppLayout from "./layouts/AppLayout";
import AssetsPage from "./pages/AssetsPage";
import UsersPage from "./pages/UsersPage";
import StatisticsPage from "./pages/StatisticsPage";
import CustomizationPage from "./pages/CustomizationPage";
import SettingsPage from "./pages/SettingsPage";
import Sales from "./pages/sales";


export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/auth" element={<Auth />} />
	<Route element={<Protected />}>
          <Route path="/" element={<Navigate to="/assets" replace />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/customization" element={<CustomizationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
	</Route>
      </Route>
    </Routes>
  );
}
