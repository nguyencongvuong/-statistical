import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ByStatusComponent} from "./by-status.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [ByStatusComponent],
  imports: [
    CommonModule,

    ChartsModule
  ],
  exports:[ByStatusComponent]
})
export class ByStatusModule { }
