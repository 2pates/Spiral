import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.models';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpErrorResponse } from '@angular/common/http';
import { from, lastValueFrom, map, throwError } from 'rxjs';
import { QuerySnapshot } from '@angular/fire/firestore';

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
    let resources = await lastValueFrom(resourcesObservable);

    resourcesObservable.subscribe((data) => {
      resources = data;
    });

    return resources;
  }

  //Methode Gaspard
  // public getResourceByTags(section: string): Observable<Resource[]> {
  //   return this.getResources()
  //     .snapshotChanges()
  //     .pipe(
  //       map((resources) =>
  //         resources.filter((resource) => resource.tags.includes(section))
  //       )
  //     );
  // }

  /* Solution chat GPT

  async getResourceByTags(res: Resource): Promise<Resource> {
      console.log('id: ', res.id);
      const snapshot = await this.getResources().snapshotChanges().toPromise();
      const data = snapshot.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }));
      const foundResource = data.find(resource => resource.id === res.id);
      if (foundResource) {
          return foundResource;
      } else {
          // Retourner res si la ressource n'est pas trouvée
          return res;
      }
  }

  */

  async getResourceByTags(tagsParam: string[]): Promise<Resource[]> {
    let allResources = await this.getResources();
    let filteredResources: Resource[];

    filteredResources = allResources.filter((resource) => {
      if (resource?.tags) {
        tagsParam.forEach((tag: string) => resource.tags.includes(tag));
      }
    });

    return filteredResources;
  }

  // async getResourceByTags(tags: string[]): Promise<Resource[]> {
  //   console.log('Tags en param : ', this.tagPath + tags);
  //   let resources: Resource[];

  //   // Récupérer toutes les ressources
  //   let queryAll = this.getResources();

  //   // Ajouter une limite de temps
  //   let timeoutPromise = new Promise((resolve, reject) => {
  //     setTimeout(() => reject(new Error('Request timed out')), 3000); // Définir TIMEOUT_DURATION selon vos besoins
  //   });

  //   // Attendre que la requête de la base de données soit terminée ou que le délai d'attente soit écoulé
  //   let allResourcesObservable = from(Promise.race([queryAll, timeoutPromise]));

  //   // Récupérer les valeurs de toutes les ressources
  //   let allResourcesValues = await lastValueFrom(allResourcesObservable);

  //   // Filtrer les ressources qui contiennent au moins un des tags donnés
  //   let filteredResources: Resource[] = [];
  //   // allResourcesValues.forEach((resource) => {
  //   //   console.log('resource: ', resource);
  //   //   let data = resource.data();
  //   //   if (
  //   //     data &&
  //   //     data['tags']
  //   //     // data['tags'].some((tag: string) => tags.includes(this.tagPath + tag))
  //   //   ) {
  //   //     console.log('document filtred id: ', resource.id);
  //   //     filteredResources.push({
  //   //       id: resource.id,
  //   //       ...data,
  //   //     });
  //   //   }
  //   // });
  //   console.log('Filtred resources : ', filteredResources);
  //   return filteredResources;
  // }

  // public async getResourcesByTags(tags: string[]): Promise<Resource[]> {
  //   //Similaire à a proposition de chatgpt
  //   // const specificResources = await this.getResources().snapshotChanges().pipe(
  //   //   map(resources => resources.filter(resource => resource.tags.includes(section)))
  //   // );
  //   // const foundResource = data.find(resource => resource.tags.includes(section));

  //   // Similaire à ce qu'on a fait pour getResourceById

  //   let resourceObservable = this.resources_db.doc().get();
  //   //ToDo add a time limit if resourceObservable is not found
  //   let resourceValues = await lastValueFrom(resourceObservable);

  //   console.log('data', resourceValues.data());

  //   let specificResources: Array<Resource>;
  //   return specificResources;
  // }

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
