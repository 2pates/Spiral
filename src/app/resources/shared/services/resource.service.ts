import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.models';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private dbPath = '/resources';
  resources_db: AngularFirestoreCollection<Resource>;

  constructor(private db: AngularFirestore) {
    this.resources_db = db.collection(this.dbPath);
  }

  getResources(): AngularFirestoreCollection<Resource> {
    return this.resources_db;
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

  getResourceById(id: string): Resource {
    console.log('id: ', id);
    const res = this.resources_db.doc();

    console.log(res);

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
