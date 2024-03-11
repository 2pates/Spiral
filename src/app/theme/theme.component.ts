import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements AfterViewInit {
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

          element.style.fontSize = `${newFontSize}px`;
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
