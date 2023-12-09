import { Component, OnInit } from '@angular/core';
import { ReminderModel } from 'src/app/core/models/reminders.model';
import { ReminderService } from 'src/app/core/services/reminders.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss'],
})
export class RemindersListComponent implements OnInit {
  rappels: ReminderModel[] = [];
  selectedRappel: ReminderModel | null = null;
  titleModified: boolean = false;
  textModified: boolean = false;
  dateModified: boolean = false;
  intervalId: any;


  constructor(private reminderService: ReminderService) {}

  ngOnInit(): void {
    this.loadReminders();
  }

  loadReminders(): void {
    this.reminderService.getAllReminders().subscribe(
      (reminders) => {
        this.rappels = reminders;
        this.startInterval();
      },
      (error: any) => {
        console.error('Error loading reminders:', error);
      }
    );
  }

  selectRappel(rappel: ReminderModel): void {
    this.selectedRappel = rappel;
    this.resetFlags();
  }

  updateSelectedRappel(): void {
    if (this.selectedRappel) {
      if (this.titleModified || this.textModified) {
        this.selectedRappel.reminder_date = new Date();
        this.dateModified = true;

        this.reminderService.updateReminder(this.selectedRappel.id, this.selectedRappel).subscribe(
          () => {
            console.log('Reminder updated successfully.');
            this.loadReminders();
          },
          (error: any) => {
            console.error('Error updating reminder:', error);
          }
        );
      }
      this.resetFlags();
    }
  }

  onTitleChange(): void {
    this.titleModified = true;
  }

  onTextChange(): void {
    this.textModified = true;
  }

  resetFlags(): void {
    this.titleModified = false;
    this.textModified = false;
    this.dateModified = false;
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.updateSelectedRappel();
    }, 2000);
  }

  stopInterval(): void {
    clearInterval(this.intervalId);
  }

}
