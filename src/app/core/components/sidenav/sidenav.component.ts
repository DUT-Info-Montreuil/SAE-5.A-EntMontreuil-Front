import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../../services/notification.service'
import { Notification } from '../../models/notification.model'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fade', [
      // Transition pour "entrer" - Fade In
      transition(':enter', [
        style({ opacity: 0 }), // commence avec une opacité de 0 (invisible)
        animate('250ms ease-out', style({ opacity: 1 })) // anime à une opacité de 1 (visible) en 250ms
      ]),
      // Transition pour "quitter" - Fade Out
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })) // anime à une opacité de 0 en 150ms
      ])
    ]),
  ],
  styles: [':host ::ng-deep .p-badge {  font-size: 0.5rem; font-weight: 700; min-width: 0.8rem; height: 0.8rem; line-height: 0.8rem}']
})

export class SidenavComponent {
  menuActive: boolean = false;
  first_name: string = this.auth.getFirstname();
  last_name: string = this.auth.getLastname();
  role: string = this.auth.getRole();
  isAdmin: boolean = this.auth.getIsAdmin();
  currentPageName: string = '';

  searchVisible: boolean = false;
  value3: any;

  showNotifications: boolean = false;
  notifications: Notification[] = [];
  allNotificationsRead = true;
  totalUnread!: number;

  @ViewChild('userProfileContainer') userProfileContainer?: ElementRef;

  // Gérer le raccourci recherche
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.metaKey && event.key === 'k' || event.ctrlKey && event.key === 'k') { // metaKey pour Command sur Mac, utilisez event.ctrlKey pour Windows/Linux

      event.preventDefault(); // Empêche l'action par défaut

      if (this.searchVisible) {
        this.searchVisible = false;
      } else {
        this.searchVisible = true;
      }
    }
  }

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data['title'] ?? 'Page sans titre';
      })
    ).subscribe((title: string) => {
      this.currentPageName = title;
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    let targetElement = event.target as HTMLElement;

    // Vérifie si l'élément cliqué ou un de ses parents a la classe 'notificationToggle'
    let clickedInsideNotification = false;
    while (targetElement && targetElement !== document.body) {
      if (targetElement.classList.contains('notificationToggle')) {
        clickedInsideNotification = true;
        break;
      }
      targetElement = targetElement.parentElement as HTMLElement;
    }

    if (!clickedInsideNotification) {
      this.menuActive = false;
      this.showNotifications = false;
    }
  }


  ngOnInit(): void {
    this.notificationService.totalUnread$.subscribe(count => {
      this.totalUnread = count;
      console.log('Total unread', count);
    });

    this.notificationService.getNotifications().subscribe();
  }
}