import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChargeComponent} from "./charge.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [ChargeComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[ChargeComponent]
})
export class ChargeModule { }
