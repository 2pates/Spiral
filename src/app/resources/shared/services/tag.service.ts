import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map, throwError } from 'rxjs';
import { Tag } from '../models/tag.models';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private dbPath = '/tags';
  tags_db: AngularFirestoreCollection<Tag>;

  constructor(private db: AngularFirestore) {
    this.tags_db = db.collection(this.dbPath);
  }

  async getTags(): Promise<Tag[]> {
    let tagsObservable = this.tags_db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    );

    let tags: Tag[] = [];

    tagsObservable.subscribe((data) => {
      tags = data;
    });

    //boucle sur resources et affiche les id dees tags à partir des resources
    tags = await firstValueFrom(tagsObservable);

    return tags;
  }

  //TODO : ADD TAGS TO DB
  addTag(newTag: Tag): any {
    return this.tags_db.add({ ...newTag });
  }

  //TODO : ADD TAGS TO DB
  updateTag(tag: Tag): Promise<void> {
    //Promet un objet qui représente l'achévement ou l'échec
    return this.tags_db.doc(tag.id).update(tag);
  }

  deleteTag(tag: Tag): Promise<void> {
    return this.tags_db.doc(tag.id).delete();
  }

  async getTagById(id: string): Promise<Tag> {
    let tagObservable = this.tags_db.doc(id).get();
    //ToDo add a time limit if resourceObservable is not found
    let tagValues = await lastValueFrom(tagObservable);
    const tagById: Tag = {
      id: id,
      ...tagValues.data(),
    };


    return tagById;
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
