import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CohortSharedService {
    private refreshNeeded = new BehaviorSubject<boolean>(false);

    // Observable que les composants peuvent écouter
    refreshNeeded$ = this.refreshNeeded.asObservable();

    // Méthode pour déclencher le rafraîchissement
    triggerRefresh() {
        this.refreshNeeded.next(true);
    }
}
