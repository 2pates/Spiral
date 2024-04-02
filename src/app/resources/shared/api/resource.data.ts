import { Injectable } from '@angular/core';
import { IResource } from '../models/resource';
import { ITag } from '../models/tag';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceData {
  

  constructor(private db: AngularFirestore) {}

  resources_db = this.db.collection('resources').valueChanges({ idField: 'id' }) as Observable<IResource[]>;
  tags_db = this.db.collection('tags').valueChanges({ idField: 'id' }) as Observable<ITag[]>;




  addResource(newResource : IResource): void {
    // const resource: IResource = {
    //   title: 'Nouvelle ressource',
    //   body: 'Contenu de la ressource',
    //   link: 'https://www.google.com',
    //   imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    //   tags: ['random'],
    // };
    this.db.collection('resources').add(newResource);
  }

  // updateResource(resource: IResource): void {
  //   resource.tags.forEach((tag) => {
  //     if (!this.availableTags.includes(tag)) {
  //       this.availableTags.push(tag);
  //     }
  //   });
  // }

  // getAvailableTags(): string[] {
  //   return this.availableTags;
  // }
}
