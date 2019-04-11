import {Component, Input, OnInit} from '@angular/core';
import {ChartsService} from "../../_services/charts.service";


@Component({
  selector: 'app-subscriber-by-area',
  templateUrl: './subscriber-by-area.component.html',
  styleUrls: ['./subscriber-by-area.component.css']
})
export class SubscriberByAreaComponent implements OnInit {
  @Input() chartsData;

  constructor(private chartsService: ChartsService) {
  }

  public pluginsChartType =
    {
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
    }
  ;
  public barChartOptions = {
    events: ['mousemove', 'mouseout'],
    scaleShowVerticalLines: false,
    showGridLines: true,
    responsive: true,
    // boder:false,
    tooltips: {

      mode: 'index',
      intersect: false,
      enabled:false,
      custom:function(tooltipModel) {
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

          titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function(body, i) {
            var colors = tooltipModel.labelColors[i];

            var style = 'background:' + "#000";
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
        tooltipEl.style.backgroundColor= "#000";
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

    legend: {
      position: 'bottom',
      usePointStyle: true,
      orient: 'vertical',
      labels: {
        boxWidth: 10,
        fontColor:"#ccc",
      },


    },
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.5,
          ticks:{
            fontColor: "#fefffd",
            backgroundColor:"#fefffd"
          },
          gridLines: {
            color: '#fefffd' // makes grid lines from y axis red
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
            maxIndex:0,
            fontColor: "#fefffd",
            callback: function(label, index, labels) {
              if(this.options.ticks.maxIndex <= index){
                this.options.ticks.maxIndex = index;
              }
              if(this.options.ticks.maxIndex == labels[0]/this.options.ticks.maxRotation){
                this.options.ticks.suggestedMax = labels[0] + this.options.ticks.maxRotation*4;
              }
              return label;
            }
          }
        }
      ]
    },
    borderSkipped: 'bottom',
    animation: {
      duration: 1,
      "onProgress": function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#fff';
        ctx.zIndex='-1';
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
              ctx.fillText(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), bar._model.x, bar._model.y - 5);
            }
          });
        });
      }
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

  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit() {

    var self = this;
    this.chartsData.subscribe(function (data,err) {

      let keys = ["oneDayAgo", 'twoDayAgo', 'threeDaysAgo', 'fourDaysAgo', 'fiveDaysAgo', 'sixDaysAgo', 'sevenDaysAgo'];
      let northernCount = [];
      let centralCount = [];
      let southCount = [];
      let barLabels = [];
      let lineData = [];
      keys.forEach(function (v, k) {

        northernCount.push(data[v]["northernCount"]);
        centralCount.push(data[v]["centralCount"]);
        southCount.push(data[v]["southCount"]);
        barLabels.push(data[v]['day']);
        lineData.push(data[v]["northernCount"]+data[v]["centralCount"]+data[v]["southCount"]);
      });

      self.barChartLabels = barLabels;
      self.barChartData = [
        {
          label: 'Bắc',
          data: northernCount,
          backgroundColor: '#005EB6',
          hoverBackgroundColor: '#005EB6',
          borderColor: '#000000'
        },
        {
          label: 'Trung',
          data: centralCount,
          backgroundColor: '#ED201F',
          hoverBackgroundColor: '#ED201F',
          borderColor: '#000000'
        },
        {
          label: 'Nam',
          data: southCount,
          backgroundColor: '#F7F7F7',
          hoverBackgroundColor: '#F7F7F7',
          borderColor: '#000000'
        },
        {
          label: 'Tổng',
          data: lineData,

          type: 'line'

        }
      ]
    });
    this.barChartData = [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Bắc',
        backgroundColor: '#005EB6',
        hoverBackgroundColor: '#6699FF',
        borderColor: '#6699FF'
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Trung',
        backgroundColor: '#ED201F',
        hoverBackgroundColor: '#FFCCCC',
        borderColor: '#FFCCCC'
      },
      {
        data: [30, 20, 60, 15, 56, 60, 50],
        label: 'Nam',
        backgroundColor: '#CCFFFF',
        hoverBackgroundColor: '#CCFFFF',
        borderColor: '#CCFFFF'
      },
      // {data: [30, 20, 60, 15, 56, 60, 50], label: 'Series C',backgroundColor:'#CC99FF',hoverBackgroundColor:'#CC99FF'},
    ];
  }

}
