import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsSetComponent } from './designations-set.component';

describe('DesignationsSetComponent', () => {
  let component: DesignationsSetComponent;
  let fixture: ComponentFixture<DesignationsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
