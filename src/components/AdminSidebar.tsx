"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  FileText,
  Layers,
  Briefcase,
  DollarSign,

} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: <Home size={18} /> },
  { href: "/admin/prestataires", label: "Prestataires", icon: <Users size={18} /> },
  { href: "/admin/candidatures", label: "Candidatures", icon: <FileText size={18} /> },
  { href: "/admin/annonces", label: "Annonces", icon: <Layers size={18} /> },
  { href: "/admin/categories", label: "Catégories", icon: <Briefcase size={18} /> },
  { href: "/admin/professions", label: "Professions", icon: <Briefcase size={18} /> },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: <Users size={18} /> },
  { href: "/admin/transactions", label: "Transactions", icon: <DollarSign size={18} /> },
  
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#f0f9fc] p-4 border-r h-full">
      <h2 className="text-lg font-semibold mb-6 text-gray-700">Admin Panel</h2>
      <ul className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-[#0CB2D4] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
