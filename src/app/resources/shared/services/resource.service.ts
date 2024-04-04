import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.models';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, from, lastValueFrom, map, throwError } from 'rxjs';
import {
  DocumentData,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private dbPath = '/resources';
  resources_db: AngularFirestoreCollection<Resource>;
  tagPath = '/tags/';

  constructor(private db: AngularFirestore) {
    this.resources_db = db.collection(this.dbPath);
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

  tranformTagRefToString(
    documentReference:
      | DocumentReference<DocumentData, DocumentData>[]
      | undefined
  ): string[] {
    let tags: string[] = [];
    if (documentReference) {
      let resourceTagsIterator = documentReference.entries();
      if (resourceTagsIterator) {
        // console.log('Tags dans la ressource : ');
        for (const [index, docRef] of resourceTagsIterator) {
          // console.log(`Index: ${index}, Document ID: ${docRef.id}`);
          tags.push(docRef.id);
        }
      }
    }
    return tags;
  }

  async getResourceByTags(tagsParam: string[]): Promise<Resource[]> {
    let allResources = await this.getResources();
    let filteredResources: Resource[];
    let tags: string[];

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

  getAvailableTags(): string[] {
    //TODO
    return ['0'];
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
