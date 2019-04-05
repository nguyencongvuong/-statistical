import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';

import {Observable} from "rxjs/internal/Observable";
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-angular-link-http';
import gql from 'graphql-tag';
import {reportCurrentStatistic, reportDevelopmentalSubscriptionByArea} from "../types/types";

@Injectable({
  providedIn: 'root'
})

export class ChartsService {

  public data;
  reportDevelopmentalSubscriptionByArea: Observable<any>;

  constructor(private apollo: Apollo) {

  }
  getSubscriptionByArea(){
    let date = new Date();
    let varies = {};
    for (let i = 7; i >=0; i--) {
      let d = new Date(new Date().setDate(new Date().getDate() - i));
      let m = d.getMonth() + 1;
      varies["day_" + `${7-i}`] = `${date.getFullYear()}-${(m < 10) ? '0' + m : m}-${(d.getDate() < 10) ? '0' + d.getDate() : d.getDate()}`;
    }
    return this.apollo.watchQuery<any>({
      query: reportDevelopmentalSubscriptionByArea,
      variables: varies
    })
      .valueChanges
      .pipe(
        map(result => result.data)
      );
  }
  d(){
    return this.data;
  }
  getStatic(){
    return this.apollo.watchQuery<any>({
      query: reportCurrentStatistic,

    })
      .valueChanges
      .pipe(
        map(result => (result.data))
      );
  }
}

