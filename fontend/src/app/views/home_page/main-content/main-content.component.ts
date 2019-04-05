import { Component, OnInit } from '@angular/core';
import {ChartsService} from "../../../_services/charts.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  public data:Observable<any>;
  constructor(private chartsService:ChartsService) { }

  ngOnInit() {

    this.data = this.chartsService.getSubscriptionByArea();

  }

}
