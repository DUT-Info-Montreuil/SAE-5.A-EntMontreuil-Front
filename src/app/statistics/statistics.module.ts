import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsLayoutComponent } from './components/statistics-layout/statistics-layout.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [
    StatisticsLayoutComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    TabMenuModule,
    CardModule,
    DividerModule,
  ]
})
export class StatisticsModule { }
