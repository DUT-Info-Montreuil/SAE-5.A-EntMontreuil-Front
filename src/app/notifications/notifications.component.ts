import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { format, formatDistanceToNow, formatRelative, isSameDay, parseISO } from 'date-fns';
import { startOfDay, isToday, isYesterday, subDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import fr from 'date-fns/locale/fr';
import { Notification } from '../core/models/notification.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  isLoading: boolean = true;
  groupedNotifications: { [key: string]: Notification[] } = {};

  constructor(private notificationService: NotificationService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.notificationService.getNotifications().subscribe(
      (data: Notification[]) => {
        this.notifications = data;
        this.groupNotificationsByDate();
        this.isLoading = false;
      },
      (error) => {
        // Gestion des erreurs
      }
    );
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Voulez-vous effacer toutes les notifications ?",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Appel de la méthode deleteNotifications
        this.notificationService.deleteNotifications().subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Les notifications ont été effacées.' });
            this.notifications = [];
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la suppression des notifications.' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  groupNotificationsByDate(): void {
    this.notifications.forEach(notification => {
      const date = this.getDateGroup(parseISO(notification.created_at));
      if (!this.groupedNotifications[date]) {
        this.groupedNotifications[date] = [];
      }
      this.groupedNotifications[date].push(notification);
    });
  }

  getDateGroup(date: Date): string {
    if (isToday(date)) return 'Aujourd\'hui';
    if (isYesterday(date)) return 'Hier';
    for (let i = 2; i <= 7; i++) {
      if (isSameDay(subDays(new Date(), i), date)) {
        return formatRelative(date, new Date(), { locale: fr });
      }
    }
    return format(date, 'dd/MM/yyyy', { locale: fr });
  }

  getGroupedNotificationKeys(): string[] {
    return Object.keys(this.groupedNotifications).sort(/* ogique de tri, si nécessaire */);
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