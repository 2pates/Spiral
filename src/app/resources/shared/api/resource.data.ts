import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.models';
import { ITag } from '../models/tag';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { where } from 'firebase/firestore';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResourceData {
  private dbPath = '/resources';
  // resources_db: Observable<Resource[]>;
  // tags_db: Observable<ITag[]>;
  resources_db: AngularFirestoreCollection<Resource>;

  constructor(private db: AngularFirestore) {
    // this.resources_db = this.db
    //   .collection('resources')
    //   .valueChanges({ idField: 'id' }) as Observable<Resource[]>;
    // this.tags_db = this.db
    //   .collection('tags')
    //   .valueChanges({ idField: 'id' }) as Observable<ITag[]>;
    this.resources_db = db.collection(this.dbPath);
  }

  getResources(): AngularFirestoreCollection<Resource> {
    return this.resources_db;
  }

  //TODO : ADD TAGS TO DB
  addResource(newResource: Resource): any {
    return this.resources_db.add(newResource);
  }

  //TODO : ADD TAGS TO DB
  updateResource(resource: Resource): Promise<void> {
    //Promet un objet qui représente l'achévement ou l'échec
    return this.resources_db.doc(resource.id).update(resource);
  }

  deleteResource(resource: Resource): Promise<void> {
    return this.resources_db.doc(resource.id).delete();
  }

  getResourceById(id: string): Resource {
    const ledoc = this.db.doc('collectionName/docID');
    console.log('id: ', id);
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
      tags: ['tag1', 'tag2'],
    };

    return out;
  }

  getAvailableTags(): string[] {
    //TODO
    return ['0'];
  }
}
