import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-by-service',
  templateUrl: './by-service.component.html',
  styleUrls: ['./by-service.component.css']
})
export class ByServiceComponent implements OnInit {
  @Input() chartsData;
  constructor() { }
  public barChartLabels =[

  ];
  public barChartOptions = {
    // scaleShowVerticalLines: false,
    showGridLines: true,
    barShowLabels: false,
    responsive: true,
    tooltips: {
      mode: 'point',
      intersect: false
    },
    legend:{
      position:'right',
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
          value.text = value.text + ': ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return value;
        },
        fontColor:"#ccc"
      }
    },
    hover: {
      mode: 'point',
      intersect: false
    },
    scales:{
      xAxes: [{
        display: false //this will remove all the x-axis grid lines
      }]
    },
    weight:0,
    backgroundColors:[ '#5cb85c', '#D74B4B', '#6685a4', '#f0ad4e', '#5bc0de', '#EE82EE' ],
    animation: {
      onclick:function(){
        return false;
      },
      onComplete:function () {
        var data = this.data.datasets[0];
        var dataLabel = this.data.labels;
        this.data.labels.forEach(function (v,k) {
          dataLabel = (v+': '+data['data'][k]);
        });
      }
    },
    events:['mousemove','mouseout'],


  };
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = null;

  ngOnInit() {
    var self = this;

    this.chartsData.subscribe(function(data){
        // console.log(data);

        let d = data.reportEffectiveSubscriptionByType;
        if(d == null){
          self.barChartData = [{
            data:[]
          }];
          return ;
        }
        let barChart = [{
          data:d.counts,
          backgroundColor: [
            '#F7F7F7',
            '#005EB6',
            '#ED201F',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        }];
        self.barChartLabels = d.types;
        self.barChartData = barChart;

    }

    )
  }

}
