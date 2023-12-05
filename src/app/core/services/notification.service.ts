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
}
