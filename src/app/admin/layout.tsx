"use client";

import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { withAdminOnly } from "@/hooks/HOC";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default withAdminOnly(AdminLayout);