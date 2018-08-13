/* tslint:disable:directive-selector max-line-length no-debugger indent */

import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { destroyPlatform } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';



  describe('Directive: TableEditorCellDirective', () => {
    let fixture: ComponentFixture<AppComponent>;
    beforeAll(() => {
      TestBed.resetTestEnvironment();
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppModule]
      });
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    });
    describe('dummy test', () => {
      it('dummy test ', fakeAsync(() => {
        fixture.detectChanges();
        tick();
      }));
    });
  });
