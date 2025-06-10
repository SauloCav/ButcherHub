import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Global/Sidebar/Sidebar";
import WelcomePage from "./pages/Welcome/WelcomePage";
import MeatManagementPage from "./pages/MeatManagement/MeatManagementPage";
import BuyerManagementPage from "./pages/BuyerManagement/BuyerManagementPage";
import OrderManagementPage from "./pages/OrderManagement/OrderManagementPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginLeft: 200, flex: 1, padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/meats" element={<MeatManagementPage />} />
            <Route path="/buyers" element={<BuyerManagementPage />} />
            <Route path="/orders"   element={<OrderManagementPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}