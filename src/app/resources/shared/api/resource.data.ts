import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IResource } from '../models/resource';
import { initializeFirebaseApp } from '../../../../../lib/firebase.js';

export class ResourceData implements InMemoryDbService {
  private availableTags: string[] = [
    'sinformer',
    'bilan',
    'accompagnement',
    'substituer',
    'agir',
    'alimentaire',
    'courses',
    'achats',
    'reutiliser',
    'vestimentaire',
    'random',
  ];

  createDb(): Record<string, IResource[]> {
    initializeFirebaseApp();

    return {  };
  }

  updateResource(resource: IResource): void {
    resource.tags.forEach((tag) => {
      if (!this.availableTags.includes(tag)) {
        this.availableTags.push(tag);
      }
    });
  }

  getAvailableTags(): string[] {
    return this.availableTags;
  }

  genId(resources: IResource[]): number {
    return resources.length > 0
      ? Math.max(...resources.map((resource) => resource.id)) + 1
      : 1;
  }
}
