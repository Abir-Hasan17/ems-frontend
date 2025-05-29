import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DataPoint, Gradient, trx } from '../../models/interfaces';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { trxType } from '../../models/enumerators';
import { transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-line-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
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
        display: false, // hide legend
      },
      tooltip: {
        enabled: false, // disable tooltips if needed
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // hide bottom (X-axis) labels
        },
        grid: {
          display: false, // hide grid lines for X-axis
        },
        border: {
          display: false, // hide axis line
        },
      },
      y: {
        ticks: {
          display: false, // hide side (Y-axis) labels
        },
        grid: {
          display: true,
          color: this.gridColor, // Light teal grid lines
          lineWidth: (ctx) => {
            // Hide bottom grid line (i.e., the last tick line)
            return ctx.index === 0 ? 0 : 1;
          },
        },
        border: {
          display: false, // hide axis line
        },
      },
    },
    hover: {
      intersect: false,
    },
    animation: {
      duration: 0, // Disable animation
    },
    events: [],
  };

  public lineChartLegend = false;

  ngOnChanges(): void {
    this.dataTimeline = this.getDataOverTime(this.transactions).map(
      (point) => point.data
    );
    this.dateLabel = this.getDataOverTime(this.transactions).map(
      (point) => point.date
    );

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

    this.chart?.update();
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngAfterViewInit(): void {
    if (this.chart && this.chart.chart) {
      const ctx = this.chart.chart.ctx;
      const chartArea = this.chart.chart.chartArea;

      // Make sure chart area is available
      if (!chartArea) return;

      const gradientFill = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      );
      gradientFill.addColorStop(0, this.fillGradient.top); // Top: fill gradient
      gradientFill.addColorStop(1, this.fillGradient.bottom); // Bottom: fill gradient

      const gradientLine = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      );
      gradientLine.addColorStop(0, this.lineGradient.top); // top
      gradientLine.addColorStop(1, this.lineGradient.bottom); // bottom

      const dataset = this.lineChartData.datasets[0];
      dataset.backgroundColor = gradientFill;
      dataset.borderColor = gradientLine;

      this.chart.update();
    }
  }

  getDataOverTime(trxList: transaction[]): DataPoint[] {
    // Ensure dates are sorted in ascending order
    const sorted = [...trxList].sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
    );

    let data = 0;
    const result: DataPoint[] = [];

    sorted.forEach((trx) => {
      // Invert logic (e.g., for expenses only)
      if (this.isInverted) {
        data += Math.abs(trx.amount);
      } else {
        data += trx.type === trxType.income ? trx.amount : -trx.amount;
      }

      // Push ISO date string and cumulative data
      result.push({
        date: new Date(trx.transactionDate).toISOString(),
        data,
      });
    });

    console.log('data over time', result);
    return result;
  }
}
