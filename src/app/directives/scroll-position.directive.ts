import { Directive, ElementRef, HostListener } from '@angular/core';
import { ScrollService } from '../services/directive/scroll.service';
@Directive({
  selector: '[appScrollPosition]'
})
export class ScrollPositionDirective {
  constructor(private scrollService: ScrollService, private el: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    const element = this.el.nativeElement as HTMLElement;
    this.scrollService.setPosition(element.scrollTop);
  }
}
