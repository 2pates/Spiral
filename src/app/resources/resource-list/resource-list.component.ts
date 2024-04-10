import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Resource } from '../shared/models/resource.models';
import { ResourceService } from '../shared/services/resource.service';
import { TagService } from '../shared/services/tag.service';
import { Tag } from '../shared/models/tag.models';

@Component({
  selector: 'app-resource',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css'],
})
export class ResourceListComponent implements OnInit {
  public category: string = '';
  public filterTags: string[] = []; // is also the current tag used as filter
  public resources: Resource[] = [];

  public errMsg: string | undefined;

  public boxes: any[] = [
    { value: 'one' },
    { value: 'two' },
    { value: 'three' },
    { value: 'four' },
    { value: 'five' },
    { value: 'six' },
    { value: 'seven' },
    { value: 'eight' },
  ];

  constructor(
    private resourceService: ResourceService, // Inject ResourcesData here //ADD
    private tagService: TagService,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initCategory();
    await this.selectResources();
  }

  async initCategory(): Promise<void> {
    let tag: Tag = await this.tagService.getTagById(
      this.location.path().substring(1).split('/')[0]
    );
    if (tag && tag.id && tag.name) {
      this.category = tag.name;
      this.filterTags.push(tag.id);
    }
  }

  async selectResources(): Promise<void> {
    this.resources = await this.resourceService.getResourceByTags(
      this.filterTags
    );
  }
}
