import { Injectable } from '@angular/core';
import { IResource } from '../models/resource';
import { ITag } from '../models/tag';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { where } from 'firebase/firestore';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class ResourceData {
  

  constructor(private db: Firestore) {}

  // resources_db = this.db.collection('resources').valueChanges({ idField: 'id' }) as Observable<IResource[]>;
  // tags_db = this.db.collection('tags').valueChanges({ idField: 'id' }) as Observable<ITag[]>;

  //TODO : ADD TAGS TO DB
  addResource(newResource : IResource): void {
    this.db.collection('resources').add(newResource);
  }

  //TODO : ADD TAGS TO DB
  updateResource(resource: IResource): void {
    this.db.collection('resources').doc(resource.id).update(resource);
  }

  getResourceById(id: string): IResource {
    const ledoc = this.db.doc('collectionName/docID');
    console.log("id: ", id);
    const res = this.db.collection('resources').ref.where('id', '==', id).get();
    console.log(res);

    res.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    });

    const out = {
      id: '0',
      title: 'On est dans getResourceById',
      body: 'Body',
      link: 'Link',
      imageUrl: 'Image',
      tags: ['tag1', 'tag2']
    };
    
    return out;
  }

  async getResources() {
    return (
     await getDocs(query(collection(this.db, 'resources')))
    ).docs.map((robots) => robots.data());
   }

  deleteResource(resource: IResource): void {
    this.db.collection('resources').doc(resource.id).delete();
  }

  getAvailableTags(): string[] {
    //TODO
    return ["0"];
  }
}
