import { InMemoryDbService } from 'angular-in-memory-web-api';

/**
 * Initial data for in memory web api
 *
 * @export
 * @class Tags
 * @implements {InMemoryDbService}
 */
export class TagsData implements InMemoryDbService {
  private tags: string[] = [
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
    'random', // Ajoutez d'autres tags si nécessaire
  ];

  createDb(): Record<string, string[]> {
    return { tags: this.tags };
  }
  addTag(tag: string): void {
    this.tags.push(tag);
  }
}
