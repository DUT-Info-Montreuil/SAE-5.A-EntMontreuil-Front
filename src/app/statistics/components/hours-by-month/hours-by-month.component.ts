import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-hours-by-month',
  templateUrl: './hours-by-month.component.html',
  styleUrls: ['./hours-by-month.component.scss']
})
export class HoursByMonthComponent implements OnInit{

  id_user!: number;
  id_teacher!: number;

  totalHours!: number;       // Total des heures pour le mois sélectionné
  hoursPassed!: number;     // Heures effectuées
  hoursLeft!: number;       // Heures restantes

  selectedYear: string = (new Date().getFullYear()).toString();  // Par défaut l'année actuelle
  selectedMonth: string = (new Date().getMonth() + 1).toString(); // Par défaut le mois actuel 

  months = [
    { label: 'Janvier', value: "1" },
    { label: 'Février', value: "2" },
    { label: 'Mars', value: "3" },
    { label: 'Avril', value: "4" },
    { label: 'Mai', value: "5" },
    { label: 'Juin', value: "6" },
    { label: 'Juillet', value: "7" },
    { label: 'Août', value: "8" },
    { label: 'Septembre', value: "9" },
    { label: 'Octobre', value: "10" },
    { label: 'Novembre', value: "11" },
    { label: 'Décembre', value: "12" }
  ];

  years = [
    "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008","2009", "2010", "2011",
    "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"
  ];
  


  constructor(private teachersService: TeachersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.calculateHours(this.selectedYear, this.selectedMonth);
  }

  private calculateHours(year: string, month: string): void {
    this.teachersService.getIdTeacherByIdUser(this.authService.getUserId()).subscribe(data => {

      this.id_teacher = data.id_Teacher;
      
      this.teachersService.getHoursByMonth(this.id_teacher, year, month).subscribe(data => {
        this.totalHours = data.hours_worked; 
      });
  
      this.teachersService.getLeftHoursByMonth(this.id_teacher, year, month).subscribe(data => {
        this.hoursLeft = data.hours_left;
      });

      this.teachersService.getPassedHoursByMonth(this.id_teacher, year, month).subscribe(data => {
        this.hoursPassed = data.hours_passed; 
      });
      
    });

  }

  updateHours(): void {
    this.calculateHours(this.selectedYear, this.selectedMonth);
  }
  
  
}
