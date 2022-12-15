import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthpageComponent } from './unauthpage.component';

describe('UnauthpageComponent', () => {
  let component: UnauthpageComponent;
  let fixture: ComponentFixture<UnauthpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
