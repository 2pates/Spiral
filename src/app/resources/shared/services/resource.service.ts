import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.models';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, from, lastValueFrom, map, throwError } from 'rxjs';
import { Tag } from '../models/tag.models';
import { TagService } from './tag.service';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private dbPath = '/resources';
  private resources_db: AngularFirestoreCollection<Resource>;
  private db: AngularFirestore;

  constructor(private _db: AngularFirestore) {
    this.db = _db;
    this.resources_db = this.db.collection(this.dbPath);
  }

  async getResources(): Promise<Resource[]> {
    let resourcesObservable = this.resources_db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    );

    let resources: Resource[] = [];

    resourcesObservable.subscribe((data) => {
      resources = data;
    });

    //boucle sur resources et affiche les id dees tags à partir des resources
    resources = await firstValueFrom(resourcesObservable);
    resources.forEach((resource) => {
      console.log(
        'tags dans le resource: ',
        this.tranformTagRefToString(resource.tags)
      );
    });

    console.log('Resources dans getResources');
    return resources;
  }

  async getResourceByTags(tagsParam: string[]): Promise<Resource[]> {
    let allResources = await this.getResources();
    let filteredResources: Resource[];
    let tags: string[];
    let tagsRef: AngularFirestoreDocument<Tag>[];

    filteredResources = allResources.filter((resource) => {
      tags = this.tranformTagRefToString(resource.tags);
      let res = tagsParam.some((tagFiltre) => {
        return tags.includes(tagFiltre);
      });
      // console.log('ID : ', resource?.id, 'res = ', res);
      return res;
    });

    console.log('filtered resources : ', filteredResources);

    return filteredResources;
  }

  //TODO : ADD TAGS TO DB
  addResource(newResource: Resource): any {
    return this.resources_db.add({ ...newResource });
  }

  //TODO : ADD TAGS TO DB
  updateResource(resource: Resource): Promise<void> {
    //Promet un objet qui représente l'achévement ou l'échec
    return this.resources_db.doc(resource.id).update(resource);
  }

  deleteResource(resource: Resource): Promise<void> {
    return this.resources_db.doc(resource.id).delete();
  }

  async getResourceById(id: string): Promise<Resource> {
    let resourceObservable = this.resources_db.doc(id).get();
    //ToDo add a time limit if resourceObservable is not found
    let resourceValues = await lastValueFrom(resourceObservable);
    const resourceById: Resource = {
      id: id,
      ...resourceValues.data(),
    };

    return resourceById;
  }

  getTagsFromResource(resource: Resource): string[] {
    return this.tranformTagRefToString(resource.tags);
  }

  tranformTagRefToString(
    documentRef: AngularFirestoreDocument<Tag>[] | undefined
  ): string[] {
    //Fake AngularFirestoreDocument<Tag>[]
    const fakeStock1: AngularFirestoreDocument<Tag> = this.db
      .collection('/tags')
      .doc('/sinformer');
    console.log('fakeStock1: ', fakeStock1);
    if (documentRef) console.log('documentRef[0]: ', documentRef[0]);
    // const fakeStock2: AngularFirestoreDocument<Tag> = this.db
    //   .collection('/tags')
    //   .doc('/reduire');

    // let documentRef = [fakeStock1, fakeStock2];

    console.log('documentRef : ', documentRef);
    let tags: string[] = [];
    if (documentRef) {
      let resourceTagsIterator = documentRef.entries();
      if (resourceTagsIterator) {
        console.log('Tags dans la ressource : ');
        for (const [index, docRef] of resourceTagsIterator) {
          console.log('docRef : ', docRef);
          let docData = docRef.ref;
          console.log(`Index: ${index}, Document ID: ${docData.id}`);
          tags.push(docData.id);
        }
      }
    }
    return tags;
  }

  addTagToResource(resource: Resource, ref: AngularFirestoreDocument<Tag>) {
    resource.tags?.push(ref);
    return resource;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
