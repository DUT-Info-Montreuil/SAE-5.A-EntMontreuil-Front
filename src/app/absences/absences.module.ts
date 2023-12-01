import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbsencesLayoutComponent } from './components/absences-layout/absences-layout.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { SingleAbsenceComponent } from './components/single-absence/single-absence.component';
import { ButtonModule } from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    AbsencesLayoutComponent,
    SingleAbsenceComponent
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
    SkeletonModule
  ]
})
export class AbsencesModule { }
