import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from "./index.component";
// import {HeaderComponent} from "../header/header.component";
import {DetailsTableComponent} from "../details-table/details-table.component";
import {MainContentComponent} from "../main-content/main-content.component";
import {SubscriberByAreaComponent} from "../../../charts/subscriber-by-area/subscriber-by-area.component";
import {MainContentModule} from "../main-content/main-content.module";
import {HeaderComponent} from "../../layouts/header/header.component";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../../layouts/footer/footer.component";
// import {HeaderComponent} from "../../../views/layouts/header/header.component";

@NgModule({
  declarations: [
    HeaderComponent,
    //

    //
    DetailsTableComponent,
    //
    MainContentComponent,
    //
    IndexComponent,
    FooterComponent
    // SubscriberByAreaComponent,
  ],
  imports: [
    CommonModule,
    MainContentModule,
    FormsModule
  ],
  exports: [IndexComponent],
  providers:[]
})
export class IndexModule { }
