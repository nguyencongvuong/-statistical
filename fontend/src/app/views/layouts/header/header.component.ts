import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../_services/authentication.service";
import {Observable} from "rxjs/internal/Observable";
import {ChartsService} from "../../../_services/charts.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public date;
  public reportCurrentStatistic:Observable<any>;
  constructor(private authenticationService:AuthenticationService,private chartsService:ChartsService) { }

  ngOnInit() {
    console.log(123);
    this.date = new Date();
  // this.chartsService.getStatic().subscribe((data)=>console.log(data));
  //   this.reportCurrentStatistic = this.chartsService.getStatic();

  }
  logout(){
    this.authenticationService.logout();
  }


}
