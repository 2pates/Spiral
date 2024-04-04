import { DocumentReference } from '@angular/fire/firestore';

export class Resource {
  id?: string;
  title?: string;
  body?: string;
  link?: string;
  imageUrl?: string;
  tags?: DocumentReference[];
}
