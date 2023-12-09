import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersListComponent } from './components/reminders-list/reminders-list.component';
import { RemindersRoutingModule } from './reminders-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RemindersListComponent,
  ],
  imports: [
    CommonModule,
    RemindersRoutingModule, 
  ]
})
export class RemindersModule { }
