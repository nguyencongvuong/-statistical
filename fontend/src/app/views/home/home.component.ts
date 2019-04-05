import { Component, OnInit } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import {ChartsService} from "../../_services/charts.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private chartsService:ChartsService) {

  }

  ngOnInit() {

    // this.chartsService.getSubscriptionByArea();
  }
  public type: ChartType = 'Bar';
  public data: IChartistData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
  };

  public options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300
  };

  public events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };
  public tableChart =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['Galaxy', 'Distance', 'Brightness'],
      ['Canis Major Dwarf', 8000, 3000],
      ['Sagittarius Dwarf', 24000, 4.5],
      ['Ursa Major II Dwarf', 30000, 14.3],
      ['Lg. Magellanic Cloud', 50000, 0.9],
      ['Bootes I', 60000, 13.1]
    ],
    // formatters: [
    //   {
    //     columns: [1, 2],
    //     type: 'NumberFormat',
    //     options: {
    //       prefix: '&euro;', negativeColor: 'red', negativeParens: true
    //     }
    //   },
    //   {
    //     columns: [3],
    //     type: 'ColorFormat',
    //     options: {
    //       ranges: [
    //         {from: 100, to: 900, fromBgColor: 'green', toBgColor: 'yellow'}
    //       ]
    //     }
    //   }
    // ],
    options: {
      title: 'Countries',
      allowHtml: true,
      isStacked: true,
      legend: 'none',
      hAxis: {textPosition: 'out'},
      vAxis: {textPosition: 'out'}
    }
  };
}
