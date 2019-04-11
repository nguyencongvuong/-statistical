import {Component, Input, OnInit} from '@angular/core';

var parseFloat = require("core-js/fn/number/parse-float");
import * as Math from "core-js/es6/math";
import {max} from "rxjs/operators";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  @Input() chartsData;

  constructor() {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    showGridLines: true,
    responsive: true,
    backgroundColor: [],
    tooltips: {
      enabled: false,
      mode: 'index',
      intersect: false,
      filter: function (v) {
        console.log(v.value);
        v.value = parseFloat(parseFloat(v.value).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return v;
      },
      custom: function (tooltipModel) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');
        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          // tooltipEl.style.opacity = 0;
          tooltipEl.style.opacity = "1";
          return;
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<thead>';

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];

            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span style="background-color: red"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });
          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        console.log(this);
        tooltipEl.style.opacity = "1";
        tooltipEl.style.zIndex = "10000";
        tooltipEl.style.backgroundColor= this.backgroundColor||"#000";
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 20 + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.borderRadius="5px 5px"
      }

    },
    events: ['mousemove', 'mouseout'],
    legend: {
      fullWidth: false,

      position: 'bottom',
      textAlign: 'left',
      labels: {
        fontColor: "#ccc",
        boxWidth: 10,
        align: 'center',
        columns: 'end',
        filter: function (value) {
          // Chart.Chart.helpers
          // var val = '';
          // switch (value.text.toString().toLowerCase()) {
          //   case 'cod':
          //     val = `${value.text} (Thu hộ): Napas, Momo,Payoo, ZNapas, Viettel, Mobifone, VAS`;
          //     break;
          //   case 'thẻ điện tử':
          //     val = `${value.text}: ZiZi, Vnpost, Vnpay, VTCITG`;
          //     break
          //   case 'thẻ vật lý':
          //     val = `${value.text}: Thẻ cào MobiTV`;
          //     break;
          // }
          // value.text = val;
          return value;
        }
      },
    },
    // boder:false,
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            color: '#CCC' // makes grid lines from y axis red
          },
          barPercentage: 0.5,
          ticks: {
            fontColor: "#fefffd",
          }
          // barThickness: 6,
          // maxBarThickness: 8,
          // minBarLength: 2,
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            color: '#fefffd' // makes grid lines from y axis red
          },
          ticks: {
            maxIndex: 0,
            fontColor: "#fefffd",

            callback: function (label, index, labels) {
              if (this.options.ticks.maxIndex <= index) {
                this.options.ticks.maxIndex = index;
              }
              if (this.options.ticks.maxIndex == labels[0] / this.options.ticks.maxRotation) {
                this.options.ticks.suggestedMax = labels[0] + this.options.ticks.maxRotation * 4;
              }
              if (index == this.options.ticks.maxIndex) {
                return label;
              } else {
                return label + ' triệu';
              }

            }
          }
        },
      ]
    },
    borderSkipped: 'bottom',
    animation: {
      "onProgress": function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        console.log(ctx);
        // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'white';
        ctx.zIndex = "1000";
        // ctx.textC
        var length = this.data.datasets.length;
        var dataSets = this.data.datasets;
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var total = 0;
            for (let j = 0; j < length - 1; j++) {
              total += dataSets[j]['data'][index];
            }

            if (i == length - 1) {

              ctx.fillText(parseFloat(parseFloat(total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ","), bar._model.x, bar._model.y - 10);
            }
          });
        });
      }
    }

  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {
      data: [200, 59, 80],
      label: 'Thẻ vật lý',
      backgroundColor: '#6699FF',
      hoverBackgroundColor: '#6699FF',
      borderColor: '#6699FF'
    },
    {
      data: [150, 48, 80],
      label: 'Thẻ điện tử',
      backgroundColor: '#FFCCCC',
      hoverBackgroundColor: '#FFCCCC',
      borderColor: '#FFCCCC'
    },
    {
      data: [120, 20, 60],
      label: 'Thu hộ',
      backgroundColor: '#CCFFFF',
      hoverBackgroundColor: '#CCFFFF',
      borderColor: '#CCFFFF'
    },
    {
      label: 'Line Dataset',
      data: [200, 200, 200, 200],

      // Changes this dataset to become a line
      type: 'line'
    }
  ];

  ngOnInit() {
    var self = this;
    // this.chartsData.subscribe(function(data){
    //   let d = data.reportPaymentTotalByTypeInDay;
    //   let barChart = [{
    //     data:d.counts,
    //     backgroundColor: [
    //       '#5B9BD5',
    //       '#FFCC99',
    //       '#A5A5A5',
    //       'rgba(75, 192, 192, 0.2)',
    //       'rgba(153, 102, 255, 0.2)',
    //       'rgba(255, 159, 64, 0.2)'
    //     ]
    //   }];
    //   self.barChartLabels = d.types;
    //   self.barChartData = d.types;
    //   console.log(self.barChartLabels);
    // });

    var self = this;
    this.chartsData.subscribe(function (data) {

      let keys = ["oneDayAgoByType", 'twoDayAgoByType', 'threeDayAgoByType', 'fourDayAgoByType', 'fiveDayAgoByType', 'sixDayAgoByType', 'sevenDayAgoByType'];
      let cod = [];
      let electronicCard = [];
      let physicalCard = [];
      let barLabels = [];
      let lineData = [];
      keys.forEach(function (v, k) {
        console.log(parseFloat(parseFloat(data[v]["cod"]).toFixed(2)));
        let codValue = parseFloat(parseFloat((Math.fround(data[v]["cod"] / 1000000))));
        let electronicValue = parseFloat(parseFloat((Math.fround(data[v]["electronicCard"] / 1000000))));
        let physical = parseFloat(parseFloat(Math.fround(data[v]["physicalCard"] / 1000000)));
        cod.push(codValue);
        electronicCard.push(electronicValue);
        physicalCard.push(physical);
        barLabels.push(data[v]['day']);
        lineData.push(codValue + electronicValue + physical);
      });

      self.barChartLabels = barLabels;
      self.barChartData = [
        {
          label: 'Thu hộ',
          data: cod,
          backgroundColor: '#005EB6',
          hoverBackgroundColor: '#005EB6',
          borderColor: '#ffffff'
        },
        {
          label: 'Thẻ điện tử',
          data: electronicCard,
          backgroundColor: '#ED201F',
          hoverBackgroundColor: '#ED201F',
          borderColor: '#ffffff'
        },
        {
          label: 'Thẻ vật lý',
          data: physicalCard,
          backgroundColor: '#F7F7F7',
          hoverBackgroundColor: '#F7F7F7',
          borderColor: '#ffffff',

        },
        {
          label: 'Tổng',

          data: lineData,
          type: 'line'

        }
      ]
    });
  }

}
