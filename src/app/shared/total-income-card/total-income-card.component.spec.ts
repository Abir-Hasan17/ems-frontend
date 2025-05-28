import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIncomeCardComponent } from './total-income-card.component';

describe('TotalIncomeCardComponent', () => {
  let component: TotalIncomeCardComponent;
  let fixture: ComponentFixture<TotalIncomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalIncomeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalIncomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
