import {Component, OnInit} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {Helpers} from "../../../_helpers/helpers";
import {Funct} from "../../../_helpers/function"

@Component({
  selector: 'app-by-status',
  templateUrl: './by-status.component.html',
  styleUrls: ['./by-status.component.css']
})
export class ByStatusComponent implements OnInit {
  public helpers: Helpers;

  constructor() {

  }
  public barChartOptions = {
    // scaleShowVerticalLines: false,
    showGridLines: true,
    responsive: true,
    showTooltips: false,
    weight: 0,
    events:['mousemove','mouseout'],
    tooltips: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        backgroundColor: function (context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        formatter: function (value) {
          return value + ' (100%) ';
        }
      }
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth:10,
        filter: function (value, key) {
          var keyText = 0;
          key.labels.forEach(function (v, k) {
            if (value.text == v) {
              keyText = k;
            }
          });
          var val = key.datasets[0]['data'][keyText];
          // value.text = value.text + ': ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          value.text = "Đang cập nhật";
          return value;
        }
      }
    },
    backgroundColors: ['#5cb85c', '#D74B4B', '#6685a4', '#f0ad4e', '#5bc0de', '#EE82EE']
  };
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [
    {
      data: [1],
      backgroundColor: [
        '#5B9BD5',
        '#FFCC99',
        '#A5A5A5',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
    },

  ];
  public barChartLabels = [
    'Hoạt động'
  ];

  ngOnInit() {
  }

}
