import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  Inject,
} from '@angular/core';
import { resources } from '../database/resources-data';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements AfterViewInit {
  public resources = resources;

  public boxes: any[] = [
    { value: 'one' },
    {
      value: 'two',
    },
    {
      value: 'three',
    },
    {
      value: 'four',
    },
    {
      value: 'five',
    },
    {
      value: 'six',
    },
    {
      value: 'seven',
    },
    {
      value: 'eight',
    },
  ];

  /*
-----
Resize boxes' title
-----
*/

  @ViewChildren('title') titles!: QueryList<ElementRef>;

  constructor(@Inject(DOCUMENT) private document: Document) {}

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
