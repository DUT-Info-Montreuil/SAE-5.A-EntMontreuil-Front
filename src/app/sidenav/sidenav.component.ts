import { Component , Output , EventEmitter , OnInit , HostListener} from '@angular/core';
import { navbarData } from './nav-data';
import { animate , style , transition , trigger , keyframes} from '@angular/animations'
 
interface SideNavToggle {
  screenWidth : number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('150ms',
          style({opacity: 0})
        )
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('500ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(1turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
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
