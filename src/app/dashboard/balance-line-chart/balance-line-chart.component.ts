import { Component, Input, ViewChild } from '@angular/core';
import { trxType } from '../../models/enumerators';
import { BalancePoint, trx } from '../../models/interfaces';

import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { trxDummy } from '../../models/dummy-data';

@Component({
  selector: 'app-balance-line-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './balance-line-chart.component.html',
  styleUrl: './balance-line-chart.component.css',
})
export class BalanceLineChartComponent {
  @Input() transactions: trx[] = [];
  balnceTimeline = this.getBalanceOverTime(trxDummy).map(
    (point) => point.balance
  );
  dateLabel = this.getBalanceOverTime(trxDummy).map((point) => point.date);

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.dateLabel,
    datasets: [
      {
        data: this.balnceTimeline,
        label: 'Balance Over Time',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
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
          color: 'rgba(0, 69, 71, 0.68)', // Light teal grid lines
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
  };

  public lineChartLegend = false;

  ngOnChanges(): void {}

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
      gradientFill.addColorStop(0, 'rgba(0, 128, 128, 0.3)'); // Top: teal with some transparency
      gradientFill.addColorStop(1, 'rgba(255, 0, 128, 0.1)'); // Bottom: rose (pinkish)

      const gradientLine = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      );
      gradientLine.addColorStop(0, 'teal'); // top
      gradientLine.addColorStop(1, 'deeppink'); // bottom

      const dataset = this.lineChartData.datasets[0];
      dataset.backgroundColor = gradientFill;
      dataset.borderColor = gradientLine;

      this.chart.update();
    }
  }

  getBalanceOverTime(trxList: trx[]): BalancePoint[] {
    const sorted = [...trxList].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let balance = 0;
    const result: BalancePoint[] = [];

    sorted.forEach((trx) => {
      balance += trx.type === trxType.income ? trx.amount : -trx.amount;
      result.push({ date: trx.date, balance });
    });

    return result;
  }
}
