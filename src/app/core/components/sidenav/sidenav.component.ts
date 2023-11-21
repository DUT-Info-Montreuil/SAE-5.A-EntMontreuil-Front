import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  @ViewChild('userProfileContainer') userProfileContainer?: ElementRef;

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private auth: AuthService
  ) { }

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
}
