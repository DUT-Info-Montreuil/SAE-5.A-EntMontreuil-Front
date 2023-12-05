import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
import { parseISO, formatDistanceToNow } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss']
})
export class NotificationsModalComponent implements OnInit {
  notifications: Notification[] = [];
  isLoading: boolean = true;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.isLoading = true;

    this.notificationService.readNotifications().subscribe(
      (data: Notification[]) => {
        this.notifications = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications', error);
        this.isLoading = false;
      }
    );
  }

  formatRelativeDate(dateString: string): string {
    try {
      const utcDate = parseISO(dateString);
      if (isNaN(utcDate.getTime())) {
        throw new Error('Invalid date');
      }
      const timeZone = 'Europe/Paris';
      const parisTime = utcToZonedTime(utcDate, timeZone);

      return formatDistanceToNow(parisTime, { addSuffix: true, locale: fr });
    } catch (error) {
      console.error('Erreur lors de la conversion de la date:', dateString, error);
      return 'Date invalide';
    }
  }
}
