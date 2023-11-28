import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesLayoutComponent } from './components/absences-layout/absences-layout.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { SingleAbsenceComponent } from './components/single-absence/single-absence.component';
import { ButtonModule } from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AbsencesLayoutComponent,
    SingleAbsenceComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule,
    NgApexchartsModule,
    ButtonModule
  ]
})
export class AbsencesModule { }
