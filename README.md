
## I'm submitting a... 
<pre><code>[x ] Bug report </code></pre>

## The situation in a nutshell

I will briefly describe what my example does. **This breaks in testing environment, but runs fine in normal environment. That is the bug report.**

1. We define a template in the `ng-template` tag as done in `AComponent` below
```javascript
@Component({
    selector: 'app-a',
    template: `
  <ng-template #my-template let-context>
  I am loaded dynamically
  {{context}}
  {{"me "+(1+1)+"!!"}}
  Bye bye
  </ng-template>
  `
})
class AComponent extends TemplateExtractor {}

```

2. TemplateExtractor exposes the `TemplateRef`, the one referenced as `my-template`, via a method `getTemplateRef()` on the component.
3. Elsewhere we have a different component that contains `<ng-container appAnchor></ng-container>` in its template. In `AnchorDirective` we get a hold of the `ViewContainerRef` of the ng-container.
4. In `AnchorDirective` we also create (and immediately destroy) an instance of `AComponent` and we extract the templateRef `my-template` from it.
5. We do  `this.vc.createEmbeddedView(templateRef, { $implicit: 'blabla' })`  (where vc is the `ng-container` and template is `my-template`.

Result:

## Current behavior

In normal application mode (`ng serve`), it produces the following HTML (as expected)
produces the following HTML
```html
<div>
    <p>outer div test</p>
    <!---->
    I am loaded dynamically I am interpolated me 2!! Bye bye 
</div>
```
However, when testing (`ng test`), the interpolation (`{{ .. }}`) breaks the rendering.
```html
<div>
    <p>outer div test</p>
    <!---->
    I am loaded dynamically 
</div>
```

## Expected behavior
We would expect for (`ng test`) and (`ng serve`) the same HTML
```html
<div>
    <p>outer div test</p>
    <!---->
    I am loaded dynamically I am interpolated me 2!! Bye bye 
</div>
```


The `spec.ts` file is
```javascript
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

```

## Minimal reproduction of the problem with instructions
I couldn't get the test environment example to work in plunkr :( 
Here is a standalone repo, I hope it is sufficient: https://github.com/maurei/angular-bug-report

## What is the motivation / use case for changing the behavior?
I was writing test for a library that I'm writing (I'm porting [angular-table-editor](https://maurei.github.io/angular-table-editor/#!/) to angular 6)

## Environment
Angular version: 6.1.0
Chrome (desktop) version 68.0.3440.106

