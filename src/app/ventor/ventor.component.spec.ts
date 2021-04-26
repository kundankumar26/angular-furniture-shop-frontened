import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentorComponent } from './ventor.component';

describe('VentorComponent', () => {
  let component: VentorComponent;
  let fixture: ComponentFixture<VentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
