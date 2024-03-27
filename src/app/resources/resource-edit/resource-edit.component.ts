import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../shared/services/resource.service';
import { IResource } from '../shared/models/resource';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css'],
})
export class ResourceEditComponent implements OnInit {
  public resource: IResource = {
    resourceId: 0, // Initialize with default ID
    title: '',
    body: '',
    link: '',
    imageUrl: '',
    tags: {
      sinformer: false,
      reduire: false,
      reutiliser: false,
      substituer: false,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.getSelectResource(id);
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

  onSubmit() {
    if (!this.validateForm()) {
      return false;
    }

    console.log('Formulaire soumis avec succès !');
    if (this.resource.resourceId === 0) {
      this.createResource();
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
      !this.resource.tags.sinformer &&
      !this.resource.tags.reduire &&
      !this.resource.tags.reutiliser &&
      !this.resource.tags.substituer
    ) {
      alert('Veuillez cocher au moins un tag.');
      return false;
    }

    return true;
  }

  createResource(): void {
    // this.resourceService.createResource(this.resource).subscribe(() => {
    //   console.log('Ressource créée avec succès !');
    // Vous pouvez rediriger vers une autre page après la création réussie si nécessaire
    // });
    console.log(this.resource);
  }

  updateResource(): void {
    // this.resourceService.updateResource(this.resource).subscribe(() => {
    //   console.log('Ressource mise à jour avec succès !');
    // Vous pouvez rediriger vers une autre page après la mise à jour réussie si nécessaire
    // });
    console.log(this.resource);
  }
}
