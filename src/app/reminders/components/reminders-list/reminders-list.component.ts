import { Component, OnInit } from '@angular/core';
import { ReminderModel } from '../models/reminders.model';
import { ReminderService } from '../services/reminders.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss']
})
export class RemindersListComponent implements OnInit {
  rappels: ReminderModel[] = [];
  selectedRappel: ReminderModel | null = null;

  constructor(private reminderService: ReminderService) {}

  ngOnInit(): void {
    this.loadReminders();
  }

  loadReminders(): void {
    this.reminderService.getAllReminders().subscribe(
      (reminders: ReminderModel[]) => {
        this.rappels = reminders;
      },
      (error) => {
        console.error('Error loading reminders:', error);
      }
    );
  }

  selectRappel(rappel: ReminderModel): void {
    this.selectedRappel = rappel;
  }
}
