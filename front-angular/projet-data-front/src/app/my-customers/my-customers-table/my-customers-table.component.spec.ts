import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomersTableComponent } from './my-customers-table.component';

describe('MyCustomersTableComponent', () => {
  let component: MyCustomersTableComponent;
  let fixture: ComponentFixture<MyCustomersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCustomersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
