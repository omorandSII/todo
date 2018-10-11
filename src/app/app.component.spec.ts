import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {

  let fixture;
  let component;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as variable equal to TODO List'`, async(() => {
    expect(component.title).toEqual('TODO List');
  }));

  it('should have a div to display title', async(() => {
    fixture.detectChanges();
    expect(element.querySelector('DIV').textContent).toEqual(fixture.debugElement.componentInstance.title);
  }));

  it('should have tag router-outlet', async(() => {
    fixture.detectChanges();
    expect(element.querySelector('router-outlet')).not.toBeNull();
  }));
});
