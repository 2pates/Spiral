import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IResource } from '../models/resource';
import { ResourcesData } from '../database/resources.data';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly RESOURCE_DATABASE_URL = 'database/resources';

  constructor(private http: HttpClient, private resourcesData: ResourcesData) {}

  public getResources(): Observable<IResource[]> {
    return this.http.get<IResource[]>(this.RESOURCE_DATABASE_URL).pipe(
      tap((resources) => console.log('resources: ')),
      catchError(this.handleError)
    );
  }

  public getResourceById(id: number): Observable<IResource> {
    const url = `${this.RESOURCE_DATABASE_URL}/${id}`;

    return this.http.get<IResource>(url).pipe(catchError(this.handleError));
  }

  public updateResource(resource: IResource): Observable<IResource> {
    const url = `${this.RESOURCE_DATABASE_URL}/${resource.resourceId}`;
    this.resourcesData.updateResource(resource);
    return this.http
      .put<IResource>(url, resource)
      .pipe(catchError(this.handleError));
  }

  public createResource(resource: IResource): Observable<IResource> {
    resource.resourceId = this.resourcesData.genId();
    this.resourcesData.addResource(resource);
    return this.http
      .post<IResource>(this.RESOURCE_DATABASE_URL, resource)
      .pipe(catchError(this.handleError));
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
