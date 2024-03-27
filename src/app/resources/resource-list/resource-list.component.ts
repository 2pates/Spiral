import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IResource } from '../shared/models/resource';
import { ResourceService } from '../shared/services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css'],
})
export class ResourceListComponent implements OnInit {
  public resources: IResource[] = [];

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
    //ADD
    private resourceService: ResourceService // Inject ResourcesData here //ADD
  ) {}

  ngOnInit() {
    //ADD
    this.resourceService.getResources().subscribe({
      next: (resources) => (this.resources = resources),
      error: (err: string) => (this.errMsg = err),
    });
    //ADD
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
