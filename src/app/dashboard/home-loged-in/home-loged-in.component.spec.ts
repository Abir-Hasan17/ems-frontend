import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLogedInComponent } from './home-loged-in.component';

describe('HomeLogedInComponent', () => {
  let component: HomeLogedInComponent;
  let fixture: ComponentFixture<HomeLogedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLogedInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLogedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
