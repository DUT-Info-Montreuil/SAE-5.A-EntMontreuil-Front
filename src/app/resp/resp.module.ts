import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CohortService } from '../core/services/cohort.service';
import { PromotionComponent } from './components/promotion/promotion.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,


  ],
  imports: [
    CommonModule,
    RespRoutingModule,
    TreeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    DropdownModule,
    ToastModule,
    FullCalendarModule,
    DialogModule,
    SkeletonModule,
    TabViewModule,
    MultiSelectModule,
    PrimeNgCalendarModule,
    InputMaskModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TooltipModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [
    CohortService,
    MessageService,
    ConfirmationService,
    MessageService,
  ],
})
export class RespModule {}
