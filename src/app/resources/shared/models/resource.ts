export interface IResource {
  id: number;
  title: string;
  body: string;
  link: string;
  imageUrl: string;
  tags: string[]; // Utiliser un tableau de chaînes pour les balises
}
