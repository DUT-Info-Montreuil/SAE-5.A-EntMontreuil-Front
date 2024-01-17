import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallrollComponent } from './components/callroll/callroll.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarDateFormatter, CalendarModule, DateAdapter, DateFormatterParams } from 'angular-calendar';
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
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FormatHourPipe } from './pipe/formatHour.pipe';

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
    CallrollComponent,
    FormatHourPipe
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
    TableModule,
    CheckboxModule
  ],
  providers: [
    CohortService,
    MessageService,
    ConfirmationService,
    MessageService,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ],
})
export class TeacherModule { }
