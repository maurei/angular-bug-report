import {
  Component,
} from '@angular/core';



@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>outer div test</p>
      <ng-container appAnchor></ng-container>
    </div>
  `
})
export class AppComponent {}

