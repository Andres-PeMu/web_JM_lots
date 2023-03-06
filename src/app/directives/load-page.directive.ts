import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadPage]'
})
export class LoadPageDirective implements OnChanges {

  @Input() appRecarga: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.viewContainerRef.createEmbeddedView( templateRef );
  }

  ngOnChanges(changes: SimpleChanges): void {
      if( changes['appRecarga'] && changes['appRecarga'].previousValue !== undefined ){
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView( this.templateRef );
      }
  }

}
