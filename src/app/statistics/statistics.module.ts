import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsLayoutComponent } from './components/statistics-layout/statistics-layout.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { HoursByMonthComponent } from './components/hours-by-month/hours-by-month.component';
import { HoursByResourceComponent } from './components/hours-by-resource/hours-by-resource.component';
import { HoursByPromotionComponent } from './components/hours-by-promotion/hours-by-promotion.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StatisticsLayoutComponent,
    HoursByMonthComponent,
    HoursByResourceComponent,
    HoursByPromotionComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    TabMenuModule,
    CardModule,
    DividerModule,
    DropdownModule,
    FormsModule,
  ]
})
export class StatisticsModule { }
