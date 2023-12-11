import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReminderModel } from 'src/app/core/models/reminders.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReminderService } from 'src/app/core/services/reminders.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss'],
})
export class RemindersListComponent implements OnInit, OnDestroy {
  rappels: ReminderModel[] = [];
  filteredRappels: ReminderModel[] = [];
  selectedRappel: ReminderModel | null = null;
  titleModified: boolean = false;
  textModified: boolean = false;
  dateModified: boolean = false;
  intervalId: any;
  searchText: string = '';

  constructor(
    private reminderService: ReminderService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadReminders();
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  filterReminders(): void {
    if (!this.searchText) {
      this.filteredRappels = [...this.rappels];
    } else {
      this.filteredRappels = this.rappels.filter(rappel => {
        return rappel.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          rappel.reminder_text.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  }


  loadReminders(): void {
    this.reminderService.getAllReminders().subscribe(
      (reminders) => {
        this.filteredRappels = [...this.rappels];
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
      (addedReminder: any) => {
        console.log(addedReminder);
        newReminder.id = addedReminder.id;
        console.log('New reminder added successfully.');
        this.selectedRappel = newReminder;
        console.log(this.selectedRappel);
        this.loadReminders();
      },
      (error: any) => {
        console.error('Error adding new reminder:', error);
      }
    );
  }

  deleteSelectedRappel(): void {
    if (this.selectedRappel) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this reminder?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteReminder();
        },
        reject: (type: any) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        }
      });
    }
  }

  deleteReminder(): void {
    if (this.selectedRappel) {
      this.reminderService.deleteReminder(this.selectedRappel.id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Rappel supprimé',
            detail: 'Le rappel a été supprimé avec succès.',
          });
          console.log('Reminder deleted successfully.');
          this.loadReminders();
          this.selectedRappel = null;
        },
        (error: any) => {
          console.error('Error deleting reminder:', error);
        }
      );
    }
  }
}
