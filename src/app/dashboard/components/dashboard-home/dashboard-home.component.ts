import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbsencesService } from 'src/app/core/services/absences.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReminderService } from 'src/app/core/services/reminders.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class DashboardHomeComponent implements OnInit {
  date: Date | undefined;
  name!: string;
  absences!: any;
  nbAbsences!: number;

  reminders!: any;
  nbReminders!: number;


  constructor(private confirmationService: ConfirmationService, 
              private messageService: MessageService, 
              private authService: AuthService, 
              private absenceService: AbsencesService,
              private reminderService: ReminderService,
              ) {

    this.name = this.authService.getFirstname();
   }

  ngOnInit(): void {
    this.absenceService.getStudentUnjustifiedAbsences(this.authService.getUserId()).subscribe( data => {
      this.absences = data;
      this.nbAbsences = data.length;
    });

    this.reminderService.getReminderById(this.authService.getUserId()).subscribe( data => {
      this.reminders = data;
      this.nbReminders = data.length;
     });


  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
