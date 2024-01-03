import { Component, OnInit } from '@angular/core';
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

  constructor(private teachersService: TeachersService, private authService: AuthService) { 
  }

  

  ngOnInit() {

    console.log("UserID:", this.authService.getUserId());

    this.teachersService.getIdTeacherByIdUser(this.authService.getUserId()).subscribe(data => {
      console.log("Response from getIdTeacherByIdUser:", data);
      this.id_teacher = data.id_Teacher;
      console.log("id_teacher after assignment:", this.id_teacher);

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

    //-----------------------------------------------------------------------------------------//

    

  }



}
