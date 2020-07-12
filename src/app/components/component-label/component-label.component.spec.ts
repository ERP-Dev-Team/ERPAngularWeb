import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLabelComponent } from './component-label.component';

describe('ComponentLabelComponent', () => {
  let component: ComponentLabelComponent;
  let fixture: ComponentFixture<ComponentLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
