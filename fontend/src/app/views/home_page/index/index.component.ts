import { Component, OnInit } from '@angular/core';
import {IndexModule} from "./index.module";
import {HeaderComponent} from "../../../views/layouts/header/header.component";
import {HomePageService} from "../../../_services/home-page.service";
import {ChartsService} from "../../../_services/charts.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent implements OnInit {
  public statistic;
  protected data;
  constructor(public homeService:HomePageService,private chartsService:ChartsService) {  }
  reportDevelopmentalSubscriptionByArea;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    showGridLines: true,
    responsive: true,
    // boder:false,
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.5,
          // barThickness: 6,
          // maxBarThickness: 8,
          // minBarLength: 2,
        }
      ],
      yAxes: [
        {stacked: true}
      ]
    },
    borderSkipped: 'bottom',
    animation: {
      onProgress: function (animation) {
        // progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = 'bottom';
        // console.log(animation);
        this.data.datasets.forEach(function (dataset, i) {

          var meta = chartInstance.controller.getDatasetMeta(i);

          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(dataset.label, bar._model.x, bar._model.y + 15);
          });
        });
      },
      onComplete:function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {

          var meta = chartInstance.controller.getDatasetMeta(i);

          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(dataset.label, bar._model.x, bar._model.y + 15);
          });
        });
      }
    }

  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [

  ];
  ngOnInit() {
    console.log(1);
    this.statistic = this.homeService.statistic;
    // this.data = this.chartsService.getSubscriptionByArea();

    //
    // this.barChartData = [
    //   {data: [60, 59, 80, 81, 56, 55, 39], label: '1', backgroundColor: '#6699FF', hoverBackgroundColor: '#6699FF'},
    //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Trung', backgroundColor: '#FFCCCC', hoverBackgroundColor: '#FFCCCC'},
    //   {data: [30, 20, 60, 15, 56, 60, 50], label: 'Nam', backgroundColor: '#CCFFFF', hoverBackgroundColor: '#CCFFFF'},
    // ]
  }

}
