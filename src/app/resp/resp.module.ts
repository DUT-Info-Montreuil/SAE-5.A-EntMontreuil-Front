import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { Toast, ToastModule } from 'primeng/toast';
import {
  ConfirmationService,
  ContextMenuService,
  MessageService,
} from 'primeng/api';
import { CohortService } from '../core/services/cohort.service';
import { PromotionComponent } from './components/promotion/promotion.component';
import { CalendarDateFormatter, CalendarModule, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { DegreeComponent } from './components/degree/degree.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { TrainingComponent } from './components/training/training.component';
import { TdComponent } from './components/td/td.component';
import { TpComponent } from './components/tp/tp.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { CourseDetailsModalComponent } from './components/course-details-modal/course-details-modal.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

class CustomDateFormatter extends CalendarDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
  }
}

@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,
    CreateCourseComponent,
    DegreeComponent,
    TrainingComponent,
    TdComponent,
    TpComponent,
    ManageCoursesComponent,
    CourseDetailsModalComponent,
  ],

  imports: [
    CommonModule,
    MultiSelectModule,
    CheckboxModule,
    RespRoutingModule,
    TreeModule,
    FormsModule,
    PrimeNgCalendarModule,
    ReactiveFormsModule,
    CardModule,
    ToastModule,
    HttpClientModule,
    TableModule,
    MenuModule,
    TabViewModule,
    BadgeModule,
    ContextMenuModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    TabViewModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TooltipModule,
    ButtonModule,
    InputSwitchModule,
    MessageModule,
    ConfirmDialogModule,
  ],
  providers: [
    CohortService,
    MessageService,
    ContextMenuService,
    ConfirmationService,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ],
})
export class RespModule { }
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
