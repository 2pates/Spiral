import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Resource } from '../models/resource.models';
import { ResourceData } from '../api/resource.data';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly RESOURCE_DATABASE_URL = 'database/resources';

  constructor(private http: HttpClient, private resourceData: ResourceData) {}

  public getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.RESOURCE_DATABASE_URL).pipe(
      tap((resources) => console.log('resources: ')),
      catchError(this.handleError)
    );
  }

  public getResourceById(id: number): Observable<Resource> {
    const url = `${this.RESOURCE_DATABASE_URL}/${id}`;

    return this.http.get<Resource>(url).pipe(catchError(this.handleError));
  }

  public updateResource(resource: Resource): Observable<Resource> {
    const url = `${this.RESOURCE_DATABASE_URL}/${resource.id}`;
    this.resourceData.updateResource(resource);
    return this.http
      .put<Resource>(url, resource)
      .pipe(catchError(this.handleError));
  }

  public createResource(resource: Resource): Observable<Resource> {
    // resource.id = this.resourceData.genId();
    // this.resourceData.addResource(resource);
    return this.http
      .post<Resource>(this.RESOURCE_DATABASE_URL, resource)
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
