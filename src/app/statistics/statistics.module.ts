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
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/