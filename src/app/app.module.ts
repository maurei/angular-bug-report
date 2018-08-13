import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AComponent } from './a.component';
import { AnchorDirective } from './anchor.directive';


@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    AnchorDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AppComponent,
    AComponent,
    AnchorDirective
  ],
  entryComponents: [
    AComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
