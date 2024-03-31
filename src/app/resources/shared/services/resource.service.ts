import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IResource } from '../models/resource';
import { ResourceData } from '../api/resource.data';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly RESOURCE_API_URL = 'api/resources';

  constructor(private http: HttpClient, private resourceData: ResourceData) {}

  public getResources(): Observable<IResource[]> {
    return this.http
      .get<IResource[]>(this.RESOURCE_API_URL)
      .pipe(catchError(this.handleError));
  }

  public getResourceById(id: number): Observable<IResource> {
    return this.http
      .get<IResource>(`${this.RESOURCE_API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public createResource(resource: IResource): Observable<IResource> {
    const { id, ...resourceWithoutId } = resource; //delete id to set the one from the server

    return this.http
      .post<IResource>(this.RESOURCE_API_URL, resourceWithoutId)
      .pipe(catchError(this.handleError));
  }

  public updateResource(resource: IResource): Observable<IResource> {
    const url = `${this.RESOURCE_API_URL}/${resource.id}`;
    this.resourceData.updateResource(resource);
    return this.http
      .put<IResource>(url, resource)
      .pipe(catchError(this.handleError));
  }

  public deleteResource(resource: IResource): Observable<IResource> {
    const url = `${this.RESOURCE_API_URL}/${resource.id}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
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
