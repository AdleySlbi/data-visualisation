import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomersNewListComponent } from './my-customers-new-list.component';

describe('MyCustomersNewListComponent', () => {
  let component: MyCustomersNewListComponent;
  let fixture: ComponentFixture<MyCustomersNewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCustomersNewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomersNewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
