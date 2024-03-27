import { Component } from '@angular/core';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css'],
})
export class ResourceEditComponent {
  title: string = '';
  body: string = '';
  link: string = '';
  imageUrl: string = '';
  sinformer: boolean = false;
  reduire: boolean = false;
  reutiliser: boolean = false;
  substituer: boolean = false;

  onSubmit() {
    let checked =
      this.title !== '' &&
      this.body !== '' &&
      this.link !== '' &&
      this.imageUrl !== '';
    if (checked) {
      checked =
        this.sinformer || this.reduire || this.reutiliser || this.substituer;
    } else {
      alert('Des informations sont manquantes.');
      return false;
    }
    if (!checked) {
      alert('Veuillez cocher au moins un tag.');
      return false;
    }
    console.log('Formulaire soumis avec succès !');
    this.saveResource();
    return true;
  }

  saveResource(): void {
    const tags = {
      sinformer: this.sinformer,
      reduire: this.reduire,
      reutiliser: this.reutiliser,
      substituer: this.substituer,
    };

    const resource = {
      title: this.title,
      body: this.body,
      link: this.link,
      imageUrl: this.imageUrl,
      tags: tags,
    };
    console.log(resource); // Affiche les ressources dans la console
  }
}
