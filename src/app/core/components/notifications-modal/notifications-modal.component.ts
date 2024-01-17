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
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/