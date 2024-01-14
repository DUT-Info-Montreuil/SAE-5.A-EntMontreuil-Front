import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortComponent } from './components/cohort/cohort.component';
import { RespRoutingModule } from './resp-routing.module';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { CohortService } from '../core/services/cohort.service';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SimpleCalendarComponent } from './components/simple-calendar/simple-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CourseDetailsModalComponent } from './components/course-details-modal/course-details-modal.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmationService, ContextMenuService, MessageService } from 'primeng/api';
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
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    CohortComponent,
    PromotionComponent,
    ManageCoursesComponent,
    SimpleCalendarComponent,
    CreateCourseComponent,
    CourseDetailsModalComponent,
    DegreeComponent,
    TrainingComponent,
    TdComponent,
    TpComponent
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
    ToastModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    MenuModule,
    TabViewModule,
    BadgeModule,
    ContextMenuModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers: [
    CohortService,
    MessageService,
    ConfirmationService,
    MessageService,
    ContextMenuService,
  ],
})
export class RespModule { }
