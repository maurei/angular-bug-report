import { Directive, ViewContainerRef, ComponentFactoryResolver, TemplateRef, AfterViewInit } from '@angular/core';
import { AComponent } from './a.component';

@Directive({
  selector: '[appAnchor]'
})
export class AnchorDirective implements AfterViewInit {
  private templatePromise: Promise<TemplateRef<any>>;
  constructor(private vc: ViewContainerRef, private cfr: ComponentFactoryResolver) {
    const ACompontentRef = this.vc.createComponent(this.cfr.resolveComponentFactory(AComponent));
    this.templatePromise = ACompontentRef.instance.getTemplateRef().then(tlpRef => {
      ACompontentRef.destroy();
      return Promise.resolve(tlpRef);
    });
  }
  ngAfterViewInit() {
    const context = { $implicit: 'I am interpolated' };
    this.templatePromise.then(tplRef => {
      this.vc.createEmbeddedView(tplRef, context);
    });
  }
}
