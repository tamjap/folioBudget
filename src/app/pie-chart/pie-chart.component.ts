import { Component, OnInit, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ChartData } from '../classes/chartData';
import { ChartDataKey } from '../classes/chartDataKey';
import { Piechart } from '../../assets/JS/pieChart';
declare var $ :any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() title: string;
  @Input() chartData: ChartData[];
  chart: Piechart;
  canvas: HTMLCanvasElement;
  key: ChartDataKey[];

  colors = [
    "#4d4d4d", "#5da5da", "#faa43a",
    "#60bd68", "#f17cb0", "#b2912f",
    "#b276b2", "#decf3f", "#f15854"
  ];

  mutedColors = [
    "#2b3e5e", "#315051", "#5e4272",
    "#724255", "#725542", "#315141",
    "#71a1ed", "#71ede6", "#7aed71", 
    "#ede671", "#eda571", "#ed7171"
  ];

  primaryColors = [
    "#0000ff", "#ff0000", "#00ff00",
    "#ff6600", "#6600ff", "#ffff00"
  ];

  constructor() {
   }

  ngOnInit() {
    this.drawChart(this.chartData);
  }

  updateChart(chartData: ChartData[], title: string) {
    this.title = title;
    this.drawChart(chartData);
  }

  drawChart(chartData: ChartData[]) {
    this.chart = new Piechart;
    this.canvas = $("#Canvas")[0];
    this.chart.setupCanvas(this.canvas, this.colors);
    this.key = this.chart.draw(chartData);
  }

}
