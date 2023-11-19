import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesLayoutComponent } from './components/absences-layout/absences-layout.component';
import { AbsencesRoutingModule } from './absences-routing.module';



@NgModule({
  declarations: [
    AbsencesLayoutComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule
  ]
})
export class AbsencesModule { }
