import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IResource } from '../models/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly RESOURCE_API_URL = 'api/resources.json';

  constructor(private http: HttpClient) {}

  public getResources(): Observable<IResource[]> {
    return this.http.get<IResource[]>(this.RESOURCE_API_URL).pipe(
      tap((resources) => console.log('resources: ')),
      catchError(this.handleError)
    );
  }

  public getResourceById(id: number): Observable<IResource> {
    return this.getResources().pipe(
      map((resources) =>
        resources.find((resource) => resource.resourceId === id)
      ),
      map((resource) => {
        if (resource) {
          return resource;
        } else {
          throw new Error(`Resource with id ${id} not found`);
        }
      }),
      catchError(this.handleError)
    );
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
