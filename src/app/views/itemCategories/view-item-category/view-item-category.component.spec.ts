import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemCategoryComponent } from './view-item-category.component';

describe('ViewItemCategoryComponent', () => {
  let component: ViewItemCategoryComponent;
  let fixture: ComponentFixture<ViewItemCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
