import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorysComponent } from './sub-categorys.component';

describe('SubCategorysComponent', () => {
  let component: SubCategorysComponent;
  let fixture: ComponentFixture<SubCategorysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategorysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
