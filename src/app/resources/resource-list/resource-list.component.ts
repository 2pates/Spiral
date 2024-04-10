import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Inject,
} from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';

import { Resource } from '../shared/models/resource.models';
import { ResourceService } from '../shared/services/resource.service';
import { TagService } from '../shared/services/tag.service';
import { map } from 'rxjs';
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

  @ViewChildren('title') titles!: QueryList<ElementRef>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private resourceService: ResourceService, // Inject ResourcesData here //ADD
    private tagService: TagService,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initCategory();
    this.selectResources();
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

  ngAfterViewInit() {
    this.titles.forEach((title) => this.adjustFontSize(title.nativeElement));
  }

  adjustFontSize(element: HTMLElement) {
    const defaultView = this.document.defaultView;

    if (defaultView) {
      const computedStyle = defaultView.getComputedStyle(element);

      if (computedStyle) {
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const maxLines = 3;

        const textHeight = element.scrollHeight;
        const numberOfLines = Math.ceil(textHeight / lineHeight);

        if (numberOfLines > maxLines) {
          const fontSize = parseFloat(computedStyle.fontSize);
          const newFontSize = (fontSize * maxLines) / numberOfLines;

          element.style.fontSize = newFontSize + 'px';
        } else {
          var textLength = element.textContent?.length ?? 0;
          var fontSizeMax = 2.8;
          var fontSizeMin = 1.7;
          var fontSize = fontSizeMax - 0.04 * textLength;
          if (fontSize < fontSizeMin) {
            fontSize = fontSizeMin;
          }
          var fontSizeFinal = fontSize + 'rem';
          element.style.fontSize = fontSizeFinal;
        }
      }
    }
  }
}
