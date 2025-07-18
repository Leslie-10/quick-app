// src/utils/getBackgroundImage.ts

export function getBackgroundImage(categorie: string): string {
  switch (categorie.toLowerCase()) {
    case "électricité":
      return "/backgrounds/electricite.jpg";
    case "plomberie":
      return "/backgrounds/plomberie.jpg";
    case "bricolage":
      return "/backgrounds/bricolage.jpg";
    case "garde d'enfants":
      return "/backgrounds/garde d'enfants.jpg";
    case "service d'entretien":
      return "/backgrounds/service d'entretien.jpg";
    case "déménagement":
      return "/backgrounds/déménagement.jpg";
    case "cours particuliers":
      return "/backgrounds/cours particuliers.jpg"
    default:
      return "/backgrounds/default.jpg"; // image générique
  }
}