import { NgModule } from '@angular/core';

import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ResourceListComponent, ResourceEditComponent],
  imports: [SharedModule],
})
export class ResourceModule {}
