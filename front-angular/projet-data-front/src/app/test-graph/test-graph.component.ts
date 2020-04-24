import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-graph',
  templateUrl: './test-graph.component.html',
  styleUrls: ['./test-graph.component.scss']
})
export class TestGraphComponent implements OnInit {

  @Input() outputApi: any;

  chartType = 'bar';
  chartDatasets;
  chartLabels;
  chartOptions;

  public dataForDataSet: Array<any> = [];
  public dataForLabels: Array<string> = [];

  constructor() { }

  ngOnInit() {
    this.outputApi.forecasts.forEach(element => {
      this.dataForDataSet.push(element.pv_estimate);
      this.dataForLabels.push(element.period_end);
    });

    console.log(this.dataForDataSet)

    this.chartLabels = this.dataForLabels;
    this.chartDatasets = this.dataForDataSet;
  }


}
