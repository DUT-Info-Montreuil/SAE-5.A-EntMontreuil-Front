import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/core/services/teachers.service';


@Component({
  selector: 'app-statistics-layout',
  templateUrl: './statistics-layout.component.html',
  styleUrls: ['./statistics-layout.component.scss']
})
export class StatisticsLayoutComponent implements OnInit {

  constructor(private teachersService: TeachersService) { }

  totalHours: any;
  hoursLeft: any;

  ngOnInit() {
    /*
      this.teachersService.getHoursNumber(id).subscribe(data => {
          this.totalHours = data; // Mettez à jour la variable avec les données du service
      });

      this.teachersService.getNumberOfHoursLeft(id).subscribe(data => {
          this.hoursLeft = data; // Mettez à jour la variable avec les données du service
      });
      */
  }



}
