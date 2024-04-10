import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Inject,
} from '@angular/core';

@Directive({
  selector: '[appAdjustFontSize]',
})
export class AdjustFontSizeDirective implements AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const title = this.elementRef.nativeElement as HTMLElement;
    if (title) {
      this.adjustFontSize(title);
    } else {
      console.log('Titles are not yet initialized');
    }
  }

  adjustFontSize(element: HTMLElement) {
    console.log('I am here !');
    const defaultView = this.document.defaultView;

    if (defaultView) {
      const computedStyle = defaultView.getComputedStyle(element);

      if (computedStyle) {
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const maxLines = 4;

        const textHeight = element.scrollHeight;
        const numberOfLines = Math.ceil(textHeight / lineHeight);

        if (false) {
          const fontSize = parseFloat(computedStyle.fontSize);
          const newFontSize = (fontSize * maxLines) / numberOfLines;

          element.style.fontSize = newFontSize + 'px';
        } else {
          var textLength = element.textContent?.length ?? 0;
          console.log('text-length', textLength);
          var fontSizeMax = 2.8;
          var fontSizeMin = 1.3;
          var fontSize = fontSizeMax;
          if (textLength > 6) {
            if (textLength > 18) {
              fontSize = fontSizeMax - 0.05 * textLength;
            } else if (textLength > 30) {
              fontSize = fontSizeMin;
            } else {
              fontSize = fontSizeMax - 0.08 * textLength;
            }
            if (fontSize < fontSizeMin) {
              fontSize = fontSizeMin;
            }
          }

          var fontSizeFinal = fontSize + 'rem';
          element.style.fontSize = fontSizeFinal;
        }
      }
    }
  }
}