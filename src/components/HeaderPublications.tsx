"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { PlusIcon, User } from "lucide-react";
import FormulaireBesoinModal from "./FormulaireBesoinModal";

export default function HeaderPublications() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigateTo = (path: string) => {
    setShowMenu(false);
    window.location.href = path;
  };
    const [showNotifications, setShowNotifications] = useState(false);

// Faux exemple de notifications (tu pourras remplacer par un fetch API plus tard)
const notifications = [
  {
    id: 1,
    message: "🎉 Votre candidature a été acceptée !",
    date: "Il y a 2h",
    lu: false,
  },
  {
    id: 2,
    message: "✉️ Nouveau message d’un client",
    date: "Il y a 1j",
    lu: true,
  },
];

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="absolute right-6 top-4 flex items-center gap-4">
                                 {/* Icône de cloche */}
<div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative p-2 rounded-full bg-white shadow hover:bg-gray-100"
    title="Notifications"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-[#0CB2D4]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>

    {/* Point rouge si une notification non lue */}
    {notifications.some((n) => !n.lu) && (
      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
    )}
  </button>

  {/* Menu déroulant */}
  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto p-2">
      <h4 className="text-sm font-semibold text-gray-700 px-2 mb-2">Notifications</h4>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`px-3 py-2 text-sm rounded-lg mb-1 ${
            notif.lu ? "bg-gray-50 text-gray-500" : "bg-[#E0F7FB] text-gray-800 font-medium"
          }`}
        >
          <p>{notif.message}</p>
          <p className="text-xs text-gray-400">{notif.date}</p>
        </div>
      ))}
    </div>
  )}
</div>

        {/* Icône du bonhomme */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            title="Mon compte"
          >
            <User size={24} className="text-[#0CB2D4]" />
          </button>

          {/* Menu déroulant */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-700 rounded-xl shadow-xl p-2 z-50">
              <button
                onClick={() => navigateTo("/profil/mes-annonces")}
                className="menu-item"
              >
                 Mes annonces
              </button><br />

              <button
                onClick={() => navigateTo("/profil/mes-travaux")}
                className="menu-item"
              >
                 Mes travaux
              </button><br />

              <button
                onClick={() => navigateTo("/profil/portefeuille")}
                className="menu-item"
              >
                 Mon portefeuille
              </button><br />

              <button
                onClick={() => navigateTo("/profil/compte")}
                className="menu-item"
              >
                 Mon compte
              </button><br />

  

              <button
                onClick={() => navigateTo("/profil/mes-besoins")}
                className="menu-item"
              >
                 Mes besoins publiés
              </button><br />

              <button
                onClick={() => navigateTo("/aide")}
                className="menu-item"
              >
                 Besoin d’aide
              </button><br />


            </div>
          )}
        </div>

        {/* Bouton Publier un besoin */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#0CB2D4] text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          <PlusIcon size={18} /> Publier un besoin
        </button>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-xl">
            <FormulaireBesoinModal onClose={() => setOpen(false)} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
}