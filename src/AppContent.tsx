// src/AppContent.tsx
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Locations from "./pages/Locations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";

import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/admin/Dashboard";
import Orders from "./components/admin/Orders";
import Offers from "./components/admin/Offers";
import MenuAdmin from "./components/admin/Menu";

const AppContent = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/locations" element={<Locations />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />

    <Route
      path="/admin"
      element={
        <PrivateRoute>
          <AdminPage />
        </PrivateRoute>
      }
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orders" element={<Orders />} />
      <Route path="offers" element={<Offers />} />
      <Route path="menu" element={<MenuAdmin />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppContent;
