import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  ]
})

export class SidenavComponent {
  menuActive: boolean = false;
  first_name: string = this.auth.getFirstname();
  last_name: string = this.auth.getLastname();
  role: string = this.auth.getRole();
  isAdmin: boolean = this.auth.getIsAdmin();
  currentPageName: string = '';

  showNotifications: boolean = false;

  @ViewChild('userProfileContainer') userProfileContainer?: ElementRef;

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
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


  ngOnInit() {

  }
}