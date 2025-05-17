import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapsed state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // For mobile sidebar toggle

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // On mobile devices, toggle sidebar visibility
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      // On larger screens, use the collapsed state
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={toggleSidebar} mobileSidebarOpen={mobileSidebarOpen} />
        <main className="flex-1 p-4 overflow-auto bg-white-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
