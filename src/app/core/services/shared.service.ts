// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private updateUsersSubject = new Subject<void>();

  // Méthode pour déclencher la mise à jour des utilisateurs
  triggerUpdateUsers() {
    this.updateUsersSubject.next();
  }

  // Observable pour écouter les événements de mise à jour des utilisateurs
  onUpdateUsers() {
    return this.updateUsersSubject.asObservable();
  }
}
