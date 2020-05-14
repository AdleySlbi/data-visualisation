import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomersFilterComponent } from './my-customers-filter.component';

describe('MyCustomersFilterComponent', () => {
  let component: MyCustomersFilterComponent;
  let fixture: ComponentFixture<MyCustomersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCustomersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
