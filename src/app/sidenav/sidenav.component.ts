import { Component , Output , EventEmitter , OnInit , HostListener} from '@angular/core';
import { navbarData } from './nav-data';
 
interface SideNavToggle {
  screenWidth : number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenwidth = 0;
  navData = navbarData;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenwidth = window.innerWidth;
    if(this.screenwidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenwidth})
    }
  }


  ngOnInit(): void {
    this.screenwidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenwidth})
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenwidth})
  }

}
