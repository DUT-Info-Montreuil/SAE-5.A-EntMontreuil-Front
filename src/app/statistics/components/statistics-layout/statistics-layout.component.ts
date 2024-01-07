import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeachersService } from 'src/app/core/services/teachers.service';


@Component({
  selector: 'app-statistics-layout',
  templateUrl: './statistics-layout.component.html',
  styleUrls: ['./statistics-layout.component.scss']
})
export class StatisticsLayoutComponent implements OnInit {

  id_user!: number;
  id_teacher!: number;
  totalHours: any;
  hoursLeft: any;
  hoursPassed:any;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;



  constructor(private teachersService: TeachersService, private authService: AuthService) { 
    this.items = [
      { label: 'Par Mois', icon: 'pi pi-fw pi-calendar' },
      { label: 'Par Ressources', icon: 'pi pi-fw pi-briefcase' },
      { label: 'Par Promotions', icon: 'pi pi-fw pi-users' }
    ];
    
    this.activeItem = this.items[0];
  }

  

  ngOnInit() {

    this.teachersService.getIdTeacherByIdUser(this.authService.getUserId()).subscribe(data => {

      this.id_teacher = data.id_Teacher;
      

      this.teachersService.getNumberOfHoursPassed(this.id_teacher).subscribe(data => {
        this.hoursPassed = data.hours_passed; 
      });
      
      this.teachersService.getHoursNumber(this.id_teacher).subscribe(data => {
        this.totalHours = data.total_hours; 
      });
  
      this.teachersService.getNumberOfHoursLeft(this.id_teacher).subscribe(data => {
        this.hoursLeft = data.hours_left;
      });

    });
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
  



}
