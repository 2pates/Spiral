import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.models';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';

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

  //Methode Gaspard
  // public getSpecificResources(section: string): Observable<IResource[]> {
  //   return this.getResources().pipe(
  //     map(resources => resources.filter(resource => resource.tags.includes(section)))
  //   );
  // }

  public async getSpecificResources(section: string): Promise<Resource[]> {
    //Similaire à a proposition de chatgpt
    // const specificResources = await this.getResources().snapshotChanges().pipe(
    //   map(resources => resources.filter(resource => resource.tags.includes(section)))
    // );
    // const foundResource = data.find(resource => resource.tags.includes(section));
    // Similaire à ce qu'on a fait pour getResourceById
    // let resourceObservable = this.resources_db.doc().get();
    // //ToDo add a time limit if resourceObservable is not found
    // let resourceValues = await lastValueFrom(resourceObservable);
    // console.log("data", resourceValues.data());
    // const specificResources: Resource[] = {
    //   id: resourceValues.id,
    //   ...resourceValues.data(),
    // };
    // return specificResources;
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
