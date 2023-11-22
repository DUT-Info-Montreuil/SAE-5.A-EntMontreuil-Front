import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './components/modals/modals.component';



@NgModule({
  declarations: [
    ModalsComponent
  ],
  exports: [
    ModalsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
