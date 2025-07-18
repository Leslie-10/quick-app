"use client";

import Link from "next/link";

const categories = [
  "Électricité",
  "Garde d’enfants",
  "Plomberie",
  "Service d’entretien",
  "Bricolage",
  "Déménagement",
  "Cours particuliers",
];

export default function SidebarCategories() {
  return (
    <nav className="w-48 bg-white shadow-lg rounded-r-2xl p-4 sticky top-0 h-screen">
      <h3 className="text-lg font-bold mb-6 border-l-4 border-pink-600 pl-3">
        Catégorie
      </h3>
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              href={`/besoins/formulaire?service=${encodeURIComponent(cat)}`}
              className="block py-2 px-3 rounded-lg hover:bg-pink-100 text-pink-600 font-medium"
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}