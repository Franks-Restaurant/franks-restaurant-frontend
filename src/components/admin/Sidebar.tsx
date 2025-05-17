import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Percent,
  List,
  LogOut,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/store/slices/auth/auth.slice";
import { AppDispatch } from "@/store";

interface SidebarProps {
  collapsed: boolean;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  collapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: SidebarProps) {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate("/", { replace: true }); // Redirect after logout
  };

  return (
    <div
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-white shadow-md h-screen flex flex-col fixed md:relative z-50 ${
        mobileSidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      {/* Main content */}
      <div className="flex flex-col flex-1 h-[94%]">
        {/* Mobile header */}
        {!collapsed && (
          <div className="px-4 py-3 border-b md:border-none">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold pt-2 pb-1 px-1">Admin Panel</h1>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="md:hidden text-gray-600 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto border-t">
          <NavItem
            to="dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavItem
            to="orders"
            icon={<ClipboardList className="w-5 h-5" />}
            label="Orders"
            collapsed={collapsed}
          />
          <NavItem
            to="offers"
            icon={<Percent className="w-5 h-5" />}
            label="Offers"
            collapsed={collapsed}
          />
          <NavItem
            to="menu"
            icon={<List className="w-5 h-5" />}
            label="Menu List"
            collapsed={collapsed}
          />
        </div>
      </div>

      {/* Logout always pinned at the bottom */}
      <div className="p-4 border-t mt-auto">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700" onClick={handleLogout}> 
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-md hover:bg-blue-100 text-gray-700 ${
          isActive ? "bg-blue-100 font-semibold text-blue-600" : ""
        }`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
