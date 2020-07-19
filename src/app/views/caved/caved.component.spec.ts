import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavedComponent } from './caved.component';

describe('CavedComponent', () => {
  let component: CavedComponent;
  let fixture: ComponentFixture<CavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
