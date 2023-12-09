import { Component, OnInit } from '@angular/core';
import { ReminderModel } from 'src/app/core/models/reminders.model';
import { AuthService } from 'src/app/core/services/auth.service';
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
  newReminder: ReminderModel | null = null;

  constructor(private reminderService: ReminderService, private authService: AuthService) {}

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

  addNewReminder(): void {
    const newReminder: any = {
      title: 'New reminder',
      reminder_text: 'New reminder text',
      reminder_date: new Date(),
      id_User: this.authService.getUserId(),
      user_username: '',
    };

    this.reminderService.addReminder(newReminder).subscribe(
      (addedReminder) => {
        console.log('New reminder added successfully.');
        this.selectedRappel = addedReminder;
        this.loadReminders();
      },
      (error: any) => {
        console.error('Error adding new reminder:', error);
      }
    );
  }
  deleteSelectedRappel(): void {
    if (this.selectedRappel) {
      if (confirm('Are you sure you want to delete this reminder?')) {
        this.reminderService.deleteReminder(this.selectedRappel.id).subscribe(
          () => {
            console.log('Reminder deleted successfully.');
            this.loadReminders();
            this.selectedRappel = null; // Deselect the reminder after deletion
          },
          (error: any) => {
            console.error('Error deleting reminder:', error);
          }
        );
      }
    }
  }
}
