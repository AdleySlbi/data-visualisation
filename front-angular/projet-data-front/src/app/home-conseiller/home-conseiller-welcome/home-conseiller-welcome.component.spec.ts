import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConseillerWelcomeComponent } from './home-conseiller-welcome.component';

describe('HomeConseillerWelcomeComponent', () => {
  let component: HomeConseillerWelcomeComponent;
  let fixture: ComponentFixture<HomeConseillerWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConseillerWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConseillerWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
