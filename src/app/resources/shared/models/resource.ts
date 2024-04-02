export interface IResource {
  id?: string;
  title: string;
  body: string;
  link: string;
  imageUrl: string;
  tags: string[]; // Utiliser un tableau de chaînes pour les balises
}
