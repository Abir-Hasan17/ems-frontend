import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DataPoint, Gradient, trx } from '../../models/interfaces';
import { trxType } from '../../models/enumerators';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnChanges, AfterViewInit {
  @Input() label!: string;
  @Input() transactions!: transaction[];
  @Input() isInverted = false;
  @Input() fillGradient: Gradient = {
    top: 'rgba(39, 138, 207, 0.3)',
    bottom: 'rgba(18, 127, 202, 0.1)',
  };
  @Input() lineGradient: Gradient = {
    top: 'rgba(39, 138, 207, 0.5)',
    bottom: 'rgba(18, 127, 202, 0.3)',
  };
  @Input() gridColor = 'rgba(33, 33, 33, 0.75)';
  @Input() bgColor = 'bg-violet-100';
  @Input() txtColor = 'text-violet-900';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  dataTimeline: number[] = [];
  dateLabel: string[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.dateLabel,
    datasets: [
      {
        data: this.dataTimeline,
        label: this.label,
        fill: true,
        tension: 0.5,
        showLine: true,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: true,
          color: this.gridColor,
          lineWidth: (ctx) => (ctx.index === 0 ? 0 : 1),
        },
        border: {
          display: false,
        },
      },
    },
    hover: {
      intersect: false,
    },
    animation: {
      duration: 1000,
    },
    events: [],
  };

  public lineChartLegend = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.transactions || this.transactions.length === 0) return;

    const timeline = this.getDataOverTime(this.transactions);
    this.dataTimeline = timeline.map((point) => point.data);
    this.dateLabel = timeline.map((point) => point.date);

    this.lineChartData = {
      labels: this.dateLabel,
      datasets: [
        {
          data: this.dataTimeline,
          label: this.label,
          fill: true,
          tension: 0.5,
          showLine: true,
        },
      ],
    };

    setTimeout(() => {
      this.applyGradients();
      this.chart?.update();
    }, 0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.applyGradients();
      this.chart?.update();
    }, 0);
  }

  private applyGradients() {
    if (!this.chart?.chart) return;

    const ctx = this.chart.chart.ctx;
    const chartArea = this.chart.chart.chartArea;

    if (!chartArea) return;

    const gradientFill = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradientFill.addColorStop(0, this.fillGradient.top);
    gradientFill.addColorStop(1, this.fillGradient.bottom);

    const gradientLine = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradientLine.addColorStop(0, this.lineGradient.top);
    gradientLine.addColorStop(1, this.lineGradient.bottom);

    const dataset = this.lineChartData.datasets[0];
    dataset.backgroundColor = gradientFill;
    dataset.borderColor = gradientLine;
  }

  getDataOverTime(trxList: transaction[]): DataPoint[] {
    const sorted = [...trxList].sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
    );

    let data = 0;
    const result: DataPoint[] = [];

    for (const trx of sorted) {
      if (this.isInverted) {
        data += Math.abs(trx.amount);
      } else {
        data += trx.type === trxType.income ? trx.amount : -trx.amount;
      }

      result.push({
        date: new Date(trx.transactionDate).toISOString(),
        data,
      });
    }

    return result;
  }
}
