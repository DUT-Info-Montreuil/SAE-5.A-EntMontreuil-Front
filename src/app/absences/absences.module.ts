import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesLayoutComponent } from './components/absences-layout/absences-layout.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { SingleAbsenceComponent } from './components/single-absence/single-absence.component';



@NgModule({
  declarations: [
    AbsencesLayoutComponent,
    SingleAbsenceComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule
  ]
})
export class AbsencesModule { }
