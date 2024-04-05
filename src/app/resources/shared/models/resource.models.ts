import { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Tag } from './tag.models';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

export class Resource {
  id?: string;
  title?: string;
  body?: string;
  link?: string;
  imageUrl?: string;
  tags?: string[];
}
