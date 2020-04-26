import { Component, OnInit, ViewChild, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @ViewChild('customChart') private chartRef;
  @Input()  chartType: string;
  @Input()  chartDatasets: Array<any>;
  @Input()  chartLabels: Array<any>;
  @Input()  chartOptions: any;
  
  public theChartType : string;
  public theChartDatasets : Array<any> = [];
  public theChartLabels : Array<any> = [];
  public theChartOptions : any;

  public chart: any;

  constructor() { }

  ngOnInit() {
    this.updateDataforChart();
  }

  ngOnChanges() {
    if (this.chart) {  
      this.chart.destroy();
      this.chart = null;
      this.updateDataforChart();   
    }  
  }
  

  
  updateDataforChart(){
    this.theChartType =  this.chartType;
    this.theChartDatasets = this.chartDatasets;
    this.theChartLabels = this.chartLabels;
    this.theChartOptions =  this.chartOptions;

    // this.chart = new Chart(this.chartRef.nativeElement, {
    this.chart = new Chart('customChart', {
      type: this.theChartType,
      data: {
        labels: this.theChartLabels, // your labels array
        datasets: [{
          data: this.theChartDatasets,
          borderColor: '00AEFF',
          fill: true
        }],
      },
      options: this.theChartOptions,
    });



    // this.chart = new Chart(this.chartRef.nativeElement, {
    // this.chart = new Chart('customChart', {
    //   type: 'line',
    //   data: {
    //     labels: ['labels'], // your labels array
    //     datasets: [
    //       {
    //         data: this.dataPoints, // your data array
    //         borderColor: '#00AEFF',
    //         fill: false
    //       }
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [{
    //         display: true
    //       }],
    //       yAxes: [{
    //         display: true
    //       }],
    //     }
    //   }
    // });

  }

}
