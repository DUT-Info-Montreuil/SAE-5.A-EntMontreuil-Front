import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  menuActive: boolean = false;
  first_name: string = this.auth.getFirstname();
  last_name: string = this.auth.getLastname();
  role: string = this.auth.getRole();
  isAdmin: boolean = this.auth.getIsAdmin();
  currentPageName: string = '';

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

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (
      this.userProfileContainer &&
      !this.userProfileContainer.nativeElement.contains(event.target as Node)
    ) {
      this.menuActive = false;
    }
  }

  items?: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
  }
}
