import {Component, OnInit} from '@angular/core';
import {HomePageService} from "../../../_services/home-page.service";
import {ChartsService} from "../../../_services/charts.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.css'],
  providers: [HomePageService]
})
export class DetailsTableComponent implements OnInit {

  public reportCurrentStatistic;
  constructor(public homeService:HomePageService,private chartsService:ChartsService) {

  }

  ngOnInit() {
    var self = this;
    // this.statistic = this.homeService.statistic;
    this.chartsService.getStatic().subscribe(function(data){
    // (self.reportCurrentStatistic = data)
      self.reportCurrentStatistic = data.reportCurrentStatistic;
      console.log(data);
    });
  }

}
