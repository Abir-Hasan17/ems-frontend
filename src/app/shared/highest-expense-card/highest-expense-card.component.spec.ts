import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestExpenseCardComponent } from './highest-expense-card.component';

describe('HighestExpenseCardComponent', () => {
  let component: HighestExpenseCardComponent;
  let fixture: ComponentFixture<HighestExpenseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighestExpenseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestExpenseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
