import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private apiURL = 'https://localhost:5050';

    private notificationsSource = new BehaviorSubject<Notification[]>([]);
    public notifications$ = this.notificationsSource.asObservable();

    private totalUnreadSource = new BehaviorSubject<number>(0);
    public totalUnread$ = this.totalUnreadSource.asObservable();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    readNotifications(): Observable<Notification[]> {
        return this.http.get<{ notifications: any[]; totalUnread: number }>(this.apiURL + '/user/notifications?reading=true&display=5', this.httpOptions)
            .pipe(
                tap(response => {
                    this.notificationsSource.next(response.notifications.map(notif => notif.notification));
                    this.totalUnreadSource.next(response.totalUnread);
                }),
                map(response => response.notifications.map(notif => notif.notification))
            );
    }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<{ notifications: any[]; totalUnread: number }>(this.apiURL + '/user/notifications', this.httpOptions)
            .pipe(
                tap(response => {
                    this.notificationsSource.next(response.notifications.map(notif => notif.notification));
                    this.totalUnreadSource.next(response.totalUnread);
                }),
                map(response => response.notifications.map(notif => notif.notification))
            );
    }

    deleteNotifications(): Observable<void> {
        return this.http.delete<void>(this.apiURL + '/user/notifications', this.httpOptions)
            .pipe(
                tap(() => {
                    // Réinitialiser les données après la suppression
                    this.notificationsSource.next([]);
                    this.totalUnreadSource.next(0);
                })
            );
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