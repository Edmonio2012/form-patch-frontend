import React, { useState } from "react";
import { useLocation } from "wouter";
import { BarChart3, Users, Settings, LogOut, Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminNav() {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const adminName = localStorage.getItem("adminName") || "Admin";

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: BarChart3 },
    { label: "Analytics", path: "/admin/analytics", icon: Shield },
    { label: "Leads", path: "/admin/leads", icon: Users },
    { label: "Features", path: "/admin/features", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminSessionToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 hover:bg-accent rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed md:relative w-64 h-screen bg-card border-r border-border p-4 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-8 mt-12 md:mt-0">
          <h1 className="text-xl font-bold">Space One</h1>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>

        <div className="mb-6 p-3 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium">{adminName}</p>
          <p className="text-xs text-muted-foreground">Administrator</p>
        </div>

        <div className="space-y-2 mb-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent/10 transition text-left"
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
