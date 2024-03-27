export interface IResource {
  resourceId: number;
  title: string;
  body: string;
  link: string;
  imageUrl: string;
  tags: {
    sinformer: boolean;
    reduire: boolean;
    reutiliser: boolean;
    substituer: boolean;
  };
}
