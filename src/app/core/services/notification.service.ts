import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private apiURL = 'https://localhost:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<{ notifications: any[] }>(this.apiURL + '/user/notifications', this.httpOptions)
            .pipe(
                map(response => response.notifications.map(notif => notif.notification))
            );
    }

}
