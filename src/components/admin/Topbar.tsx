import React from "react";
import { Bell, Menu, X } from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean; // Pass the state to determine which icon to show
}

export default function Topbar({ toggleSidebar, mobileSidebarOpen }: TopbarProps) {
  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger icon */}
        <button onClick={toggleSidebar} className="md:hidden block">
          {mobileSidebarOpen ? (
            <X className="w-6 h-6 text-gray-600" /> // Close icon
          ) : (
            <Menu className="w-6 h-6 text-gray-600" /> // Hamburger icon
          )}
        </button>
      
      </div>
      <button>
        <Bell className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}
