import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallrollComponent } from './components/callroll/callroll.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { CohortService } from '../core/services/cohort.service';



@NgModule({
  declarations: [
    CallrollComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
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
export class TeacherModule { }
