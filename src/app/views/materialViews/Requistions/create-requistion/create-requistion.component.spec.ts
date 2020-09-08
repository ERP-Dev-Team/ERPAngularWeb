import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequistionComponent } from './create-requistion.component';

describe('CreateRequistionComponent', () => {
  let component: CreateRequistionComponent;
  let fixture: ComponentFixture<CreateRequistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRequistionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
