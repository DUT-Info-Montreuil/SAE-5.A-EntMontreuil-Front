import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsLayoutComponent } from './components/statistics-layout/statistics-layout.component';


@NgModule({
  declarations: [
    StatisticsLayoutComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
