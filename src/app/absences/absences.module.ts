import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbsencesLayoutComponent } from './components/absences-layout/absences-layout.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { ButtonModule } from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SkeletonModule } from 'primeng/skeleton';
import { JustifyAbsenceComponent } from './components/justify-absence/justify-absence.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    AbsencesLayoutComponent,
    JustifyAbsenceComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule,
    NgApexchartsModule,
    ButtonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    FormsModule,
    DatePipe,
    InputSwitchModule,
    SkeletonModule,
    ToastModule,
    DialogModule,
    FileUploadModule
  ]
})
export class AbsencesModule { }
