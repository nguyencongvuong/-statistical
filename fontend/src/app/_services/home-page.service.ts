import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor() { }
  public statistic = {
    total_active_today:120,
    total_prices_today:2500000,
    total_subscriber_today:5000,
    total_complain_today:180
  };
  getData(){
    // return
  }
}
