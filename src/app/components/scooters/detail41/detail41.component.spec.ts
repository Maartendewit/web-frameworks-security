import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Detail41Component } from './detail41.component';

describe('Detail41Component', () => {
  let component: Detail41Component;
  let fixture: ComponentFixture<Detail41Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail41Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
