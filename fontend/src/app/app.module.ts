import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChartsModule} from "ng2-charts";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {IndexModule} from "./views/home_page/index/index.module";
import {HomeComponent} from './views/home/home.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {GoogleChartInterface} from 'ng2-google-charts/google-charts-interfaces';
import {Helpers} from "./_helpers/helpers";
// import {
//   IBarChartOptions,
//   IChartistAnimationOptions,
//   IChartistData
// } from 'chartist';
import {ChartEvent, ChartType} from 'ng-chartist';
import {ChartistModule} from 'ng-chartist';
import {LoginComponent} from "./views/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { RegisterComponent } from './admin/register/register.component';
import {RegisterComponent} from "./views/user/register/register.component";
import {Apollo, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './views/layouts/footer/footer.component';

var config = {
  apiKey: "AIzaSyCxO4wTX8kriHMPkYessiJgq1deOnVTKBI",
  authDomain: "baocaologin.firebaseapp.com",
  databaseURL: "https://baocaologin.firebaseio.com",
  projectId: "baocaologin",
  storageBucket: "baocaologin.appspot.com",
  messagingSenderId: "831654919501"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    ChartsModule,
    IndexModule,
    Ng2GoogleChartsModule,
    AppRoutingModule,
    ChartistModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [Helpers],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apollo:Apollo,private httpLink:HttpLink){
    apollo.create({
      link: httpLink.create({uri: 'http://10.254.12.5:4001/graphql'}),
      cache: new InMemoryCache()
    });
  }
}
