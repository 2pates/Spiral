import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../shared/services/resource.service';
import { IResource } from '../shared/models/resource';
import { ResourceData } from '../shared/api/resource.data';

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
  public resource: IResource = {
    id: '0', // Initialize with default ID
    title: '',
    body: '',
    link: '',
    imageUrl: '',
    tags: [],
  };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private resourceData: ResourceData
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.getSelectResource(id);
        this.isEditing = true;
        this.pageTitle = 'Modifier la ressource';
      } else {
        this.pageTitle = 'Créer une ressource';
      }
    });
  }

  public getSelectResource(id: number): void {
    
    this.resourceService
      .getResourceById(id)
      .subscribe((resource: IResource) => {
        this.resource = resource;
      });
  }

  isTagSelected(tag: string): boolean {
    return this.resource.tags.includes(tag);
  }

  onSubmit() {
    if (!this.validateForm()) {
      return false;
    }

    console.log('Formulaire soumis avec succès !');
    if (this.resource.id === "0") {
      this.createResource();
      this.saveCompleted();
    } else {
      this.updateResource();
    }
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
    this.resourceService.createResource(this.resource);
      console.log('Ressource créée avec succès !');
  }

  updateResource(): void {
    // this.resourceService.updateResource(this.resource).subscribe(() => {
    //   next: () => this.saveCompleted();
    //   console.log('Ressource mise à jour avec succès !');
    // });
  }

  deleteResource(): void {
    this.resourceService.deleteResource(this.resource).subscribe(() => {
      this.saveCompleted();
      console.log('Ressource supprimée avec succès !');
    });
  }

  public saveCompleted(): void {
    this.router.navigate(['']);
  }
}
