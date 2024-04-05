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
  private tagService: TagService;

  constructor(private _db: AngularFirestore, tagService: TagService) {
    this.tagService = tagService;
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

    //boucle sur resources et affiche les id des tags à partir des resources
    resources = await firstValueFrom(resourcesObservable);
    resources.forEach(async (resource) => {
      console.log(
        'tags dans la resource: ',
        await this.tabIdToTabName(resource.tags)
      );
    });

    console.log('Resources dans getResources');
    return resources;
  }

  async getResourceByTags(tagsParam: string[]): Promise<Resource[]> {
    let allResources = await this.getResources();
    let filteredResources: Resource[];
    let tags: string[] | undefined;

    filteredResources = allResources.filter((resource) => {
      tags = resource.tags;
      let res = false;
      if (tags) {
        res = tagsParam.some((tagFiltre) => {
          return tags?.includes(tagFiltre);
        });
      }
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

  async getTagsFromResource(resource: Resource): Promise<string[]> {
    return await this.tabIdToTabName(resource.tags);
  }

  //tab id to tab name
  async tabIdToTabName(tabId: string[] | undefined): Promise<string[]> {
    let tags: string[] = [];
    if (tabId) {
      for (const id of tabId) {
        let tag = await this.tagService.getTagById(id);
        if (tag.name) {
          // console.log(`Id: ${id}, TagName: ${tag.name}`);
          tags.push(tag.name);
        }
      }
    }
    return tags;
  }

  addTagToResource(resource: Resource, ref: string) {
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
