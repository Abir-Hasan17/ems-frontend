import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestIncomeCardComponent } from './highest-income-card.component';

describe('HighestIncomeCardComponent', () => {
  let component: HighestIncomeCardComponent;
  let fixture: ComponentFixture<HighestIncomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighestIncomeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestIncomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
