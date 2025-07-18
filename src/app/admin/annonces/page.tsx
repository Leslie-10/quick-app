'use client'

import { useEffect, useState } from 'react'

export default function PageAdminAnnonces() {
  const [annonces, setAnnonces] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/annonces')
      .then(res => res.json())
      .then(data => {
        setAnnonces(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Erreur chargement annonces :', err)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Confirmer la suppression de cette annonce ?")
    if (!confirm) return

    try {
      const res = await fetch('/api/admin/annonces', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        setAnnonces(prev => prev.filter(a => a.id !== id))
      } else {
        const errorData = await res.json()
        alert("Erreur : " + (errorData.error || "Impossible de supprimer"))
      }
    } catch (error) {
      console.error("Erreur suppression :", error)
      alert("Erreur serveur")
    }
  }

  if (loading) return <p>Chargement...</p>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Annonces publiées</h1>
      {annonces.length === 0 ? (
        <p>Aucune annonce trouvée.</p>
      ) : (
        annonces.map((a) => (
          <div key={a.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-bold mb-2">{a.titre}</h2>
            
            <p className="text-gray-600">
              👤 {a.user?.nom ?? "Client inconnu"} – {a.user?.email ?? "Email inconnu"}
            </p>
            
            <p className="text-gray-600">
              Catégorie : {a.categorie?.nom ?? "Non catégorisé"}
            </p>

            <button
              onClick={() => handleDelete(a.id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded"
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  )
}
