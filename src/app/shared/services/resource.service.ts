import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IResource } from '../models/resource';
@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly RESOURCE_API_URL = 'api/resources';
  constructor(private http: HttpClient) {}

  public createResource(resource: IResource): Observable<IResource> {}
}
