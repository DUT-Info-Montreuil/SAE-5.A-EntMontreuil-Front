import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CohortService } from '../core/services/cohort.service';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SimpleCalendarComponent } from './components/simple-calendar/simple-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CourseDetailsModalComponent } from './components/course-details-modal/course-details-modal.component';
import { DialogModule } from 'primeng/dialog';

import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,
    ManageCoursesComponent,
    SimpleCalendarComponent,
    CreateCourseComponent,
    CourseDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    RespRoutingModule,
    TreeModule,
    FormsModule,
    ToastModule,
    CardModule,
    DropdownModule,
    ToastModule,
    FullCalendarModule,
    DialogModule,
    TabViewModule,
    MultiSelectModule,
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
