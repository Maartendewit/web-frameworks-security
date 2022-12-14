import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderSbComponent } from './header-sb.component';

describe('HeaderSbComponent', () => {
  let component: HeaderSbComponent;
  let fixture: ComponentFixture<HeaderSbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
