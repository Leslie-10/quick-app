"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: number;
  message: string;
  date: string;
  lu: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  const markAsRead = (id: number) => {
    const updated = notifications.map((notif) =>
      notif.id === id ? { ...notif, lu: true } : notif
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  if (notifications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Aucune notification pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#0CB2D4]">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map(({ id, message, date, lu }) => (
          <li
            key={id}
            className={`p-4 rounded-lg shadow ${
              lu ? "bg-gray-100" : "bg-white border-2 border-[#0CB2D4]"
            }`}
          >
            <p className="mb-1">{message}</p>
            <small className="text-gray-400">{date}</small>
            {!lu && (
              <button
                onClick={() => markAsRead(id)}
                className="ml-4 text-sm text-[#0CB2D4] hover:underline"
              >
                Marquer comme lu
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}