import { TestBed } from '@angular/core/testing';
import { AppRoom } from './app.room';
import {HelloWindow} from "./app.hellowindow";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWindow],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HelloWindow);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'client' title`, () => {
    const fixture = TestBed.createComponent(HelloWindow);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hello-window');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HelloWindow);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, client');
  });
});
