import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscriberByAreaComponent} from "./subscriber-by-area.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    SubscriberByAreaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports:[SubscriberByAreaComponent]
})
export class SubscriberByAreaModule { }
