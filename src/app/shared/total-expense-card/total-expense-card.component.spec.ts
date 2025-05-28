import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpenseCardComponent } from './total-expense-card.component';

describe('TotalExpenseCardComponent', () => {
  let component: TotalExpenseCardComponent;
  let fixture: ComponentFixture<TotalExpenseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalExpenseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalExpenseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
