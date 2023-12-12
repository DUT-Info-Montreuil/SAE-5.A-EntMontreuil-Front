import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersListComponent } from './components/reminders-list/reminders-list.component';
import { RemindersRoutingModule } from './reminders-routing.module';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Ripple, RippleModule } from 'primeng/ripple';
@NgModule({
  declarations: [
    RemindersListComponent,
  ],
  imports: [
    CommonModule,
    RemindersRoutingModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    RippleModule
  ],
  providers: [MessageService],
})
export class RemindersModule { }
