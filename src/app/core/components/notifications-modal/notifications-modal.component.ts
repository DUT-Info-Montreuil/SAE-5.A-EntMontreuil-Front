import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
import { parseISO, formatDistanceToNow } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { utcToZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss']
})
export class NotificationsModalComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(
      (data: Notification[]) => {
        this.notifications = data;
        console.log('Notifications récupérées', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }

  formatRelativeDate(dateString: string): string {
    const utcDate = parseISO(dateString); // Parse la date en tant qu'UTC
    const timeZone = 'Europe/Paris';
    const zonedDate = utcToZonedTime(utcDate, timeZone); // Convertit en heure locale
    return formatDistanceToNow(zonedDate, { addSuffix: true, locale: fr });
  }
}
