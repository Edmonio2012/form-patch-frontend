import React, { useEffect } from "react";
import { useLocation } from "wouter";
import AdminNav from "./AdminNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const sessionToken = localStorage.getItem("adminSessionToken");
    if (!sessionToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-background">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
