import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscriberByAreaModule} from "../../../charts/subscriber-by-area/subscriber-by-area.module";
import {ChargeModule} from "../../../charts/charge/charge.module";
import {ByStatusModule} from "../../../charts/pie/by-status/by-status.module";
import {ByServiceModule} from "../../../charts/pie/by-service/by-service.module";
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

    SubscriberByAreaModule,

    ChargeModule,

    ByStatusModule,

    ByServiceModule,

    FormsModule
  ],
  exports:[SubscriberByAreaModule,ChargeModule,ByStatusModule,ByServiceModule]
})
export class MainContentModule { }
