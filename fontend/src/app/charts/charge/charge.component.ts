import {Component, Input, OnInit} from '@angular/core';
var parseFloat = require("core-js/fn/number/parse-float");

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
      mode: 'index',
      intersect: false,
      filter:function (v) {
          v.value = parseFloat(parseFloat(v.value).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return v;
      }
    },
    events:['mousemove','mouseout'],
    legend: {
      fullWidth: false,
      position: 'bottom',
      textAlign: 'left',
      labels: {
        boxWidth: 10,
        // align
        align:'center',
        columns:'end',
        // generateLabels:  function (chart) {
          // // function getValueAtIndexOrDefault(value, index, defaultValue){
          // //   if (value === undefined || value === null) {
          // //     return defaultValue;
          // //   }
          // //
          // //   if (this.isArray(value)) {
          // //     return index < value.length ? value[index] : defaultValue;
          // //   }
          // //
          // //   return value;
          // // };
          // // function isArray(){
          // //   Array.isArray ?
          // //     function (obj) {
          // //       return Array.isArray(obj);
          // //     } :
          // //     function (obj) {
          // //       return Object.prototype.toString.call(obj) === '[object Array]';
          // //     };
          // // }
          // chart.legend.afterFit = function () {
          //   var width = this.width;
          //   console.log(this);
          //
          //   this.lineWidths = this.lineWidths.map( () => this.width-12 );
          //
          //   this.options.labels.padding = 30;
          //   this.options.labels.boxWidth = 15;
          // };
          //
          // var data = chart.data;
          // if (data.labels.length && data.datasets.length) {
          //   return data.labels.map((label, i) => {
          //     console.log(this);
          //     var meta = chart.getDatasetMeta(0);
          //     var ds = data.datasets[0];
          //     var arc = meta.data[i];
          //     var custom = arc && arc.custom || {};
          //     var getValueAtIndexOrDefault = function (value, index, defaultValue) {
          //       if (value === undefined || value === null) {
          //         return defaultValue;
          //       }
          //
          //       if (Array.isArray ?
          //         function (obj) {
          //           return Array.isArray(obj);
          //         } :
          //         function (obj) {
          //           return Object.prototype.toString.call(obj) === '[object Array]';
          //         }) {
          //         return index < value.length ? value[index] : defaultValue;
          //       }
          //     };
          //     var arcOpts = chart.options.elements.arc;
          //     var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
          //     var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
          //     var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
          //     console.log(fill);
          //     return {
          //       text: '12323',
          //       fillStyle: fill,
          //       strokeStyle: stroke,
          //       lineWidth: 3,
          //       hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
          //
          //       // Extra data used for toggling the correct item
          //       index: i,
          //
          //     };
          //   });
          // }
          // return [];
          //
          //
          // // here goes original or customized code of your generateLabels callback
        // },
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
      "onProgress": function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        var length = this.data.datasets.length;
        var dataSets = this.data.datasets;
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var total = 0;
            for (let j = 0; j < length; j++) {
              total += dataSets[j]['data'][index];
            }
            if (i == length - 1) {

              ctx.fillText(parseFloat(parseFloat(total).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ","), bar._model.x, bar._model.y - 5);
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
      label: 'CoD',
      backgroundColor: '#CCFFFF',
      hoverBackgroundColor: '#CCFFFF',
      borderColor: '#CCFFFF'
    },
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
      keys.forEach(function (v, k) {
        cod.push(data[v]["cod"]);
        electronicCard.push(data[v]["electronicCard"]);
        physicalCard.push(data[v]["physicalCard"]);
        barLabels.push(data[v]['day']);
      });

      self.barChartLabels = barLabels;
      self.barChartData = [
        {
          label: 'Cod',
          data: cod,
          backgroundColor: '#6699FF',
          hoverBackgroundColor: '#6699FF',
          borderColor: '#6699FF'
        },
        {
          label: 'Thẻ điện tử',
          data: electronicCard,
          backgroundColor: '#FFCCCC',
          hoverBackgroundColor: '#FFCCCC',
          borderColor: '#FFCCCC'
        },
        {
          label: 'Thẻ vật lý',
          data: physicalCard,
          backgroundColor: '#CCFFFF',
          hoverBackgroundColor: '#CCFFFF',
          borderColor: '#CCFFFF'
        },
      ]
    });
  }

}
