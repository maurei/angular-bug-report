import { Component, DoCheck, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class TemplateExtractor implements AfterViewInit {
  @ViewChild(TemplateRef)
  private innerTemplate: TemplateRef<any>;
  private template: Subject<TemplateRef<any>> = new Subject();
  getTemplateRef(): Promise<TemplateRef<any>> {
    return this.template.asObservable().toPromise();
  }
  ngAfterViewInit(): any {
    if (this.innerTemplate) {
      this.template.next(this.innerTemplate);
      this.template.complete();
    }
  }
}


@Component({
  selector: 'app-a',
  template: `
  <ng-template let-context>
  I am loaded dynamically
  {{context}}
  {{"me "+(1+1)+"!!"}}
  Bye bye
  </ng-template>
  `
})
export class AComponent extends TemplateExtractor {}
