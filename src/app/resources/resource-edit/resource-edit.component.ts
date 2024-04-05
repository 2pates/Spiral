import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../shared/services/resource.service';
import { Resource } from '../shared/models/resource.models';
import { DocumentReference } from '@angular/fire/firestore';
import { TagService } from '../shared/services/tag.service';
import { Tag } from '../shared/models/tag.models';
import { DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css'],
})
export class ResourceEditComponent implements OnInit {
  public pageTitle: string = '';
  public isEditing: boolean = false;
  public availableTags: string[] = [];
  public sinformerChecked: boolean = false;
  public reduireChecked: boolean = false;
  public reutiliserChecked: boolean = false;
  public substituerChecked: boolean = false;
  public existingResource: boolean = false;
  resource: Resource = new Resource();
  tag: Tag = new Tag();
  public tagPath = '/tags/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = idParam;
        this.getSelectResource(id);
        this.isEditing = true;
        this.pageTitle = 'Modifier la ressource';
        this.existingResource = true;
      } else {
        this.pageTitle = 'Créer une ressource';
        this.existingResource = false;
      }
    });
    this.resource.tags = [];
    // this.addTag('sinformer');
  }

  public async getSelectResource(id: string): Promise<void> {
    this.resource = await this.resourceService.getResourceById(id);
  }

  onSubmit() {
    if (!this.validateForm()) {
      return false;
    }

    console.log('Formulaire soumis avec succès !');
    if (this.existingResource) {
      this.updateResource();
    } else {
      this.createResource();
    }
    this.saveCompleted();
    return true;
  }

  validateForm(): boolean {
    if (
      this.resource.title === '' ||
      this.resource.body === '' ||
      this.resource.link === '' ||
      this.resource.imageUrl === ''
    ) {
      alert('Des informations sont manquantes.');
      return false;
    }

    if (
      !this.sinformerChecked &&
      !this.reduireChecked &&
      !this.reutiliserChecked &&
      !this.substituerChecked
    ) {
      alert('Veuillez cocher au moins un tag.');
      return false;
    }

    return true;
  }

  createResource(): void {
    if (this.sinformerChecked) {
      this.addTag('sinformer');
    }
    if (this.reutiliserChecked) {
      this.addTag('reutiliser');
    }
    if (this.reduireChecked) {
      this.addTag('reduire');
    }
    if (this.substituerChecked) {
      this.addTag('substituer');
    }
    this.addResource();
  }

  updateResource(): void {
    if (this.sinformerChecked) {
      // this.setTagById('sinformer');
      // let path = this.tagService.getTagPath(this.tag);
      // this.resourceService.addTag(this.resource, path);
      // console.log('value: ', this.resourceService.tabIdToTabName([ref]));
    }
    this.resourceService.updateResource(this.resource);
    this.saveCompleted();
    console.log('Ressource mise à jour avec succès !');
  }

  deleteResource(): void {
    this.resourceService.deleteResource(this.resource);
    this.saveCompleted();
  }

  public saveCompleted(): void {
    this.router.navigate(['']);
  }

  isTagSelected(tag: string): boolean {
    // return this.resource.tags
    //   ? this.resource.tags.includes(this.tagPath + tag)
    //   : false;
    return false;
  }

  async addTag(id: string): Promise<void> {
    // On récupère le tag
    this.tag = await this.tagService.getTagById(id);
    console.log('addTag: this.tag: ', this.tag);
    // On récupère la ref du tag (pour l'instant c'est un AngularFirestoreDocument)
    // let ref = this.tagService.getTagRef(this.tag);
    // console.log('addTag: ref: ', ref);
    this.resource.tags?.push(id); //AngularFirestoreDocument n'est pas supporté pour ajouter dans la bd
    console.log('addTag: this.resource: ', this.resource);
    // Ajouter la resource
    this.resourceService.addResource(this.resource).then(() => {
      console.log('Ressource créée avec succès !');
    });
    console.log('after create: this.resource: ', this.resource);
  }

  async addResource(): Promise<void> {
    console.log('addResource: this.resource: ', this.resource);
  }
}
