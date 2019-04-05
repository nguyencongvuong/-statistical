import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./views/home_page/index/index.component";
import {HomeComponent} from "./views/home/home.component";
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/user/register/register.component";
import {AuthenticationService} from "./_services/authentication.service";

const routes: Routes = [
  {path: '', component: IndexComponent,canActivate:[AuthenticationService]},
  {path: 'gg', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
