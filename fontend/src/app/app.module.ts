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
import {onError} from "apollo-link-error";
import {ApolloClient} from 'apollo-boost';
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

import {setContext} from 'apollo-link-context';
import {HttpHeaders} from '@angular/common/http';

import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("876025403409-e0hjtmnv013kt3ogvspnrh9an28punh0.apps.googleusercontent.com")
      }
    ]
  );
  return config;
}

import {FooterComponent} from './views/layouts/footer/footer.component';
import {AuthenticationService} from "./_services/authentication.service";

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
    HttpLinkModule,
    SocialLoginModule
  ],
  providers: [
    Helpers,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink,private authenticationService:AuthenticationService) {
    const http = httpLink.create({
      uri: 'http://10.254.12.5:4001/graphql'
    });
    const auth = setContext((_, {headers}) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('idToken');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: new HttpHeaders().set('idtoken', token)
        };
      }
    });
    const errorLink = onError(({networkError, graphQLErrors}) => {
      if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) => {
                if(message == 'Unauthenticated!'){
                  this.authenticationService.logout();
                }
          }
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    const link = errorLink.concat(http);

    // auth.concat(http)
    apollo.create({
      link: auth.concat(link),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    });
  }
}
