import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConseillerComponent } from './home-conseiller.component';

describe('HomeConseillerComponent', () => {
  let component: HomeConseillerComponent;
  let fixture: ComponentFixture<HomeConseillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConseillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
