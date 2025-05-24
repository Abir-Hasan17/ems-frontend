import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavElimentComponent } from './sidebar-nav-eliment.component';

describe('SidebarNavElimentComponent', () => {
  let component: SidebarNavElimentComponent;
  let fixture: ComponentFixture<SidebarNavElimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavElimentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNavElimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
