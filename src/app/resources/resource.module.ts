import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResourceListComponent, ResourceEditComponent],
  imports: [CommonModule, FormsModule],
})
export class ResourceModule {}
