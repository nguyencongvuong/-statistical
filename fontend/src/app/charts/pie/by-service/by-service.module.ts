import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ByServiceComponent} from "./by-service.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [ByServiceComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[ByServiceComponent]
})
export class ByServiceModule { }
