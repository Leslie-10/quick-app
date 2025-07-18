import { getBackgroundImage } from "@/utils/getBackgroundImage";

interface AnnonceProps {
  titre: string;
  description: string;
  categorie: string;
}

export default function AnnonceCard({ titre, description, categorie }: AnnonceProps) {
  const bgImage = getBackgroundImage(categorie);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md text-white relative bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})`, minHeight: "180px" }}
    >
      <div className="bg-black bg-opacity-50 p-4 h-full">
        <h2 className="text-xl font-bold">{titre}</h2>
        <p className="text-sm">{description}</p>
        <span className="absolute top-2 right-2 text-xs bg-white text-black px-2 py-1 rounded-full">
          {categorie}
        </span>
      </div>
    </div>
  );
}