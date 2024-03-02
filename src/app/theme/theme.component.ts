import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements AfterViewInit {
  @ViewChildren('title') titles!: QueryList<ElementRef>;

  constructor() {
    this.titles = new QueryList<ElementRef>();
  }

  ngAfterViewInit() {
    this.titles.forEach(title => this.adjustFontSize(title.nativeElement));
  }

  adjustFontSize(element: HTMLElement) {
    var textLength = element.textContent?.length ?? 0
    var fontSizeMax = 2.8;
    var fontSizeMin = 1.5;
    var fontSize = fontSizeMax-0.03*textLength;
    if (fontSize < fontSizeMin) {
      fontSize = fontSizeMin;
    }
    var fontSizeFinal = fontSize + "rem";
    element.style.fontSize = fontSizeFinal;
  }
}