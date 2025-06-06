import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceReportComponent } from './balance-report.component';

describe('BalanceReportComponent', () => {
  let component: BalanceReportComponent;
  let fixture: ComponentFixture<BalanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
