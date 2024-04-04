import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../shared/services/resource.service';
import { Resource } from '../shared/models/resource.models';
import { DocumentReference } from '@angular/fire/firestore';

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
  public tagPath = '/tags/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
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
  }

  public async getSelectResource(id: string): Promise<void> {
    this.resource = await this.resourceService.getResourceById(id);
  }

  async isTagSelected(tag: string): Promise<boolean> {
    // return this.resource.tags
    //   ? this.resource.tags.includes(this.tagPath + tag)
    //   : false;
    this.resourceService.addNewTagToDb(tag);
    let id = await this.resourceService.getTagById(tag);

    let add = this.resource.tags?.push(id);
    
    if(add){
      return true;
    }else{
      return false;
    }
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
      tagResource: DocumentReference;
      this.resource.tags?.push();
    }
    this.resourceService.addResource(this.resource).then(() => {
      console.log('Ressource créée avec succès !');
    });
  }

  updateResource(): void {
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
}
